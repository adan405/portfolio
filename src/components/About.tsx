const highlights = [
  {
    title: '2+ years',
    subtitle: 'Professional experience',
    icon: '◆',
  },
  {
    title: 'Full-stack',
    subtitle: 'Web applications',
    icon: '◇',
  },
  {
    title: 'Lahore, PK',
    subtitle: 'Open to relocate',
    icon: '○',
  },
  {
    title: 'BS Computer Science',
    subtitle: 'University of the Punjab',
    icon: '▣',
  },
] as const;

const pillars = [
  {
    title: 'Product mindset',
    text: 'I translate requirements into incremental deliverables—clear scope, predictable timelines, and code that teammates can extend.',
  },
  {
    title: 'Quality & maintainability',
    text: 'Readable structure, sensible abstractions, and tests where they matter most so features do not become fragile over time.',
  },
  {
    title: 'Collaboration',
    text: 'Comfortable in agile rituals: standups, code review, pairing, and documenting decisions so knowledge stays with the team.',
  },
] as const;

export function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <header className="section-header">
          <p className="section-label">About</p>
          <h2 className="section-title">Software engineer focused on dependable delivery</h2>
        </header>

        <div className="about-hero-grid">
          <div className="about-intro-card">
            <p className="about-lead">
              I&apos;m <strong>Adan Saleem</strong>, a software engineer based in{' '}
              <strong>Lahore, Pakistan</strong>. I build and ship web systems end-to-end—from APIs and data layers to
              polished interfaces—while keeping production stability in mind.
            </p>
            <ul className="about-bullets" aria-label="Professional summary">
              <li>
                <span className="about-bullet-mark" aria-hidden="true" />
                Currently at <strong>Hawklogix</strong>; previously <strong>Ameror Tech</strong>, where I contributed
                across the stack in fast-moving product teams.
              </li>
              <li>
                <span className="about-bullet-mark" aria-hidden="true" />
                Motivated by collaborative teams, strong engineering culture, and problems that reward clarity and
                ownership.
              </li>
              <li>
                <span className="about-bullet-mark" aria-hidden="true" />
                Day to day: feature development, integrations, performance awareness, and pragmatic testing—not
                over-engineering for its own sake.
              </li>
            </ul>
          </div>
          <div className="about-stat-grid" role="list">
            {highlights.map((h) => (
              <div key={h.title} className="about-stat-card" role="listitem">
                <span className="about-stat-icon" aria-hidden="true">
                  {h.icon}
                </span>
                <p className="about-stat-title">{h.title}</p>
                <p className="about-stat-sub">{h.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-pillars">
          {pillars.map((p) => (
            <article key={p.title} className="about-pillar-card">
              <h3 className="about-pillar-title">{p.title}</h3>
              <p className="about-pillar-text">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
