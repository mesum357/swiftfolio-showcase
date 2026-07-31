import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { 
  Code2, 
  Database, 
  Server, 
  Cloud, 
  Terminal,
  Palette,
  Boxes,
  GitBranch,
  Layers,
  Settings
} from 'lucide-react';
import skillsData from '@/data/skills.json';

type SkillCategory = 'frontend' | 'backend' | 'database' | 'devops' | 'tools';

const iconMap: Record<string, any> = {
  'React': Code2,
  'TypeScript': Code2,
  'Tailwind CSS': Palette,
  'Next.js': Layers,
  'Framer Motion': Boxes,
  'Node.js': Server,
  'Express': Server,
  'GraphQL': Database,
  'Python': Terminal,
  'PostgreSQL': Database,
  'MongoDB': Database,
  'Redis': Database,
  'Prisma': Database,
  'Docker': Boxes,
  'AWS': Cloud,
  'CI/CD': GitBranch,
  'Kubernetes': Cloud,
  'Git': GitBranch,
  'VS Code': Terminal,
  'Figma': Palette,
  'Jest': Settings,
};

export default function Skills() {
  const { ref, isVisible } = useScrollReveal();
  const [activeTab, setActiveTab] = useState<SkillCategory>('frontend');

  const tabs = [
    { id: 'frontend' as SkillCategory, label: 'Frontend' },
    { id: 'backend' as SkillCategory, label: 'Backend' },
    { id: 'database' as SkillCategory, label: 'Database' },
    { id: 'devops' as SkillCategory, label: 'DevOps' },
    { id: 'tools' as SkillCategory, label: 'Tools' },
  ];

  const skills = skillsData[activeTab];

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-28 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">Skills &amp; Expertise</p>
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Full stack toolkit for SaaS, MVPs &amp; web apps
            </h2>
          </div>
          <p className="text-muted-foreground lg:col-span-5">
            Technologies used by Full Stack Developers in Gilgit and Web Developers in Gilgit
            Baltistan to ship production software across Pakistan.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          role="tablist"
          aria-label="Skills categories"
          className="mb-12 flex flex-wrap gap-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
                  const nextIndex = (currentIndex + 1) % tabs.length;
                  setActiveTab(tabs[nextIndex].id);
                } else if (e.key === 'ArrowLeft') {
                  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
                  const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                  setActiveTab(tabs[prevIndex].id);
                }
              }}
              className={`cursor-pointer rounded-full px-5 py-2.5 font-display text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.name] || Code2;
            return (
              <div
                key={skill.name}
                className="group rounded-[1.5rem] border border-border bg-card/50 p-6 transition-colors hover:border-primary/40"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-3 flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-primary/60 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-foreground">{skill.name}</h3>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
