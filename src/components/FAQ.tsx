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
      className={`section-pad section-rule transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Questions before we start
          </h2>
          <p className="mt-5 text-[color:var(--color-fg-light)]">
            Timelines, stack, and how engagements work. Still stuck? Email or hire on Upwork
            below.
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-[color:var(--color-border)]">
                <AccordionTrigger className="py-5 text-left font-display text-base font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[color:var(--color-fg-light)]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
