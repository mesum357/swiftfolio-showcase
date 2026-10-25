import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = JSON.parse(readFileSync(join(root, 'src/data/seo-pages.json'), 'utf8'));
const dateModified = readFileSync(join(root, 'src/data/site.ts'), 'utf8').match(/dateModified:\s*"([^"]+)"/)[1];
const site = {
  url: 'https://mesumabbas.online',
  dateModified,
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function webpageLd(page) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${page.canonical}#webpage`,
        url: page.canonical,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': `${site.url}/#website` },
        about: { '@id': `${site.url}/#person` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${site.url}/og-image.jpg`,
        },
        dateModified: site.dateModified,
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
          item: `${site.url}${crumb.path === '/' ? '/' : crumb.path}`,
        })),
      },
    ],
  };
}

function replaceAttr(html, pattern, replacement) {
  if (!pattern.test(html)) {
    console.warn('No match for', String(pattern));
    return html;
  }
  return html.replace(pattern, replacement);
}

function stamp(html, page, { keepFaq, keepProfile }) {
  let out = html;
  out = replaceAttr(out, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  out = replaceAttr(
    out,
    /<meta name="title" content="[^"]*"\s*\/?>/,
    `<meta name="title" content="${escapeHtml(page.title)}" />`,
  );
  out = replaceAttr(
    out,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
  );
  out = replaceAttr(
    out,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${page.canonical}" />`,
  );
  out = replaceAttr(
    out,
    /<link rel="alternate" hreflang="en" href="[^"]*"\s*\/?>/,
    `<link rel="alternate" hreflang="en" href="${page.canonical}" />`,
  );
  out = replaceAttr(
    out,
    /<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/?>/,
    `<link rel="alternate" hreflang="x-default" href="${page.canonical}" />`,
  );
  out = replaceAttr(
    out,
    /<meta property="og:type" content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${page.ogType}" />`,
  );
  out = replaceAttr(
    out,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${page.canonical}" />`,
  );
  out = replaceAttr(
    out,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
  );
  out = replaceAttr(
    out,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
  );
  out = replaceAttr(
    out,
    /<meta name="twitter:url" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:url" content="${page.canonical}" />`,
  );
  out = replaceAttr(
    out,
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
  );
  out = replaceAttr(
    out,
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
  );
  out = replaceAttr(
    out,
    /<meta name="robots" content="[^"]*"\s*\/?>/,
    `<meta name="robots" content="${page.robots}" />`,
  );

  const ld = JSON.stringify(webpageLd(page), null, 2);
  out = out.replace(
    /<script type="application\/ld\+json" id="ld-webpage">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" id="ld-webpage">\n${ld}\n    </script>`,
  );

  if (!keepProfile) {
    out = out.replace(/<script type="application\/ld\+json" id="ld-profile">[\s\S]*?<\/script>\s*/, '');
  }
  if (!keepFaq) {
    out = out.replace(/<script type="application\/ld\+json" id="ld-faq">[\s\S]*?<\/script>\s*/, '');
  }

  out = out.replace(
    /<noscript>[\s\S]*?<\/noscript>/,
    `<noscript>\n      <main>\n        <h1>${escapeHtml(page.h1)}</h1>\n        <p>${escapeHtml(page.noscript)}</p>\n        <p><a href="${site.url}/">Home</a> · <a href="${site.url}/services">Services</a> · <a href="${site.url}/work">Work</a> · <a href="mailto:info@mesumabbas.online">info@mesumabbas.online</a></p>\n      </main>\n    </noscript>`,
  );

  return out;
}

const distHtml = join(root, 'dist/index.html');
const source = readFileSync(distHtml, 'utf8');

for (const [key, page] of Object.entries(pages)) {
  const keepFaq = key === 'home';
  const keepProfile = key === 'home';
  const stamped = stamp(source, page, { keepFaq, keepProfile });
  if (key === 'home') {
    writeFileSync(distHtml, stamped);
    console.log('stamped /');
    continue;
  }
  const folder = join(root, 'dist', page.path.replace(/^\//, ''));
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'index.html'), stamped);
  console.log('stamped', page.path);
}
