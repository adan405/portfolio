import cors from 'cors';
import express from 'express';
import { isContactEmailConfigured, sendContactEmail } from './contactEmail.js';
import { validateContact } from './validateContact.js';

const PORT = 3001;
const CLIENT_ORIGIN = 'http://localhost:5173';

const app = express();

if (!isContactEmailConfigured()) {
  console.warn(
    '\n[contact] SMTP_PASS is empty in server/contactEmail.ts — the contact form will fail until you add your Gmail App Password.\n',
  );
}

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
  }),
);
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  const parsed = validateContact(req.body);
  if (!parsed.ok) {
    return res.status(400).json({ error: 'Invalid input', fields: parsed.fields });
  }

  try {
    await sendContactEmail({
      name: parsed.name,
      email: parsed.email,
      message: parsed.message,
    });
    return res.status(201).json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === 'SMTP not configured') {
      return res.status(503).json({
        error:
          'Mail is not set up: open server/contactEmail.ts and paste your Gmail App Password into SMTP_PASS (see comments in that file). Restart the API after saving.',
      });
    }
    if (msg === 'SMTP authentication failed') {
      return res.status(503).json({
        error:
          'Gmail rejected the login: check SMTP_PASS is a valid App Password and 2-Step Verification is on.',
      });
    }
    console.error('Contact email failed:', err);
    return res.status(503).json({ error: 'Could not send email. Try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
