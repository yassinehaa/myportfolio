import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight, Play } from 'lucide-react';
import { MagneticWrapper } from './MagneticWrapper';

interface NavbarProps {
  onOpenResume: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onReplayIntro }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Header shrink observer on sentinel
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Active section observer
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { label: 'Works', href: '#projects', id: 'projects' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Stack', href: '#skills', id: 'skills' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#090909]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40'
            : 'py-5 md:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark (single text element, no extra subtitles) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="text-xl md:text-2xl font-display uppercase tracking-wider text-[#f2efeb] hover:text-[#e32b3c] transition-colors whitespace-nowrap shrink-0"
          >
            Yassine Hanini
          </a>

          {/* Zone 2: 4-5 single-line clean text links */}
          <nav className="hidden md:flex items-center gap-8 text-xs lg:text-sm font-medium tracking-wide uppercase">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                    isActive ? 'text-[#f2efeb] font-semibold' : 'text-[#a09c9a] hover:text-[#f2efeb]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e32b3c] rounded-full transition-all" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary action + modal triggers */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Quick Resume View */}
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#f2efeb] hover:text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-[#a09c9a]" />
              <span>Resume</span>
            </button>

            {/* Primary Action Button with Magnetic Pull */}
            <MagneticWrapper strength={0.2}>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-lift flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#e32b3c] hover:bg-[#c82231] rounded-md transition-all whitespace-nowrap shrink-0 shadow-sm"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </MagneticWrapper>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-[#f2efeb] hover:text-[#e32b3c] focus-visible:outline-[#e32b3c]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu (Strictly capped under 15% viewport where active) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#090909]/98 border-b border-white/10 px-6 py-5 flex flex-col gap-4 text-sm animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-left py-1 text-sm tracking-wide uppercase ${
                  activeSection === link.id ? 'text-[#e32b3c] font-semibold' : 'text-[#a09c9a]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex items-center gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2 text-xs font-medium bg-white/5 rounded text-center text-[#f2efeb]"
              >
                View CV
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
