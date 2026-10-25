import hero390Avif from '@/assets/optimized/hero-390.avif';
import hero780Avif from '@/assets/optimized/hero-780.avif';
import hero1200Avif from '@/assets/optimized/hero-1200.avif';
import hero390Webp from '@/assets/optimized/hero-390.webp';
import hero780Webp from '@/assets/optimized/hero-780.webp';
import hero1200Webp from '@/assets/optimized/hero-1200.webp';
import hero390Jpg from '@/assets/optimized/hero-390.jpg';
import hero780Jpg from '@/assets/optimized/hero-780.jpg';
import hero1200Jpg from '@/assets/optimized/hero-1200.jpg';

const heroSizes = '(max-width: 1024px) 90vw, 280px';
const heroAvifSrcSet = `${hero390Avif} 390w, ${hero780Avif} 780w, ${hero1200Avif} 1200w`;
const heroWebpSrcSet = `${hero390Webp} 390w, ${hero780Webp} 780w, ${hero1200Webp} 1200w`;
const heroJpgSrcSet = `${hero390Jpg} 390w, ${hero780Jpg} 780w, ${hero1200Jpg} 1200w`;

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-primary">
          <h1 className="hero-title m-0">
            <span className="hero-name">Mesum Abbas</span>
            <span className="hero-role">Full Stack Web Developer in Gilgit</span>
          </h1>

          <p className="hero-tagline">
            I design and ship SaaS products, MVPs, and production web apps from{' '}
            <a className="hero-highlight" href="#about">
              Gilgit
            </a>
            — React, Node.js, and cloud, built to last. Hire a{' '}
            <a className="hero-highlight" href="/web-developer-gilgit">
              web developer in Gilgit
            </a>{' '}
            or a{' '}
            <a className="hero-highlight" href="/full-stack-developer-gilgit">
              full stack developer
            </a>
            .
          </p>

          <div className="hero-cta">
            <a href="#about" className="button">
              About Me
            </a>
            <a href="#portfolio" className="hero-resume-link">
              View work
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="hero-portrait">
          <picture>
            <source type="image/avif" srcSet={heroAvifSrcSet} sizes={heroSizes} />
            <source type="image/webp" srcSet={heroWebpSrcSet} sizes={heroSizes} />
            <img
              src={hero780Jpg}
              srcSet={heroJpgSrcSet}
              sizes={heroSizes}
              alt="Mesum Abbas — Full Stack and Web Developer in Gilgit, Pakistan"
              width={529}
              height={504}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </div>
      <div className="hero-bg" aria-hidden="true" />
    </section>
  );
}
