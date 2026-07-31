import {
  Layout,
  Layers,
  Database,
  Cloud,
  Sparkles,
  Gauge,
  type LucideIcon,
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import services from '@/data/services';
import servicesImagePrimary from '@/assets/img4.jpeg';
import servicesImageSecondary from '@/assets/img3.jpeg';

const iconMap: Record<string, LucideIcon> = {
  Layout,
  Layers,
  Database,
  Cloud,
  Sparkles,
  Gauge,
};

export default function Services() {
  const { ref, isVisible } = useScrollReveal();
  const leftServices = services.slice(0, 3);
  const rightServices = services.slice(3);

  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-28 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro band */}
        <div className="mb-20 grid gap-8 lg:grid-cols-12 lg:items-start">
          <p className="eyebrow lg:col-span-3">My Core Expertise</p>
          <p className="font-display text-2xl font-bold leading-snug text-foreground sm:text-3xl lg:col-span-9 lg:text-4xl">
            Looking for Web Developers in Gilgit or Full Stack Developers in Gilgit? I help
            businesses and founders turn ideas into functional, scalable digital products — every
            project built with performance, clarity, and long-term growth in mind.
          </p>
        </div>

        {/* Core services — MaXel split layout */}
        <div className="relative grid items-start gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            {leftServices.map((service) => {
              const Icon = iconMap[service.icon] ?? Layout;
              return (
                <div
                  key={service.title}
                  className="rounded-[1.75rem] border border-border bg-card/60 p-6 transition-colors hover:border-primary/40"
                >
                  <div className="mb-4 icon-box">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <p className="max-w-[14rem] text-center font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-outline xl:text-6xl">
              Core Services Offered
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="media-frame sticky top-28 aspect-[3/4]">
              <img
                src={servicesImagePrimary}
                alt="Mesum Abbas — Full Stack, SaaS and MVP developer"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Mobile outline heading */}
        <p className="mt-12 text-center font-display text-4xl font-extrabold leading-tight text-outline lg:hidden">
          Core Services Offered
        </p>

        {/* Remaining services + secondary image */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            {rightServices.map((service) => {
              const Icon = iconMap[service.icon] ?? Layout;
              return (
                <div
                  key={service.title}
                  className="rounded-[1.75rem] border border-border bg-card/60 p-6 transition-colors hover:border-primary/40"
                >
                  <div className="mb-4 icon-box">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="media-frame aspect-[16/10]">
              <img
                src={servicesImageSecondary}
                alt="Mesum Abbas building digital products from Gilgit"
                className="h-full w-full object-cover object-[center_38%]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
