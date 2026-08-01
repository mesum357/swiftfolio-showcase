import { useEffect } from 'react';
import { X, ArrowSquareOut, GithubLogo } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import type { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);

    const modal = document.getElementById('project-modal');
    const focusableElements = modal?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('keydown', handleTab);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md animate-fade-in-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        id="project-modal"
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-border/80 bg-card shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-border bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Close modal"
        >
          <X weight="bold" className="h-5 w-5 text-foreground" />
        </button>

        <div className="relative h-64 overflow-hidden rounded-t-[2rem] sm:h-80">
          <img
            src={project.image}
            alt={`${project.title} — project by Mesum Abbas`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        <div className="p-8">
          <h2 id="modal-title" className="mb-4 font-display text-3xl font-bold text-foreground">
            {project.title}
          </h2>

          <p className="mb-6 leading-relaxed text-muted-foreground">{project.longDescription}</p>

          <div className="mb-6">
            <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
              Technologies used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 font-display text-sm font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="solid"
              className="flex-1"
              onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
            >
              <ArrowSquareOut weight="duotone" className="h-4 w-4" />
              Live demo
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
            >
              <GithubLogo weight="duotone" className="h-4 w-4" />
              Source code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
