import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { SITE } from "@/data/site";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="page-container">
      <SeoHead
        title="Page not found | Mesum Abbas"
        description="This page does not exist on mesumabbas.online."
        canonical={`${SITE.url}${location.pathname}`}
        robots="noindex, follow"
      />
      <Header />
      <main id="main" tabIndex={-1} className="page-main">
        <p className="eyebrow mb-4">Error</p>
        <h1 className="hero-name">404</h1>
        <p className="hero-tagline">Page not found.</p>
        <a href="/" className="button">
          Return to Home
        </a>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
