import { useScrollReveal } from '@/hooks/useScrollReveal';
import LinkedInBadge from '@/components/LinkedInBadge';

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad section-rule transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="mb-12 grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-4">About Mesum Abbas</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Building from Gilgit, shipping for real operators
          </h2>
        </div>
        <p className="max-w-[46ch] font-sans text-[color:var(--color-fg)] lg:col-span-5">
          I'm Mesum Abbas, a full stack developer based in Gilgit, Gilgit Baltistan. I design and
          ship SaaS products, MVPs, and production web apps with React, Node.js, and cloud — for
          teams in Pakistan and remote. If you need a{' '}
          <a className="hero-highlight" href="/web-developer-gilgit">
            web developer in Gilgit
          </a>{' '}
          or a{' '}
          <a className="hero-highlight" href="/full-stack-developer-gilgit">
            full stack developer in Gilgit
          </a>
          , those pages explain the work.
        </p>
      </div>

      <blockquote className="max-w-[52ch] border-l-2 border-[color:var(--color-fg-bold)] pl-6 font-display text-2xl font-semibold leading-snug text-[color:var(--color-fg-bold)] sm:text-3xl">
        Every project is built with performance, clarity, and long-term growth in mind —
        whether it's a startup MVP or a full SaaS platform for teams in Gilgit and across
        Pakistan.
      </blockquote>

      <div className="mt-16">
        <LinkedInBadge />
      </div>
    </section>
  );
}
