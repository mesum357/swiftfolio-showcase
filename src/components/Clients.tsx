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
      className={`relative overflow-hidden border-y border-border py-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 map-dots opacity-30" aria-hidden="true" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <p className="eyebrow mb-10 justify-center">Trusted Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {clients.map((client) => (
            <img
              key={client.name}
              src={client.logo}
              alt={`${client.name} — client of Mesum Abbas`}
              className="h-10 w-auto max-w-[120px] object-contain opacity-50 grayscale transition-opacity hover:opacity-90 dark:brightness-150 dark:contrast-75"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
