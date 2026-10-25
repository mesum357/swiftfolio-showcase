import { SITE } from './site';

export interface FaqItem {
  question: string;
  answer: string;
}

const faq: FaqItem[] = [
  {
    question: 'Who is Mesum Abbas?',
    answer:
      'Mesum Abbas is a full stack developer based in Gilgit, Pakistan. He designs and ships SaaS products, MVPs, and custom web apps with React, Node.js, and cloud infrastructure for local businesses and remote teams.',
  },
  {
    question: 'How long does an MVP usually take?',
    answer:
      'A scoped MVP typically ships in 4–8 weeks depending on features, integrations, and content readiness. The first week is discovery and architecture; then weekly demos until launch.',
  },
  {
    question: 'Do you build SaaS products?',
    answer:
      'Yes. Work includes multi-tenant apps, dashboards, APIs, auth, and subscription-ready platforms using React, Node.js, and cloud hosting.',
  },
  {
    question: 'What stack do you use?',
    answer:
      'Core stack: React, TypeScript, Next.js, Node.js, Tailwind CSS, MongoDB, PostgreSQL, Docker, and AWS. Tools are chosen to fit the product, not the other way around.',
  },
  {
    question: 'Can you work with remote teams?',
    answer:
      'Yes. Engagements are remote-friendly across Pakistan and internationally, with overlap hours for standups, reviews, and handoff.',
  },
  {
    question: 'How do we get started?',
    answer:
      `Email ${SITE.email} with a short brief, or start a contract on Upwork. You will get a scope, timeline, and stack recommendation before any build starts.`,
  },
  {
    question: 'Can I hire a web developer in Gilgit?',
    answer:
      `Yes. Mesum Abbas is a web developer and full stack developer in Gilgit who takes freelance and remote work for SaaS, MVPs, and production web apps. Email ${SITE.email} or hire on Upwork to start.`,
  },
];

export default faq;
