import { useState } from 'react';
import { Send, CheckCircle2, Mail, MapPin, Clock } from 'lucide-react';
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

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully!', {
        description: "I'll get back to you as soon as possible.",
        icon: <CheckCircle2 className="h-5 w-5" />,
      });

      // Reset form
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-28 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left: contact info */}
          <div className="lg:col-span-2">
            <p className="eyebrow mb-4">Get In Touch</p>
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Hire a Full Stack, SaaS &amp; MVP developer
            </h2>
            <p className="mt-4 text-muted-foreground">
              Looking for Full Stack Developers in Gilgit or Full Stack Developers in Pakistan?
              Reach out — available for freelance, SaaS builds, MVP launches, and remote work.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:hello@mesumabbas.online"
                className="flex items-center gap-4 rounded-[1.25rem] border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <span className="icon-box">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-foreground">Email</span>
                  <span className="block text-sm text-muted-foreground">hello@mesumabbas.online</span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-[1.25rem] border border-border bg-card p-4">
                <span className="icon-box">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-foreground">Location</span>
                  <span className="block text-sm text-muted-foreground">Gilgit, Gilgit Baltistan (GB)</span>
                </span>
              </div>
              <div className="flex items-center gap-4 rounded-[1.25rem] border border-border bg-card p-4">
                <span className="icon-box">
                  <Clock className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-foreground">Availability</span>
                  <span className="block text-sm text-muted-foreground">Open to freelance &amp; full-time</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-[2rem] border border-border bg-card p-8 lg:col-span-3"
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-md border bg-background px-4 py-3 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.name ? 'border-destructive' : 'border-border'
                }`}
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-destructive mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-md border bg-background px-4 py-3 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.email ? 'border-destructive' : 'border-border'
                }`}
                placeholder="your.email@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Subject & Inquiry Type */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label htmlFor="inquiryType" className="block text-sm font-medium text-foreground mb-2">
                  Inquiry Type
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="general">General</option>
                  <option value="project">Project</option>
                  <option value="freelance">Freelance</option>
                  <option value="fulltime">Full-time</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full resize-none rounded-md border bg-background px-4 py-3 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.message ? 'border-destructive' : 'border-border'
                }`}
                placeholder="Tell me about your project..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-destructive mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" variant="mint" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
