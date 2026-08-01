import { ArrowRight, GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/img1.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden noise-overlay pt-28 pb-16 md:pt-32">
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand-first editorial column */}
          <div className="lg:col-span-7">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="eyebrow mb-6"
            >
              Gilgit · Pakistan · Remote
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="font-display font-extrabold leading-[0.92] tracking-tight"
            >
              <span className="block text-[clamp(3rem,9vw,6.5rem)] text-foreground">
                Mesum Abbas
              </span>
              <span className="mt-2 block text-[clamp(1.85rem,5.2vw,3.5rem)] text-outline">
                Full Stack
              </span>
              <span className="mt-1 block max-w-[14ch] text-[clamp(1.5rem,4vw,2.75rem)] font-semibold text-foreground/90">
                Web Developer in Gilgit
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Trusted Full Stack Developers in Gilgit and Web Developers in Gilgit Baltistan
              turn to Mesum Abbas for SaaS, MVP, and production web products — React, Node.js,
              and cloud, built to last.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button size="lg" variant="solid" onClick={() => scrollToSection('contact')}>
                Start a project
                <ArrowRight weight="bold" className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('portfolio')}>
                View work
              </Button>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <a
                href="https://github.com/mesum357"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="icon-box h-9 w-9">
                  <GithubLogo weight="duotone" className="h-4 w-4" />
                </span>
                GitHub
              </a>
              <a
                href="https://pk.linkedin.com/in/mesumabbas357"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="icon-box h-9 w-9">
                  <LinkedinLogo weight="duotone" className="h-4 w-4" />
                </span>
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Dominant portrait — double bezel, offset */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full border border-primary/30 lg:block" aria-hidden="true" />
            <div className="media-bezel relative aspect-[4/5] w-full max-w-md rotate-1 lg:ml-auto lg:max-w-none lg:rotate-2">
              <img
                src={heroImage}
                alt="Mesum Abbas — Full Stack and Web Developer in Gilgit, Pakistan"
                className="h-full w-full object-cover object-[center_28%]"
                width={720}
                height={900}
                fetchPriority="high"
              />
            </div>
            <div className="glass-panel absolute -bottom-5 left-4 right-8 rounded-2xl px-4 py-3 sm:left-8 sm:right-auto sm:max-w-[16rem]">
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-primary">
                Available for hire
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                SaaS · MVP · Full stack builds
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
