import { useScrollReveal } from '@/hooks/useScrollReveal';
import yriImage from '@/assets/clients/yri.jpg';
import logoImage from '@/assets/clients/logo.png';
import navttcImage from '@/assets/clients/navttc.png';
import psebImage from '@/assets/clients/pseb.jpg';
import vfoImage from '@/assets/clients/vfo.png';
import scoImage from '@/assets/clients/sco.jpg';
import gbgovImage from '@/assets/clients/gbgov-coa.png';
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

const rowOne = clients.slice(0, 5);
const rowTwo = clients.slice(5);

function MarqueeRow({
  items,
  direction,
}: {
  items: typeof clients;
  direction: 'ltr' | 'rtl';
}) {
  const track = [...items, ...items, ...items];

  return (
    <div className="partners-marquee" data-direction={direction}>
      <div className="partners-marquee-track">
        {track.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="partners-marquee-item"
            aria-hidden={index >= items.length}
          >
            <img
              src={client.logo}
              alt={index < items.length ? `${client.name} — client of Mesum Abbas` : ''}
              className="partners-logo"
              loading="lazy"
              decoding="async"
              width={110}
              height={40}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="clients"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad section-rule transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-3">Trusted partners</p>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Organizations across Gilgit Baltistan
          </h2>
        </div>
        <p className="max-w-xs text-sm text-[color:var(--color-fg-light)]">
          Selected collaborators and institutions Mesum Abbas has supported with digital work.
        </p>
      </div>

      <div className="partners-bleed" aria-label="Partner organizations">
        <div className="partners-panel">
          <MarqueeRow items={rowOne} direction="ltr" />
          <MarqueeRow items={rowTwo.length ? rowTwo : rowOne} direction="rtl" />
        </div>
      </div>
    </section>
  );
}
