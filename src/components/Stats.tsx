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
      className={`section-pad section-rule transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Career statistics"
    >
      <span className="home-section-kicker">Readout</span>
      <div className="mt-6 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col justify-between gap-8 py-6 ${
              index > 0 ? 'lg:border-l lg:border-[color:var(--color-border)] lg:pl-8' : ''
            } ${index > 1 ? 'sm:border-t sm:border-[color:var(--color-border)] lg:border-t-0' : ''} ${
              index === 1 ? 'sm:pl-8' : ''
            }`}
          >
            <p className="meta-label max-w-[14rem] normal-case tracking-normal">
              {stat.label}
            </p>
            <p className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight">
              <span className="signal">{stat.value}</span>
              <span className="text-[color:var(--color-fg-light)]">{stat.suffix}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
