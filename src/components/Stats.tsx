import { useScrollReveal } from '@/hooks/useScrollReveal';

const stats = [
  {
    label: 'Years of Professional Web Development Experience',
    value: '3',
    suffix: '+',
  },
  {
    label: 'Successful Websites & Digital Projects Delivered',
    value: '50',
    suffix: '+',
  },
  {
    label: 'Clients & Partners Across Gilgit & Pakistan',
    value: '30',
    suffix: '+',
  },
  {
    label: 'Long Term Client Trust and Satisfaction',
    value: '98',
    suffix: '%',
  },
];

export default function Stats() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`border-y border-border py-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-between gap-8 lg:px-8 ${
                index > 0 ? 'lg:border-l lg:border-border' : ''
              }`}
            >
              <p className="max-w-[14rem] font-display text-sm font-semibold leading-snug text-foreground">
                {stat.label}
              </p>
              <p className="font-display text-[clamp(4rem,8vw,6.5rem)] font-bold leading-none tracking-tight">
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
