const editableFields = ['heroKicker', 'heroTitle', 'heroSubtitle', 'heroScript', 'heroCopy', 'aboutTitle', 'aboutCopy', 'buttonHeroPrimary', 'buttonHeroBooking', 'buttonAbout', 'buttonAmenities', 'buttonLocation', 'buttonOffer', 'buttonContact'];
const languageCodes = { en: 'EN', de: 'DE', ko: 'KO', zh: 'ZH' };

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ success: false, message: 'Method not allowed.' });
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) return response.status(503).json({ success: false, message: 'DEEPL_API_KEY chưa được cấu hình trên Vercel.' });

  const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {};
  const source = body.content || {};
  const sourceTexts = editableFields.map((field) => String(source[field] || ''));
  const endpoint = apiKey.endsWith(':fx') ? 'https://api-free.deepl.com/v2/translate' : 'https://api.deepl.com/v2/translate';
  const translations = {};

  for (const [language, targetLang] of Object.entries(languageCodes)) {
    const deeplResponse = await fetch(endpoint, { method: 'POST', headers: { Authorization: `DeepL-Auth-Key ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ text: sourceTexts, target_lang: targetLang, preserve_formatting: true }) });
    if (!deeplResponse.ok) return response.status(502).json({ success: false, message: `DeepL không dịch được ngôn ngữ ${language}.` });
    const result = await deeplResponse.json();
    translations[language] = Object.fromEntries(editableFields.map((field, index) => [field, result.translations[index]?.text || source[field] || '']));
  }
  return response.status(200).json({ success: true, translations });
}