import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SeoHead from '@/components/SeoHead';
import { SEO_PAGES, pageJsonLd } from '@/data/seo';
import { SITE } from '@/data/site';

const page = SEO_PAGES.fullStackGilgit;

export default function FullStackDeveloperGilgitPage() {
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
        <p className="eyebrow">Product engineering</p>
        <h1>{page.h1}</h1>
        <p>
          Full stack here means one engineer owns the interface, the API, the data, and the
          deploy. I am Mesum Abbas, based in Gilgit, and I ship production web products with
          React, TypeScript, Node.js, and a cloud host you can log into. The work is for founders
          and operators who need software, not another brochure.
        </p>
        <p>
          People searching for full stack developers in Gilgit are usually trying to hire an
          individual, not a 100-person shop. That is the engagement model: written scope, weekly
          demos, production URLs. Public marketing sites and tourism pages are covered on the{' '}
          <Link to="/web-developer-gilgit">web developer in Gilgit</Link> page so this one can stay
          about products.
        </p>

        <h2>Products, not slide-deck architecture</h2>
        <p>
          Recent product work includes Nuvisa (a UK visa and immigration pathway site), Blessed
          HHC (home-care advocacy in Fort Worth), Calculator All, Edunia, and SitedocHub. Closer
          to operations: Glacier Cold Storage POS, Birgal Valley POS, and an employee management
          portal. SCO IT Vision is a talent platform aimed at GB and Pakistan professionals.
        </p>
        <p>
          Those builds share a pattern. There is an authenticated surface. There is a data model
          that will still make sense in a year. There is a deploy pipeline so a fix does not
          require a heroic Friday night FTP. I pick MongoDB or PostgreSQL from the shape of the
          data. I pick Next.js when SEO and server rendering matter; Vite and React when the
          product is an app behind a login.
        </p>
        <p>
          I will not sell you microservices for a team of three. I will not hide business logic
          in an undocumented no-code maze. The repo should be something another developer in
          Pakistan — or your future hire — can clone and understand.
        </p>

        <h2>How an engagement is structured</h2>
        <p>
          Discovery week: users, constraints, success metric, out-of-scope list, stack. You get
          that in writing before feature work. Then weekly slices with a demo URL. A scoped MVP
          is usually four to eight weeks. A POS or EMS is sized by modules (sales, stock, roles)
          rather than by “make us an app.” Launch includes env documentation, HTTPS, backups, and
          a walkthrough of how to ship a change.
        </p>
        <p>
          Communication is English, async-friendly, with overlap for standups. I am in Gilgit,
          which is useful if you want someone on Pakistan time who already works with GB
          operators. It is irrelevant to the compiler. Remote teams in other time zones are
          normal; we agree hours in the first week.
        </p>
        <p>
          Start with a brief at {SITE.email}: what users do, what already exists, deadline, and
          whether this is a first version or a rebuild. Upwork is available if you need milestone
          escrow. The public catalogue of services is on <Link to="/services">/services</Link>;
          live URLs are on <Link to="/work">/work</Link>.
        </p>

        <h2>Stack I actually ship</h2>
        <p>
          Frontend: React, TypeScript, Tailwind, sometimes Next.js. Backend: Node.js and Express,
          REST or GraphQL when the client needs it. Data: MongoDB or PostgreSQL. Auth: session or
          token setups that match the product, not a random starter-kit default. Cloud: Docker,
          CI on git push, AWS or a VPS when that is simpler. I have also shipped WordPress when
          the honest product was a site, not an application — that does not make the POS or SaaS
          work any less full stack.
        </p>
        <p>
          If your RFP is a laundry list copied from a Karachi agency (AI, blockchain, native iOS,
          and a three-month rewrite of SAP), I will decline. If you need a working multi-tenant
          dashboard, a lodge POS, or an MVP that survives its first fifty users, that is the work.
        </p>

        <h2>Who should not hire this</h2>
        <p>
          If you need a 12-person squad, a native iOS app, or a same-week redesign of a national
          bank portal, I am the wrong vendor. If you need one engineer to take a messy brief and
          return a running URL with a repo you can keep, that is the fit. Gilgit is the location.
          The deliverable is still software.
        </p>

        <h2>Why Gilgit is in the title</h2>
        <p>
          Because that is where I live and where a lot of the operators I know run tourism,
          hospitality, and public-interest projects. It is also where searchers type when they
          want a full stack developer who is not only available as a Slack avatar. The code is
          the same. The context — power cuts, seasonal businesses, GB government-adjacent
          content — is not. I treat that context as a product constraint, not as folklore.
        </p>
        <p className="seo-cta-row">
          <Link to="/#contact" className="button">
            Hire for a product
          </Link>
          <Link to="/work" className="hero-highlight">
            See production URLs
          </Link>
        </p>
      </article>
    </PageLayout>
  );
}
