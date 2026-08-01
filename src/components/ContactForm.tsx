import { EnvelopeSimple, MapPin, Clock, ArrowSquareOut } from '@phosphor-icons/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';

const UPWORK_URL = 'https://www.upwork.com/freelancers/~01786c6c8ccb9f4d9c';

export default function ContactForm() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Get in touch</p>
            <h2 className="font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl">
              Hire Mesum Abbas — Web &amp; Full Stack Developer in Gilgit
            </h2>
            <p className="mt-5 text-muted-foreground">
              Searching for Web Developers in Gilgit or Full Stack Developers in Pakistan? Reach
              out for freelance, SaaS builds, MVP launches, and remote collaboration.
            </p>

            <address className="mt-10 space-y-3 not-italic">
              <a
                href="mailto:hello@mesumabbas.online"
                className="glass-panel flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-primary/40"
              >
                <span className="icon-box">
                  <EnvelopeSimple weight="duotone" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-foreground">Email</span>
                  <span className="block text-sm text-muted-foreground">hello@mesumabbas.online</span>
                </span>
              </a>
              <div className="glass-panel flex items-center gap-4 rounded-2xl p-4">
                <span className="icon-box">
                  <MapPin weight="duotone" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-foreground">Location</span>
                  <span className="block text-sm text-muted-foreground">
                    Gilgit, Gilgit Baltistan (GB), Pakistan
                  </span>
                </span>
              </div>
              <div className="glass-panel flex items-center gap-4 rounded-2xl p-4">
                <span className="icon-box">
                  <Clock weight="duotone" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-foreground">Availability</span>
                  <span className="block text-sm text-muted-foreground">Open to freelance &amp; full-time</span>
                </span>
              </div>
            </address>
          </div>

          <div className="glass-panel flex flex-col justify-center rounded-[2rem] p-7 md:p-10 lg:col-span-7">
            <p className="eyebrow mb-4">Freelance</p>
            <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Prefer to hire on Upwork?
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Start a contract directly on Upwork for Full Stack, SaaS, and MVP development —
              or email if you want to talk first.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="solid" className="w-full sm:w-auto">
                <a href={UPWORK_URL} target="_blank" rel="noopener noreferrer">
                  Hire me on Upwork
                  <ArrowSquareOut weight="bold" className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
