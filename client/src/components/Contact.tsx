import { type FormEvent, useState } from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';

const initial = { name: '', email: '', message: '' };

const LINKEDIN_URL = 'https://www.linkedin.com/in/adansaleem/';

type FormState = typeof initial;

type StatusState =
  | { type: 'idle'; text: '' }
  | { type: 'ok'; text: string }
  | { type: 'err'; text: string };

type ContactApiBody = { error?: string; fields?: string[] };

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<StatusState>({ type: 'idle', text: '' });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setStatus({ type: 'idle', text: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as ContactApiBody;
      if (!res.ok) {
        const msg =
          res.status === 400 && data.fields?.length
            ? `Please check: ${data.fields.join(', ')}.`
            : data.error || 'Could not send message. Try again later.';
        setStatus({ type: 'err', text: msg });
        return;
      }
      setStatus({ type: 'ok', text: 'Thanks — your message was sent successfully.' });
      setForm(initial);
    } catch {
      setStatus({
        type: 'err',
        text: 'Network error. Is the API running? Use npm run dev from the project root.',
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <header className="section-header">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let&apos;s talk</h2>
        </header>

        <div className="contact-layout">
          <div className="contact-aside">
            <p className="contact-aside-lead">
              Open to serious opportunities and collaborations. Prefer a quick message here, or reach me directly
              below.
            </p>

            <div className="contact-cards">
              <a className="contact-mini-card" href="tel:+923234881924">
                <span className="contact-mini-label">Phone</span>
                <span className="contact-mini-value">+92 323 4881924</span>
              </a>
              <a className="contact-mini-card" href="mailto:adanbhatti6677@gmail.com">
                <span className="contact-mini-label">Email</span>
                <span className="contact-mini-value">adanbhatti6677@gmail.com</span>
              </a>
              <div className="contact-mini-card contact-mini-card-static">
                <span className="contact-mini-label">Location</span>
                <span className="contact-mini-value">Lahore, Pakistan</span>
              </div>
            </div>

            <div className="contact-social-block">
              <p className="contact-social-label">Connect</p>
              <a
                className="contact-linkedin-btn"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Adan Saleem on LinkedIn"
              >
                <span className="contact-linkedin-icon-wrap">
                  <LinkedInIcon className="contact-linkedin-svg" />
                </span>
                <span className="contact-linkedin-text">
                  <span className="contact-linkedin-title">LinkedIn</span>
                  <span className="contact-linkedin-sub">Profile &amp; experience</span>
                </span>
                <span className="contact-linkedin-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>

          <form className="form contact-form-card" onSubmit={handleSubmit} noValidate>
            <h3 className="contact-form-heading">Send a message</h3>
            <label htmlFor="name">
              Name
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
              />
            </label>
            <label htmlFor="message">
              Message
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                required
              />
            </label>
            <button className="btn btn-primary contact-submit" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send message'}
            </button>
            {status.text ? (
              <p className={`form-status ${status.type === 'ok' ? 'ok' : 'err'}`} role="status">
                {status.text}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
