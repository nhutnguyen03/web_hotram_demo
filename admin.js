const settingsKey = 'hotram-site-settings';
const defaults = {
  content: { heroKicker: 'Khu đô thị nghỉ dưỡng ven biển', heroTitle: 'Hồ Tràm', heroSubtitle: 'Santorini', heroScript: 'Chạm đến thiên đường nghỉ dưỡng', heroCopy: 'Dự án nghỉ dưỡng cao cấp tại Hồ Tràm – Vũng Tàu,\nnơi thiên nhiên hoang sơ hòa quyện cùng phong cách sống đẳng cấp.', aboutTitle: 'Hồ Tràm – viên ngọc\nmới của bờ biển phía Nam', aboutCopy: 'Hồ Tràm Santorini là tổ hợp nghỉ dưỡng – giải trí – đầu tư đẳng cấp, được quy hoạch bài bản với tầm nhìn trở thành điểm đến hàng đầu khu vực.', buttonHeroPrimary: 'Khám phá dự án', buttonHeroBooking: 'Booking tour', buttonAbout: 'Tìm hiểu thêm', buttonAmenities: 'Xem thêm tiện ích', buttonLocation: 'Xem bản đồ', buttonOffer: 'Đăng ký ngay', buttonContact: 'Gọi thông tin', imageHero: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=2200&q=90', imageAbout: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=85', imageHighlight1: 'https://images.unsplash.com/photo-1507525429940-1e3c0e1e7c67?auto=format&fit=crop&w=900&q=85', imageHighlight2: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=900&q=85', imageHighlight3: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=900&q=85', imageHighlight4: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85', imageAmenity1: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85', imageAmenity2: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85', imageAmenity3: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85', imageAmenity4: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=85', imageNews1: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=85', imageNews2: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=85', imageNews3: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=800&q=85' },
  theme: { headingFont: 'Cormorant Garamond', bodyFont: 'Manrope', ink: '#102f38', deep: '#082832', gold: '#c79d5a', imageRadius: 6, buttonRadius: 6 }
};
let settings = loadSettings();
const preview = document.querySelector('#site-preview');
const saveState = document.querySelector('#save-state');

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(settingsKey));
    if (!saved) return JSON.parse(JSON.stringify(defaults));
    if (saved.content?.imageHighlight1?.includes('1605281317010')) saved.content.imageHighlight1 = defaults.content.imageHighlight1;
    return { ...defaults, ...saved, content: { ...defaults.content, ...saved.content }, theme: { ...defaults.theme, ...saved.theme } };
  } catch { return JSON.parse(JSON.stringify(defaults)); }
}

function fillFields() {
  document.querySelectorAll('[data-content]').forEach((field) => { field.value = settings.content[field.dataset.content] ?? ''; });
  document.querySelectorAll('[data-theme]').forEach((field) => { field.value = settings.theme[field.dataset.theme] ?? ''; });
  document.querySelectorAll('[data-output]').forEach((output) => { output.textContent = `${settings.theme[output.dataset.output]}px`; });
}

function readFields() {
  document.querySelectorAll('[data-content]').forEach((field) => { settings.content[field.dataset.content] = field.value; });
  document.querySelectorAll('[data-theme]').forEach((field) => { settings.theme[field.dataset.theme] = field.type === 'range' ? Number(field.value) : field.value; });
}

function refreshPreview() {
  readFields();
  localStorage.setItem(settingsKey, JSON.stringify(settings));
  preview.contentWindow.location.reload();
  saveState.textContent = 'Đã lưu cục bộ';
  saveState.classList.remove('unsaved');
}

document.querySelectorAll('[data-content],[data-theme]').forEach((field) => {
  field.addEventListener('input', () => {
    readFields();
    localStorage.setItem(settingsKey, JSON.stringify(settings));
    saveState.textContent = 'Đang chỉnh sửa';
    saveState.classList.add('unsaved');
    if (field.type === 'range') document.querySelector(`[data-output="${field.dataset.theme}"]`).textContent = `${field.value}px`;
    preview.contentWindow.location.reload();
  });
});

async function translateContent() {
  const status = document.querySelector('#translation-status');
  const button = document.querySelector('#translate-button');
  readFields();
  button.disabled = true;
  button.textContent = 'Đang dịch...';
  status.textContent = '';
  try {
    const response = await fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ content: settings.content }) });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Không thể dịch nội dung.');
    settings.translations = { ...(settings.translations || {}), ...result.translations };
    localStorage.setItem(settingsKey, JSON.stringify(settings));
    preview.contentWindow.location.reload();
    status.textContent = 'Đã cập nhật bản dịch EN / DE / KO / 中文.';
    status.className = 'translation-status success';
  } catch (error) {
    status.textContent = error.message;
    status.className = 'translation-status error';
  } finally {
    button.disabled = false;
    button.textContent = 'Dịch sang EN / DE / KO / 中文';
  }
}

document.querySelector('#save-button').addEventListener('click', async () => {
  refreshPreview();
  await translateContent();
  preview.contentWindow.location.reload();
  saveState.textContent = 'Đã lưu và dịch';
  saveState.classList.remove('unsaved');
});
document.querySelector('#translate-button').addEventListener('click', translateContent);
document.querySelector('#reset-button').addEventListener('click', () => {
  settings = JSON.parse(JSON.stringify(defaults));
  localStorage.setItem(settingsKey, JSON.stringify(settings));
  fillFields();
  refreshPreview();
});

document.querySelectorAll('[data-device]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-device]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    preview.className = button.dataset.device === 'desktop' ? '' : button.dataset.device;
    document.querySelector('#preview-label').textContent = button.textContent;
  });
});

fillFields();