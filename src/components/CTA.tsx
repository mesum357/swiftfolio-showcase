import { ArrowRight, Star } from '@phosphor-icons/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import ctaBackground from '@/assets/img1.jpeg';

export default function CTA() {
  const { ref, isVisible } = useScrollReveal();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={ctaBackground}
          alt=""
          className="h-full w-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-background/85 dark:bg-background/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto section-pad">
        <div className="grid max-w-4xl gap-10">
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} weight="fill" className="h-5 w-5 text-primary" />
            ))}
            <span className="ml-2 font-display text-sm font-semibold text-foreground">
              4.9 · trusted by clients
            </span>
          </div>

          <div>
            <p className="eyebrow mb-5">Let's work together</p>
            <h2 className="font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
              Ready to build your next digital product?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Have an idea or a brief? Hire Mesum Abbas — Full Stack &amp; Web Developer in Gilgit —
              for SaaS, MVP, and production web builds across Pakistan and remote.
            </p>
          </div>

          <div>
            <Button size="lg" variant="solid" onClick={scrollToContact}>
              Start a project
              <ArrowRight weight="bold" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
