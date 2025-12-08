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
      className={`py-20 bg-muted/30 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications. Full Stack Development expertise in Gilgit Baltistan.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          role="tablist"
          aria-label="Skills categories"
          className="flex flex-wrap justify-center gap-2 mb-12"
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
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'glass hover:bg-card hover:text-foreground'
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
                className="glass rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
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
