import { useScrollReveal } from '@/hooks/useScrollReveal';

const stats = [
  {
    label: 'Years shipping production web apps',
    value: '3',
    suffix: '+',
  },
  {
    label: 'Websites & digital products delivered',
    value: '50',
    suffix: '+',
  },
  {
    label: 'Clients across Gilgit & Pakistan',
    value: '30',
    suffix: '+',
  },
  {
    label: 'Client satisfaction on retained work',
    value: '98',
    suffix: '%',
  },
];

export default function Stats() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative border-y border-border/60 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      aria-label="Career statistics"
    >
      <div className="container mx-auto py-16 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-between gap-10 lg:min-h-[11rem] lg:px-8 ${
                index > 0 ? 'lg:border-l lg:border-border/70' : ''
              }`}
            >
              <p className="max-w-[12rem] font-display text-sm font-medium leading-snug text-muted-foreground">
                {stat.label}
              </p>
              <p className="font-display text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-none tracking-tight">
                <span className="text-outline-muted">{stat.value}</span>
                <span className="text-primary">{stat.suffix}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
