const settingsUrl = () => `${process.env.SUPABASE_URL}/rest/v1/site_settings`;

function headers() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
}

function bodyOf(request) {
  return typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {};
}

export default async function handler(request, response) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return response.status(503).json({ success: false, message: 'Supabase settings chưa được cấu hình trên Vercel.' });
  }
  try {
    if (request.method === 'GET') {
      const result = await fetch(`${settingsUrl()}?id=eq.1&select=data`, { headers: headers() });
      if (!result.ok) return response.status(502).json({ success: false, message: 'Không thể đọc settings từ Supabase.' });
      const rows = await result.json();
      return response.status(200).json({ success: true, settings: rows[0]?.data || null });
    }
    if (request.method === 'PUT') {
      const editorToken = process.env.ADMIN_EDITOR_TOKEN;
      if (!editorToken) return response.status(503).json({ success: false, message: 'ADMIN_EDITOR_TOKEN chưa được cấu hình trên Vercel.' });
      if (request.headers['x-admin-token'] !== editorToken) return response.status(401).json({ success: false, message: 'Admin token không hợp lệ.' });
      const body = bodyOf(request);
      if (!body.settings || typeof body.settings !== 'object') return response.status(400).json({ success: false, message: 'Settings không hợp lệ.' });
      const result = await fetch(settingsUrl(), { method: 'POST', headers: { ...headers(), Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ id: 1, data: body.settings }) });
      if (!result.ok) return response.status(502).json({ success: false, message: 'Không thể lưu settings vào Supabase.' });
      return response.status(200).json({ success: true });
    }
    return response.status(405).json({ success: false, message: 'Method not allowed.' });
  } catch (error) {
    return response.status(500).json({ success: false, message: 'Settings API gặp lỗi máy chủ.' });
  }
}