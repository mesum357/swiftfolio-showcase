import { useScrollReveal } from '@/hooks/useScrollReveal';
import testimonials from '@/data/testimonials';

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();
  const [featured, ...rest] = testimonials;

  return (
    <section
      id="testimonials"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad section-rule transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="mb-10 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-4">Client feedback</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Feedback from Gilgit &amp; Pakistan projects
          </h2>
        </div>
        <p className="self-end text-sm text-[color:var(--color-fg-light)] lg:col-span-4 lg:col-start-9">
          Real outcomes from Magpie, GB Museum, E Dunia, and other builds — not placeholder praise.
        </p>
      </div>

      <figure className="border-t border-[color:var(--color-fg-bold)] pt-8">
        <blockquote className="max-w-[52ch] font-display text-2xl font-medium leading-snug md:text-3xl">
          "{featured.quote}"
        </blockquote>
        <figcaption className="mt-8">
          <span className="block font-display font-semibold">{featured.name}</span>
          <span className="meta-label mt-1">{featured.role}</span>
        </figcaption>
      </figure>

      <div className="mt-10 grid gap-0 border-t border-[color:var(--color-border)] md:grid-cols-2">
        {rest.map((t, i) => (
          <figure
            key={i}
            className={`py-8 ${i === 0 ? 'md:border-r md:border-[color:var(--color-border)] md:pr-8' : 'md:pl-8'}`}
          >
            <blockquote className="text-[color:var(--color-fg)]">"{t.quote}"</blockquote>
            <figcaption className="mt-6">
              <span className="block font-display font-semibold">{t.name}</span>
              <span className="meta-label mt-1">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
