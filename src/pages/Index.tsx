import { useEffect } from 'react';
import SeoHead from '@/components/SeoHead';
import { SITE } from '@/data/site';
import { SEO_PAGES, pageJsonLd } from '@/data/seo';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Clients from '@/components/Clients';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

function scrollToHash() {
  const id = window.location.hash.replace('#', '');
  if (!id) return;
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView();
  });
}

const Index = () => {
  useEffect(() => {
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return (
    <div className="page-container">
      <SeoHead
        title={SITE.title}
        description={SITE.description}
        canonical={`${SITE.url}/`}
        ogType="profile"
        jsonLd={pageJsonLd(SEO_PAGES.home)}
      />
      <Header />
      <main id="main" tabIndex={-1} className="page-main page-main--hero">
        <Hero />
        <Stats />
        <About />
        <Services />
        <Skills />
        <Clients />
        <Portfolio />
        <Testimonials />
        <CTA />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
