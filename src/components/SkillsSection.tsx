import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolio-data';
import { Server, Layout, Smartphone, Database, Check } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'backend', label: 'Backend & Core', match: 'Backend & Architecture' },
    { id: 'frontend', label: 'Frontend & Web', match: 'Frontend & Interactive Web' },
    { id: 'mobile', label: 'Mobile Apps', match: 'Mobile Application Development' },
    { id: 'devops', label: 'Data & DevOps', match: 'Databases & DevOps' },
  ];

  const filteredCategories = selectedFilter === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((cat) => {
        const activeTab = filterTabs.find((t) => t.id === selectedFilter);
        return activeTab ? cat.title === activeTab.match : true;
      });

  const getCategoryIcon = (title: string) => {
    if (title.includes('Backend')) return <Server className="w-5 h-5 text-[#e32b3c]" />;
    if (title.includes('Frontend')) return <Layout className="w-5 h-5 text-[#e32b3c]" />;
    if (title.includes('Mobile')) return <Smartphone className="w-5 h-5 text-[#e32b3c]" />;
    return <Database className="w-5 h-5 text-[#e32b3c]" />;
  };

  return (
    <section id="skills" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal reveal-up">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#e32b3c] font-semibold mb-2">
              02. Technical Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#f2efeb]">
              Core Architecture & Tech Stack
            </h2>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#141414] border border-white/10 rounded-lg self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedFilter === tab.id
                    ? 'bg-[#e32b3c] text-white shadow-sm'
                    : 'text-[#a09c9a] hover:text-[#f2efeb] hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((cat, idx) => (
            <div
              key={cat.title}
              className="p-8 bg-[#121212] border border-white/10 rounded-lg hover:border-white/20 transition-all reveal reveal-up"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-md bg-white/5 border border-white/10">
                  {getCategoryIcon(cat.title)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f2efeb] tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#a09c9a] mt-0.5">
                    {cat.summary}
                  </p>
                </div>
              </div>

              {/* Skills List — Clean unboxed text with separators per anti-slop guidelines */}
              <div className="divide-y divide-white/5 mt-6">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="py-3.5 flex items-center justify-between gap-4 group hover:bg-white/[0.02] px-2 rounded transition-colors"
                  >
                    <div>
                      <div className="text-sm font-semibold text-[#f2efeb] group-hover:text-[#e32b3c] transition-colors">
                        {skill.name}
                      </div>
                      <div className="text-xs text-[#a09c9a] mt-0.5">
                        {skill.focus}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-mono text-[#a09c9a] tracking-wider uppercase">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
