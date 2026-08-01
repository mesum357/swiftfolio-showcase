import { Quotes } from '@phosphor-icons/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import LinkedInBadge from '@/components/LinkedInBadge';
import aboutImagePrimary from '@/assets/img3.jpeg';
import aboutImageSecondary from '@/assets/img4.jpeg';

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto">
        <div className="mb-16 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">About Mesum Abbas</p>
            <h2 className="font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl lg:text-[3.5rem]">
              Full Stack &amp; Web Developer in Gilgit — purpose, precision, production
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-5 lg:justify-self-end">
            I'm Mesum Abbas, a Full Stack Developer and Web Developer based in Gilgit, Gilgit
            Baltistan, serving founders and teams across Pakistan. I design and ship SaaS products,
            MVPs, and scalable web apps with clarity and long-term growth in mind.
          </p>
        </div>

        {/* Asymmetric media — not equal twin cards */}
        <div className="mb-20 grid items-end gap-6 md:grid-cols-12">
          <div className="media-bezel aspect-[3/4] md:col-span-7 md:aspect-[4/5]">
            <img
              src={aboutImagePrimary}
              alt="Mesum Abbas — Full Stack Developer in Gilgit, Pakistan"
              className="h-full w-full object-cover"
              loading="lazy"
              width={640}
              height={800}
            />
          </div>
          <div className="md:col-span-5">
            <div className="media-bezel aspect-[4/5] md:-translate-y-12">
              <img
                src={aboutImageSecondary}
                alt="Mesum Abbas working from Gilgit, Pakistan"
                className="h-full w-full object-cover"
                loading="lazy"
                width={768}
                height={1024}
              />
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground md:mt-2">
              From Gilgit Baltistan to remote teams worldwide — shipping products that feel
              intentional, not rushed.
            </p>
          </div>
        </div>

        <div className="glass-panel grid gap-10 rounded-[2rem] p-8 md:p-12 lg:grid-cols-12">
          <div className="flex items-start lg:col-span-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Quotes weight="fill" className="h-7 w-7" />
            </span>
          </div>
          <blockquote className="font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl lg:col-span-10">
            Every project is built with performance, clarity, and long-term growth in mind —
            whether it's a startup MVP or a full SaaS platform for teams in Gilgit and across
            Pakistan.
          </blockquote>
        </div>

        <div className="mt-16">
          <LinkedInBadge />
        </div>
      </div>
    </section>
  );
}
