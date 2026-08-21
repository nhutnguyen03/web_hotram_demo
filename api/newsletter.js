export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ success: false, message: 'Method not allowed.' });
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return response.status(503).json({ success: false, message: 'WEB3FORMS_ACCESS_KEY chưa được cấu hình.' });
  const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {};
  const email = String(body.email || '').trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) return response.status(400).json({ success: false, message: 'Email không hợp lệ.' });
  const web3Response = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ access_key: accessKey, subject: 'Đăng ký nhận bản tin Hồ Tràm Santorini', from_name: 'Website Hồ Tràm Santorini', email, message: `Đăng ký nhận bản tin: ${email}` }) });
  const result = await web3Response.json();
  return response.status(web3Response.ok ? 200 : 502).json(result);
}