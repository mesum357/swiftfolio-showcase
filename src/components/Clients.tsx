import { useScrollReveal } from '@/hooks/useScrollReveal';
import yriImage from '@/assets/clients/yri.jpg';
import logoImage from '@/assets/clients/logo.png';
import navttcImage from '@/assets/clients/navttc.png';
import psebImage from '@/assets/clients/pseb.jpg';
import vfoImage from '@/assets/clients/vfo.png';
import scoImage from '@/assets/clients/sco.jpg';
import gbgovImage from '@/assets/clients/gbgov.png';
import gbpoliceImage from '@/assets/clients/gbpolice.png';
import gbrspImage from '@/assets/clients/gbrsp.png';

const clients = [
  { name: 'YRI', logo: yriImage },
  { name: 'Logo', logo: logoImage },
  { name: 'NAVTTC', logo: navttcImage },
  { name: 'PSEB', logo: psebImage },
  { name: 'VFO', logo: vfoImage },
  { name: 'SCO', logo: scoImage },
  { name: 'GB Government', logo: gbgovImage },
  { name: 'GB Police', logo: gbpoliceImage },
  { name: 'GB RSP', logo: gbrspImage },
];

export default function Clients() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="clients"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative overflow-hidden border-y border-border/60 py-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container relative z-10 mx-auto">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Trusted partners</p>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Organizations across Gilgit Baltistan
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Selected collaborators and institutions Mesum Abbas has supported with digital work.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex h-28 items-center justify-center bg-background px-6 transition-colors hover:bg-card"
            >
              <img
                src={client.logo}
                alt={`${client.name} — client of Mesum Abbas`}
                className="h-10 w-auto max-w-[110px] object-contain opacity-55 grayscale transition-opacity hover:opacity-100 dark:brightness-150 dark:contrast-75"
                loading="lazy"
              />
            </div>
          ))}
          {/* Fill last cell on lg for visual balance when 9 items */}
          <div className="hidden h-28 items-center justify-center bg-background px-6 lg:flex">
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              + more
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
