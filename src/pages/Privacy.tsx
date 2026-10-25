import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SeoHead from "@/components/SeoHead";
import { SITE, SITE_MAILTO } from "@/data/site";
import { SEO_PAGES, pageJsonLd } from "@/data/seo";

const page = SEO_PAGES.privacy;

export default function Privacy() {
  return (
    <PageLayout breadcrumbs={page.breadcrumbs}>
      <SeoHead
        title={page.title}
        description={page.description}
        canonical={page.canonical}
        ogType={page.ogType}
        jsonLd={pageJsonLd(page)}
      />
      <div className="max-w-[46rem]">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight">{page.h1}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 12 September 2026</p>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            This site is the personal portfolio of Mesum Abbas (
            <a className="text-foreground underline" href={`${SITE.url}/`}>
              mesumabbas.online
            </a>
            ). It describes services and how to get in touch. It is not a consumer app that
            creates user accounts.
          </p>
          <h2 className="font-display text-2xl font-semibold text-foreground">What is collected</h2>
          <p>
            If you email {SITE.email}, the message content and your email address
            are used only to reply and discuss a possible project. If you hire via Upwork, that
            platform’s privacy policy applies to the contract.
          </p>
          <h2 className="font-display text-2xl font-semibold text-foreground">Hosting and logs</h2>
          <p>
            The site is hosted on a VPS. The host and any CDN in front of it may process
            standard server logs (IP address, user agent, requested URL) to operate and secure
            the site. No advertising cookies are set by this site.
          </p>
          <h2 className="font-display text-2xl font-semibold text-foreground">Third parties</h2>
          <p>
            Links to GitHub, LinkedIn, Upwork, and client project sites send you to those
            services. The optional LinkedIn profile badge may load scripts from LinkedIn when
            that section is viewed.
          </p>
          <h2 className="font-display text-2xl font-semibold text-foreground">Contact</h2>
          <p>
            Questions about this policy:{" "}
            <a className="text-foreground underline" href={SITE_MAILTO}>
              {SITE.email}
            </a>
            .
          </p>
        </div>

        <p className="mt-12">
          <Link to="/" className="text-primary underline hover:text-primary/90">
            Back to home
          </Link>
        </p>
      </div>
    </PageLayout>
  );
}
