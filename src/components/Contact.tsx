import { type FormEvent, useState } from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { submitContactWeb3 } from '../utils/submitContactWeb3';
import { validateContact } from '../utils/validateContact';

const initial = { name: '', email: '', message: '' };

const LINKEDIN_URL = 'https://www.linkedin.com/in/adansaleem/';

type FormState = typeof initial;

type StatusState =
  | { type: 'idle'; text: '' }
  | { type: 'ok'; text: string }
  | { type: 'err'; text: string };

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<StatusState>({ type: 'idle', text: '' });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setStatus({ type: 'idle', text: '' });

    const parsed = validateContact(form);
    if (!parsed.ok) {
      setStatus({
        type: 'err',
        text: `Please check: ${parsed.fields.join(', ')}.`,
      });
      setSending(false);
      return;
    }

    try {
      await submitContactWeb3(parsed);
      setStatus({ type: 'ok', text: 'Thanks — your message was sent successfully.' });
      setForm(initial);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg === 'MISSING_WEB3FORMS_KEY') {
        setStatus({
          type: 'err',
          text:
            'Contact form is not configured: add VITE_WEB3FORMS_ACCESS_KEY in Vercel (Project → Settings → Environment Variables). Get a free key at web3forms.com',
        });
        return;
      }
      setStatus({
        type: 'err',
        text: msg || 'Could not send message. Try again later.',
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
