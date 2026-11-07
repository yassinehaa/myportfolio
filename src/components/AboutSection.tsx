import React from 'react';
import { Terminal, ShieldCheck, Database, Cpu, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_OWNER } from '../data/portfolio-data';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-14 reveal reveal-up">
          <div className="text-xs uppercase tracking-widest text-[#e32b3c] font-semibold mb-2">
            01. Background & Engineering Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#f2efeb]">
            Architecting With Precision, Solving Real Problems
          </h2>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Story Column */}
          <div className="lg:col-span-7 space-y-6 text-[#a09c9a] text-base leading-relaxed reveal reveal-up stagger-1">
            <p className="text-[#f2efeb] text-lg font-normal leading-relaxed">
              My path in software engineering is driven by a deep fascination with how complex systems operate behind the screen. 
              While a sleek user interface is what users touch, it is the resilience of backend architecture that guarantees dependability, data integrity, and security under load.
            </p>

            <p>
              I specialize heavily in backend systems using <strong className="text-[#f2efeb]">Java and Spring Boot</strong>, designing RESTful APIs, securing endpoints with JSON Web Tokens, and modeling normalized relational databases in MySQL and SQLite. During my tenure at <strong className="text-[#f2efeb]">Maktoubteck</strong> in late 2025, I engineered backend components for a high-traffic advertising platform, turning architectural requirements into robust, containerized micro-endpoints.
            </p>

            <p>
              Simultaneously, I believe an effective backend engineer must understand the client experience intimately. That is why I develop rich, type-safe web frontends using <strong className="text-[#f2efeb]">Angular, React, and TypeScript</strong>, as well as native-feeling mobile applications with <strong className="text-[#f2efeb]">React Native and Expo</strong>. This full-stack fluency eliminates friction between API contracts and UI states.
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-6 text-xs text-[#a09c9a]">
              <div>
                <span className="text-[#f2efeb] font-semibold block mb-0.5">Primary Location</span>
                <span>Béni Mellal, Morocco (Open to Remote Globally)</span>
              </div>
              <span aria-hidden="true" className="text-white/20 self-center">/</span>
              <div>
                <span className="text-[#f2efeb] font-semibold block mb-0.5">Primary Discipline</span>
                <span>Full-Stack Development (Backend Focus)</span>
              </div>
            </div>
          </div>

          {/* Core Principles Column */}
          <div className="lg:col-span-5 space-y-4 reveal reveal-up stagger-2">
            <div className="p-6 bg-[#121212] border border-white/10 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#e32b3c]" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f2efeb]">
                  Stateless Security & Clean Contracts
                </h3>
              </div>
              <p className="text-xs text-[#a09c9a] leading-relaxed">
                Prioritizing strict token validation, role-based access control (RBAC), and unambiguous DTO schemas so services remain deterministic and safe.
              </p>
            </div>

            <div className="p-6 bg-[#121212] border border-white/10 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-5 h-5 text-[#e32b3c]" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f2efeb]">
                  Relational Rigor & Normalized Schemas
                </h3>
              </div>
              <p className="text-xs text-[#a09c9a] leading-relaxed">
                Deep respect for ACID compliance, indexing strategies, and relational boundaries in MySQL and SQLite that protect data veracity.
              </p>
            </div>

            <div className="p-6 bg-[#121212] border border-white/10 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="w-5 h-5 text-[#e32b3c]" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f2efeb]">
                  Containerized Reproducibility
                </h3>
              </div>
              <p className="text-xs text-[#a09c9a] leading-relaxed">
                Standardizing builds with multi-stage Docker configurations ensuring identical behavior between local development environments and production servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
