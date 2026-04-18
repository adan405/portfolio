import nodemailer from 'nodemailer';

// —— Mail settings (edit here) ——
// Gmail will NOT send mail until SMTP_PASS is set. Steps:
// 1) Google Account → Security → enable 2-Step Verification
// 2) Security → App passwords → create "Mail" / "Other" → copy the 16-character password
// 3) Paste it below (no spaces). Restart the server after saving.
const CONTACT_TO_EMAIL = 'adanbhatti6677@gmail.com';

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 587;
/** Use `true` only if you use port 465 */
const SMTP_SECURE = false;
const SMTP_USER = 'adanbhatti6677@gmail.com';
/** Paste your 16-character Gmail App Password here */
const SMTP_PASS = 'sjeo iivv exed wcxd';

const SMTP_FROM = `"Portfolio contact" <${SMTP_USER}>`;

// —— ——

/** Returns false when SMTP_PASS is still empty — that is why you see "Email is not configured". */
export function isContactEmailConfigured(): boolean {
  return SMTP_PASS.trim().length > 0;
}

function getSmtpAuth(): { host: string; port: number; secure: boolean; user: string; pass: string } | null {
  if (!isContactEmailConfigured()) return null;
  return {
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    user: SMTP_USER,
    pass: SMTP_PASS,
  };
}

export function formatContactEmailBody(input: { name: string; email: string; message: string }): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `Portfolio contact: ${input.name}`;
  const text = [
    `You received a message from your portfolio contact form.`,
    ``,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    ``,
    `Message:`,
    input.message,
  ].join('\n');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #1e293b;">
  <p>You received a message from your <strong>portfolio contact form</strong>.</p>
  <p><strong>Name:</strong> ${escapeHtml(input.name)}<br>
  <strong>Email:</strong> <a href="mailto:${escapeHtml(input.email)}">${escapeHtml(input.email)}</a></p>
  <p><strong>Message:</strong></p>
  <blockquote style="margin: 0; padding: 12px 16px; border-left: 4px solid #6366f1; background: #f8fafc;">
    ${escapeHtml(input.message).replace(/\n/g, '<br>')}
  </blockquote>
</body>
</html>`.trim();

  return { subject, text, html };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Sends the contact form submission to CONTACT_TO_EMAIL via SMTP. */
export async function sendContactEmail(payload: { name: string; email: string; message: string }): Promise<void> {
  const smtp = getSmtpAuth();
  if (!smtp) {
    throw new Error('SMTP not configured');
  }

  const { subject, text, html } = formatContactEmailBody(payload);

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  try {
    await transporter.verify();
  } catch (e) {
    console.error('SMTP verify failed (wrong password or Gmail settings):', e);
    throw new Error('SMTP authentication failed');
  }

  await transporter.sendMail({
    from: SMTP_FROM,
    to: CONTACT_TO_EMAIL,
    replyTo: payload.email,
    subject,
    text,
    html,
  });
}
