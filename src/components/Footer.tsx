import { Link } from 'react-router-dom';
import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react';
import hero780Jpg from '@/assets/optimized/hero-780.jpg';
import { SITE, SITE_MAILTO } from '@/data/site';

const socialLinks = [
  { icon: GithubLogo, href: SITE.github, label: 'GitHub' },
  { icon: LinkedinLogo, href: SITE.linkedin, label: 'LinkedIn' },
  { icon: EnvelopeSimple, href: SITE_MAILTO, label: 'Email' },
];

const quickLinks = [
  { href: '/#about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/web-developer-gilgit', label: 'Web developer in Gilgit' },
  { href: '/full-stack-developer-gilgit', label: 'Full stack in Gilgit' },
  { href: '/#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="site-footer-new">
      <div className="footer-content">
        <div className="footer-identity">
          <a href="/" className="footer-avatar" aria-label="Mesum Abbas — home">
            <img src={hero780Jpg} alt="" width={80} height={80} />
          </a>
          <div>
            <span className="footer-name">Mesum Abbas</span>
            <p className="footer-role">Full Stack Developer in Gilgit, Gilgit Baltistan, and Pakistan. SaaS developer and MVP developer building fast, scalable digital products.</p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} ·{' '}
              <Link to="/privacy">Privacy</Link>
              {' · '}
              Updated 12 Sep 2026
              {' · '}
              Full Stack · SaaS &amp; MVP · Gilgit Baltistan, Pakistan
            </p>
          </div>
        </div>

        <div className="footer-right">
          <nav className="footer-links" aria-labelledby="footer-links-heading">
            <span id="footer-links-heading" className="footer-links-label">
              Explore
            </span>
            <div className="footer-links-grid">
              {quickLinks.map((link) =>
                link.href.startsWith('/#') ? (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} to={link.href}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </nav>

          <div className="footer-social" aria-labelledby="footer-social-heading">
            <span id="footer-social-heading" className="footer-social-label">
              Connect
            </span>
            <div className="footer-icons">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                >
                  <social.icon weight="regular" className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
