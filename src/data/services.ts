import fullstackImage from '@/assets/services/fullstack.jpg';
import saasImage from '@/assets/services/saas.jpg';
import mvpImage from '@/assets/services/mvp.jpg';
import frontendImage from '@/assets/services/frontend.jpg';
import backendImage from '@/assets/services/backend.jpg';
import cloudImage from '@/assets/services/cloud.jpg';

export interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
  image: string;
  imageAlt: string;
}

const services: Service[] = [
  {
    title: 'Full Stack Development',
    description:
      'End-to-end full stack development for businesses in Gilgit and across Pakistan — React frontends, Node.js APIs, and production-ready deployments.',
    features: ['React & Next.js', 'Node.js & Express', 'Auth & security'],
    icon: 'Layers',
    image: fullstackImage,
    imageAlt: 'Code on a developer screen representing full stack web development',
  },
  {
    title: 'SaaS Development',
    description:
      'Custom SaaS product development: multi-tenant apps, dashboards, billing flows, and scalable architecture for growing software businesses.',
    features: ['Multi-tenant apps', 'Admin dashboards', 'Subscription-ready'],
    icon: 'Cloud',
    image: saasImage,
    imageAlt: 'Analytics dashboard UI representing SaaS product development',
  },
  {
    title: 'MVP Development',
    description:
      'Fast MVP development for founders who need a launchable product — validate your idea with a polished build, not a disposable prototype.',
    features: ['Rapid launch', 'Lean scope', 'Investor-ready demos'],
    icon: 'Sparkles',
    image: mvpImage,
    imageAlt: 'Product team collaborating on an early-stage MVP build',
  },
  {
    title: 'Frontend Development',
    description:
      'Pixel-perfect, SEO-friendly interfaces built with React, TypeScript, and Tailwind CSS for marketing sites and complex web apps.',
    features: ['React & TypeScript', 'Responsive UI', 'Design systems'],
    icon: 'Layout',
    image: frontendImage,
    imageAlt: 'UI design workspace representing frontend development',
  },
  {
    title: 'Backend & Databases',
    description:
      'Reliable APIs and data layers with MongoDB or PostgreSQL — built for performance, security, and long-term maintainability.',
    features: ['MongoDB & PostgreSQL', 'REST & GraphQL', 'Caching & queues'],
    icon: 'Database',
    image: backendImage,
    imageAlt: 'Server racks representing backend APIs and databases',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Cloud deployment and CI/CD so your SaaS or MVP stays fast, monitored, and ready to scale as users grow.',
    features: ['AWS & Docker', 'CI/CD pipelines', 'Monitoring'],
    icon: 'Gauge',
    image: cloudImage,
    imageAlt: 'Earth from space representing cloud infrastructure and DevOps',
  },
];

export default services;
