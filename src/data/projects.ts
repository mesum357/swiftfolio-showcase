import eduniaImage from '@/assets/projects/edunia.png';
import museumImage from '@/assets/projects/museum.png';
import magpieImage from '@/assets/projects/magpie.png';
import vitalgeoImage from '@/assets/projects/vitalgeo.png';
import gbitImage from '@/assets/projects/gbit.png';

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'E Dunia',
    description: 'Connecting communities, empowering businesses, and creating opportunities across E - Dunia through innovative digital solutions.',
    longDescription: 'E Dunia is a comprehensive digital platform that connects communities, empowers businesses, and creates opportunities across the region. The platform provides innovative digital solutions to facilitate communication, commerce, and collaboration. Built with modern web technologies, it offers a seamless user experience with real-time features and robust functionality.',
    image: eduniaImage,
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'WebSocket'],
    liveUrl: 'https://www.edunia.org/',
    githubUrl: 'https://github.com/mesum357/Nexus-Frontend'
  },
  {
    id: 2,
    title: 'GB Museum',
    description: 'The GB Museum serves as a guardian of Gilgit-Baltistan\'s extraordinary cultural heritage. We are dedicated to preserving, documenting, and showcasing the rich history, traditions, and stories of our people for current and future generations.',
    longDescription: 'The GB Museum is a digital heritage platform dedicated to preserving and showcasing the rich cultural heritage of Gilgit-Baltistan. The platform serves as a guardian of the region\'s extraordinary history, traditions, and stories. It provides an immersive experience for visitors to explore the cultural treasures, historical artifacts, and traditional practices of the region, ensuring that this valuable heritage is preserved for current and future generations.',
    image: museumImage,
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://gilgit-heritage-hub.onrender.com/',
    githubUrl: 'https://github.com/mesum357/gilgit-heritage-hub'
  },
  {
    id: 3,
    title: 'Magpie Trek & Tours',
    description: 'It is a GB Based Tourist Group Company with different tour packages and activity packages that are season wise.',
    longDescription: 'Magpie Trek & Tours is a Gilgit-Baltistan based tourist group company offering a wide range of tour packages and activity packages tailored to different seasons. The platform provides comprehensive information about various trekking routes, tour packages, and seasonal activities. It helps tourists plan their adventures in the beautiful region of Gilgit-Baltistan with detailed itineraries, pricing, and booking options.',
    image: magpieImage,
    technologies: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Bootstrap'],
    liveUrl: 'https://themagpietreksandtours.com/',
    githubUrl: 'https://github.com/mesum357/Tourist-Group-Website'
  },
  {
    id: 4,
    title: 'VitalGeo Naturals',
    description: 'VitalGeo Naturals (Pvt.) Ltd. is a proud enterprise based in Gilgit-Baltistan, Pakistan, dedicated to providing the world with nature\'s purest gifts — authentic gemstones, rare minerals, and pure Himalayan Shilajit.',
    longDescription: 'VitalGeo Naturals (Pvt.) Ltd. is a proud enterprise based in Gilgit-Baltistan, Pakistan, dedicated to providing the world with nature\'s purest gifts — authentic gemstones, rare minerals, and pure Himalayan Shilajit. Founded and led by Mujahid Ali, the company bridges the rich natural resources of the northern mountains with modern standards of purity, sustainability, and quality. The platform showcases their premium products with detailed information about sourcing, quality assurance, and sustainable practices.',
    image: vitalgeoImage,
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    liveUrl: 'https://vitalgeonaturals.com/',
    githubUrl: 'https://github.com/mesum357/GemstoneFrontend'
  },
  {
    id: 5,
    title: 'GB IT Vision',
    description: 'GB IT Vision is a pioneering initiative launched to empower the talented workforce of Gilgit-Baltistan and across Pakistan. Recognizing the immense potential of the region\'s skilled professionals, we created a platform that connects local talent with global opportunities.',
    longDescription: 'GB IT Vision is a pioneering initiative launched to empower the talented workforce of Gilgit-Baltistan and across Pakistan. Recognizing the immense potential of the region\'s skilled professionals, we created a platform that connects local talent with global opportunities. The platform serves as a bridge between talented professionals and potential employers, offering job listings, skill development resources, and networking opportunities to help professionals advance their careers.',
    image: gbitImage,
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://scogbitvision.com/',
    githubUrl: 'https://github.com/mesum357/SCO-GB-IT-Vision'
  }
];

export default projectsData;

