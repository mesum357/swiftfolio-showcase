import { CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import LinkedInBadge from '@/components/LinkedInBadge';

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  const timeline = [
    { year: '2024', title: 'Senior Full Stack Developer', company: 'Binary Hub' },
    { year: '2023', title: 'Full Stack Developer', company: 'Binary Hub' },
    { year: '2022', title: 'Frontend Developer', company: 'Binary Hub' },
  ];

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              About Me
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate about creating exceptional digital experiences through clean code and innovative solutions
            </p>
          </div>

          {/* Bio */}
          <div className="glass rounded-2xl p-8 shadow-lg mb-12">
            <p className="text-foreground leading-relaxed mb-4">
              I'm Mesum Abbas, a professional Web Developer and Full Stack Developer based in Gilgit, Gilgit Baltistan (GB), with over 3 years of experience building scalable web applications. 
              My journey in tech started with a curiosity for how things work, which evolved into a passion 
              for creating elegant solutions to complex problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              As one of the leading Web Developers in Gilgit Baltistan, I specialize in modern JavaScript frameworks, cloud architecture, and creating seamless user 
              experiences. I provide Full Stack Development services to clients in Gilgit, GB, and beyond. When I'm not coding, you'll find me contributing to open-source projects, writing 
              technical articles, or exploring the latest tech trends.
            </p>
          </div>

          {/* LinkedIn */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">Connect</h3>
              <p className="text-muted-foreground">
                Prefer networking? Here’s my LinkedIn profile badge.
              </p>
            </div>
            <LinkedInBadge />
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-6">Experience Timeline</h3>
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 glass rounded-xl p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                      {item.year}
                    </span>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
