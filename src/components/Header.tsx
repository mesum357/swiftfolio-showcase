import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '@/hooks/useTheme';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact', label: 'Contact' },
];

function isActive(href: string, pathname: string, hashId: string) {
  if (href.startsWith('/#')) return pathname === '/' && hashId === href.slice(2);
  if (href === '/services') {
    return (
      pathname === '/services' ||
      pathname === '/web-developer-gilgit' ||
      pathname === '/full-stack-developer-gilgit'
    );
  }
  return pathname === href;
}

function NavAnchor({
  href,
  label,
  className,
  onClick,
  current,
}: {
  href: string;
  label: string;
  className: string;
  onClick?: () => void;
  current: boolean;
}) {
  const props = {
    className,
    onClick,
    'aria-current': current ? ('page' as const) : undefined,
  };
  if (href.startsWith('/#')) {
    return (
      <a href={href} {...props}>
        {label}
      </a>
    );
  }
  return (
    <Link to={href} {...props}>
      {label}
    </Link>
  );
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hashId, setHashId] = useState('');

  useEffect(() => {
    const onHash = () => setHashId(window.location.hash.replace('#', ''));
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <Link to="/" className="site-logo" aria-label="Mesum Abbas — home">
          <span className="logo-text">MA</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <NavAnchor
              key={link.href}
              href={link.href}
              label={link.label}
              className={`nav-link${isActive(link.href, pathname, hashId) ? ' active' : ''}`}
              current={isActive(link.href, pathname, hashId)}
            />
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {theme === 'light' ? <Moon weight="regular" className="h-4 w-4" /> : <Sun weight="regular" className="h-4 w-4" />}
          </button>

          <div className="hamburger-container">
            <button
              type="button"
              className="hamburger-button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`hamburger-icon${isMobileMenuOpen ? ' hamburger-icon--open' : ''}`}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`slide-menu-overlay${isMobileMenuOpen ? ' slide-menu-overlay--open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!isMobileMenuOpen}
      />
      <div className={`slide-menu${isMobileMenuOpen ? ' slide-menu--open' : ''}`} role="dialog" aria-label="Menu">
        <button type="button" className="slide-menu-close" onClick={closeMenu} aria-label="Close menu">
          <span aria-hidden="true">×</span>
        </button>
        <ul className="m-0 list-none p-0">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-[color:var(--color-border)]">
              <NavAnchor
                href={link.href}
                label={link.label}
                className="nav-link block py-4"
                onClick={closeMenu}
                current={isActive(link.href, pathname, hashId)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
