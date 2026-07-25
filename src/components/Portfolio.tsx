import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import ProjectModal from './ProjectModal';
import projectsData from '@/data/projects';
import portfolioBanner from '@/assets/img3.jpeg';

export default function Portfolio() {
  const { ref, isVisible } = useScrollReveal();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-28 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* MaXel intro: label | headline | description */}
        <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-start">
          <p className="eyebrow lg:col-span-3">Selected Projects</p>
          <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:col-span-5">
            Crafting Scalable Digital Products That Perform
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:col-span-4">
            Each project reflects a strategic approach to problem solving and user experience. I
            focus on building fast, scalable, and visually refined web solutions.
          </p>
        </div>

        {/* Featured banner image */}
        <div className="media-frame mb-20 aspect-[21/9]">
          <img
            src={portfolioBanner}
            alt="Selected digital product work by Mesum Abbas"
            className="h-full w-full object-cover object-[center_38%]"
            loading="lazy"
          />
        </div>

        {/* Vertical project list — MaXel style */}
        <div className="space-y-20">
          {projectsData.map((project) => (
            <article key={project.id} className="group">
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <h3 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-foreground/30 px-4 py-1 font-display text-xs lowercase tracking-wide text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(project.id)}
                className="media-frame relative block w-full max-w-4xl cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`View details for ${project.title}`}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} — project by Mesum Abbas`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              </button>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button size="sm" variant="mint" onClick={() => setSelectedProject(project.id)}>
                  View Details
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  aria-label={`Live demo of ${project.title}`}
                  onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                >
                  <ExternalLink className="h-4 w-4" />
                  Live
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  aria-label={`Source code of ${project.title}`}
                  onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                >
                  <Github className="h-4 w-4" />
                  Code
                </Button>
              </div>
            </article>
          ))}
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
