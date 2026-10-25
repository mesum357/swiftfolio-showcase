import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SeoHead from '@/components/SeoHead';
import { SEO_PAGES, pageJsonLd } from '@/data/seo';
import { SITE } from '@/data/site';
import services from '@/data/services';

const page = SEO_PAGES.services;

export default function ServicesPage() {
  return (
    <PageLayout breadcrumbs={page.breadcrumbs}>
      <SeoHead
        title={page.title}
        description={page.description}
        canonical={page.canonical}
        ogType={page.ogType}
        jsonLd={pageJsonLd(page)}
      />
      <article className="seo-article">
        <p className="eyebrow">Services</p>
        <h1>{page.h1}</h1>
        <p>
          I design and ship web products from Gilgit: SaaS platforms, MVPs, business websites, and
          the APIs that keep them honest. Engagements are scoped in writing, demoed weekly, and
          deployed to a host you control. If you need a{' '}
          <Link to="/web-developer-gilgit">web developer in Gilgit</Link> for a public site, or a{' '}
          <Link to="/full-stack-developer-gilgit">full stack developer in Gilgit</Link> for a
          product, those pages go deeper on each path.
        </p>
        <p>
          Work is remote-friendly across Pakistan and internationally, with overlap hours for
          standups. Local clients in Gilgit-Baltistan get the same stack and the same production
          bar — plus the option to walk through screens together when that helps.
        </p>

        <h2>How a build actually runs</h2>
        <p>
          Week one is discovery: users, constraints, the one workflow that must work on launch day,
          and what we are explicitly not building. You get a written scope, a stack recommendation,
          and a timeline before any feature work starts. I will push back on a kitchen-sink MVP.
          A product that does three things well beats a prototype with twelve empty menus.
        </p>
        <p>
          After that, work happens in weekly slices you can click. Each demo has a short written
          recap: what shipped, what is next, what is blocked. Launch includes HTTPS, a backup story,
          and enough documentation that another engineer can find the repo, the env vars, and the
          deploy button. Retainers are optional and only after the first launch is stable.
        </p>
        <p>
          Typical MVP range is four to eight weeks once the brief is clear. A brochure site is
          faster. A multi-tenant SaaS with roles, billing, and an admin console is slower, and I
          will say so up front. Email {SITE.email} with a short brief, or start on{' '}
          <a href={SITE.upwork} target="_blank" rel="noopener noreferrer">
            Upwork
          </a>
          .
        </p>

        <h2>What I take on</h2>
        {services.map((service) => (
          <section key={service.title} className="seo-service">
            <h3>{service.title}</h3>
            <p>{service.longDescription}</p>
            <ul>
              {service.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        ))}

        <h2>Who this is for</h2>
        <p>
          Founders who need a first product they can show customers. Operators in Gilgit-Baltistan
          who need a site or an internal tool that will not collapse after the handover. Remote
          teams who want one engineer to own frontend and backend instead of a relay of contractors.
          I am not a 40-person agency and I do not pretend to be. If the work needs a dedicated
          design studio or a compliance department, I will say that before we start.
        </p>
        <p>
          Proof lives on the <Link to="/work">work</Link> page: visa and care platforms, POS for
          cold storage and a Ghizer lodge, the GB Museum &amp; Library hub, Magpie treks, and
          employee portals. Those are production URLs, not mockups.
        </p>

        <h2>Gilgit, Pakistan, and remote</h2>
        <p>
          I am based in Gilgit. That matters for clients who want someone who already understands
          tourism seasons, heritage content, and how a small GB business actually takes bookings.
          It does not limit the work to the region. The same React, Node.js, and cloud setup runs
          for UK, US, and Pakistan-wide products. If you searched for web developers or full stack
          developers in this city and landed here, start with the two pages above, then send the
          brief.
        </p>

        <p className="seo-cta-row">
          <Link to="/#contact" className="button">
            Start a project
          </Link>
          <Link to="/work" className="hero-highlight">
            See selected work
          </Link>
        </p>
      </article>
    </PageLayout>
  );
}
