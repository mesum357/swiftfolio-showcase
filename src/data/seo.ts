import { SITE } from './site';
import seoPages from './seo-pages.json';

export type SeoPageKey = keyof typeof seoPages;

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  robots: string;
  h1: string;
  noscript: string;
  breadcrumbs: { name: string; path: string }[];
};

export const SEO_PAGES = seoPages as Record<SeoPageKey, SeoPage>;

export function pageJsonLd(page: SeoPage) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${page.canonical}#webpage`,
        url: page.canonical,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': `${SITE.url}/#website` },
        about: { '@id': `${SITE.url}/#person` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${SITE.url}/og-image.jpg`,
        },
        dateModified: SITE.dateModified,
        inLanguage: 'en-US',
        breadcrumb: { '@id': `${page.canonical}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${page.canonical}#breadcrumb`,
        itemListElement: page.breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${SITE.url}${crumb.path === '/' ? '/' : crumb.path}`,
        })),
      },
    ],
  };
}
