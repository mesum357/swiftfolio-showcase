import { GithubLogo, LinkedinLogo, EnvelopeSimple, ArrowRight } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const socialLinks = [
    { icon: GithubLogo, href: 'https://github.com/mesum357', label: 'GitHub' },
    { icon: LinkedinLogo, href: 'https://pk.linkedin.com/in/mesumabbas357', label: 'LinkedIn' },
    { icon: EnvelopeSimple, href: 'mailto:hello@mesumabbas.online', label: 'Email' },
  ];

  const quickLinks = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Work' },
    { id: 'testimonials', label: 'Feedback' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="container mx-auto py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="max-w-md lg:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-display text-base font-bold text-primary">
                M
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-foreground">
                Mesum Abbas
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Full Stack Developer in Gilgit, Gilgit Baltistan, and Pakistan. SaaS developer and
              MVP developer building fast, scalable digital products.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(social.href, '_blank', 'noopener,noreferrer')}
                  aria-label={social.label}
                >
                  <social.icon weight="duotone" className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Navigate
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Have a project?
            </h3>
            <p className="mb-5 text-sm text-muted-foreground">
              Let's turn your brief into a high-performing product.
            </p>
            <Button onClick={() => scrollToSection('contact')} variant="solid">
              Start a project
              <ArrowRight weight="bold" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mesum Abbas. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Full Stack · SaaS &amp; MVP · Gilgit Baltistan, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
