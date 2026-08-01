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
      className={`section-pad transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-5">FAQ</p>
            <h2 className="font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl">
              Answers for Web &amp; Full Stack Developers in Gilgit
            </h2>
            <p className="mt-5 text-muted-foreground">
              About Mesum Abbas, Mesum Abas searches, Web Developers in Gilgit, SaaS, and MVP work.
              Still stuck? Email or hire on Upwork below.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faq.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="overflow-hidden rounded-2xl border border-border/70 bg-card/30 px-5 data-[state=open]:border-primary/30 data-[state=open]:bg-card/60"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-foreground hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
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
