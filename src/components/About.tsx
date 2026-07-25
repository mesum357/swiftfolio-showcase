import { Quote } from 'lucide-react';
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
      className={`py-28 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="eyebrow mb-6">About the Founder</p>

        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:col-span-7 lg:text-6xl">
            Developer Driven by Purpose and Precision
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-5">
            I'm Mesum Abbas, a Full Stack Developer in Gilgit, Gilgit Baltistan, serving clients
            across Pakistan. I build SaaS products, MVPs, and scalable web apps with clarity and
            long-term growth in mind.
          </p>
        </div>

        <div className="mb-16 grid gap-5 md:grid-cols-2">
          <div className="media-frame aspect-[3/4] md:aspect-[4/5]">
            <img
              src={aboutImagePrimary}
              alt="Mesum Abbas — Full Stack Developer in Gilgit, Pakistan"
              className="h-full w-full object-cover"
              loading="lazy"
              width={640}
              height={800}
            />
          </div>
          <div className="media-frame aspect-[3/4] md:aspect-[4/5]">
            <img
              src={aboutImageSecondary}
              alt="Mesum Abbas working from Gilgit, Pakistan"
              className="h-full w-full object-cover"
              loading="lazy"
              width={768}
              height={1024}
            />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex items-start gap-4 lg:col-span-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Quote className="h-6 w-6" />
            </span>
          </div>
          <blockquote className="font-display text-2xl font-bold leading-snug text-foreground sm:text-3xl lg:col-span-7">
            Every project is built with performance, clarity, and long-term growth in mind —
            whether it's a startup MVP or a full SaaS platform for teams in Gilgit and across
            Pakistan.
          </blockquote>
        </div>

        <div className="mt-20">
          <LinkedInBadge />
        </div>
      </div>
    </section>
  );
}
