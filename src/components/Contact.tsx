import { LinkedInIcon } from './icons/LinkedInIcon';

const EMAIL = 'adanbhatti6677@gmail.com';
const MAILTO = `mailto:${EMAIL}`;
const PHONE_DISPLAY = '+92 323 4881924';
const PHONE_TEL = '+923234881924';
const LINKEDIN_URL = 'https://www.linkedin.com/in/adansaleem/';

export function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <header className="section-header">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Get in touch</h2>
        </header>

        <p className="contact-aside-lead">
          Open to serious opportunities and collaborations. Reach me by phone, Gmail, or LinkedIn.
        </p>

        <div className="contact-connect">
          <a className="contact-mini-card" href={`tel:${PHONE_TEL}`}>
            <span className="contact-mini-label">Phone</span>
            <span className="contact-mini-value">{PHONE_DISPLAY}</span>
          </a>
          <a className="contact-mini-card" href={MAILTO}>
            <span className="contact-mini-label">Gmail</span>
            <span className="contact-mini-value">{EMAIL}</span>
          </a>
          <a
            className="contact-linkedin-btn contact-connect-linkedin"
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
    </section>
  );
}
