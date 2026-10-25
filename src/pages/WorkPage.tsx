import { ArrowSquareOut } from '@phosphor-icons/react';
import PageLayout from '@/components/PageLayout';
import SeoHead from '@/components/SeoHead';
import { SEO_PAGES, pageJsonLd } from '@/data/seo';
import projectsData, { PROJECT_CATEGORIES } from '@/data/projects';
import { Link } from 'react-router-dom';

const page = SEO_PAGES.work;

export default function WorkPage() {
  return (
    <PageLayout wide breadcrumbs={page.breadcrumbs}>
      <SeoHead
        title={page.title}
        description={page.description}
        canonical={page.canonical}
        ogType={page.ogType}
        jsonLd={pageJsonLd(page)}
      />
      <article className="seo-article">
        <p className="eyebrow">Portfolio</p>
        <h1>{page.h1}</h1>
        <p>
          These are live products and sites, not concept decks. The mix is intentional: SaaS
          surfaces for overseas clients, operations tools for warehouses and lodges, and public
          websites for Gilgit-Baltistan organisations. Each one had a real operator on the other
          side of the brief — bookings, staff records, visa pathways, or heritage content that
          had to stay accurate.
        </p>
        <p>
          If you are hiring for a similar build, the useful question is not “did you use React?”
          It is whether the thing still works after launch. Every URL below is public. For how
          engagements are scoped, see <Link to="/services">services</Link>.
        </p>

        {PROJECT_CATEGORIES.map((category) => {
          const items = projectsData.filter((project) => project.category === category.id);
          if (!items.length) return null;
          return (
            <section key={category.id}>
              <h2>{category.label}</h2>
              <p>{category.blurb}</p>
              <div className="seo-work-grid">
                {items.map((project) => (
                  <article key={project.id} className="seo-work-card">
                    <div className="media-frame aspect-[16/10]">
                      <img
                        src={project.image}
                        alt={`${project.title} — ${project.description}`}
                        width={800}
                        height={450}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.longDescription}</p>
                    <p className="seo-tech">{project.technologies.join(' · ')}</p>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visit live site
                      <ArrowSquareOut weight="regular" className="ml-1 inline h-4 w-4" />
                    </a>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <h2>What this list is not</h2>
        <p>
          It is not every repo I have ever touched, and it is not a wall of unnamed NDAs. Client
          permission and public URLs decide what appears here. Gilgit-Baltistan work is grouped
          with the rest on purpose: the museum hub, Magpie treks, Birgal Valley, and SCO IT Vision
          are product work with local context, not a separate “cheap local package.”
        </p>
        <p className="seo-cta-row">
          <Link to="/#contact" className="button">
            Start a project
          </Link>
          <Link to="/full-stack-developer-gilgit" className="hero-highlight">
            Full stack in Gilgit
          </Link>
        </p>
      </article>
    </PageLayout>
  );
}
