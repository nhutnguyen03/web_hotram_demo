export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return response.status(500).json({ success: false, message: 'Contact service is not configured.' });
  }

  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {};
    const requiredFields = ['name', 'phone', 'email', 'message'];
    if (requiredFields.some((field) => !String(body[field] || '').trim())) return response.status(400).json({ success: false, message: 'Please complete all required fields.' });
    const web3FormsResponse = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ access_key: accessKey, subject: body.subject || 'Đăng ký tư vấn Hồ Tràm Santorini', from_name: 'Website Hồ Tràm Santorini', name: String(body.name).trim(), phone: String(body.phone).trim(), email: String(body.email).trim(), message: String(body.message).trim() }) });
    const result = await web3FormsResponse.json();
    return response.status(web3FormsResponse.ok && result.success ? 200 : 502).json({ success: Boolean(result.success), message: result.message || 'Web3Forms rejected the request.' });
  } catch {
    return response.status(502).json({ success: false, message: 'Không thể kết nối Web3Forms. Kiểm tra access key và domain được phép.' });
  }
}