const settingsKey = 'hotram-site-settings';

const editableTranslationFields = [
  'heroKicker', 'heroTitle', 'heroSubtitle', 'heroScript', 'heroCopy',
  'aboutTitle', 'aboutCopy',
  'buttonHeroPrimary', 'buttonHeroBooking', 'buttonAbout',
  'buttonAmenities', 'buttonLocation', 'buttonOffer', 'buttonContact'
];

const defaults = {
  content: {
    heroKicker: 'Khu đô thị nghỉ dưỡng ven biển',
    heroTitle: 'Hồ Tràm', heroSubtitle: 'Santorini', heroScript: 'Chạm đến thiên đường nghỉ dưỡng',
    heroCopy: 'Dự án nghỉ dưỡng cao cấp tại Hồ Tràm – Vũng Tàu,\nnơi thiên nhiên hoang sơ hòa quyện cùng phong cách sống đẳng cấp.',
    aboutTitle: 'Hồ Tràm – viên ngọc\nmới của bờ biển phía Nam',
    aboutCopy: 'Hồ Tràm Santorini là tổ hợp nghỉ dưỡng – giải trí – đầu tư đẳng cấp, được quy hoạch bài bản với tầm nhìn trở thành điểm đến hàng đầu khu vực.',
    buttonHeroPrimary: 'Khám phá dự án', buttonHeroBooking: 'Booking tour', buttonAbout: 'Tìm hiểu thêm',
    buttonAmenities: 'Xem thêm tiện ích', buttonLocation: 'Xem bản đồ', buttonOffer: 'Đăng ký ngay', buttonContact: 'Gọi thông tin',
    imageHero: '', imageAbout: '', imageHighlight1: '', imageHighlight2: '', imageHighlight3: '', imageHighlight4: '',
    imageAmenity1: '', imageAmenity2: '', imageAmenity3: '', imageAmenity4: '', imageNews1: '', imageNews2: '', imageNews3: ''
  },
  theme: { headingFont: 'Cormorant Garamond', bodyFont: 'Manrope', ink: '#102f38', deep: '#082832', gold: '#c79d5a', imageRadius: 6, buttonRadius: 6 },
  customFonts: [],
  textStyles: {}
};

let settings = loadSettings();
const preview = document.querySelector('#site-preview');
const saveState = document.querySelector('#save-state');
const status = document.querySelector('#translation-status');
let activeFieldKey = null;

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(settingsKey));
    if (!saved) return structuredClone(defaults);
    return {
      ...structuredClone(defaults),
      ...saved,
      content: { ...defaults.content, ...(saved.content || {}) },
      theme: { ...defaults.theme, ...(saved.theme || {}) },
      customFonts: saved.customFonts || [],
      textStyles: saved.textStyles || {},
      translations: saved.translations || {},
      translationSource: saved.translationSource || {}
    };
  } catch {
    return structuredClone(defaults);
  }
}

function persistLocal() {
  localStorage.setItem(settingsKey, JSON.stringify(settings));
}

async function parseJsonResponse(response) {
  const raw = await response.text();
  let result = {};
  try { result = raw ? JSON.parse(raw) : {}; } catch { result = {}; }
  if (!response.ok || result.success === false) {
    throw new Error(result.message || `API lỗi HTTP ${response.status}.`);
  }
  return result;
}

async function loadSharedSettings() {
  try {
    const response = await fetch('/api/settings', { headers: { Accept: 'application/json' } });
    const result = await parseJsonResponse(response);
    if (result.settings) {
      settings = {
        ...settings,
        ...result.settings,
        content: { ...settings.content, ...(result.settings.content || {}) },
        theme: { ...settings.theme, ...(result.settings.theme || {}) },
        customFonts: result.settings.customFonts || settings.customFonts || [],
        textStyles: result.settings.textStyles || settings.textStyles || {},
        translations: result.settings.translations || settings.translations || {},
        translationSource: result.settings.translationSource || settings.translationSource || {}
      };
      persistLocal();
    }
  } catch {
    // Static localhost development can still edit locally.
  }
  applyCustomFonts();
  fillFields();
  updateFontDropdowns();
  renderFontTags();
  initFormatButtons();
}

async function saveSharedSettings() {
  const token = localStorage.getItem('hotram-admin-token') || window.prompt('Nhập Admin Editor Token');
  if (!token) throw new Error('Chưa có Admin Editor Token nên chưa thể đồng bộ lên Vercel.');
  localStorage.setItem('hotram-admin-token', token);

  const response = await fetch('/api/settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-admin-token': token
    },
    body: JSON.stringify({ settings })
  });
  await parseJsonResponse(response);
}

function fillFields() {
  document.querySelectorAll('[data-content]').forEach((field) => {
    field.value = settings.content[field.dataset.content] ?? '';
  });
  document.querySelectorAll('[data-theme]').forEach((field) => {
    field.value = settings.theme[field.dataset.theme] ?? '';
  });
  document.querySelectorAll('[data-output]').forEach((output) => {
    output.textContent = `${settings.theme[output.dataset.output]}px`;
  });
}

function readFields() {
  document.querySelectorAll('[data-content]').forEach((field) => {
    settings.content[field.dataset.content] = field.value;
  });
  document.querySelectorAll('[data-theme]').forEach((field) => {
    settings.theme[field.dataset.theme] = field.type === 'range' ? Number(field.value) : field.value;
  });
}

function refreshPreview() {
  readFields();
  persistLocal();
  if (preview?.contentWindow) preview.contentWindow.location.reload();
}

function getChangedTranslationFields() {
  const baseline = settings.translationSource || {};
  return editableTranslationFields.filter((field) => {
    const current = String(settings.content[field] ?? '');
    return current !== String(baseline[field] ?? '');
  });
}

function setTranslationStatus(message, type = '') {
  if (!status) return;
  status.textContent = message;
  status.className = `translation-status ${type}`.trim();
}

function isLocalStaticServer() {
  return ['localhost', '127.0.0.1', '0.0.0.0'].includes(window.location.hostname);
}

async function translateContent({ saveAfter = true } = {}) {
  const button = document.querySelector('#translate-button');
  readFields();

  const fields = getChangedTranslationFields();
  if (!fields.length) {
    setTranslationStatus('Không có nội dung chữ nào thay đổi. DeepL không được gọi.', 'success');
    return { translated: false, fields: [] };
  }

  if (isLocalStaticServer()) {
    setTranslationStatus('Bạn đang mở Admin bằng Live Server. API DeepL chỉ chạy khi deploy lên Vercel (/api/translate).', 'error');
    return { translated: false, fields, error: true };
  }

  button.disabled = true;
  button.textContent = 'Đang dịch...';
  setTranslationStatus(`Đang dịch ${fields.length} trường thay đổi sang EN / DE / KO / 中文...`);

  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ content: settings.content, fields })
    });
    const result = await parseJsonResponse(response);

    settings.translations = { ...(settings.translations || {}) };
    for (const language of Object.keys(result.translations || {})) {
      settings.translations[language] = {
        ...(settings.translations[language] || {}),
        ...(result.translations[language] || {})
      };
    }

    settings.translationSource = { ...(settings.translationSource || {}) };
    fields.forEach((field) => {
      settings.translationSource[field] = settings.content[field];
    });

    persistLocal();
    if (saveAfter) await saveSharedSettings();
    if (preview?.contentWindow) preview.contentWindow.location.reload();

    setTranslationStatus(`Đã dịch và đồng bộ ${fields.length} trường thay đổi.`, 'success');
    return { translated: true, fields };
  } catch (error) {
    setTranslationStatus(error.message || 'Dịch nội dung không thành công.', 'error');
    return { translated: false, fields, error: true };
  } finally {
    button.disabled = false;
    button.textContent = 'Dịch nội dung đã thay đổi';
  }
}

async function saveOnly() {
  const button = document.querySelector('#save-only-button');
  readFields();
  persistLocal();
  button.disabled = true;
  button.textContent = 'Đang lưu...';
  try {
    await saveSharedSettings();
    if (preview?.contentWindow) preview.contentWindow.location.reload();
    saveState.textContent = 'Đã lưu và đồng bộ';
    saveState.classList.remove('unsaved');
  } catch (error) {
    saveState.textContent = error.message;
    saveState.classList.add('unsaved');
  } finally {
    button.disabled = false;
    button.textContent = 'Lưu thay đổi';
  }
}

async function saveAndTranslate() {
  const button = document.querySelector('#save-button');
  readFields();
  persistLocal();
  button.disabled = true;
  button.textContent = 'Đang xử lý...';

  try {
    const fields = getChangedTranslationFields();

    if (fields.length) {
      const result = await translateContent({ saveAfter: false });
      if (result.error) throw new Error('Dịch chưa thành công nên thay đổi chưa được đồng bộ.');
    }

    await saveSharedSettings();
    if (preview?.contentWindow) preview.contentWindow.location.reload();
    saveState.textContent = fields.length
      ? `Đã lưu + dịch ${fields.length} trường thay đổi`
      : 'Đã lưu (không cần gọi DeepL)';
    saveState.classList.remove('unsaved');
  } catch (error) {
    saveState.textContent = error.message;
    saveState.classList.add('unsaved');
  } finally {
    button.disabled = false;
    button.textContent = 'Lưu & dịch tự động';
  }
}

/* Custom Font Import Logic */
function applyCustomFonts() {
  let styleEl = document.querySelector('#custom-fonts-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'custom-fonts-style';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = (settings.customFonts || []).map((font) => `
    @font-face {
      font-family: '${font.name}';
      src: url('${font.dataUrl}');
    }
  `).join('\n');
}

function updateFontDropdowns() {
  const fontSelects = [
    document.querySelector('[data-theme="headingFont"]'),
    document.querySelector('[data-theme="bodyFont"]'),
    document.querySelector('#modal-font-family')
  ];

  fontSelects.forEach((select) => {
    if (!select) return;
    const existingValues = Array.from(select.options).map((opt) => opt.value);
    (settings.customFonts || []).forEach((font) => {
      if (!existingValues.includes(font.name)) {
        const option = document.createElement('option');
        option.value = font.name;
        option.textContent = `${font.name} (File đã import)`;
        select.appendChild(option);
      }
    });
  });
}

function renderFontTags() {
  const container = document.querySelector('#imported-fonts-list');
  if (!container) return;
  container.innerHTML = (settings.customFonts || []).map((font, idx) => `
    <span class="font-tag">
      🔤 ${font.name}
      <span class="font-tag-remove" data-font-index="${idx}">&times;</span>
    </span>
  `).join('');

  container.querySelectorAll('.font-tag-remove').forEach((btn) => {
    btn.onclick = () => {
      const index = Number(btn.dataset.fontIndex);
      settings.customFonts.splice(index, 1);
      persistLocal();
      applyCustomFonts();
      renderFontTags();
      refreshPreview();
    };
  });
}

document.querySelector('#font-file-input')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_\-\s]/g, '');
  const fontName = window.prompt('Nhập tên hiển thị cho Font chữ này:', rawName) || rawName;
  if (!fontName) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    settings.customFonts = settings.customFonts || [];
    settings.customFonts.push({ name: fontName, dataUrl });
    persistLocal();
    applyCustomFonts();
    updateFontDropdowns();
    renderFontTags();
    refreshPreview();
    e.target.value = '';
  };
  reader.readAsDataURL(file);
});

/* Per-field Format Trigger Buttons */
function initFormatButtons() {
  document.querySelectorAll('label').forEach((label) => {
    const input = label.querySelector('[data-content]');
    if (!input || label.querySelector('.format-trigger-btn')) return;
    const fieldKey = input.dataset.content;
    if (input.type === 'url' || fieldKey.startsWith('image')) return;
    const span = label.querySelector('span');
    if (!span) return;

    const row = document.createElement('div');
    row.className = 'field-label-row';

    const spanText = span.cloneNode(true);
    const formatBtn = document.createElement('button');
    formatBtn.type = 'button';
    formatBtn.className = 'format-trigger-btn';
    if (settings.textStyles && settings.textStyles[fieldKey]) formatBtn.classList.add('has-custom-style');
    formatBtn.innerHTML = '🎨 Kiểu chữ';
    formatBtn.title = 'Tùy chỉnh font, kích cỡ, màu sắc, căn lề';
    formatBtn.onclick = (event) => {
      event.preventDefault();
      openTextStyleModal(fieldKey, spanText.textContent);
    };

    row.appendChild(spanText);
    row.appendChild(formatBtn);
    span.replaceWith(row);
  });
}

/* Modal Formatting Logic */
const modal = document.querySelector('#text-style-modal');
const modalTitle = document.querySelector('#modal-field-title');
const modalFontFamily = document.querySelector('#modal-font-family');
const modalFontSize = document.querySelector('#modal-font-size');
const modalColorPicker = document.querySelector('#modal-color-picker');
const modalColorHex = document.querySelector('#modal-color-hex');
const modalAlignButtons = document.querySelectorAll('#modal-text-align-group button');
const modalBtnBold = document.querySelector('#modal-btn-bold');
const modalBtnItalic = document.querySelector('#modal-btn-italic');
const modalBtnUnderline = document.querySelector('#modal-btn-underline');

let activeAlign = '';
let isBold = false;
let isItalic = false;
let isUnderline = false;

function openTextStyleModal(fieldKey, labelText) {
  activeFieldKey = fieldKey;
  if (modalTitle) modalTitle.textContent = `Tùy chỉnh kiểu chữ: ${labelText || fieldKey}`;
  updateFontDropdowns();

  const currentStyle = (settings.textStyles && settings.textStyles[fieldKey]) || {};
  if (modalFontFamily) modalFontFamily.value = currentStyle.fontFamily || '';
  if (modalFontSize) modalFontSize.value = currentStyle.fontSize ? currentStyle.fontSize.replace('px', '') : '';
  if (modalColorPicker) modalColorPicker.value = currentStyle.color || '#173336';
  if (modalColorHex) modalColorHex.value = currentStyle.color || '';

  activeAlign = currentStyle.textAlign || '';
  modalAlignButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.align === activeAlign);
  });

  isBold = currentStyle.fontWeight === '700' || currentStyle.fontWeight === 'bold';
  isItalic = currentStyle.fontStyle === 'italic';
  isUnderline = currentStyle.textDecoration === 'underline';

  modalBtnBold?.classList.toggle('active', isBold);
  modalBtnItalic?.classList.toggle('active', isItalic);
  modalBtnUnderline?.classList.toggle('active', isUnderline);

  if (modal) modal.style.display = 'flex';
}

function closeTextStyleModal() {
  if (modal) modal.style.display = 'none';
  activeFieldKey = null;
}

modalColorPicker?.addEventListener('input', () => {
  if (modalColorHex) modalColorHex.value = modalColorPicker.value;
});
modalColorHex?.addEventListener('input', () => {
  if (modalColorPicker && /^#[0-9A-F]{6}$/i.test(modalColorHex.value)) {
    modalColorPicker.value = modalColorHex.value;
  }
});

modalAlignButtons.forEach((btn) => {
  btn.onclick = () => {
    if (activeAlign === btn.dataset.align) {
      activeAlign = '';
      btn.classList.remove('active');
    } else {
      activeAlign = btn.dataset.align;
      modalAlignButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    }
  };
});

modalBtnBold?.addEventListener('click', () => {
  isBold = !isBold;
  modalBtnBold.classList.toggle('active', isBold);
});

modalBtnItalic?.addEventListener('click', () => {
  isItalic = !isItalic;
  modalBtnItalic.classList.toggle('active', isItalic);
});

modalBtnUnderline?.addEventListener('click', () => {
  isUnderline = !isUnderline;
  modalBtnUnderline.classList.toggle('active', isUnderline);
});

document.querySelector('#modal-close-btn')?.addEventListener('click', closeTextStyleModal);

document.querySelector('#modal-save-field-btn')?.addEventListener('click', () => {
  if (!activeFieldKey) return;
  settings.textStyles = settings.textStyles || {};

  const styleObj = {};
  if (modalFontFamily?.value) styleObj.fontFamily = modalFontFamily.value;
  if (modalFontSize?.value) styleObj.fontSize = `${modalFontSize.value}px`;
  if (modalColorHex?.value) styleObj.color = modalColorHex.value;
  if (activeAlign) styleObj.textAlign = activeAlign;
  if (isBold) styleObj.fontWeight = '700';
  if (isItalic) styleObj.fontStyle = 'italic';
  if (isUnderline) styleObj.textDecoration = 'underline';

  if (Object.keys(styleObj).length > 0) {
    settings.textStyles[activeFieldKey] = styleObj;
  } else {
    delete settings.textStyles[activeFieldKey];
  }

  persistLocal();
  refreshPreview();
  closeTextStyleModal();
});

document.querySelector('#modal-reset-field-btn')?.addEventListener('click', () => {
  if (!activeFieldKey) return;
  if (settings.textStyles) delete settings.textStyles[activeFieldKey];
  persistLocal();
  refreshPreview();
  closeTextStyleModal();
});

document.querySelectorAll('[data-content],[data-theme]').forEach((field) => {
  field.addEventListener('input', () => {
    readFields();
    persistLocal();
    saveState.textContent = 'Đang chỉnh sửa';
    saveState.classList.add('unsaved');
    if (field.type === 'range') {
      const output = document.querySelector(`[data-output="${field.dataset.theme}"]`);
      if (output) output.textContent = `${field.value}px`;
    }
    if (preview?.contentWindow) preview.contentWindow.location.reload();
  });
});

document.querySelector('#save-only-button')?.addEventListener('click', saveOnly);
document.querySelector('#save-button')?.addEventListener('click', saveAndTranslate);
document.querySelector('#translate-button')?.addEventListener('click', () => translateContent({ saveAfter: true }));

document.querySelector('#reset-button')?.addEventListener('click', () => {
  settings = structuredClone(defaults);
  persistLocal();
  fillFields();
  applyCustomFonts();
  renderFontTags();
  refreshPreview();
});

document.querySelectorAll('[data-device]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-device]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    if (preview) preview.className = button.dataset.device === 'desktop' ? '' : button.dataset.device;
    const label = document.querySelector('#preview-label');
    if (label) label.textContent = button.textContent;
  });
});

loadSharedSettings();
