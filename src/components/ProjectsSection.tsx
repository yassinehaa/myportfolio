import React, { useState, useRef } from 'react';
import { VERIFIED_PROJECTS, Project } from '../data/portfolio-data';
import { ExternalLink, Github, ArrowUpRight, Code, Eye } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Works', count: VERIFIED_PROJECTS.length },
    {
      id: 'Backend & Full-Stack',
      label: 'Backend & Full-Stack',
      count: VERIFIED_PROJECTS.filter((p) => p.category === 'Backend & Full-Stack').length,
    },
    {
      id: 'Mobile',
      label: 'Mobile Apps',
      count: VERIFIED_PROJECTS.filter((p) => p.category === 'Mobile').length,
    },
    {
      id: 'Web Apps',
      label: 'Web Platforms',
      count: VERIFIED_PROJECTS.filter((p) => p.category === 'Web Apps').length,
    },
  ];

  const filteredProjects = activeCategory === 'all'
    ? VERIFIED_PROJECTS
    : VERIFIED_PROJECTS.filter((p) => p.category === activeCategory);

  // 3D Tilt handler clamped to 4 degrees max
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation between -4 and +4 degrees
    const rotateY = ((mouseX / rect.width) - 0.5) * 8;
    const rotateX = ((mouseY / rect.height) - 0.5) * -8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <section id="projects" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal reveal-up">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#e32b3c] font-semibold mb-2">
              04. Portfolio Projects
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#f2efeb]">
              Featured Systems & Applications
            </h2>
            <p className="text-sm text-[#a09c9a] mt-2 max-w-xl">
              Authentic projects with verified source implementations across backend microservices, mobile UX, and full-stack web platforms.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#141414] border border-white/10 rounded-lg self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#e32b3c] text-white shadow-sm'
                    : 'text-[#a09c9a] hover:text-[#f2efeb] hover:bg-white/5'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid: Dynamic Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {filteredProjects.map((project, idx) => {
            const isWide = project.featured && (idx === 0 || idx === 1);
            return (
              <div
                key={project.id}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`tilt-card group bg-[#121212] border border-white/10 hover:border-white/20 rounded-xl overflow-hidden flex flex-col justify-between transition-all reveal reveal-up ${
                  isWide ? 'lg:col-span-6' : 'lg:col-span-4'
                }`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="tilt-card-inner flex-1 flex flex-col">
                  {/* Image Showcase Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#181818] border-b border-white/10 image-zoom-box">
                    <img
                      src={project.image}
                      alt={`${project.title} project interface`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />

                    {/* Category Overlay Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#090909]/80 backdrop-blur-md rounded text-[11px] font-medium text-[#f2efeb] border border-white/10">
                      {project.category}
                    </div>

                    {/* Quick Action Overlay on Hover */}
                    <div className="absolute inset-0 bg-[#090909]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="px-4 py-2 bg-[#e32b3c] text-white text-xs font-semibold rounded uppercase tracking-wider flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Architecture Deep Dive</span>
                      </button>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title & Tagline */}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-bold text-[#f2efeb] group-hover:text-[#e32b3c] transition-colors">
                          {project.title}
                        </h3>
                        <button
                          onClick={() => onSelectProject(project)}
                          title="View Architecture Details"
                          className="p-1 text-[#a09c9a] hover:text-[#f2efeb] transition-colors"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#e32b3c] font-medium mb-3">
                        {project.subtitle}
                      </p>

                      <p className="text-xs text-[#a09c9a] leading-relaxed mb-6 line-clamp-3">
                        {project.summary}
                      </p>
                    </div>

                    {/* Tech Stack Metadata — Clean unboxed text with separators per anti-slop rules */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#a09c9a] mb-4">
                        {project.technologies.map((tech, tIdx) => (
                          <React.Fragment key={tech}>
                            <span className="text-[#f2efeb] text-[11px] font-mono">{tech}</span>
                            {tIdx < project.technologies.length - 1 && (
                              <span aria-hidden="true" className="text-white/20">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-2">
                        <button
                          onClick={() => onSelectProject(project)}
                          className="text-xs font-semibold text-[#f2efeb] hover:text-[#e32b3c] flex items-center gap-1 transition-colors"
                        >
                          <span>Explore Specs</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#a09c9a] hover:text-[#f2efeb] flex items-center gap-1 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code Repository</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
