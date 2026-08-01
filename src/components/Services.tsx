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
import servicesImagePrimary from '@/assets/img4.jpeg';
import servicesImageSecondary from '@/assets/img3.jpeg';

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
  const featured = services[0];
  const rest = services.slice(1);

  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto">
        <div className="mb-20 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Services</p>
            <h2 className="font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl">
              What Web Developers in Gilgit hire Mesum for
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7">
            Looking for Full Stack Developers in Gilgit or Web Developers in Gilgit Baltistan?
            Mesum Abbas helps businesses and founders turn ideas into functional, scalable digital
            products — SaaS, MVP, and production stacks.
          </p>
        </div>

        {/* Featured service — large editorial block */}
        <div className="mb-8 grid gap-6 overflow-hidden rounded-[2rem] border border-border/80 bg-card/40 lg:grid-cols-12">
          <div className="flex flex-col justify-between p-8 md:p-10 lg:col-span-5">
            <div>
              <span className="icon-box mb-6">
                {(() => {
                  const Icon = iconMap[featured.icon] ?? Stack;
                  return <Icon weight="duotone" className="h-5 w-5" />;
                })()}
              </span>
              <h3 className="font-display text-3xl font-bold text-foreground">{featured.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {featured.features.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[280px] lg:col-span-7">
            <img
              src={servicesImagePrimary}
              alt="Mesum Abbas — Full Stack, SaaS and MVP developer"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-card/90 lg:via-transparent" />
          </div>
        </div>

        {/* Staggered list — not equal 3-col cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Layout;
            const wide = i === 1 || i === 4;
            return (
              <article
                key={service.title}
                className={`group rounded-[1.5rem] border border-border/70 bg-card/30 p-7 transition-colors duration-300 hover:border-primary/35 hover:bg-card/60 ${
                  wide ? 'md:col-span-2 lg:grid lg:grid-cols-2 lg:gap-10' : ''
                }`}
              >
                <div>
                  <div className="mb-5 icon-box transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon weight="duotone" className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                {wide && (
                  <div className="mt-6 overflow-hidden rounded-2xl lg:mt-0">
                    <img
                      src={servicesImageSecondary}
                      alt=""
                      className="h-40 w-full object-cover object-[center_35%] opacity-80 lg:h-full"
                      loading="lazy"
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
