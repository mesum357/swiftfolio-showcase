import { ArrowRight, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/img1.jpeg';

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      {/* Full-bleed supplied hero image — MaXel-style landscape crop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/55 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/55" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] flex-col justify-between px-4 sm:px-6 lg:px-8">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Left — stacked outline headline */}
          <div className="lg:col-span-6">
            <h1 className="font-display text-[clamp(3.5rem,10vw,7.5rem)] font-extrabold leading-[0.9] tracking-tight">
              <span className="block text-foreground">Build</span>
              <span className="block text-outline">Digital</span>
              <span className="block text-foreground">Futures</span>
            </h1>

            <div className="mt-10 flex max-w-xs items-start gap-3 border-l-2 border-primary pl-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Trusted by businesses to build reliable digital products that grow.
              </p>
            </div>
          </div>

          {/* Right — tagline + CTAs */}
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end lg:pb-8">
            <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Innovate. Develop. Succeed. Fast.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Transform your ideas into cutting-edge web solutions. Full Stack, SaaS &amp; MVP
              development for founders and teams in Gilgit, Pakistan, and beyond.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" variant="default" onClick={() => scrollToSection('contact')}>
                Get a Free Quote
              </Button>
              <Button size="lg" variant="mint" onClick={() => scrollToSection('services')}>
                Our Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="https://github.com/mesum357"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 text-primary">
                  <Github className="h-3.5 w-3.5" />
                </span>
                GitHub
              </a>
              <a
                href="https://pk.linkedin.com/in/mesumabbas357"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 text-primary">
                  <Linkedin className="h-3.5 w-3.5" />
                </span>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Founder caption under portrait */}
        <div className="relative z-10 mt-8 flex items-center justify-center gap-2.5 pb-4 lg:absolute lg:bottom-8 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <p className="font-display text-sm text-foreground">
            Mesum Abbas — Full Stack Developer
          </p>
        </div>
      </div>
    </section>
  );
}
