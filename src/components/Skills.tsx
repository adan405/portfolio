const technologies = [
  'TypeScript',
  'JavaScript',
  'React',
  'Node.js',
  'NestJS',
  'Express',
  'HTML & CSS',
  'REST APIs',
] as const;

const tools = [
  'AWS',
  'GCP',
  'Docker',
  'PostgreSQL',
  'MongoDB',
  'MySQL',
  'Git',
  'Software design',
] as const;

export function Skills() {
  return (
    <section className="section skills-section" id="skills" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container">
        <header className="section-header">
          <p className="section-label">Skills</p>
          <h2 className="section-title">Technologies & tools</h2>
          <p className="skills-intro">
            Languages and frameworks I ship with, plus the platforms and data stores I use to run software in production.
          </p>
        </header>

        <div className="skills-split">
          <div className="skills-panel skills-panel-tech">
            <div className="skills-panel-head">
              <span className="skills-panel-badge">Stack</span>
              <h3 className="skills-panel-title">Technologies</h3>
              <p className="skills-panel-desc">Core languages, runtimes, and application frameworks.</p>
            </div>
            <div className="skills-chip-grid" role="list">
              {technologies.map((s) => (
                <span key={s} className="skill-chip skill-chip-tech" role="listitem">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="skills-panel skills-panel-tools">
            <div className="skills-panel-head">
              <span className="skills-panel-badge skills-panel-badge-tools">Ops & data</span>
              <h3 className="skills-panel-title">Tools & platforms</h3>
              <p className="skills-panel-desc">Cloud, containers, databases, and workflow.</p>
            </div>
            <div className="skills-chip-grid" role="list">
              {tools.map((s) => (
                <span key={s} className="skill-chip skill-chip-tool" role="listitem">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
