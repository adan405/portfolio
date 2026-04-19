const RESUME_PATH = '/adan-saleem-resume.pdf';

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="dot" aria-hidden="true" />
            Software engineer · Full-stack
          </p>
          <h1>
            Hi, I&apos;m <span className="gradient-text">Adan Saleem</span>
          </h1>
          <p className="hero-lead hero-lead-wide">
            Software engineer with <strong>2 years</strong> of professional experience building reliable web
            applications. I focus on clean code, solid architecture, and shipping products that scale.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              Get in touch
            </a>
            <a className="btn btn-ghost" href={RESUME_PATH} download="Adan-Saleem-Resume.pdf">
              Download resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
