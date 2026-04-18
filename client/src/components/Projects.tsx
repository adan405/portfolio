type Project = {
  title: string;
  tagline: string;
  stack: string;
  url: string;
  image: string;
  imageAlt: string;
  highlights: readonly string[];
};

const projects: readonly Project[] = [
  {
    title: 'EHR360.ai',
    tagline: 'Enterprise EHR for modern hospitals and clinics',
    stack: 'React · Node.js · Express · WebSocket · PostgreSQL · Azure',
    url: 'https://emr.hawklogix.com/',
    image: '/projects/ehr360.png',
    imageAlt: 'EHR360.ai product screens across laptop, tablet, and phone',
    highlights: [
      'Led work on a large-scale, AI-enabled EHR—appointments, clinical records, prescriptions, billing, and a Super Admin control plane.',
      'Architected secure REST/WebSocket services for demanding medical workflows; PostgreSQL designed for integrity, performance, and operational reporting.',
      'Delivered responsive, role-based React experiences for clinicians, patients, and admins; deployed on Azure for scalability and resilient operations.',
    ],
  },
  {
    title: 'WeMove.ai',
    tagline: 'Smart marketplace to compare and book movers',
    stack: 'React · NestJS · PostgreSQL · AWS · TensorFlow',
    url: 'https://www.wemove.ai/',
    image: '/projects/wemove.png',
    imageAlt: 'WeMove.ai marketing site across laptop, tablet, and phone',
    highlights: [
      'Built an end-to-end platform for quotes, booking, and carrier workflows—optimized for clarity and speed on every device.',
      'Used TensorFlow for image-based room analysis and inventory signals; NestJS APIs for users, pricing logic, and integrations.',
      'JWT auth, strict validation, and PostgreSQL on the backend; AWS for storage, media, and cloud-native delivery.',
    ],
  },
];

export function Projects() {
  return (
    <section className="section projects-section" id="projects" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container">
        <header className="section-header">
          <p className="section-label">Projects</p>
          <h2 className="section-title">Selected work</h2>
          <p className="projects-intro">
            Production-grade products I&apos;ve helped architect and ship—full-stack, cloud-backed, and built for real
            users.
          </p>
        </header>

        <div className="projects-list">
          {projects.map((p) => (
            <article key={p.title} className="project-showcase">
              <div className="project-showcase-body">
                <h3 className="project-showcase-title">{p.title}</h3>
                <p className="project-showcase-tagline">{p.tagline}</p>
                <p className="project-showcase-stack">{p.stack}</p>
                <ul className="project-showcase-highlights">
                  {p.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <a className="btn btn-primary project-open-btn" href={p.url} target="_blank" rel="noopener noreferrer">
                  Open project
                </a>
              </div>
              <div className="project-showcase-media">
                <div className="project-showcase-frame">
                  <img src={p.image} alt={p.imageAlt} loading="lazy" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
