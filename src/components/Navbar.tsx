import { useEffect, useId, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
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

const MOBILE_NAV_MQ = '(max-width: 899px)';

function subscribeMobileNav(cb: () => void) {
  const mq = window.matchMedia(MOBILE_NAV_MQ);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

function getMobileNavSnapshot() {
  return window.matchMedia(MOBILE_NAV_MQ).matches;
}

function getMobileNavServerSnapshot() {
  return false;
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function NavLinkList({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="nav-links">
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} onClick={onNavigate}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonId = useId();
  const isMobile = useSyncExternalStore(
    subscribeMobileNav,
    getMobileNavSnapshot,
    getMobileNavServerSnapshot,
  );

  const drawerOpen = isMobile && menuOpen;

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  const closeMenu = () => setMenuOpen(false);

  const mobileDrawer =
    isMobile &&
    createPortal(
      <nav
        className={`primary-nav primary-nav--drawer ${drawerOpen ? 'primary-nav--drawer-open' : ''}`}
        id="site-navigation-mobile"
        aria-label="Primary"
        aria-hidden={!drawerOpen}
      >
        {drawerOpen ? (
          <button type="button" className="nav-scrim" tabIndex={-1} aria-hidden="true" onClick={closeMenu} />
        ) : null}
        <div className="primary-nav-panel">
          <NavLinkList onNavigate={closeMenu} />
        </div>
      </nav>,
      document.body,
    );

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#home" onClick={closeMenu}>
            Adan Saleem
          </a>

          <nav
            className="primary-nav primary-nav--desktop"
            id="site-navigation"
            aria-label="Primary"
            aria-hidden={isMobile ? true : undefined}
          >
            <NavLinkList onNavigate={closeMenu} />
          </nav>

          <div className="nav-toolbar">
            <ThemeToggle />
            <button
              id={menuButtonId}
              type="button"
              className="nav-burger"
              aria-expanded={drawerOpen}
              aria-controls="site-navigation-mobile"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {drawerOpen ? <IconClose className="nav-burger-icon" /> : <IconMenu className="nav-burger-icon" />}
            </button>
          </div>
        </div>
      </header>
      {mobileDrawer}
    </>
  );
}
