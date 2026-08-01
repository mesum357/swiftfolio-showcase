import { Quotes } from '@phosphor-icons/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import testimonials from '@/data/testimonials';

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();
  const [featured, ...rest] = testimonials;

  return (
    <section
      id="testimonials"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto">
        <div className="mb-16 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5">Client feedback</p>
            <h2 className="font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl">
              Feedback from Gilgit &amp; Pakistan projects
            </h2>
          </div>
          <p className="self-end text-sm text-muted-foreground lg:col-span-4 lg:col-start-9">
            Real outcomes from Magpie, GB Museum, E Dunia, and other builds — not placeholder praise.
          </p>
        </div>

        {/* Featured quote — full bleed editorial */}
        <figure className="relative mb-8 overflow-hidden rounded-[2rem] border border-border/70 bg-card/50 p-8 md:p-12 lg:p-16">
          <Quotes
            weight="fill"
            className="absolute right-8 top-8 h-16 w-16 text-primary/20 md:h-24 md:w-24"
            aria-hidden="true"
          />
          <blockquote className="relative max-w-3xl font-display text-2xl font-medium leading-snug text-foreground md:text-3xl lg:text-4xl">
            "{featured.quote}"
          </blockquote>
          <figcaption className="relative mt-10">
            <span className="block font-display text-lg font-semibold text-foreground">
              {featured.name}
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">{featured.role}</span>
          </figcaption>
        </figure>

        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((t, i) => (
            <figure
              key={i}
              className={`rounded-[1.5rem] border border-border/60 bg-card/30 p-7 md:p-8 ${
                i === 0 ? 'md:translate-y-6' : ''
              }`}
            >
              <blockquote className="text-base leading-relaxed text-muted-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-border/50 pt-5">
                <span className="block font-display font-semibold text-foreground">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
