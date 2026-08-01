import { useState } from 'react';
import {
  PaperPlaneTilt,
  CheckCircle,
  EnvelopeSimple,
  MapPin,
  Clock,
} from '@phosphor-icons/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactForm() {
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: 'general',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully!', {
        description: "I'll get back to you as soon as possible.",
        icon: <CheckCircle weight="fill" className="h-5 w-5" />,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        inquiryType: 'general',
        message: '',
      });
      setErrors({});
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const fieldClass =
    'w-full rounded-2xl border bg-background/80 px-4 py-3.5 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring';

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Get in touch</p>
            <h2 className="font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl">
              Hire Mesum Abbas — Web &amp; Full Stack Developer in Gilgit
            </h2>
            <p className="mt-5 text-muted-foreground">
              Searching for Web Developers in Gilgit or Full Stack Developers in Pakistan? Reach
              out for freelance, SaaS builds, MVP launches, and remote collaboration.
            </p>

            <address className="mt-10 space-y-3 not-italic">
              <a
                href="mailto:hello@mesumabbas.online"
                className="glass-panel flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-primary/40"
              >
                <span className="icon-box">
                  <EnvelopeSimple weight="duotone" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-foreground">Email</span>
                  <span className="block text-sm text-muted-foreground">hello@mesumabbas.online</span>
                </span>
              </a>
              <div className="glass-panel flex items-center gap-4 rounded-2xl p-4">
                <span className="icon-box">
                  <MapPin weight="duotone" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-foreground">Location</span>
                  <span className="block text-sm text-muted-foreground">
                    Gilgit, Gilgit Baltistan (GB), Pakistan
                  </span>
                </span>
              </div>
              <div className="glass-panel flex items-center gap-4 rounded-2xl p-4">
                <span className="icon-box">
                  <Clock weight="duotone" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-foreground">Availability</span>
                  <span className="block text-sm text-muted-foreground">Open to freelance &amp; full-time</span>
                </span>
              </div>
            </address>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass-panel space-y-5 rounded-[2rem] p-7 md:p-9 lg:col-span-7"
            noValidate
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${fieldClass} ${errors.name ? 'border-destructive' : 'border-border'}`}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-destructive">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${fieldClass} ${errors.email ? 'border-destructive' : 'border-border'}`}
                placeholder="your.email@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-destructive">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${fieldClass} border-border`}
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label htmlFor="inquiryType" className="mb-2 block text-sm font-medium text-foreground">
                  Inquiry type
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className={`${fieldClass} border-border`}
                >
                  <option value="general">General</option>
                  <option value="project">Project</option>
                  <option value="freelance">Freelance</option>
                  <option value="fulltime">Full-time</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`${fieldClass} resize-none ${
                  errors.message ? 'border-destructive' : 'border-border'
                }`}
                placeholder="Tell me about your project..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-destructive">
                  {errors.message}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" variant="solid" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  <PaperPlaneTilt weight="fill" className="h-5 w-5" />
                  Send message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
