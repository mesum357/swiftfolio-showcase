import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/mesum357', label: 'GitHub' },
    { icon: Linkedin, href: 'https://pk.linkedin.com/in/mesumabbas357', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@mesumabbas.online', label: 'Email' },
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
    <footer className="border-t border-border bg-card/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2 max-w-md">
            <div className="mb-4 font-display text-2xl font-bold tracking-tight text-foreground">
              Mes
              <span className="relative inline-block">
                <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
                <span className="relative">u</span>
              </span>
              m
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Mesum Abbas — Full Stack Developer in Gilgit, Gilgit Baltistan, and Pakistan.
              SaaS developer and MVP developer building fast, scalable digital products.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="mint"
                  size="icon"
                  onClick={() => window.open(social.href, '_blank', 'noopener,noreferrer')}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigate
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Have a project?
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Let's build something great together.
            </p>
            <Button onClick={() => scrollToSection('contact')} variant="mint">
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
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
