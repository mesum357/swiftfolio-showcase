import { Quote } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import testimonials from '@/data/testimonials';
import profileImage from '@/assets/mesum.jpg';

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();
  const featured = testimonials[0];

  return (
    <section
      id="testimonials"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative overflow-hidden py-28 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 map-dots opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-card/80 p-8 sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow mb-6">Client Feedback Highlights</p>
              <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                Client Feedback &amp; Experiences
              </h2>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[0, 1, 2].map((i) => (
                    <img
                      key={i}
                      src={profileImage}
                      alt=""
                      className="h-11 w-11 rounded-full border-2 border-card object-cover grayscale"
                      style={{ filter: `brightness(${0.7 + i * 0.15})` }}
                    />
                  ))}
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-card bg-secondary font-display text-lg font-bold text-primary">
                    +
                  </span>
                </div>
                <p className="font-display text-sm font-medium text-foreground">
                  30+ clients trust Mesum
                </p>
              </div>
            </div>

            <div className="relative">
              <blockquote className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                "{featured.quote}"
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={profileImage}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover grayscale"
                />
                <div>
                  <p className="font-display font-semibold text-foreground">{featured.name}</p>
                  <p className="text-sm text-muted-foreground">{featured.role}</p>
                </div>
              </div>
              <Quote
                className="absolute -bottom-2 right-0 h-16 w-16 text-primary/80"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Extra quotes grid */}
          <div className="mt-16 grid gap-6 border-t border-border pt-12 md:grid-cols-2">
            {testimonials.slice(1).map((t, i) => (
              <figure key={i} className="rounded-3xl border border-border bg-background/50 p-6">
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5">
                  <span className="block font-display font-semibold text-foreground">{t.name}</span>
                  <span className="text-xs text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
