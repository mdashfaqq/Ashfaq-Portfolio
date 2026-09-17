import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  const apiKey =
    process.env.RESEND_API_KEY ||
    process.env.resend ||
    process.env.RESEND;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server error: RESEND_API_KEY environment variable is not configured.' });
  }

  const resend = new Resend(apiKey);
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, email, message, subject } = body || {};

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    const fromAddress =
      process.env.RESEND_FROM_EMAIL ||
      process.env.FROM_EMAIL ||
      'Mohamed Ashfaq Portfolio <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: 'ash47306@gmail.com',
      replyTo: email,
      subject: subject || `Portfolio Inquiry from ${name || 'Visitor'}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #111; margin-top: 0; font-size: 20px; border-bottom: 2px solid #D62F27; padding-bottom: 8px;">New Message from Portfolio</h2>
          <div style="margin: 16px 0;">
            <p style="margin: 6px 0;"><strong>Name:</strong> ${name || 'Anonymous'}</p>
            <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #D62F27;">${email}</a></p>
            <p style="margin: 6px 0;"><strong>Subject:</strong> ${subject || 'Portfolio Inquiry'}</p>
          </div>
          <div style="margin-top: 20px; padding: 16px; background: #f7f7f8; border-radius: 8px; border-left: 4px solid #D62F27;">
            <p style="margin: 0; font-size: 14px; color: #333; white-space: pre-wrap;">${(message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0 16px 0;" />
          <p style="font-size: 12px; color: #888; margin: 0;">Sent via Resend from your portfolio website</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(400).json({ error: error.message || 'Failed to send email' });
    }

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error('Email sending error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
