import { useMemo, useState } from 'react';
import { ArrowSquareOut } from '@phosphor-icons/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import ProjectModal from './ProjectModal';
import projectsData, {
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategoryId,
} from '@/data/projects';

type FilterId = 'all' | ProjectCategoryId;

function padIndex(n: number) {
  return String(n).padStart(2, '0');
}

export default function Portfolio() {
  const { ref, isVisible } = useScrollReveal();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterId>('all');

  const counts = useMemo(() => {
    const map: Record<FilterId, number> = {
      all: projectsData.length,
      saas: 0,
      ems: 0,
      pos: 0,
      business: 0,
    };
    for (const p of projectsData) map[p.category] += 1;
    return map;
  }, []);

  const visible = useMemo(
    () => (filter === 'all' ? projectsData : projectsData.filter((p) => p.category === filter)),
    [filter]
  );

  const groups = useMemo(() => {
    if (filter !== 'all') {
      const cat = PROJECT_CATEGORIES.find((c) => c.id === filter)!;
      return [{ category: cat, projects: visible }];
    }
    return PROJECT_CATEGORIES.map((category) => ({
      category,
      projects: projectsData.filter((p) => p.category === category.id),
    })).filter((g) => g.projects.length > 0);
  }, [filter, visible]);

  let runningIndex = 0;

  return (
    <section
      id="portfolio"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad section-rule transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="portfolio-intro mb-10 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-3">Selected work</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Products, portals &amp; places on the web
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-[color:var(--color-fg-light)] lg:col-span-5 lg:justify-self-end">
          SaaS platforms, employee systems, POS tools, and business sites — each built for clarity,
          speed, and real operators. Browse by category or open a case for the full story. The same
          list lives on the standalone{' '}
          <a className="hero-highlight" href="/work">
            work
          </a>{' '}
          page for search and sharing.
        </p>
      </div>

      <div className="portfolio-filters" role="tablist" aria-label="Filter projects by category">
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'all'}
          className={`portfolio-filter${filter === 'all' ? ' is-active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All <span className="portfolio-filter-count">{padIndex(counts.all)}</span>
        </button>
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={filter === cat.id}
            className={`portfolio-filter${filter === cat.id ? ' is-active' : ''}`}
            onClick={() => setFilter(cat.id)}
          >
            {cat.label} <span className="portfolio-filter-count">{padIndex(counts[cat.id])}</span>
          </button>
        ))}
      </div>

      <div className="portfolio-stack">
        {groups.map((group, groupIndex) => (
          <div key={group.category.id} className="portfolio-group">
            <header className="portfolio-group-head">
              <div className="portfolio-group-index" aria-hidden="true">
                {padIndex(groupIndex + 1)}
              </div>
              <div>
                <h3 className="portfolio-group-title">{group.category.label}</h3>
                <p className="portfolio-group-blurb">{group.category.blurb}</p>
              </div>
              <div className="portfolio-group-rule" aria-hidden="true" />
            </header>

            <div className="portfolio-group-body">
              {group.projects.map((project, i) => {
                runningIndex += 1;
                const index = runningIndex;
                const featured = i === 0 && filter === 'all';
                return (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    index={index}
                    featured={featured}
                    flip={index % 2 === 0}
                    onOpen={() => setSelectedProject(project.id)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={projectsData.find((p) => p.id === selectedProject)!}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

function ProjectRow({
  project,
  index,
  featured,
  flip,
  onOpen,
}: {
  project: Project;
  index: number;
  featured: boolean;
  flip: boolean;
  onOpen: () => void;
}) {
  const categoryLabel =
    PROJECT_CATEGORIES.find((c) => c.id === project.category)?.label ?? project.category;

  return (
    <article
      className={`portfolio-item${featured ? ' is-featured' : ''}${flip ? ' is-flip' : ''}`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="portfolio-media media-frame"
        aria-label={`View details for ${project.title}`}
      >
        <img
          src={project.image}
          alt={`${project.title} — project by Mesum Abbas, Full Stack Developer in Gilgit`}
          loading="lazy"
          decoding="async"
          width={1400}
          height={875}
        />
        <span className="portfolio-media-index" aria-hidden="true">
          {padIndex(index)}
        </span>
      </button>

      <div className="portfolio-copy">
        <div className="portfolio-copy-meta">
          <span className="meta-label">{categoryLabel}</span>
          <span className="portfolio-dot" aria-hidden="true" />
          <span className="meta-label">{padIndex(index)}</span>
        </div>
        <h4 className="portfolio-title">{project.title}</h4>
        <p className="portfolio-desc">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 5 : 4).map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
        <div className="hero-cta mt-6">
          <button type="button" className="button" onClick={onOpen}>
            Case details
          </button>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-resume-link"
            aria-label={`Live site for ${project.title}`}
          >
            Live <ArrowSquareOut weight="regular" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
