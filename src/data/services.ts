import fullstackImage from '@/assets/optimized/service-fullstack.webp';
import saasImage from '@/assets/optimized/service-saas.webp';
import mvpImage from '@/assets/optimized/service-mvp.webp';
import frontendImage from '@/assets/optimized/service-frontend.webp';
import backendImage from '@/assets/optimized/service-backend.webp';
import cloudImage from '@/assets/optimized/service-cloud.webp';

export interface Service {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  icon: string;
  image: string;
  imageAlt: string;
}

const services: Service[] = [
  {
    title: 'Full Stack Development',
    description:
      'End-to-end web applications — React frontends, Node.js APIs, and production-ready deployments for founders and teams.',
    longDescription:
      'Full stack work means one person owns the interface, the API, the database, and the deploy. I typically pair a React or Next.js frontend with a Node.js API, auth that can survive real users, and a hosting setup you can hand to a teammate later. This is the default engagement when you do not want a frontend freelancer and a separate backend shop to argue over the contract.',
    features: ['React & Next.js', 'Node.js & Express', 'Auth & security'],
    icon: 'Layers',
    image: fullstackImage,
    imageAlt: 'Code on a developer screen representing full stack web development',
  },
  {
    title: 'SaaS Development',
    description:
      'Custom SaaS product development: multi-tenant apps, dashboards, billing flows, and scalable architecture for growing software businesses.',
    longDescription:
      'SaaS builds start with tenancy, roles, and the first workflow that customers will pay for — not a pile of unused settings screens. I have shipped multi-tenant product surfaces, operator dashboards, and subscription-ready architecture so founders can onboard the next account without a rewrite. Billing integrations are scoped honestly: we add them when the product is ready to charge, not on day one of a prototype.',
    features: ['Multi-tenant apps', 'Admin dashboards', 'Subscription-ready'],
    icon: 'Cloud',
    image: saasImage,
    imageAlt: 'Analytics dashboard UI representing SaaS product development',
  },
  {
    title: 'MVP Development',
    description:
      'Fast MVP development for founders who need a launchable product — validate your idea with a polished build, not a disposable prototype.',
    longDescription:
      'An MVP here is a production-shaped first version: real auth, a narrow feature set, and a demo path you can show an investor or a first customer. Typical timeline is four to eight weeks after a discovery week. We cut scope in the open so you launch something people can click, not a graveyard of half-built modules.',
    features: ['Rapid launch', 'Lean scope', 'Investor-ready demos'],
    icon: 'Sparkles',
    image: mvpImage,
    imageAlt: 'Product team collaborating on an early-stage MVP build',
  },
  {
    title: 'Frontend Development',
    description:
      'Pixel-perfect, SEO-friendly interfaces built with React, TypeScript, and Tailwind CSS for marketing sites and complex web apps.',
    longDescription:
      'Frontend work covers marketing sites and app UI: TypeScript, accessible components, and markup search engines can read. I care about title tags, heading order, and image delivery as much as visual polish — a pretty site that ships a 2 MB hero and a vague H1 does not help you get found.',
    features: ['React & TypeScript', 'Responsive UI', 'Design systems'],
    icon: 'Layout',
    image: frontendImage,
    imageAlt: 'UI design workspace representing frontend development',
  },
  {
    title: 'Backend & Databases',
    description:
      'Reliable APIs and data layers with MongoDB or PostgreSQL — built for performance, security, and long-term maintainability.',
    longDescription:
      'Backend work is APIs, data models, and the boring reliability pieces: validation, authz, indexes, and backups. MongoDB or PostgreSQL depends on the shape of the data, not a default stack slide. If you already have a frontend, I can plug in a Node API without forcing a rewrite of what works.',
    features: ['MongoDB & PostgreSQL', 'REST & GraphQL', 'Caching & queues'],
    icon: 'Database',
    image: backendImage,
    imageAlt: 'Server racks representing backend APIs and databases',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Cloud deployment and CI/CD so your SaaS or MVP stays fast, monitored, and ready to scale as users grow.',
    longDescription:
      'Cloud and DevOps here means a deploy you can repeat: Docker where it helps, CI on every push, HTTPS, and enough monitoring to know when something broke at 2 a.m. I will not sell you a Kubernetes cluster for a five-page site. The goal is a boring, documented path from git to production.',
    features: ['AWS & Docker', 'CI/CD pipelines', 'Monitoring'],
    icon: 'Gauge',
    image: cloudImage,
    imageAlt: 'Earth from space representing cloud infrastructure and DevOps',
  },
];

export default services;
