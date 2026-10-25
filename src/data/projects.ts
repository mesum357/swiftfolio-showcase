import nuvisaImage from '@/assets/optimized/project-nuvisa.webp';
import blessedImage from '@/assets/optimized/project-blessed.webp';
import calculatorImage from '@/assets/optimized/project-calculator.webp';
import eduniaImage from '@/assets/optimized/project-edunia.webp';
import sitedocImage from '@/assets/optimized/project-sitedoc.webp';
import gbitImage from '@/assets/optimized/project-gbit.webp';
import employeeImage from '@/assets/optimized/project-employee.webp';
import glacierImage from '@/assets/optimized/project-glacier.webp';
import birgalPosImage from '@/assets/optimized/project-birgal-pos.webp';
import museumImage from '@/assets/optimized/project-museum.webp';
import birgalResortImage from '@/assets/optimized/project-birgal-resort.webp';
import binaryImage from '@/assets/optimized/project-binary.webp';
import magpieImage from '@/assets/optimized/project-magpie.webp';

export type ProjectCategoryId = 'saas' | 'ems' | 'pos' | 'business';

export interface ProjectCategory {
  id: ProjectCategoryId;
  label: string;
  blurb: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { id: 'saas', label: 'SaaS', blurb: 'Product platforms built to ship and scale' },
  { id: 'ems', label: 'EMS', blurb: 'Employee systems that keep teams moving' },
  { id: 'pos', label: 'POS Systems', blurb: 'Sales floors, inventory, and ops' },
  { id: 'business', label: 'Business Websites', blurb: 'Brand sites that earn trust' },
];

export interface Project {
  id: number;
  category: ProjectCategoryId;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    category: 'saas',
    title: 'Nuvisa',
    description:
      'UK-focused visa and immigration platform with clear guidance paths for applicants and advisors.',
    longDescription:
      'Nuvisa is a SaaS experience for visa and immigration workflows. The site presents service pathways, trust signals, and conversion-focused pages so applicants can understand options and take the next step without friction. Built as a polished marketing and product surface for a UK audience.',
    image: nuvisaImage,
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind'],
    liveUrl: 'https://www.nuvisa.co.uk/',
  },
  {
    id: 2,
    category: 'saas',
    title: 'Blessed HHC',
    description:
      'Home healthcare advocacy platform for families navigating care, case management, and applications.',
    longDescription:
      'Blessed Home Healthcare helps elderly, disabled, and post-hospitalized individuals access care through application support, case management, and advocacy. The site explains services, the process, and how families get started — with clear CTAs and compassionate storytelling for a Fort Worth care brand.',
    image: blessedImage,
    technologies: ['React', 'TypeScript', 'Node.js', 'CMS'],
    liveUrl: 'https://www.blessedhhc.org/',
  },
  {
    id: 3,
    category: 'saas',
    title: 'Calculator All',
    description:
      'Multi-tool calculator hub with fast, focused utilities for everyday math and conversions.',
    longDescription:
      'Calculator All (calculator1.org) is a utility SaaS-style web product that groups practical calculators in one place. The emphasis is speed, clarity, and mobile-friendly tools so visitors can solve a problem and leave — without marketing clutter getting in the way.',
    image: calculatorImage,
    technologies: ['React', 'TypeScript', 'Vite', 'SEO'],
    liveUrl: 'https://calculator1.org/',
  },
  {
    id: 4,
    category: 'saas',
    title: 'Edunia.org',
    description:
      'Community and opportunity platform connecting people and businesses through digital tools.',
    longDescription:
      'Edunia.org is a comprehensive digital platform that connects communities, empowers businesses, and creates opportunities through innovative web solutions. Built with modern stacks for real-time interaction, commerce, and collaboration across the region.',
    image: eduniaImage,
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'WebSocket'],
    liveUrl: 'https://www.edunia.org/',
  },
  {
    id: 5,
    category: 'saas',
    title: 'SitedocHub',
    description:
      'Document and site operations hub with authenticated access for teams managing project files.',
    longDescription:
      'SitedocHub is a SaaS login experience for document and site operations. Teams sign in to manage project documentation and related workflows in a focused portal UI designed for clarity and day-to-day use.',
    image: sitedocImage,
    technologies: ['React', 'TypeScript', 'Auth', 'Vercel'],
    liveUrl: 'https://sitedochub.vercel.app/login',
  },
  {
    id: 6,
    category: 'saas',
    title: 'SCO IT Vision',
    description:
      'Talent platform connecting Gilgit-Baltistan and Pakistan IT professionals with global opportunities.',
    longDescription:
      'SCO IT Vision empowers skilled professionals across Gilgit-Baltistan and Pakistan by bridging local talent with global opportunities. The platform supports job discovery, career visibility, and regional tech workforce growth.',
    image: gbitImage,
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://sco-gb-it-vision.onrender.com',
  },
  {
    id: 7,
    category: 'ems',
    title: 'Employee Management System',
    description:
      'Corporate employee portal for HR workflows, staff records, and internal operations.',
    longDescription:
      'MMH Corporate Employee Portal centralizes employee management for day-to-day HR and operations. The EMS surface handles staff-facing workflows in a clean authenticated portal built for reliability and clarity at work.',
    image: employeeImage,
    technologies: ['React', 'TypeScript', 'Node.js', 'Auth'],
    liveUrl: 'https://employee-portal-sepia-kappa.vercel.app/',
  },
  {
    id: 8,
    category: 'pos',
    title: 'Glacier Cold Storage POS',
    description:
      'Point-of-sale and inventory dashboard for cold-storage operations and warehouse sales.',
    longDescription:
      'Glacier Cold Storage POS is an operations dashboard for inventory, sales, and cold-storage workflows. Built for speed on the floor — clear tables, actionable status, and a UI operators can trust during busy shifts.',
    image: glacierImage,
    technologies: ['React', 'TypeScript', 'Node.js', 'Inventory'],
    liveUrl: 'https://glacier-cold-storage.vercel.app/',
  },
  {
    id: 9,
    category: 'pos',
    title: 'Birgal Valley POS',
    description:
      'POS and inventory system for Mountain Resort Birgal Valley — lodge sales and stock in one place.',
    longDescription:
      'Birgal POS & Inventory supports Mountain Resort Birgal Valley with sales, stock tracking, and day-to-day lodge commerce. Designed as a practical operations tool that matches a real hospitality and fish-farm business.',
    image: birgalPosImage,
    technologies: ['React', 'TypeScript', 'Node.js', 'POS'],
    liveUrl: 'https://birgal-pos.vercel.app/',
  },
  {
    id: 10,
    category: 'business',
    title: 'GB Museum & Library',
    description:
      'Heritage hub preserving and presenting the culture and history of Gilgit-Baltistan.',
    longDescription:
      'The GB Museum & Library digital hub preserves, documents, and showcases the cultural heritage of Gilgit-Baltistan. Visitors explore history, traditions, and stories through a respectful, content-forward web experience.',
    image: museumImage,
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://gilgit-heritage-hub.onrender.com/',
  },
  {
    id: 11,
    category: 'business',
    title: 'Mountain Resort Birgal Valley',
    description:
      'Family lodge and trout farm site in Ghizer — rooms, kitchen, and how to reach Birgal Valley.',
    longDescription:
      'Mountain Resort Birgal Valley is a family-run lodge beside glacier-fed trout ponds in Ghizer, Gilgit-Baltistan. The marketing site covers rooms, farm dining, experiences, and travel guidance with a calm mountain brand voice.',
    image: birgalResortImage,
    technologies: ['WordPress', 'SEO', 'Performance'],
    liveUrl: 'https://mountainresortbirgalvalley.com/',
  },
  {
    id: 12,
    category: 'business',
    title: 'Binary Hub',
    description:
      'Brand and business website for Binary Hub — clear positioning and a polished public presence.',
    longDescription:
      'Binary Hub is a business website built for clarity and conversion. The design prioritizes brand presence, readable service messaging, and a modern layout that works across desktop and mobile.',
    image: binaryImage,
    technologies: ['React', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://binaryhub.co/',
  },
  {
    id: 13,
    category: 'business',
    title: 'The Magpie Trek and Tours',
    description:
      'Gilgit-Baltistan tourism company site with seasonal trek packages and activity offerings.',
    longDescription:
      'The Magpie Trek and Tours is a Gilgit-Baltistan based tourist group company offering seasonal tour and activity packages. The site helps travelers explore itineraries, plan adventures, and get in touch for bookings.',
    image: magpieImage,
    technologies: ['Node.js', 'Express', 'MongoDB', 'EJS'],
    liveUrl: 'https://themagpietreksandtours.com/',
  },
];

export default projectsData;
