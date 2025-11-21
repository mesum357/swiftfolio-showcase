import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const { toggleTheme } = useTheme();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-foreground mb-1">Portfolio</h3>
            <p className="text-sm text-muted-foreground">
              Crafting digital experiences with passion
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary"
                onClick={() => window.open(social.href, '_blank')}
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Button>
            ))}
          </div>

          {/* Theme Toggle (duplicate for footer) */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="border-border hover:bg-muted rounded-full"
          >
            Toggle Theme
          </Button>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Made with
            <Heart className="h-4 w-4 text-primary fill-primary" />
            by John Developer
          </p>
        </div>
      </div>
    </footer>
  );
}
