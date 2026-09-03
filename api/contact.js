export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {};
    const requiredFields = ['name', 'phone', 'email', 'message'];
    if (requiredFields.some((field) => !String(body[field] || '').trim())) return response.status(400).json({ success: false, message: 'Please complete all required fields.' });

    const contact = {
      name: String(body.name).trim(),
      phone: String(body.phone).trim(),
      email: String(body.email).trim(),
      message: String(body.message).trim(),
      subject: body.subject || 'Đăng ký tư vấn Hồ Tràm Santorini',
      from_name: body.from_name || 'Website Hồ Tràm Santorini'
    };
    const googleScriptUrl = String(process.env.GOOGLE_APPS_SCRIPT_URL || '').trim();
    const googleScriptToken = String(process.env.GOOGLE_APPS_SCRIPT_TOKEN || '').trim();

    if (googleScriptUrl) {
      const googleResponse = await fetch(googleScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ token: googleScriptToken, contact })
      });
      const responseText = await googleResponse.text();
      let result = {};
      try {
        result = JSON.parse(responseText);
      } catch {
        result = { message: responseText.slice(0, 240) };
      }
      return response.status(googleResponse.ok && result.success ? 200 : 502).json({
        success: Boolean(result.success),
        message: result.message || `Google Apps Script trả về HTTP ${googleResponse.status}. Kiểm tra URL /exec và quyền triển khai.`,
        providerStatus: googleResponse.status
      });
    }

    const accessKey = String(process.env.WEB3FORMS_ACCESS_KEY || '').trim();
    if (!accessKey) return response.status(503).json({ success: false, message: 'Chưa cấu hình Google Sheets hoặc WEB3FORMS trên Vercel.' });
    const web3FormsResponse = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ access_key: accessKey, ...contact }) });
    const result = await web3FormsResponse.json().catch(() => ({}));
    return response.status(web3FormsResponse.ok && result.success ? 200 : 502).json({ success: Boolean(result.success), message: result.message || 'Web3Forms từ chối request.', providerStatus: web3FormsResponse.status });
  } catch {
    return response.status(502).json({ success: false, message: 'Không thể kết nối dịch vụ nhận thông tin. Vui lòng thử lại sau.' });
  }
}