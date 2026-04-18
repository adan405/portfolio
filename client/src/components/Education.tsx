const items = [
  {
    title: 'BS Computer Science',
    period: '2020 — 2024',
    place: 'University of the Punjab',
    detail: 'Undergraduate degree focused on computing fundamentals, algorithms, and software development.',
  },
  {
    title: 'Intermediate (Computer Science)',
    period: '2018 — 2020',
    place: 'King College',
    detail: 'Foundation in mathematics and computer science before university.',
  },
] as const;

export function Education() {
  return (
    <section className="section" id="education" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container">
        <header className="section-header">
          <p className="section-label">Education</p>
          <h2 className="section-title">Academic background</h2>
        </header>
        <div className="card-grid two">
          {items.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p className="meta">
                {item.period} · {item.place}
              </p>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
