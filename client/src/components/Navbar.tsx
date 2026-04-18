import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;

export function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="brand" href="#home">
          Adan Saleem
        </a>
        <div className="nav-right">
          <nav aria-label="Primary">
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
