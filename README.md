# Yassine Hanini — Premium Multi-Agent Animated Portfolio

A cinematic, editorial developer portfolio engineered for **Yassine Hanini**, Full-Stack Developer specializing in Java, Spring Boot, Angular, React, and mobile development.

Built with a unified multi-agent animation design system adhering to strict performance, accessibility, and anti-slop guidelines.

---

## Architecture & Multi-Agent Structure

This repository was architected through four coordinated agents:

```text
├── index.html                     # Main entry point with Anton, Manrope, Caveat typography
├── metadata.json                  # Application metadata & capabilities
├── animations.css                 # Shared animation design system & easing tokens
├── animations.js                  # Vanilla JS IntersectionObserver & 3D tilt engine
├── site-map.json                  # Complete structural & interactive site blueprint
├── README.md                      # Comprehensive documentation & run instructions
│
├── src/
│   ├── App.tsx                    # Main interactive portfolio interface
│   ├── main.tsx                   # React root entry
│   ├── index.css                  # Tailwind CSS v4 setup & theme variables
│   ├── data/
│   │   └── portfolio-data.ts      # Verified authentic projects, experience & stack data
│   ├── components/
│   │   ├── Navbar.tsx             # 3-Zone sticky header with scroll-shrink & active state
│   │   ├── HeroSection.tsx        # Word-by-word split entrance & spring CTAs
│   │   ├── AboutSection.tsx       # Authentic engineering journey & philosophy
│   │   ├── SkillsSection.tsx      # Categorized technical stack with filter tabs
│   │   ├── ExperienceSection.tsx  # Verified Maktoubteck tenure timeline
│   │   ├── ProjectsSection.tsx    # 3D Tilt project cards with deep-dive modal
│   │   ├── ContactSection.tsx     # Validated contact form, copy email & social links
│   │   ├── Footer.tsx             # Minimalist editorial footer
│   │   ├── ProjectModal.tsx       # Unobstructed deep-dive project drawer
│   │   └── ResumeModal.tsx        # Integrated CV modal viewer & print/download
│   └── assets/
│       └── images/                # High-fidelity project mockups and assets
```

---

## Visual Identity & Design System

- **Background:** `#090909` (Deep Obsidian)
- **Primary Text:** `#f2efeb` (Soft White)
- **Accent:** `#e32b3c` (Cinnabar Red)
- **Muted Text:** `#a09c9a` (Editorial Slate)
- **Display Typography:** `Anton` (Ultra-bold condensed uppercase)
- **Body Typography:** `Manrope` (Clean geometric sans)
- **Accent Typography:** `Caveat` (Humanist organic script)

### Motion Tokens & Timing

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  --dur-fast: 200ms;
  --dur-normal: 500ms;
  --dur-slow: 900ms;
  --stagger: 80ms;
}
```

---

## Key Animations & Interactions

1. **Cinematic Loading Sequence (`PageLoader`):**
   - High-editorial intro displaying owner name, location (*Béni Mellal, Morocco · GMT+1*), and initialization status.
   - Smooth 0% to 100% counter with hairline progress bar and split-shutter curtain exit (`--ease-out-expo`).
   - Quick-dismiss escape hatch (`[ESC]` or click).
2. **Interactive Fluid Custom Cursor (`CustomCursor`):**
   - Central sharp pointer dot + smooth lerped trailing ring.
   - Dynamic contextual hover transformations:
     - Expands with red accent ring on links/buttons.
     - Morphing badge with `"VIEW"` label over project cards.
     - Morphing badge with `"SPECS"` label over image containers.
     - Tactile spring scale compression on click.
   - Ambient soft radial cursor spotlight following mouse coordinates.
   - Automatically disabled on touch screens and under `prefers-reduced-motion`.
3. **Interactive 3D "YH" Monogram Background (`Background3D`):**
   - Procedural extruded 3D "Y" and "H" letters built with Three.js (`ExtrudeGeometry`, titanium PBR material, beveled edges, and cinnabar red wireframe cage).
   - Harmonic floating wave levitation and continuous orbital rotation.
   - Cursor tracking parallax with smooth exponential damping.
   - Scroll-driven depth traversal and dynamic revolving point light.
   - Interactive mode toggle (*Interactive Orbit* vs *Gentle Floating*).
4. **Magnetic Button Micro-Interactions (`MagneticWrapper`):**
   - CTA buttons gently pull toward cursor within proximity for a tactile physical feel.
5. **Hairline Scroll Progress Indicator (`ScrollProgress`):**
   - Fixed 2.5px red indicator tracking real-time reading progress at top of screen.
5. **Cinematic Hero Split Entrance:**
   - Word-by-word masked reveal with `--ease-out-expo`.
   - Spring-scaled primary CTAs (from 0.95 to 1.0) with `--ease-spring`.
6. **Scroll Triggers (`IntersectionObserver`):**
   - 15% visibility threshold triggers without scroll-event overhead.
   - Staggered entrances for cards, text blocks, and technology tags.
7. **Interactive 3D Tilt:**
   - Smooth mouse-tracking cursor tilt restricted to $\le 4^\circ$.
   - Automatically bypassed on touch devices to ensure native touch-scroll responsiveness.
8. **Genuine Numerical Counters:**
   - Numerical counting upon viewport entrance displaying genuine, verified figures (6 projects, 2025 Maktoubteck tenure).
9. **Sticky Header:**
   - Shrinks on scroll with frosted glass backdrop blur (`backdrop-filter: blur(14px)`).
   - Real-time active section indicator based on viewport observation.
10. **Accessibility & Reduced Motion:**
   - Full support for `prefers-reduced-motion: reduce`: transitions, loader, and cursor neutralized.
   - Clean `@media print` stylesheet for clean physical printing or PDF generation.

---

## Verified Professional Details

- **Name:** Yassine Hanini
- **Profession:** Full-Stack Developer
- **Specialties:** Backend Development, Web Development, Mobile Application Development
- **Location:** Béni Mellal, Morocco
- **Email:** `hayassine0@gmail.com`
- **LinkedIn:** [linkedin.com/in/yassineha](https://www.linkedin.com/in/yassineha)
- **GitHub:** [github.com/yassinehaa](https://github.com/yassinehaa)

### Verified Featured Projects:
1. **SkillSwap** — Spring Boot, Angular, MySQL, JWT, Docker
2. **Localizy** — React Native, Expo, Mobile Barbershop Booking
3. **StudyFlow** — Express.js, Vite, SQLite Student Platform
4. **ZIKOSCHOOL** — Next.js Educational Portal
5. **Event Management System** — Angular, Spring Boot
6. **Quiz Application** — Angular, Open Trivia Database

---

## How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```

The application runs at `http://localhost:3000`.
