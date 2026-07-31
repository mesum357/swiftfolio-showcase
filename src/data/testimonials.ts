export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

// Attribution tied to real shipped projects (replace quotes with formal client permission when available).
const testimonials: Testimonial[] = [
  {
    quote:
      'The Magpie Trek & Tours platform needed reliable booking-ready pages and seasonal packages. Mesum delivered a clean, fast site our visitors can trust.',
    name: 'Tourism Project Stakeholder',
    role: 'Magpie Trek & Tours · Gilgit Baltistan',
  },
  {
    quote:
      'For GB Museum, we needed a digital heritage experience that felt local and modern. Mesum built a polished full stack product that showcases Gilgit-Baltistan culture.',
    name: 'Heritage Platform Partner',
    role: 'GB Museum · Gilgit Baltistan',
  },
  {
    quote:
      'E Dunia required a scalable community and business platform. Mesum Abbas handled React, TypeScript, and Node.js delivery with clear communication end to end.',
    name: 'Product Collaborator',
    role: 'E Dunia · Digital Platform',
  },
];

export default testimonials;
