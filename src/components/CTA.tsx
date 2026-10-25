import { useScrollReveal } from '@/hooks/useScrollReveal';

const UPWORK_URL = 'https://www.upwork.com/freelancers/~01786c6c8ccb9f4d9c';

export default function CTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad section-rule transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <p className="eyebrow mb-4">Let's work together</p>
      <p className="mb-4">
        <a href={UPWORK_URL} target="_blank" rel="noopener noreferrer" className="hero-highlight">
          4.9 on Upwork
        </a>
      </p>
      <h2 className="max-w-[18ch] font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
        Ready to build your next digital product?
      </h2>
      <p className="mt-6 max-w-[46ch] text-[color:var(--color-fg)]">
        Have an idea or a brief? Hire Mesum Abbas — Full Stack &amp; Web Developer in Gilgit —
        for SaaS, MVP, and production web builds across Pakistan and remote.
      </p>
      <div className="hero-cta mt-8">
        <a href="#contact" className="button">
          Start a project
        </a>
      </div>
    </section>
  );
}
