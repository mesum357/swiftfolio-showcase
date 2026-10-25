import { useEffect } from 'react';
import { X, ArrowSquareOut } from '@phosphor-icons/react';
import type { Project } from '@/data/projects';
import { PROJECT_CATEGORIES } from '@/data/projects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const categoryLabel =
    PROJECT_CATEGORIES.find((c) => c.id === project.category)?.label ?? project.category;

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
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-[color:var(--color-overlay-darker)] p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        id="project-modal"
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-[color:var(--color-fg-bold)] bg-[color:var(--color-bg)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="theme-toggle absolute right-2 top-2 z-10"
          aria-label="Close modal"
        >
          <X weight="bold" className="h-5 w-5" />
        </button>

        <div className="media-frame m-0 border-0 border-b border-[color:var(--color-border)] p-0">
          <img
            src={project.image}
            alt={`${project.title} — project by Mesum Abbas`}
            className="h-64 w-full object-cover sm:h-80"
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="p-8">
          <p className="meta-label mb-2">{categoryLabel}</p>
          <h2 id="modal-title" className="mb-4 font-display text-3xl font-bold">
            {project.title}
          </h2>

          <p className="mb-6 max-w-[55ch] text-[color:var(--color-fg)]">{project.longDescription}</p>

          <div className="mb-6">
            <h3 className="meta-label mb-3">Technologies used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-cta">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button">
              <ArrowSquareOut weight="regular" className="h-4 w-4" />
              Visit live site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
