import React, { useEffect } from 'react';
import { Project } from '../data/portfolio-data';
import { X, Github, ExternalLink, CheckCircle2, Layers, Cpu, Code2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#090909]/85 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#121212] border border-white/15 rounded-xl shadow-2xl overflow-y-auto flex flex-col z-10 animate-scaleUp">
        {/* Sticky Header Bar */}
        <div className="sticky top-0 bg-[#121212]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between gap-4 z-20">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#e32b3c]">
              {project.category} · System Specifications
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#f2efeb] tracking-tight">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-[#a09c9a] hover:text-[#f2efeb] hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Visual */}
          <div className="rounded-lg overflow-hidden border border-white/10 bg-[#181818] aspect-[16/9] max-h-80">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Overview Section */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#a09c9a] font-semibold mb-2">
              System Architecture & Problem Space
            </h4>
            <p className="text-sm sm:text-base text-[#f2efeb] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architectural Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e32b3c]">
                <Layers className="w-4 h-4" />
                <span>Architectural Patterns</span>
              </div>
              <ul className="space-y-2">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#a09c9a] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e32b3c] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e32b3c]">
                <Cpu className="w-4 h-4" />
                <span>Engineering Challenges Solved</span>
              </div>
              <ul className="space-y-2">
                {project.challenges.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#a09c9a] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verified Technologies — Clean unboxed text with separators */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#a09c9a] font-semibold mb-3">
              Verified Technical Stack
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#a09c9a]">
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="font-mono text-[#f2efeb] px-2 py-1 bg-white/5 border border-white/10 rounded">
                    {tech}
                  </span>
                  {idx < project.technologies.length - 1 && (
                    <span aria-hidden="true" className="text-white/20">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="border-t border-white/10 px-6 sm:px-8 py-4 bg-[#141414] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#a09c9a]">
            Verified implementation in Yassine's source repositories.
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lift px-4 py-2 bg-[#e32b3c] hover:bg-[#c82231] text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Inspect Source Repository</span>
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#f2efeb] text-xs font-semibold uppercase tracking-wider rounded border border-white/10 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
