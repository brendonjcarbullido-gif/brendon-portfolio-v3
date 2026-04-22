import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message, subject, website } = req.body || {};

  // Honeypot — bots fill invisible field
  if (website) return res.status(200).json({ ok: true });

  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });
  if (typeof message !== 'string' || message.length > 5000) return res.status(400).json({ error: 'Invalid message' });
  if (typeof name !== 'string' || name.length > 200) return res.status(400).json({ error: 'Invalid name' });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const subjectLine = subject
    ? `Portfolio contact: ${subject}`
    : `Portfolio contact from ${name}`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['brendonjcarbullido@gmail.com'],
      reply_to: email,
      subject: subjectLine,
      text: `From: ${name} <${email}>\nSubject: ${subject || '(none)'}\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}<p>${message.replace(/\n/g, '<br>')}</p>`,
    }),
  });

  if (!r.ok) {
    const err = await r.text();
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Email failed' });
  }

  return res.status(200).json({ ok: true });
}
