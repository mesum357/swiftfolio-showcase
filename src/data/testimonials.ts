export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

// Placeholder testimonials - edit these with real client feedback.
const testimonials: Testimonial[] = [
  {
    quote:
      'Mesum delivered our platform ahead of schedule and exceeded expectations. The code quality and attention to detail were outstanding.',
    name: 'Client Name',
    role: 'Founder, Tech Startup',
  },
  {
    quote:
      'Working with Mesum was seamless. He understood our vision quickly and translated it into a fast, polished product our users love.',
    name: 'Client Name',
    role: 'Product Manager, Digital Agency',
  },
  {
    quote:
      'Reliable, communicative, and highly skilled. Mesum handled everything from frontend to deployment without a hitch.',
    name: 'Client Name',
    role: 'Director, Local Organization',
  },
];

export default testimonials;
