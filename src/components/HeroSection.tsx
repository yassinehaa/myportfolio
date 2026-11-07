import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, MapPin, Terminal, Code2, Layers, Maximize2, X, Sparkles } from 'lucide-react';
import { PORTFOLIO_OWNER } from '../data/portfolio-data';
import { MagneticWrapper } from './MagneticWrapper';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [counts, setCounts] = useState({ projects: 0, year: 2020, verified: 0 });
  const [fullscreenPortraitOpen, setFullscreenPortraitOpen] = useState(false);
  const [portraitTransform, setPortraitTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const portraitRef = useRef<HTMLDivElement>(null);

  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    if (isTouch || !portraitRef.current) return;

    const rect = portraitRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    // Smooth clamped rotation between -7 and +7 degrees
    const rotateY = ((mouseX / width) - 0.5) * 14;
    const rotateX = ((mouseY / height) - 0.5) * -14;

    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;

    setPortraitTransform({
      rotateX,
      rotateY,
      glareX,
      glareY,
      isHovered: true,
    });
  };

  const handlePortraitMouseLeave = () => {
    setPortraitTransform((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      isHovered: false,
    }));
  };

  // Genuine numerical counter animation upon mount/intersection
  useEffect(() => {
    let startTime: number;
    const duration = 1200; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        projects: Math.round(ease * 6),
        year: Math.round(2020 + ease * 5), // 2025
        verified: Math.round(ease * 100),
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(step);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const headlineWords = [
    'ENGINEERING',
    'RESILIENT',
    'BACKENDS',
    '&',
    'FLUID',
    'APPLICATIONS',
  ];

  // Close fullscreen portrait on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreenPortraitOpen(false);
    };
    if (fullscreenPortraitOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullscreenPortraitOpen]);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 md:pt-36 pb-16 flex flex-col justify-between overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#e32b3c]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center">
        {/* Top Kicker Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-[#a09c9a]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#e32b3c]" />
            <span className="font-semibold text-[#f2efeb] uppercase tracking-wider">
              {PORTFOLIO_OWNER.role}
            </span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#e32b3c]" />
              {PORTFOLIO_OWNER.location}
            </span>
          </div>
          <div className="font-accent text-lg text-[#e32b3c] -rotate-1 hidden sm:block">
            Crafting resilient backends & fluid apps
          </div>
        </div>

        {/* 2-Column Split: Typographic Column + Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Column 1: Headline & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Split Word Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-display leading-[0.94] tracking-tight uppercase text-[#f2efeb] mb-6">
              {headlineWords.map((word, idx) => (
                <span key={idx} className="hero-word-wrap">
                  <span
                    className="hero-word"
                    style={{ animationDelay: `${idx * 75 + 100}ms` }}
                  >
                    {word === '&' ? (
                      <span className="text-[#e32b3c]">{word}</span>
                    ) : (
                      word
                    )}
                  </span>
                </span>
              ))}
            </h1>

            {/* Sub-text Narrative */}
            <p className="text-base sm:text-lg text-[#a09c9a] max-w-xl leading-relaxed mb-8">
              Hi, I’m <span className="text-[#f2efeb] font-semibold">{PORTFOLIO_OWNER.fullName}</span>. 
              I design and engineer backend architectures with <span className="text-[#f2efeb]">Java & Spring Boot</span>, 
              and build responsive, cross-platform user experiences with <span className="text-[#f2efeb]">Angular, React & React Native</span>.
            </p>

            {/* CTAs with Spring Easing & Magnetic Pull */}
            <div className="flex flex-wrap items-center gap-4 hero-cta-btn">
              <MagneticWrapper strength={0.22}>
                <a
                  href="#projects"
                  className="btn-lift flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#e32b3c] hover:bg-[#c82231] rounded-md transition-all shadow-md shadow-[#e32b3c]/20"
                >
                  <span>Explore Verified Works</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
              </MagneticWrapper>

              <MagneticWrapper strength={0.18}>
                <a
                  href="#contact"
                  className="btn-lift flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#f2efeb] hover:text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition-all"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="w-4 h-4 text-[#a09c9a]" />
                </a>
              </MagneticWrapper>

              <button
                onClick={onOpenResume}
                className="text-xs sm:text-sm text-[#a09c9a] hover:text-[#f2efeb] transition-colors py-2 px-3 underline decoration-white/20 underline-offset-4"
              >
                Inspect CV Overview
              </button>
            </div>
          </div>

          {/* Column 2: Editorial Portrait Frame with Interactive Cursor Effects */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md group select-none">
              {/* Outer breathing ambient glow frame */}
              <div
                className={`absolute -inset-2 bg-gradient-to-r from-[#e32b3c]/50 via-white/10 to-[#e32b3c]/20 rounded-2xl blur-md transition-opacity duration-500 ${
                  portraitTransform.isHovered ? 'opacity-90' : 'opacity-40'
                }`}
              />

              {/* 3D Perspective Tilt Card */}
              <div
                ref={portraitRef}
                onMouseMove={handlePortraitMouseMove}
                onMouseLeave={handlePortraitMouseLeave}
                onClick={() => setFullscreenPortraitOpen(true)}
                data-cursor="portrait"
                role="button"
                tabIndex={0}
                aria-label="View Yassine Hanini portrait"
                className="relative rounded-xl overflow-hidden bg-[#141414] border border-white/15 shadow-2xl cursor-pointer will-change-transform"
                style={{
                  transform: portraitTransform.isHovered
                    ? `perspective(1000px) rotateX(${portraitTransform.rotateX.toFixed(2)}deg) rotateY(${portraitTransform.rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                  transition: portraitTransform.isHovered
                    ? 'transform 0.08s ease-out'
                    : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Image Container with Framing */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#0d0d0d]">
                  <img
                    src={PORTFOLIO_OWNER.portraitImage}
                    alt="Yassine Hanini - Full-Stack Developer"
                    className={`w-full h-full object-cover object-[center_20%] contrast-110 transition-all duration-700 ease-out ${
                      portraitTransform.isHovered ? 'scale-105 contrast-125 brightness-105' : 'scale-100'
                    }`}
                    loading="eager"
                  />

                  {/* Dynamic Cursor Light Sheen / Glass Glare */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                    style={{
                      background: `radial-gradient(circle 320px at ${portraitTransform.glareX}% ${portraitTransform.glareY}%, rgba(255, 255, 255, 0.28) 0%, rgba(227, 43, 60, 0.12) 35%, transparent 70%)`,
                      opacity: portraitTransform.isHovered ? 1 : 0,
                    }}
                  />

                  {/* Camera Reticle Viewfinder Corner Accents */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-4 pointer-events-none transition-all duration-500 ${
                      portraitTransform.isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    {/* Top-Left Bracket */}
                    <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#e32b3c]" />
                    {/* Top-Right Bracket */}
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#e32b3c]" />
                    {/* Bottom-Left Bracket */}
                    <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#e32b3c]" />
                    {/* Bottom-Right Bracket */}
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#e32b3c]" />
                  </div>

                  {/* Top-Right Pill Floating Badge with 3D Depth */}
                  <div
                    className="absolute top-3.5 right-3.5 px-2.5 py-1 bg-[#090909]/80 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono text-[#f2efeb] flex items-center gap-1.5 transition-transform duration-200 shadow-lg"
                    style={{
                      transform: portraitTransform.isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e32b3c] animate-pulse" />
                    <span>VERIFIED IDENTITY</span>
                  </div>

                  {/* Hover Quick Prompt Pill */}
                  <div
                    className={`absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[10px] text-white/80 flex items-center gap-1 transition-all duration-300 ${
                      portraitTransform.isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <Maximize2 className="w-3 h-3 text-[#e32b3c]" />
                    <span>Expand</span>
                  </div>
                </div>

                {/* Editorial Overlay Kicker with 3D Depth */}
                <div
                  className="p-4 bg-[#141414]/95 border-t border-white/10 flex items-center justify-between text-xs transition-transform duration-200"
                  style={{
                    transform: portraitTransform.isHovered ? 'translateZ(26px)' : 'translateZ(0px)',
                  }}
                >
                  <div>
                    <span className="block font-semibold text-[#f2efeb]">Yassine Hanini</span>
                    <span className="text-[#a09c9a]">Backend & Web Engineer</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[#e32b3c] tabular-nums font-medium">Béni Mellal</span>
                    <span className="block text-[10px] text-[#a09c9a]">Morocco · GMT+1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantitative Proof Strip (Full-width row below split per Design Constitution) */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-3xl md:text-4xl font-display text-[#f2efeb] tabular-nums">
              {counts.projects}
            </div>
            <div className="text-xs text-[#a09c9a] uppercase tracking-wider mt-1">
              Verified Source Projects
            </div>
          </div>

          <div>
            <div className="text-3xl md:text-4xl font-display text-[#e32b3c] tabular-nums">
              Spring Boot
            </div>
            <div className="text-xs text-[#a09c9a] uppercase tracking-wider mt-1">
              Backend Specialization
            </div>
          </div>

          <div>
            <div className="text-3xl md:text-4xl font-display text-[#f2efeb] tabular-nums">
              {counts.year}
            </div>
            <div className="text-xs text-[#a09c9a] uppercase tracking-wider mt-1">
              Maktoubteck Platform Tenure
            </div>
          </div>

          <div>
            <div className="text-3xl md:text-4xl font-display text-[#f2efeb] tabular-nums">
              {counts.verified}%
            </div>
            <div className="text-xs text-[#a09c9a] uppercase tracking-wider mt-1">
              Genuine Technical Facts
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Portrait Lightbox Modal */}
      {fullscreenPortraitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <div
            onClick={() => setFullscreenPortraitOpen(false)}
            className="absolute inset-0 bg-[#090909]/90 backdrop-blur-md transition-opacity animate-fadeIn cursor-pointer"
          />

          <div className="relative max-w-lg w-full bg-[#121212] border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-10 animate-scaleUp">
            <div className="p-4 bg-[#141414] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#e32b3c]" />
                <span className="font-semibold text-[#f2efeb]">Yassine Hanini · Verified Portrait</span>
              </div>
              <button
                onClick={() => setFullscreenPortraitOpen(false)}
                className="p-1.5 text-[#a09c9a] hover:text-[#f2efeb] hover:bg-white/5 rounded-full transition-colors"
                aria-label="Close portrait view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[9/16] max-h-[72vh] w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center p-2">
              <img
                src={PORTFOLIO_OWNER.portraitImage}
                alt="Yassine Hanini high-resolution portrait"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <div className="p-4 bg-[#141414] border-t border-white/10 flex items-center justify-between text-xs text-[#a09c9a]">
              <span>Béni Mellal, Morocco · Full-Stack Developer</span>
              <span className="font-mono text-[#e32b3c]">[ESC] to Close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
