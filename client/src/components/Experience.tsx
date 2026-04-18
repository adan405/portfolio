const roles = [
  {
    title: 'Software Engineer',
    company: 'Hawklogix',
    period: 'Jan 2026 — Present',
    location: 'Lahore, Pakistan',
    summary:
      'Building and maintaining software solutions as part of an agile team; contributing to features, quality, and delivery.',
  },
  {
    title: 'Software Engineer',
    company: 'Ameror Tech',
    period: 'Jul 2024 — Jan 2026',
    location: 'Lahore, Pakistan',
    summary:
      'Developed web applications end-to-end: implementation, integration, and collaboration with stakeholders to ship on schedule.',
  },
] as const;

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <header className="section-header">
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I&apos;ve contributed</h2>
        </header>
        <div className="timeline">
          {roles.map((role) => (
            <article key={`${role.company}-${role.period}`} className="timeline-item card">
              <h3>
                {role.title} · {role.company}
              </h3>
              <p className="meta">
                {role.period} · {role.location}
              </p>
              <p>{role.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
