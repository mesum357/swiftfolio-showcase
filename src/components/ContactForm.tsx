import { EnvelopeSimple, MapPin, Clock, ArrowSquareOut } from '@phosphor-icons/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SITE, SITE_MAILTO } from '@/data/site';

const UPWORK_URL = SITE.upwork;

export default function ContactForm() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad section-rule transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">Get in touch</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Let's talk about your product
          </h2>
          <p className="mt-5 max-w-[46ch] text-[color:var(--color-fg)]">
            Freelance and remote work on SaaS, MVPs, and custom web apps. Based in Gilgit,
            available across Pakistan and internationally.
          </p>

          <address className="mt-10 space-y-0 not-italic">
            <a
              href={SITE_MAILTO}
              className="flex items-start gap-4 border-t border-[color:var(--color-border)] py-5"
            >
              <EnvelopeSimple weight="regular" className="mt-0.5 h-4 w-4 text-[color:var(--color-accent)]" />
              <span>
                <span className="meta-label">Email</span>
                <span className="mt-1 block">{SITE.email}</span>
              </span>
            </a>
            <div className="flex items-start gap-4 border-t border-[color:var(--color-border)] py-5">
              <MapPin weight="regular" className="mt-0.5 h-4 w-4 text-[color:var(--color-accent)]" />
              <span>
                <span className="meta-label">Location</span>
                <span className="mt-1 block">Gilgit, Gilgit Baltistan (GB), Pakistan</span>
              </span>
            </div>
            <div className="flex items-start gap-4 border-y border-[color:var(--color-border)] py-5">
              <Clock weight="regular" className="mt-0.5 h-4 w-4 text-[color:var(--color-accent)]" />
              <span>
                <span className="meta-label">Availability</span>
                <span className="mt-1 block">Open to freelance &amp; full-time</span>
              </span>
            </div>
          </address>
        </div>

        <div className="border border-[color:var(--color-border)] p-8 lg:col-span-7">
          <p className="eyebrow mb-4">Freelance</p>
          <h3 className="font-display text-2xl font-bold sm:text-3xl">
            Prefer to hire on Upwork?
          </h3>
          <p className="mt-4 max-w-md text-[color:var(--color-fg)]">
            Start a contract directly on Upwork for Full Stack, SaaS, and MVP development —
            or email if you want to talk first.
          </p>
          <div className="mt-8">
            <a href={UPWORK_URL} target="_blank" rel="noopener noreferrer" className="button">
              Hire me on Upwork
              <ArrowSquareOut weight="regular" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
