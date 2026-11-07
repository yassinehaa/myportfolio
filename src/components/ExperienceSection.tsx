import React from 'react';
import { VERIFIED_EXPERIENCES } from '../data/portfolio-data';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-14 reveal reveal-up">
          <div className="text-xs uppercase tracking-widest text-[#e32b3c] font-semibold mb-2">
            03. Career Timeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#f2efeb]">
            Verified Professional Experience
          </h2>
          <p className="text-sm text-[#a09c9a] mt-2 max-w-2xl">
            Real production engineering history focusing on verified codebases, scalable services, and agile cross-functional delivery.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/10 pl-6 md:pl-10 space-y-12">
          {VERIFIED_EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative reveal reveal-left">
              {/* Timeline dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#090909] border-2 border-[#e32b3c] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e32b3c]" />
              </div>

              {/* Card Container */}
              <div className="p-8 bg-[#121212] border border-white/10 rounded-lg hover:border-white/20 transition-all">
                {/* Header Meta */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#f2efeb] tracking-tight">
                      {exp.role} <span className="text-[#e32b3c]">@ {exp.company}</span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#a09c9a] mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#e32b3c]" />
                        {exp.period}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#a09c9a]" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 text-[#f2efeb] rounded self-start md:self-auto">
                    Full-Time Production
                  </span>
                </div>

                {/* Scope Description */}
                <p className="text-sm text-[#a09c9a] leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2.5 mb-6">
                  {exp.keyResponsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2.5 text-xs text-[#f2efeb]">
                      <CheckCircle2 className="w-4 h-4 text-[#e32b3c] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies Used — Clean unboxed text with separators */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs text-[#a09c9a]">
                  <span className="font-semibold text-[#f2efeb]">Tech Stack:</span>
                  {exp.technologies.map((tech, tIdx) => (
                    <React.Fragment key={tech}>
                      <span className="text-[#f2efeb] font-medium">{tech}</span>
                      {tIdx < exp.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-white/20">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
