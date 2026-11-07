/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { PageLoader } from './components/PageLoader';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Background3D } from './components/Background3D';
import { Project } from './data/portfolio-data';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize IntersectionObserver for scroll-reveal animations across all sections
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -15% 0px', // 15% visibility trigger
      threshold: 0.15,
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-[#f2efeb] selection:bg-[#e32b3c] selection:text-white font-sans antialiased overflow-x-hidden relative">
      {/* 3D YH Monogram Interactive Scene in Background */}
      <Background3D />

      {/* Top Hairline Scroll Progress */}
      <ScrollProgress />

      {/* Cinematic Fluid Custom Cursor (Desktop) */}
      <CustomCursor />

      {/* Cinematic Initial Page Loader */}
      {isLoading && (
        <PageLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* Top Navigation */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onReplayIntro={() => setIsLoading(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection onOpenResume={() => setResumeOpen(true)} />

        {/* Cinematic Section Divider Ribbon */}
        <div className="py-4 border-y border-white/5 bg-[#101010] ticker-container select-none" aria-hidden="true">
          <div className="ticker-content flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-[#a09c9a]/70">
            <span>Spring Boot Microservices</span>
            <span className="text-[#e32b3c]">✦</span>
            <span>Angular & React Frontends</span>
            <span className="text-[#e32b3c]">✦</span>
            <span>React Native & Expo Mobile</span>
            <span className="text-[#e32b3c]">✦</span>
            <span>RESTful APIs & JWT Auth</span>
            <span className="text-[#e32b3c]">✦</span>
            <span>MySQL & SQLite Normalized Persistence</span>
            <span className="text-[#e32b3c]">✦</span>
            <span>Docker Containerization</span>
            <span className="text-[#e32b3c]">✦</span>
            <span>Maktoubteck Advertising Platform</span>
            <span className="text-[#e32b3c]">✦</span>
            <span>Spring Boot Microservices</span>
            <span className="text-[#e32b3c]">✦</span>
            <span>Angular & React Frontends</span>
            <span className="text-[#e32b3c]">✦</span>
            <span>React Native & Expo Mobile</span>
            <span className="text-[#e32b3c]">✦</span>
          </div>
        </div>

        {/* 01. About Journey & Philosophy */}
        <AboutSection />

        {/* 02. Technical Capabilities / Stack */}
        <SkillsSection />

        {/* 03. Verified Experience (Maktoubteck) */}
        <ExperienceSection />

        {/* 04. Verified Projects Showcase */}
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 05. Contact & Collaboration */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Curriculum Vitae Viewer Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
