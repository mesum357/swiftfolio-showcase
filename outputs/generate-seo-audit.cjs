const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak,
} = require('docx');
const fs = require('fs');
const path = require('path');

const OUT_DIR = __dirname;
const DATE = '2026-08-01';
const DOMAIN = 'mesumabbas.online';
const FILE_BASE = `seo-audit-mesumabbas-online-${DATE}`;

const COLORS = {
  navy: '1B2A4A',
  accent: '2563EB',
  green: '16A34A',
  amber: 'D97706',
  red: 'DC2626',
  orange: 'EA580C',
  lightGray: 'F8F9FA',
  border: 'E2E8F0',
  dark: '1E293B',
  lightBlue: 'EFF6FF',
  lightGreen: 'F0FDF4',
  white: 'FFFFFF',
  softBlue: '93C5FD',
  muted: '94A3B8',
};

const noBorder = {
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
};

const thinBorder = {
  top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.border },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.border },
  left: { style: BorderStyle.SINGLE, size: 4, color: COLORS.border },
  right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.border },
};

function scoreColor(score) {
  if (score >= 8) return COLORS.green;
  if (score >= 5) return COLORS.amber;
  return COLORS.red;
}

function scoreStatus(score) {
  if (score >= 8) return 'Strong';
  if (score >= 5) return 'On Track';
  return 'Needs Work';
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before || 0, after: opts.after || 120 },
    alignment: opts.align || AlignmentType.LEFT,
    children: [
      new TextRun({
        text,
        font: 'Arial',
        size: opts.size || 22,
        bold: !!opts.bold,
        italics: !!opts.italics,
        color: opts.color || COLORS.dark,
      }),
    ],
  });
}

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    spacing: { before: 280, after: 160 },
    children: [new TextRun({ text, font: 'Arial', bold: true, color: COLORS.navy, size: level === HeadingLevel.HEADING_1 ? 48 : 36 })],
  });
}

function cell(text, opts = {}) {
  const fill = opts.fill || COLORS.white;
  const color = opts.color || COLORS.dark;
  return new TableCell({
    borders: opts.noBorder ? noBorder : thinBorder,
    width: { size: opts.width || 2340, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: opts.padTop || 80, bottom: opts.padBottom || 80, left: 100, right: 100 },
    children: [
      new Paragraph({
        alignment: opts.align || AlignmentType.LEFT,
        children: [
          new TextRun({
            text: String(text),
            font: 'Arial',
            size: opts.size || 20,
            bold: !!opts.bold,
            italics: !!opts.italics,
            color,
          }),
        ],
      }),
      ...(opts.extra || []).map((line) => new Paragraph({
        alignment: opts.align || AlignmentType.LEFT,
        spacing: { before: 40 },
        children: [
          new TextRun({
            text: String(line.text),
            font: 'Arial',
            size: line.size || 20,
            bold: !!line.bold,
            italics: !!line.italics,
            color: line.color || color,
          }),
        ],
      })),
    ],
  });
}

function statusCell(status) {
  const map = {
    Good: COLORS.green,
    'Needs Attention': COLORS.amber,
    Missing: COLORS.red,
    Strong: COLORS.green,
    'On Track': COLORS.amber,
    'Needs Work': COLORS.red,
  };
  return cell(status, { fill: map[status] || COLORS.amber, color: COLORS.white, bold: true, align: AlignmentType.CENTER, width: 1800 });
}

function priorityCell(label) {
  const map = {
    'Critical': COLORS.red,
    'High': COLORS.orange,
    'Medium': COLORS.amber,
    'Quick Win': COLORS.green,
  };
  return cell(label, { fill: map[label] || COLORS.amber, color: COLORS.white, bold: true, align: AlignmentType.CENTER, width: 1400 });
}

const SEO = 6;
const GEO = 7;
const AEO = 7;

async function main() {
  const coverScoreCell = (label, score) => new TableCell({
    borders: noBorder,
    width: { size: 3000, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: scoreColor(score) },
    margins: { top: 160, bottom: 160, left: 80, right: 80 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: label, font: 'Arial', bold: true, color: COLORS.white, size: 20 })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80 },
        children: [new TextRun({ text: String(score), font: 'Arial', bold: true, color: COLORS.white, size: 72 })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 40 },
        children: [new TextRun({ text: scoreStatus(score), font: 'Arial', italics: true, color: COLORS.white, size: 18 })],
      }),
    ],
  });

  const doc = new Document({
    styles: {
      default: {
        document: {
          styles: [{ id: 'Normal', run: { font: 'Arial', size: 22, color: COLORS.dark } }],
        },
      },
    },
    sections: [
      // COVER
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        children: [
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: noBorder,
                    width: { size: 9360, type: WidthType.DXA },
                    shading: { type: ShadingType.CLEAR, fill: COLORS.navy },
                    margins: { top: 1800, bottom: 1800, left: 400, right: 400 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 },
                        children: [new TextRun({ text: DOMAIN, font: 'Arial', bold: true, color: COLORS.white, size: 72 })],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 },
                        children: [new TextRun({ text: 'SEO / GEO / AEO Audit Report', font: 'Arial', color: COLORS.softBlue, size: 36 })],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 },
                        children: [new TextRun({ text: 'FULL AUDIT', font: 'Arial', color: COLORS.white, size: 22 })],
                      }),
                      new Table({
                        width: { size: 9000, type: WidthType.DXA },
                        rows: [
                          new TableRow({
                            children: [coverScoreCell('SEO', SEO), coverScoreCell('GEO', GEO), coverScoreCell('AEO', AEO)],
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 600 },
                        children: [new TextRun({ text: 'Audit date: 1 August 2026', font: 'Arial', color: COLORS.muted, size: 18 })],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: 'Claude Skill and Plugin by Alex Labat', font: 'Arial', color: COLORS.muted, size: 18 })],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ children: [new PageBreak()] }),
        ],
      },
      // BODY
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: COLORS.navy, space: 8 } },
                spacing: { after: 120 },
                children: [
                  new TextRun({ text: DOMAIN, font: 'Arial', size: 18, color: COLORS.navy }),
                  new TextRun({ text: '\tSEO / GEO / AEO Audit Report', font: 'Arial', size: 18, color: COLORS.muted }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLORS.border, space: 8 } },
                spacing: { before: 80 },
                children: [
                  new TextRun({ text: 'Claude Skill and Plugin by Alex Labat', font: 'Arial', size: 16, color: COLORS.muted }),
                  new TextRun({ text: '\t', font: 'Arial', size: 16 }),
                  new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 16, color: COLORS.muted }),
                ],
              }),
            ],
          }),
        },
        children: [
          heading('Executive Summary'),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: thinBorder,
                    width: { size: 9360, type: WidthType.DXA },
                    shading: { type: ShadingType.CLEAR, fill: COLORS.lightBlue },
                    margins: { top: 140, bottom: 140, left: 160, right: 160 },
                    children: [
                      p('mesumabbas.online is a single-page React portfolio with strong brand/local SEO foundations: Person + ProfessionalService JSON-LD, geo meta, llms.txt, AI-crawler-friendly robots.txt, and AEO-style FAQ copy targeting “Mesum Abbas”, “Full Stack Developers in Gilgit”, and related Pakistan/SaaS/MVP terms. The most urgent issues are SERP truncation risk (title ~80 chars, description ~220 chars), a non-keyword H1 (“Build Digital Futures”), JavaScript-only body content for crawlers that do not execute JS fully, placeholder testimonials, no phone NAP, and thin multi-URL architecture (sitemap has only the homepage). Biggest opportunity: tighten on-page titles/H1 around brand + “Web Developers in Gilgit”, ship real client proof, and add crawlable HTML text (or prerender) so Google and AI engines can confidently rank and cite the entity.'),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ spacing: { before: 200, after: 120 }, children: [] }),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('Dimension', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1800 }),
                  cell('Score', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1400, align: AlignmentType.CENTER }),
                  cell('Status', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1800, align: AlignmentType.CENTER }),
                  cell('Key Takeaway', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 4360 }),
                ],
              }),
              new TableRow({
                children: [
                  cell('SEO', { width: 1800, bold: true }),
                  cell('6/10', { width: 1400, fill: scoreColor(SEO), color: COLORS.white, bold: true, align: AlignmentType.CENTER }),
                  statusCell('On Track'),
                  cell('Solid meta/schema; title/desc too long; SPA/H1/keyword gaps', { width: 4360 }),
                ],
              }),
              new TableRow({
                children: [
                  cell('GEO', { width: 1800, bold: true, fill: COLORS.lightGray }),
                  cell('7/10', { width: 1400, fill: scoreColor(GEO), color: COLORS.white, bold: true, align: AlignmentType.CENTER }),
                  statusCell('On Track'),
                  cell('Strong entity + llms.txt; weak real proof & phone NAP', { width: 4360, fill: COLORS.lightGray }),
                ],
              }),
              new TableRow({
                children: [
                  cell('AEO', { width: 1800, bold: true }),
                  cell('7/10', { width: 1400, fill: scoreColor(AEO), color: COLORS.white, bold: true, align: AlignmentType.CENTER }),
                  statusCell('On Track'),
                  cell('Excellent FAQ Q&A; H1 not answer-oriented; no FAQPage schema', { width: 4360 }),
                ],
              }),
              new TableRow({
                children: [
                  cell('Combined', { width: 1800, bold: true, fill: COLORS.lightBlue }),
                  cell('20/30', { width: 1400, bold: true, fill: COLORS.lightBlue, align: AlignmentType.CENTER }),
                  cell('', { width: 1800, fill: COLORS.lightBlue }),
                  cell('Ready to compete locally on brand + Gilgit terms after critical fixes', { width: 4360, fill: COLORS.lightBlue }),
                ],
              }),
            ],
          }),

          heading('Pages Audited'),
          p('Live crawl of https://mesumabbas.online/ (SPA). Hash sections are in-page anchors, not separate indexable URLs. Local source confirmed for React-rendered sections.'),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('URL / Section', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 3600 }),
                  cell('Page Type', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 2200 }),
                  cell('Notes', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 3560 }),
                ],
              }),
              ...[
                ['https://mesumabbas.online/', 'Homepage (SPA)', 'Rich head meta + 4 JSON-LD blocks; body via JS'],
                ['/#about', 'About section', 'Bio + location; LinkedIn badge'],
                ['/#services', 'Services', 'Full Stack / SaaS / MVP catalog'],
                ['/#skills', 'Skills', 'Tooling tabs; Gilgit keyword mention'],
                ['/#clients', 'Clients / logos', 'Logo strip; social proof'],
                ['/#portfolio', 'Portfolio / Work', '5 projects with live/GitHub links'],
                ['/#testimonials', 'Testimonials', 'Placeholder names (“Client Name”)'],
                ['/#faq', 'FAQ', '8 AEO question/answer items'],
                ['/#contact', 'Contact', 'Email + form (mock submit)'],
                ['/robots.txt', 'Robots', 'Allows Google + AI crawlers; sitemap pointer'],
                ['/sitemap.xml', 'Sitemap', 'Only homepage URL; lastmod 2026-07-25'],
                ['/llms.txt', 'GEO / AI', 'Strong entity + citation preference'],
                ['/og-image.jpg', 'Social image', 'HTTP 200 (~26KB)'],
              ].map((row, i) => new TableRow({
                children: [
                  cell(row[0], { width: 3600, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  cell(row[1], { width: 2200, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  cell(row[2], { width: 3560, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                ],
              })),
            ],
          }),

          heading('SEO Analysis'),
          p('Score: 6/10 — On Track. Strong technical head tags and schema; content delivery and SERP packaging need work.'),
          heading('Technical On-Page', HeadingLevel.HEADING_2),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('Signal', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 2400 }),
                  cell('Finding', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 5160 }),
                  cell('Status', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1800, align: AlignmentType.CENTER }),
                ],
              }),
              ...[
                ['Title tag', 'Present: “Mesum Abbas | Full Stack Developer in Gilgit & Pakistan — SaaS & MVP Developer” (~80 chars). Exceeds 50–60 ideal; likely truncates in SERPs. Includes brand + Gilgit + Full Stack.', 'Needs Attention'],
                ['Meta description', 'Present but ~220 chars (ideal 150–160). Mentions Mesum Abbas, Gilgit, SaaS, MVP. Truncation risk high.', 'Needs Attention'],
                ['Canonical', 'Self-referencing https://mesumabbas.online/ — correct.', 'Good'],
                ['Robots meta', 'index, follow with max-snippet/image/video directives — indexable.', 'Good'],
                ['Viewport', 'width=device-width present.', 'Good'],
                ['H1', 'Visible React H1 is “Build Digital Futures” — brand design, not primary keywords. Noscript H1 is keyword-rich but only for non-JS.', 'Needs Attention'],
                ['Heading hierarchy', 'Section H2s exist in React (About, Services, FAQ). FAQ uses question copy. No dedicated “Web Developers in Gilgit” H2.', 'Needs Attention'],
                ['URL structure', 'Clean apex domain. SPA hash anchors (#services) are not separate crawlable URLs.', 'Needs Attention'],
                ['Open Graph / Twitter', 'og:title/description/image + Twitter card present; og:type=profile appropriate for personal brand.', 'Good'],
                ['Image alt', 'Many descriptive alts (“Mesum Abbas — Full Stack…”). Hero decorative image uses empty alt inside aria-hidden — acceptable.', 'Good'],
                ['Internal links', 'In-page nav only; no multi-page internal link graph / blog cluster.', 'Needs Attention'],
                ['Keywords meta', 'Includes Full Stack Developers In Gilgit, Web Developers In Gilgit, Mesum Abbas Full Stack Developer. Low ranking weight but useful consistency signal.', 'Good'],
              ].map((r, i) => new TableRow({
                children: [
                  cell(r[0], { width: 2400, bold: true, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  cell(r[1], { width: 5160, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  statusCell(r[2]),
                ],
              })),
            ],
          }),

          heading('Content Quality', HeadingLevel.HEADING_2),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('Signal', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 2400 }),
                  cell('Finding', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 5160 }),
                  cell('Status', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1800 }),
                ],
              }),
              ...[
                ['Word count / depth', 'SPA homepage has substantial section copy (about, services, FAQ, portfolio). Adequate for a personal portfolio; thin for competitive national terms.', 'Needs Attention'],
                ['Keyword targeting', 'Strong for “Mesum Abbas”, “Full Stack Developers in Gilgit”, Pakistan/SaaS/MVP. Weaker body emphasis for exact “Web Developers in Gilgit” and misspelling “Mesum Abas”.', 'Needs Attention'],
                ['Freshness', 'Sitemap lastmod 2026-07-25; no visible article dates or changelog.', 'Needs Attention'],
                ['Readability', 'Clear section labels, short paragraphs, FAQ accordion — scannable.', 'Good'],
                ['Portfolio proof', '5 real projects with live URLs (E Dunia, GB Museum, Magpie, VitalGeo, GB IT Vision).', 'Good'],
              ].map((r, i) => new TableRow({
                children: [
                  cell(r[0], { width: 2400, bold: true, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  cell(r[1], { width: 5160, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  statusCell(r[2]),
                ],
              })),
            ],
          }),

          heading('Structured Data', HeadingLevel.HEADING_2),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('Signal', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 2400 }),
                  cell('Finding', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 5160 }),
                  cell('Status', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1800 }),
                ],
              }),
              ...[
                ['JSON-LD types', 'Person, WebSite, ProfessionalService (with OfferCatalog), ProfilePage — 4 blocks detected.', 'Good'],
                ['Person completeness', 'name, jobTitle, address (Gilgit/GB/PK), sameAs (GitHub + LinkedIn), knowsAbout, occupation, areaServed.', 'Good'],
                ['Local signals', 'geo.region PK-GB, geo coordinates, ProfessionalService geo — strong local entity.', 'Good'],
                ['FAQPage schema', 'Not present. For commercial sites Google FAQ rich results are restricted; FAQ content still helps AI citation. Optional as non-critical.', 'Needs Attention'],
                ['BreadcrumbList', 'Not present (less critical on single URL).', 'Needs Attention'],
              ].map((r, i) => new TableRow({
                children: [
                  cell(r[0], { width: 2400, bold: true, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  cell(r[1], { width: 5160, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  statusCell(r[2]),
                ],
              })),
            ],
          }),

          heading('GEO Analysis'),
          p('Score: 7/10 — On Track. Entity clarity and AI crawl access are strengths; trust/proof density needs upgrade.'),
          heading('E-E-A-T Assessment', HeadingLevel.HEADING_2),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('Signal', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 2400 }),
                  cell('Finding', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 5160 }),
                  cell('Status', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1800 }),
                ],
              }),
              ...[
                ['Author / person entity', 'Mesum Abbas named consistently; Binary Hub work history; LinkedIn badge widget.', 'Good'],
                ['About / credentials', 'About section + experience timeline present. No certifications/press.', 'Needs Attention'],
                ['Contact', 'Email hello@mesumabbas.online present. No phone number (NAP incomplete for local).', 'Needs Attention'],
                ['Trust signals', 'Client logos present. Testimonials still use placeholder “Client Name” — harms AI/human trust.', 'Missing'],
                ['sameAs / entity graph', 'GitHub mesum357 + LinkedIn mesumabbas357 in schema and footer.', 'Good'],
              ].map((r, i) => new TableRow({
                children: [
                  cell(r[0], { width: 2400, bold: true, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  cell(r[1], { width: 5160, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  statusCell(r[2]),
                ],
              })),
            ],
          }),

          heading('Content for AI Synthesis', HeadingLevel.HEADING_2),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('Signal', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 2400 }),
                  cell('Finding', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 5160 }),
                  cell('Status', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1800 }),
                ],
              }),
              ...[
                ['Factual density', 'Stats (3+ years, 50+ projects, 30+ clients, 98%) and stack list citeable; verify accuracy.', 'Good'],
                ['Clear claims', 'Value proposition stated in hero/about/services. Primary identity clear for “Who is Mesum Abbas?”.', 'Good'],
                ['Entity clarity', 'Consistent naming of Mesum Abbas + Gilgit Baltistan + Full Stack / SaaS / MVP.', 'Good'],
                ['llms.txt', 'Present with identity, services, audiences, and citation preference — strong GEO asset.', 'Good'],
                ['Originality / sources', 'No original research, case-study metrics, or external citations.', 'Needs Attention'],
              ].map((r, i) => new TableRow({
                children: [
                  cell(r[0], { width: 2400, bold: true, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  cell(r[1], { width: 5160, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  statusCell(r[2]),
                ],
              })),
            ],
          }),

          heading('Technical GEO', HeadingLevel.HEADING_2),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('Signal', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 2400 }),
                  cell('Finding', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 5160 }),
                  cell('Status', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1800 }),
                ],
              }),
              ...[
                ['HTTPS', 'Site served over HTTPS.', 'Good'],
                ['AI crawler access', 'robots.txt allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.', 'Good'],
                ['JS rendering risk', 'Primary body is client-rendered React. Google usually renders; some AI bots may rely more on static HTML/noscript.', 'Needs Attention'],
                ['Sitemap coverage', 'Only / listed — expected for SPA, but limits multi-URL topical expansion.', 'Needs Attention'],
              ].map((r, i) => new TableRow({
                children: [
                  cell(r[0], { width: 2400, bold: true, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  cell(r[1], { width: 5160, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  statusCell(r[2]),
                ],
              })),
            ],
          }),

          heading('AEO Analysis'),
          p('Score: 7/10 — On Track. FAQ answer patterns are a standout; packaging for snippets can improve.'),
          heading('Featured Snippet Eligibility', HeadingLevel.HEADING_2),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('Signal', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 2400 }),
                  cell('Finding', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 5160 }),
                  cell('Status', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1800 }),
                ],
              }),
              ...[
                ['Direct answer paragraphs', 'FAQ answers are concise definitional paragraphs (e.g., “Mesum Abbas is a Full Stack Developer based in Gilgit…”).', 'Good'],
                ['Definition patterns', 'Clear “X is…” sentences for brand and local intent.', 'Good'],
                ['List content', 'Services feature bullets; skills listed. No numbered process steps for “how to hire”.', 'Needs Attention'],
                ['Question headings', 'FAQ questions are excellent. Visible H1 is not question/keyword oriented.', 'Needs Attention'],
              ].map((r, i) => new TableRow({
                children: [
                  cell(r[0], { width: 2400, bold: true, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  cell(r[1], { width: 5160, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  statusCell(r[2]),
                ],
              })),
            ],
          }),

          heading('Structured Answer Formats', HeadingLevel.HEADING_2),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('Signal', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 2400 }),
                  cell('Finding', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 5160 }),
                  cell('Status', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1800 }),
                ],
              }),
              ...[
                ['FAQ content', '8 Q&As covering Mesum Abbas, Full Stack Developers in Gilgit/Pakistan, SaaS, MVP.', 'Good'],
                ['FAQPage schema', 'Not implemented. Not recommended solely for Google FAQ rich results on commercial sites; useful for LLM citation if added carefully.', 'Needs Attention'],
                ['HowTo schema', 'Not present (and HowTo is deprecated for rich results as of 2023 — do not add for Google rich results).', 'Good'],
                ['Speakable', 'Not present.', 'Needs Attention'],
              ].map((r, i) => new TableRow({
                children: [
                  cell(r[0], { width: 2400, bold: true, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  cell(r[1], { width: 5160, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  statusCell(r[2]),
                ],
              })),
            ],
          }),

          heading('Voice Search Readiness', HeadingLevel.HEADING_2),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('Signal', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 2400 }),
                  cell('Finding', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 5160 }),
                  cell('Status', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1800 }),
                ],
              }),
              ...[
                ['Conversational language', 'FAQ and about copy are natural and spoken-query friendly.', 'Good'],
                ['Long-tail coverage', 'Covers who/what/how for brand and local hire intent. Add “web developers in Gilgit” FAQ explicitly.', 'Needs Attention'],
                ['Local NAP', 'Name + city + email; missing phone and street address if applicable.', 'Needs Attention'],
              ].map((r, i) => new TableRow({
                children: [
                  cell(r[0], { width: 2400, bold: true, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  cell(r[1], { width: 5160, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  statusCell(r[2]),
                ],
              })),
            ],
          }),

          heading('Priority Recommendations'),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('Priority', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1400 }),
                  cell('Issue', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 3200 }),
                  cell('Dimension', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1400 }),
                  cell('Effort', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1400 }),
                  cell('Impact', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 1960 }),
                ],
              }),
              ...[
                ['Critical', 'Shorten title to ~55–60 chars including Mesum Abbas + Full Stack + Gilgit', 'SEO', 'Low', 'Higher SERP CTR'],
                ['Critical', 'Rewrite meta description to 150–160 chars with CTA + Web Developers in Gilgit', 'SEO', 'Low', 'Snippet quality'],
                ['Critical', 'Align visible H1/subhead with brand keywords (keep design, add keyword-rich supporting H1 text)', 'SEO/AEO', 'Medium', 'Ranking relevance'],
                ['High', 'Replace placeholder testimonials with real named clients', 'GEO', 'Medium', 'Trust / citations'],
                ['High', 'Ensure static/prerendered HTML contains key bio + FAQ text for non-JS bots', 'SEO/GEO', 'Medium–High', 'Crawl reliability'],
                ['High', 'Add “Web Developers in Gilgit” FAQ + About/Services copy; include misspelling note for “Mesum Abas” carefully in alternateName only if common', 'SEO/AEO', 'Low', 'Local query match'],
                ['Medium', 'Add phone (if public) to contact + schema; complete NAP', 'GEO/AEO', 'Low', 'Local entity'],
                ['Medium', 'Submit sitemap in Google Search Console; request indexing; monitor brand queries', 'SEO', 'Low', 'Discovery'],
                ['Medium', 'Publish 2–3 Gilgit/Pakistan developer guides (blog) for topical authority', 'SEO/GEO', 'High', 'Non-brand growth'],
                ['Quick Win', 'Bump sitemap lastmod on each deploy; compress OG image quality/size appropriately', 'SEO', 'Low', 'Hygiene'],
              ].map((r) => new TableRow({
                children: [
                  priorityCell(r[0]),
                  cell(r[1], { width: 3200 }),
                  cell(r[2], { width: 1400, align: AlignmentType.CENTER }),
                  cell(r[3], { width: 1400, align: AlignmentType.CENTER }),
                  cell(r[4], { width: 1960 }),
                ],
              })),
            ],
          }),

          heading("What's Working Well"),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: thinBorder,
                    width: { size: 9360, type: WidthType.DXA },
                    shading: { type: ShadingType.CLEAR, fill: COLORS.lightGreen },
                    margins: { top: 120, bottom: 120, left: 140, right: 140 },
                    children: [
                      p('• Person + ProfessionalService + ProfilePage JSON-LD with Gilgit geo and OfferCatalog for Full Stack / SaaS / MVP.'),
                      p('• robots.txt explicitly allows major search and AI crawlers; sitemap and llms.txt are published.'),
                      p('• AEO FAQ already answers “Who is Mesum Abbas?” and “Full Stack Developers in Gilgit?” in citation-ready form.'),
                      p('• Real portfolio projects with outbound live demos strengthen Experience signals.'),
                      p('• sameAs links to GitHub and LinkedIn strengthen the Mesum Abbas entity graph.'),
                      p('• Canonical, Open Graph, Twitter Card, and geo meta are already in place.'),
                    ],
                  }),
                ],
              }),
            ],
          }),

          heading('Keyword Opportunity Map'),
          p('Target set from your brief (and close variants observed on-site):'),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell('Keyword', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 3600 }),
                  cell('Current coverage', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 2880 }),
                  cell('Priority action', { bold: true, fill: COLORS.navy, color: COLORS.white, width: 2880 }),
                ],
              }),
              ...[
                ['Mesum Abbas', 'Strong (title, schema, FAQ, body)', 'Protect brand SERP; keep consistency'],
                ['Mesum Abbas Web developer', 'Partial (Web Developer in meta/footer)', 'Add exact phrase near H1/about'],
                ['Mesum Abbas full stack developer', 'Strong', 'Keep as primary title entity'],
                ['Mesum Abas (misspelling)', 'Not covered', 'Optional alternateName only; do not stuff'],
                ['Full Stack Developers in Gilgit', 'Strong (FAQ + meta + copy)', 'Keep FAQ #1 local answer'],
                ['Web Developers in Gilgit', 'Meta keywords; weak body H2', 'Add FAQ + H2 + meta description'],
                ['Full Stack Developers in Pakistan', 'Present in FAQ/contact', 'Support with remote-hire content'],
                ['SaaS / MVP Developers', 'Services + schema offers', 'Case-study pages later'],
              ].map((r, i) => new TableRow({
                children: [
                  cell(r[0], { width: 3600, fill: i % 2 ? COLORS.lightGray : COLORS.white, bold: true }),
                  cell(r[1], { width: 2880, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                  cell(r[2], { width: 2880, fill: i % 2 ? COLORS.lightGray : COLORS.white }),
                ],
              })),
            ],
          }),

          heading('Glossary'),
          p('SEO (Search Engine Optimization): Optimizing pages so traditional search engines like Google can crawl, understand, and rank them for relevant queries.'),
          p('GEO (Generative Engine Optimization): Optimizing for AI answer engines (ChatGPT Search, Perplexity, Google AI Overviews) that synthesize and cite sources — rewards clear entities, facts, and trust.'),
          p('AEO (Answer Engine Optimization): Optimizing for featured snippets, People Also Ask, and voice answers — rewards concise Q&A, definitions, and structured answers.'),
          p('Limits of this audit: Core Web Vitals, backlink profile, and Search Console impressions were not measured here. Use PageSpeed Insights and Google Search Console for those.'),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const docxPath = path.join(OUT_DIR, `${FILE_BASE}.docx`);
  fs.writeFileSync(docxPath, buffer);
  console.log('DOCX written:', docxPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
