import { useState } from 'react';
import { ArrowSquareOut, GithubLogo, ArrowRight } from '@phosphor-icons/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import ProjectModal from './ProjectModal';
import projectsData from '@/data/projects';

export default function Portfolio() {
  const { ref, isVisible } = useScrollReveal();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-pad transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto">
        <div className="mb-20 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5">Selected work</p>
            <h2 className="font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl">
              Digital products built to perform
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8">
            Each project reflects a strategic approach to problem solving and user experience —
            fast, scalable, and visually refined web solutions by Mesum Abbas.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {projectsData.map((project, index) => {
            const reverse = index % 2 === 1;
            return (
              <article
                key={project.id}
                className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project.id)}
                  className={`media-bezel relative block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:col-span-7 ${
                    reverse ? 'lg:col-start-6 lg:row-start-1' : ''
                  }`}
                  aria-label={`View details for ${project.title}`}
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-[1.1rem]">
                    <img
                      src={project.image}
                      alt={`${project.title} — project by Mesum Abbas, Full Stack Developer in Gilgit`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                </button>

                <div
                  className={`lg:col-span-5 ${
                    reverse ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border px-3 py-1 font-display text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button size="sm" variant="solid" onClick={() => setSelectedProject(project.id)}>
                      Case details
                      <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label={`Live demo of ${project.title}`}
                      onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                    >
                      <ArrowSquareOut weight="duotone" className="h-4 w-4" />
                      Live
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-label={`Source code of ${project.title}`}
                      onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                    >
                      <GithubLogo weight="duotone" className="h-4 w-4" />
                      Code
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
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
