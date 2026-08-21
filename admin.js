const settingsKey = 'hotram-site-settings';

const editableFields = [
  'heroKicker',
  'heroTitle',
  'heroSubtitle',
  'heroScript',
  'heroCopy',
  'aboutTitle',
  'aboutCopy',
  'buttonHeroPrimary',
  'buttonHeroBooking',
  'buttonAbout',
  'buttonAmenities',
  'buttonLocation',
  'buttonOffer',
  'buttonContact'
];

const defaults = {
  content: {
    heroKicker: 'Khu đô thị nghỉ dưỡng ven biển',
    heroTitle: 'Hồ Tràm',
    heroSubtitle: 'Santorini',
    heroScript: 'Chạm đến thiên đường nghỉ dưỡng',
    heroCopy: 'Dự án nghỉ dưỡng cao cấp tại Hồ Tràm – Vũng Tàu,\nnơi thiên nhiên hoang sơ hòa quyện cùng phong cách sống đẳng cấp.',
    aboutTitle: 'Hồ Tràm – viên ngọc\nmới của bờ biển phía Nam',
    aboutCopy: 'Hồ Tràm Santorini là tổ hợp nghỉ dưỡng – giải trí – đầu tư đẳng cấp, được quy hoạch bài bản với tầm nhìn trở thành điểm đến hàng đầu khu vực.',
    buttonHeroPrimary: 'Khám phá dự án',
    buttonHeroBooking: 'Booking tour',
    buttonAbout: 'Tìm hiểu thêm',
    buttonAmenities: 'Xem thêm tiện ích',
    buttonLocation: 'Xem bản đồ',
    buttonOffer: 'Đăng ký ngay',
    buttonContact: 'Gọi thông tin',
    imageHero: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=2200&q=90',
    imageAbout: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=85',
    imageHighlight1: 'https://images.unsplash.com/photo-1507525429940-1e3c0e1e7c67?auto=format&fit=crop&w=900&q=85',
    imageHighlight2: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=900&q=85',
    imageHighlight3: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=900&q=85',
    imageHighlight4: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',
    imageAmenity1: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85',
    imageAmenity2: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85',
    imageAmenity3: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85',
    imageAmenity4: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=85',
    imageNews1: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=85',
    imageNews2: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=85',
    imageNews3: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=800&q=85'
  },
  theme: {
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Manrope',
    ink: '#102f38',
    deep: '#082832',
    gold: '#c79d5a',
    imageRadius: 6,
    buttonRadius: 6
  }
};

let settings = loadSettings();

const preview = document.querySelector('#site-preview');
const saveState = document.querySelector('#save-state');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function hasTranslations() {
  return Boolean(
    settings.translations &&
    Object.values(settings.translations).some(
      (language) => language && typeof language === 'object' && Object.keys(language).length
    )
  );
}

function ensureTranslationSource() {
  settings.translationSource = settings.translationSource || {};

  // Existing projects did not have translationSource.
  // If translations already exist, the current content is the last known
  // source for fields that are not tracked yet.
  if (hasTranslations()) {
    editableFields.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(settings.translationSource, field)) {
        settings.translationSource[field] = settings.content[field] ?? '';
      }
    });
  }
}

function getChangedTextFields() {
  ensureTranslationSource();

  // No translation cache yet: the first translation must translate all
  // editable text fields.
  if (!hasTranslations()) {
    return editableFields.filter((field) => String(settings.content[field] ?? '').trim() !== '');
  }

  return editableFields.filter((field) => {
    const current = String(settings.content[field] ?? '');
    const previous = String(settings.translationSource[field] ?? '');
    return current !== previous && current.trim() !== '';
  });
}

async function loadSharedSettings() {
  try {
    const response = await fetch('/api/settings', {
      headers: { Accept: 'application/json' }
    });

    const result = await response.json();

    if (response.ok && result.success && result.settings) {
      settings = {
        ...settings,
        ...result.settings,
        content: {
          ...settings.content,
          ...result.settings.content
        },
        theme: {
          ...settings.theme,
          ...result.settings.theme
        }
      };

      ensureTranslationSource();
      localStorage.setItem(settingsKey, JSON.stringify(settings));
    }
  } catch {
    // Keep local settings available when developing with a static server.
  }

  fillFields();
}

async function saveSharedSettings() {
  const token =
    window.localStorage.getItem('hotram-admin-token') ||
    window.prompt('Nhập Admin Editor Token');

  if (token) {
    window.localStorage.setItem('hotram-admin-token', token);
  }

  const response = await fetch('/api/settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-admin-token': token || ''
    },
    body: JSON.stringify({ settings })
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || 'Không thể đồng bộ settings lên server.'
    );
  }
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(settingsKey));

    if (!saved) {
      return clone(defaults);
    }

    if (saved.content?.imageHighlight1?.includes('1605281317010')) {
      saved.content.imageHighlight1 = defaults.content.imageHighlight1;
    }

    return {
      ...defaults,
      ...saved,
      content: {
        ...defaults.content,
        ...saved.content
      },
      theme: {
        ...defaults.theme,
        ...saved.theme
      }
    };
  } catch {
    return clone(defaults);
  }
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
    settings.theme[field.dataset.theme] =
      field.type === 'range' ? Number(field.value) : field.value;
  });
}

function saveLocalAndRefreshPreview() {
  readFields();
  localStorage.setItem(settingsKey, JSON.stringify(settings));
  preview.contentWindow.location.reload();
}

document
  .querySelectorAll('[data-content],[data-theme]')
  .forEach((field) => {
    field.addEventListener('input', () => {
      readFields();
      localStorage.setItem(settingsKey, JSON.stringify(settings));

      saveState.textContent = 'Đang chỉnh sửa';
      saveState.classList.add('unsaved');

      if (field.type === 'range') {
        document.querySelector(
          `[data-output="${field.dataset.theme}"]`
        ).textContent = `${field.value}px`;
      }

      preview.contentWindow.location.reload();
    });
  });

async function translateContent({ changedFields = null } = {}) {
  const status = document.querySelector('#translation-status');
  const button = document.querySelector('#translate-button');

  readFields();

  const fieldsToTranslate = changedFields || getChangedTextFields();

  if (!fieldsToTranslate.length) {
    status.textContent =
      'Không có nội dung chữ mới thay đổi. Không gọi DeepL.';
    status.className = 'translation-status success';
    return false;
  }

  button.disabled = true;
  button.textContent = 'Đang dịch...';
  status.textContent = 'Đang dịch nội dung đã thay đổi...';
  status.className = 'translation-status';

  try {
    const content = Object.fromEntries(
      fieldsToTranslate.map((field) => [
        field,
        settings.content[field] ?? ''
      ])
    );

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        content,
        fields: fieldsToTranslate
      })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || 'Không thể dịch nội dung.'
      );
    }

    settings.translations = {
      ...(settings.translations || {})
    };

    Object.entries(result.translations || {}).forEach(
      ([language, languageTranslations]) => {
        settings.translations[language] = {
          ...(settings.translations[language] || {}),
          ...languageTranslations
        };
      }
    );

    settings.translationSource = {
      ...(settings.translationSource || {})
    };

    fieldsToTranslate.forEach((field) => {
      settings.translationSource[field] =
        settings.content[field] ?? '';
    });

    localStorage.setItem(settingsKey, JSON.stringify(settings));
    preview.contentWindow.location.reload();

    status.textContent =
      `Đã dịch ${fieldsToTranslate.length} nội dung sang EN / DE / KO / 中文.`;
    status.className = 'translation-status success';

    return true;
  } catch (error) {
    status.textContent = error.message;
    status.className = 'translation-status error';
    return false;
  } finally {
    button.disabled = false;
    button.textContent = 'Dịch nội dung đã thay đổi';
  }
}

async function saveOnly() {
  const button = document.querySelector('#save-only-button');

  readFields();
  localStorage.setItem(settingsKey, JSON.stringify(settings));

  button.disabled = true;
  button.textContent = 'Đang lưu...';

  try {
    await saveSharedSettings();

    preview.contentWindow.location.reload();

    saveState.textContent = 'Đã lưu thay đổi — không gọi DeepL';
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
  const saveButton = document.querySelector('#save-button');
  const status = document.querySelector('#translation-status');

  readFields();

  const fieldsToTranslate = getChangedTextFields();

  saveButton.disabled = true;
  saveButton.textContent = fieldsToTranslate.length
    ? 'Đang lưu & dịch...'
    : 'Đang lưu...';

  try {
    if (fieldsToTranslate.length) {
      const translated = await translateContent({
        changedFields: fieldsToTranslate
      });

      if (!translated) {
        throw new Error(
          'Dịch nội dung không thành công. Thay đổi chưa được đồng bộ.'
        );
      }
    } else {
      status.textContent =
        'Không có text thay đổi nên không gọi DeepL.';
      status.className = 'translation-status success';
    }

    await saveSharedSettings();

    localStorage.setItem(settingsKey, JSON.stringify(settings));
    preview.contentWindow.location.reload();

    saveState.textContent = fieldsToTranslate.length
      ? `Đã lưu & dịch ${fieldsToTranslate.length} nội dung`
      : 'Đã lưu thay đổi — không gọi DeepL';

    saveState.classList.remove('unsaved');
  } catch (error) {
    saveState.textContent = error.message;
    saveState.classList.add('unsaved');
  } finally {
    saveButton.disabled = false;
    saveButton.textContent = 'Lưu & dịch tự động';
  }
}

document
  .querySelector('#save-only-button')
  .addEventListener('click', saveOnly);

document
  .querySelector('#save-button')
  .addEventListener('click', saveAndTranslate);

document
  .querySelector('#translate-button')
  .addEventListener('click', () => translateContent());

document
  .querySelector('#reset-button')
  .addEventListener('click', () => {
    settings = clone(defaults);
    localStorage.setItem(settingsKey, JSON.stringify(settings));
    fillFields();
    saveLocalAndRefreshPreview();
  });

document.querySelectorAll('[data-device]').forEach((button) => {
  button.addEventListener('click', () => {
    document
      .querySelectorAll('[data-device]')
      .forEach((item) => item.classList.remove('active'));

    button.classList.add('active');

    preview.className =
      button.dataset.device === 'desktop'
        ? ''
        : button.dataset.device;

    document.querySelector('#preview-label').textContent =
      button.textContent;
  });
});

loadSharedSettings();
