import { useState } from 'react';
import {
  Code,
  Database,
  HardDrives,
  Cloud,
  Terminal,
  Palette,
  Cube,
  GitBranch,
  Stack,
  GearSix,
} from '@phosphor-icons/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import skillsData from '@/data/skills.json';

type SkillCategory = 'frontend' | 'backend' | 'database' | 'devops' | 'tools';

const iconMap: Record<string, typeof Code> = {
  React: Code,
  TypeScript: Code,
  'Tailwind CSS': Palette,
  'Next.js': Stack,
  'Framer Motion': Cube,
  'Node.js': HardDrives,
  Express: HardDrives,
  GraphQL: Database,
  Python: Terminal,
  PostgreSQL: Database,
  MongoDB: Database,
  Redis: Database,
  Prisma: Database,
  Docker: Cube,
  AWS: Cloud,
  'CI/CD': GitBranch,
  Kubernetes: Cloud,
  Git: GitBranch,
  'VS Code': Terminal,
  Figma: Palette,
  Jest: GearSix,
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
      className={`section-pad transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Skills &amp; stack</p>
            <h2 className="font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl">
              Full stack toolkit for SaaS, MVPs &amp; web apps
            </h2>
          </div>
          <p className="text-muted-foreground lg:col-span-5">
            Technologies used by Full Stack Developers in Gilgit and Web Developers in Gilgit
            Baltistan to ship production software across Pakistan.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Skills categories"
          className="mb-10 inline-flex max-w-full flex-wrap gap-1 rounded-full border border-border/70 bg-card/40 p-1.5"
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
                  setActiveTab(tabs[(currentIndex + 1) % tabs.length].id);
                } else if (e.key === 'ArrowLeft') {
                  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
                  setActiveTab(tabs[(currentIndex - 1 + tabs.length) % tabs.length].id);
                }
              }}
              className={`cursor-pointer rounded-full px-4 py-2 font-display text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="divide-y divide-border/60 overflow-hidden rounded-[1.75rem] border border-border/70"
        >
          {skills.map((skill) => {
            const IconComponent = iconMap[skill.name] || Code;
            return (
              <div
                key={skill.name}
                className="group flex flex-col gap-4 bg-card/20 px-6 py-6 transition-colors hover:bg-card/50 sm:flex-row sm:items-start sm:gap-8 sm:px-8"
              >
                <div className="flex items-center gap-4 sm:w-56 sm:shrink-0">
                  <div className="icon-box transition-colors group-hover:border-primary group-hover:bg-primary/10">
                    <IconComponent weight="duotone" className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{skill.name}</h3>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground sm:pt-2.5">
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
