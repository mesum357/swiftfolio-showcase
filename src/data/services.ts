export interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

const services: Service[] = [
  {
    title: 'Full Stack Development',
    description:
      'End-to-end full stack development for businesses in Gilgit and across Pakistan — React frontends, Node.js APIs, and production-ready deployments.',
    features: ['React & Next.js', 'Node.js & Express', 'Auth & security'],
    icon: 'Layers',
  },
  {
    title: 'SaaS Development',
    description:
      'Custom SaaS product development: multi-tenant apps, dashboards, billing flows, and scalable architecture for growing software businesses.',
    features: ['Multi-tenant apps', 'Admin dashboards', 'Subscription-ready'],
    icon: 'Cloud',
  },
  {
    title: 'MVP Development',
    description:
      'Fast MVP development for founders who need a launchable product — validate your idea with a polished build, not a disposable prototype.',
    features: ['Rapid launch', 'Lean scope', 'Investor-ready demos'],
    icon: 'Sparkles',
  },
  {
    title: 'Frontend Development',
    description:
      'Pixel-perfect, SEO-friendly interfaces built with React, TypeScript, and Tailwind CSS for marketing sites and complex web apps.',
    features: ['React & TypeScript', 'Responsive UI', 'Design systems'],
    icon: 'Layout',
  },
  {
    title: 'Backend & Databases',
    description:
      'Reliable APIs and data layers with MongoDB or PostgreSQL — built for performance, security, and long-term maintainability.',
    features: ['MongoDB & PostgreSQL', 'REST & GraphQL', 'Caching & queues'],
    icon: 'Database',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Cloud deployment and CI/CD so your SaaS or MVP stays fast, monitored, and ready to scale as users grow.',
    features: ['AWS & Docker', 'CI/CD pipelines', 'Monitoring'],
    icon: 'Gauge',
  },
];

export default services;
