import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SeoHead from '@/components/SeoHead';
import { SEO_PAGES, pageJsonLd } from '@/data/seo';
import { SITE } from '@/data/site';

const page = SEO_PAGES.webDeveloperGilgit;

export default function WebDeveloperGilgitPage() {
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
        <p className="eyebrow">Gilgit-Baltistan</p>
        <h1>{page.h1}</h1>
        <p>
          I am Mesum Abbas, a web developer based in Gilgit. Most of the public sites I ship for
          this region are not “startup apps.” They are the pages a lodge, a tour operator, a
          heritage project, or a small firm actually needs: hours, routes, rooms, stories, and a
          way to get in touch that still works on a mid-range Android phone.
        </p>
        <p>
          If you searched for web developers in Gilgit because you want a local person who will
          still answer next season, this page is the brief. Product platforms, dashboards, and
          multi-tenant SaaS live on the{' '}
          <Link to="/full-stack-developer-gilgit">full stack developer in Gilgit</Link> page.
        </p>

        <h2>What local websites here actually have to do</h2>
        <p>
          Gilgit-Baltistan businesses live on seasonality. A trek company needs packages that can
          change when the pass opens. A resort in Ghizer needs rooms, the kitchen, and directions
          that make sense to someone driving from Gilgit city. A museum or library site has to
          treat names, places, and photographs with care — not as stock tourism wallpaper.
        </p>
        <p>
          I have already done that kind of work. The Magpie Trek and Tours site is a GB operator
          with seasonal itineraries. Mountain Resort Birgal Valley is a family lodge and trout farm
          in Ghizer, with a separate POS for the floor. The GB Museum &amp; Library hub is a
          heritage surface, not a theme-park landing page. Those URLs are on the{' '}
          <Link to="/work">work</Link> page so you can click them yourself.
        </p>
        <p>
          A useful site for this region is fast on mobile data, readable in English (and ready for
          Urdu later if you need it), and boring to maintain. I would rather you edit a package
          yourself than wait three weeks for a contractor in another city to change a date.
        </p>

        <h2>How I work with a Gilgit client</h2>
        <p>
          We start with what a visitor is trying to do: book a room, understand a trek, trust a
          public project, or find an office. Then we decide the smallest site that does that well.
          Sometimes that is a React marketing site with a simple CMS. Sometimes WordPress is the
          honest answer because your staff already know it — Birgal Valley’s public site is
          WordPress for that reason. I will not force a JavaScript spa onto a five-page lodge
          brochure.
        </p>
        <p>
          Discovery is a week of questions, content inventory, and a written scope. Build happens
          in visible slices: homepage, inner templates, forms, then SEO basics (unique title,
          description, headings, compressed images). Launch includes HTTPS, analytics if you want
          it, and a 30-minute handoff so someone in your office can change copy without me.
        </p>
        <p>
          Meetings can be in Gilgit when it helps, or on a call if you are in Hunza, Skardu, or
          Islamabad. Remote clients get the same process. Email is {SITE.email}. If you already
          hire on Upwork, the profile is linked in the footer.
        </p>

        <h2>What I will not do</h2>
        <p>
          I will not generate a dozen city pages that only swap the town name. I will not stuff
          “web developers in Gilgit” into every heading and call it SEO. I will not promise first
          place on Google in a week. Rankings need a real page, a crawl, and usually a Google
          Business Profile if you want the map pack. This site is the page. The profile is yours
          to claim as a service-area business if you want local pack visibility.
        </p>
        <p>
          I also will not hide after launch. If something breaks because of a plugin update or a
          host change, you should be able to reach the person who deployed it. That is the actual
          advantage of hiring someone in the same region — not a cheaper hourly rate on a flyer.
        </p>

        <h2>Gilgit city, Ghizer, and the rest of GB</h2>
        <p>
          I am in Gilgit city. A lot of the operators I work with are not: Magpie is a GB trek
          company; Birgal Valley is in Ghizer; the museum hub is about the whole region. If you
          run a guest house in Hunza or an office in Skardu, we can still build over calls. I
          will not pretend I have a storefront in every valley. I will pretend even less that a
          unique page for each town would help you.
        </p>
        <p>
          What I will do is write your actual routes, seasons, and contact path into the site so
          a visitor from Islamabad or Europe can decide to email you. That is the job of a web
          developer here — not a generic “digital agency” paragraph with a mountain stock photo.
        </p>

        <h2>Related work and next step</h2>
        <p>
          Need an app, a POS, or a SaaS — not a public website? Go to{' '}
          <Link to="/full-stack-developer-gilgit">full stack development</Link>. Need the full
          menu of frontend, backend, and cloud? See <Link to="/services">services</Link>. Ready
          with a brief (pages, examples you like, deadline)? Use the contact form or email
          directly.
        </p>
        <p className="seo-cta-row">
          <Link to="/#contact" className="button">
            Hire for a website
          </Link>
          <Link to="/work" className="hero-highlight">
            Gilgit-Baltistan projects
          </Link>
        </p>
      </article>
    </PageLayout>
  );
}
