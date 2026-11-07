import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Linkedin, Github, MapPin, ExternalLink } from 'lucide-react';
import { PORTFOLIO_OWNER, VERIFIED_EXPERIENCES, VERIFIED_PROJECTS, SKILL_CATEGORIES } from '../data/portfolio-data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#090909]/90 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#141414] border border-white/15 rounded-xl shadow-2xl overflow-y-auto flex flex-col z-10">
        {/* Top Sticky Toolbar */}
        <div className="sticky top-0 bg-[#141414]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between gap-4 z-20 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e32b3c]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f2efeb]">
              Curriculum Vitae · Yassine Hanini
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="btn-lift px-3 py-1.5 bg-[#e32b3c] hover:bg-[#c82231] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close CV modal"
              className="p-1.5 text-[#a09c9a] hover:text-[#f2efeb] hover:bg-white/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Content Document */}
        <div className="p-8 md:p-12 space-y-8 bg-[#121212] text-[#f2efeb] print:bg-white print:text-black print:p-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-6 print:border-black/20">
            <div>
              <h1 className="text-3xl md:text-4xl font-display uppercase tracking-wide text-[#f2efeb] print:text-black mb-1">
                {PORTFOLIO_OWNER.fullName}
              </h1>
              <div className="text-base text-[#e32b3c] font-semibold print:text-red-700 mb-3">
                {PORTFOLIO_OWNER.role}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#a09c9a] print:text-neutral-700">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#e32b3c]" />
                  {PORTFOLIO_OWNER.location}
                </span>
                <span>·</span>
                <a href={`mailto:${PORTFOLIO_OWNER.email}`} className="text-[#f2efeb] print:text-black hover:underline">
                  {PORTFOLIO_OWNER.email}
                </a>
                <span>·</span>
                <a href={PORTFOLIO_OWNER.linkedin} target="_blank" rel="noreferrer" className="text-[#f2efeb] print:text-black hover:underline">
                  linkedin.com/in/yassineha
                </a>
                <span>·</span>
                <a href={PORTFOLIO_OWNER.github} target="_blank" rel="noreferrer" className="text-[#f2efeb] print:text-black hover:underline">
                  github.com/yassinehaa
                </a>
              </div>
            </div>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black shadow-lg">
              <img
                src={PORTFOLIO_OWNER.portraitImage}
                alt={PORTFOLIO_OWNER.fullName}
                className="w-full h-full object-cover object-[center_20%] grayscale"
              />
            </div>
          </div>

          {/* Profile Summary */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#e32b3c] print:text-red-700 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm text-[#a09c9a] print:text-neutral-800 leading-relaxed">
              {PORTFOLIO_OWNER.bio}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#e32b3c] print:text-red-700 mb-4">
              Work Experience
            </h2>
            {VERIFIED_EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="space-y-2 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="text-base font-bold text-[#f2efeb] print:text-black">
                    {exp.role} <span className="font-normal text-[#a09c9a] print:text-neutral-600">at</span> {exp.company}
                  </div>
                  <div className="text-xs text-[#a09c9a] print:text-neutral-600 font-mono">
                    {exp.period}
                  </div>
                </div>
                <p className="text-xs text-[#a09c9a] print:text-neutral-700 leading-relaxed">
                  {exp.description}
                </p>
                <ul className="space-y-1 mt-2">
                  {exp.keyResponsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="text-xs text-[#f2efeb] print:text-neutral-800 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e32b3c] print:bg-black shrink-0 mt-1.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key Engineering Projects */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#e32b3c] print:text-red-700 mb-4">
              Highlighted Software Projects
            </h2>
            <div className="space-y-4">
              {VERIFIED_PROJECTS.slice(0, 4).map((proj) => (
                <div key={proj.id} className="p-4 bg-white/[0.02] print:bg-transparent border border-white/5 print:border-black/10 rounded">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <span className="text-sm font-bold text-[#f2efeb] print:text-black">
                      {proj.title} <span className="text-xs font-normal text-[#e32b3c] print:text-red-700">({proj.category})</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#a09c9a] print:text-neutral-600">
                      {proj.technologies.slice(0, 4).join(' · ')}
                    </span>
                  </div>
                  <p className="text-xs text-[#a09c9a] print:text-neutral-700 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Breakdown */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#e32b3c] print:text-red-700 mb-3">
              Technical Skill Matrix
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="p-3 bg-white/[0.02] border border-white/5 rounded print:border-black/10">
                  <span className="font-semibold text-[#f2efeb] print:text-black block mb-1">
                    {cat.title}
                  </span>
                  <div className="text-[#a09c9a] print:text-neutral-700">
                    {cat.skills.map((s) => s.name).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
