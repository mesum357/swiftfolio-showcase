import { ArrowRight, Star } from 'lucide-react';
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
      className={`relative overflow-hidden py-28 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={ctaBackground}
          alt=""
          className="h-full w-full object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-background/75 dark:bg-background/80" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Rating card */}
          <div className="rounded-[1.75rem] border border-border bg-card/90 p-8 backdrop-blur-sm lg:col-span-4">
            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="font-display text-[clamp(3.5rem,8vw,5rem)] font-bold leading-none">
              <span className="text-outline">4.9</span>
            </p>
            <p className="mt-3 font-display text-sm font-semibold text-foreground">
              Trusted Feedback From Real Clients
            </p>
          </div>

          <div className="text-center lg:col-span-5">
            <p className="eyebrow mb-4 justify-center">Let's Work Together</p>
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Ready to Build Your Next Digital Project
            </h2>
            <Button
              size="lg"
              variant="mint"
              onClick={scrollToContact}
              className="mt-8"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-3 lg:text-right">
            Have an idea or a project in mind? Let's turn your vision into a high-performing digital
            solution. Open to collaborations, startups, and long-term partnerships.
          </p>
        </div>
      </div>
    </section>
  );
}
