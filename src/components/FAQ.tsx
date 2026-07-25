import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import faq from '@/data/faq';

export default function FAQ() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="faq"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-28 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left: heading */}
          <div className="lg:col-span-2">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Questions about Full Stack, SaaS &amp; MVP work
            </h2>
            <p className="mt-4 text-muted-foreground">
              Answers about Mesum Abbas, Full Stack Developers in Gilgit and Pakistan, SaaS
              development, and MVP development. Still have a question? Use the contact form below.
            </p>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
