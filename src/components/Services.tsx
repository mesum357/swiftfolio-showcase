import {
  Layout,
  Stack,
  Database,
  Cloud,
  Sparkle,
  Gauge,
  type Icon,
} from '@phosphor-icons/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import services from '@/data/services';

const iconMap: Record<string, Icon> = {
  Layout,
  Layers: Stack,
  Database,
  Cloud,
  Sparkles: Sparkle,
  Gauge,
};

export default function Services() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad section-rule transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-4">Services</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            What I build for founders and teams
          </h2>
        </div>
        <p className="max-w-[46ch] text-[color:var(--color-fg)] lg:col-span-5 lg:col-start-8">
          SaaS, MVPs, and production web apps — from first architecture to launch. Based in
          Gilgit, working across Pakistan and remotely. Full catalogue on the{' '}
          <a className="hero-highlight" href="/services">
            services
          </a>{' '}
          page.
        </p>
      </div>

      <div className="hairline-list">
        {services.map((service) => {
          const Icon = iconMap[service.icon] ?? Layout;
          return (
            <article key={service.title} className="hairline-item grid gap-6 py-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <Icon weight="regular" className="mb-4 h-5 w-5 text-[color:var(--color-accent)]" />
                <h3 className="font-display text-xl font-bold">{service.title}</h3>
                <p className="mt-3 max-w-[46ch] text-[color:var(--color-fg)]">{service.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <li key={f} className="tag">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="media-frame aspect-[16/10] md:col-span-5">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={450}
                />
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-10 max-w-[46ch] text-[color:var(--color-fg)]">
        Local hire pages:{' '}
        <a className="hero-highlight" href="/web-developer-gilgit">
          web developer in Gilgit
        </a>
        {' · '}
        <a className="hero-highlight" href="/full-stack-developer-gilgit">
          full stack developer in Gilgit
        </a>
        {' · '}
        <a className="hero-highlight" href="/services">
          all services
        </a>
      </p>
    </section>
  );
}
