import React from 'react';
import { PORTFOLIO_OWNER } from '../data/portfolio-data';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 border-t border-white/10 bg-[#090909] text-[#a09c9a] text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Footer Strip */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/5">
          <div>
            <span className="text-2xl font-display uppercase tracking-wider text-[#f2efeb] block mb-1">
              {PORTFOLIO_OWNER.fullName}
            </span>
            <p className="text-xs text-[#a09c9a]">
              Full-Stack Developer · Backend Systems · Web & Mobile Architecture
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PORTFOLIO_OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#f2efeb] hover:text-[#e32b3c] border border-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PORTFOLIO_OWNER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#f2efeb] hover:text-[#e32b3c] border border-white/10 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PORTFOLIO_OWNER.email}`}
              aria-label="Send Email"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#f2efeb] hover:text-[#e32b3c] border border-white/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              title="Return to top"
              className="btn-lift flex items-center gap-1.5 px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-[#f2efeb] border border-white/10 transition-all font-semibold uppercase tracking-wider text-[11px]"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Footer Meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#a09c9a]/80">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_OWNER.fullName}. All rights reserved.
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span>Crafted with precision in Béni Mellal, Morocco</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#e32b3c]">Verified Source Code Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
