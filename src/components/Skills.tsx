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
      className={`section-pad section-rule transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div>
        <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">Skills &amp; stack</p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Full stack toolkit for SaaS, MVPs &amp; web apps
            </h2>
          </div>
          <p className="text-[color:var(--color-fg)] lg:col-span-5">
            React, Node.js, and cloud tools used to ship production software for teams in Gilgit
            and across Pakistan.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Skills categories"
          className="mb-8 flex max-w-full flex-wrap gap-x-6 gap-y-2 border-b border-[color:var(--color-border)]"
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
              className={`nav-link border-0 bg-transparent pb-3 ${
                activeTab === tab.id ? 'active' : ''
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
          className="hairline-list"
        >
          {skills.map((skill) => {
            const IconComponent = iconMap[skill.name] || Code;
            return (
              <div
                key={skill.name}
                className="flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:gap-8"
              >
                <div className="flex items-center gap-3 sm:w-52 sm:shrink-0">
                  <IconComponent weight="regular" className="h-4 w-4 text-[color:var(--color-accent)]" />
                  <h3 className="font-display text-lg font-semibold">{skill.name}</h3>
                </div>
                <p className="flex-1 text-sm text-[color:var(--color-fg-light)]">
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
