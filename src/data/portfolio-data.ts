export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'Backend & Full-Stack' | 'Mobile' | 'Web Apps';
  summary: string;
  description: string;
  challenges: string[];
  architecture: string[];
  technologies: string[];
  image: string;
  featured: boolean;
  githubUrl: string;
  liveUrl?: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  keyResponsibilities: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  summary: string;
  skills: {
    name: string;
    level: string;
    focus: string;
  }[];
}

export const PORTFOLIO_OWNER = {
  fullName: 'Yassine Hanini',
  displayName: 'Yassine',
  role: 'Full-Stack Developer',
  headline: 'ENGINEERING RESILIENT BACKENDS & FLUID DIGITAL EXPERIENCES',
  location: 'Béni Mellal, Morocco',
  email: 'hayassine0@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yassineha',
  github: 'https://github.com/yassinehaa',
  bio: "I'm a Full-Stack Developer passionate about building modern web and mobile applications. I specialize in backend development using Java and Spring Boot, alongside frontend development with Angular, React, and modern JavaScript technologies. My experience centers on building scalable REST APIs, database-driven architectures, robust authentication systems, and production-ready digital products.",
  portraitImage: '/assets/aistudio/IMG_4024_f433ed30.jpeg',
};

export const VERIFIED_EXPERIENCES: Experience[] = [
  {
    company: 'Maktoubteck',
    role: 'Full-Stack Developer',
    period: 'September 2025 – December 2025',
    location: 'Morocco (Advertising Platform Engineering)',
    description: 'Served as Full-Stack Developer with primary focus on backend architecture, service endpoints, and database reliability for a high-traffic digital advertising platform.',
    keyResponsibilities: [
      'Designed and engineered scalable RESTful APIs utilizing Java and Spring Boot framework',
      'Engineered normalized relational schemas and optimized queries in MySQL for ad telemetry',
      'Integrated React frontend interfaces with secure backend endpoints and token validation',
      'Containerized development and deployment workflows using Docker containers',
    ],
    technologies: ['Java', 'Spring Boot', 'React', 'MySQL', 'Docker', 'REST APIs', 'Git'],
  },
];

export const VERIFIED_PROJECTS: Project[] = [
  {
    id: 'skillswap',
    title: 'SkillSwap',
    subtitle: 'Peer-to-Peer Expertise Exchange Platform',
    tagline: 'Spring Boot · Angular · MySQL · JWT · Docker',
    category: 'Backend & Full-Stack',
    summary: 'A comprehensive skill-exchange platform connecting professionals to barter engineering, language, and design mentorship with automated matching and verified profiles.',
    description: 'SkillSwap tackles skill sharing by providing a structured, barter-based marketplace where members list what they can teach and what they wish to master. Built with a modular Spring Boot backend and an Angular reactive single-page client.',
    challenges: [
      'Designing transactional state handling for two-way skill barter requests',
      'Enforcing strict stateless authentication with JSON Web Tokens across protected micro-endpoints',
      'Ensuring responsive and predictable state management across multi-step user onboarding flows',
    ],
    architecture: [
      'Layered Spring Boot architecture (Controller, Service, Repository, DTO layers)',
      'Stateless JWT filter security chain with role-based endpoint authorization',
      'Normalized relational schema hosted on MySQL with connection pooling',
      'Containerized multi-stage Docker environment for reproducible deployment',
    ],
    technologies: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'MySQL', 'JWT', 'Docker'],
    image: '/assets/images/project_skillswap_mockup_1793976197311.jpg',
    featured: true,
    githubUrl: 'https://github.com/yassinehaa',
    highlights: ['Multi-Stage Docker Pipeline', 'Stateless JWT Security Chain', 'Normalized MySQL Schema'],
  },
  {
    id: 'localizy',
    title: 'Localizy',
    subtitle: 'Geo-Discovery & Barbershop Booking Application',
    tagline: 'React Native · Expo · Mobile UX · JavaScript',
    category: 'Mobile',
    summary: 'Mobile application designed for local barbershop discovery, service catalog exploration, real-time schedule checks, and seamless appointment booking.',
    description: 'Localizy is engineered to modernize local service appointment scheduling. Built from the ground up using React Native and Expo, the app features clean touch ergonomics, visual calendar time-slot selectors, and smooth screen navigation.',
    challenges: [
      'Implementing friction-free mobile booking workflows optimized for single-thumb ergonomics',
      'Handling asynchronous calendar slot availability and instantaneous booking confirmations',
      'Optimizing performance across low-end mobile devices using native component bridging',
    ],
    architecture: [
      'React Native component hierarchy leveraging Expo development workflow',
      'Modular context state managing customer profile and booking draft state',
      'Asynchronous storage for offline appointment retrieval and cache resilience',
      'Component-driven UI matching Moroccan architectural elegance and clean dark typography',
    ],
    technologies: ['React Native', 'Expo', 'JavaScript', 'Mobile Navigation', 'AsyncStorage'],
    image: '/assets/images/project_localizy_mockup_1793976198070.jpg',
    featured: true,
    githubUrl: 'https://github.com/yassinehaa',
    highlights: ['Single-Thumb Mobile Ergonomics', 'Offline Cache Resilience', 'Real-Time Slot Discovery'],
  },
  {
    id: 'studyflow',
    title: 'StudyFlow',
    subtitle: 'Student Academic Productivity & Workflow Suite',
    tagline: 'Express.js · Vite · SQLite · Node.js',
    category: 'Web Apps',
    summary: 'A dedicated student study management application providing curriculum tracking, revision scheduling, deadline calendars, and task progress monitoring.',
    description: 'StudyFlow gives university students a clean, calm command center to organize courses, syllabus goals, and project timelines without distraction. Uses a high-speed Express.js backend with an SQLite database and a responsive Vite frontend.',
    challenges: [
      'Structuring an ultra-lightweight database schema for zero-latency local course tracking',
      'Designing an editorial dark-mode interface that minimizes cognitive fatigue during long study sessions',
      'Providing instantaneous CRUD updates for deadlines, tasks, and completion metrics',
    ],
    architecture: [
      'Express.js lightweight REST API with route modularization',
      'SQLite relational database with WAL mode for fast local persistence',
      'Vite-powered single-page application with modular component structure',
      'Client-side state synchronization for real-time task board updates',
    ],
    technologies: ['Node.js', 'Express.js', 'Vite', 'SQLite', 'JavaScript', 'Tailwind CSS'],
    image: '/assets/images/project_studyflow_mockup_1793976198538.jpg',
    featured: true,
    githubUrl: 'https://github.com/yassinehaa',
    highlights: ['Zero-Latency SQLite Operations', 'Distraction-Free Dark Workspace', 'Modular Express REST Engine'],
  },
  {
    id: 'zikoschool',
    title: 'ZIKOSCHOOL',
    subtitle: 'Modern Educational Institution Platform',
    tagline: 'Next.js · React · TypeScript · Responsive Web',
    category: 'Web Apps',
    summary: 'An educational web portal built with Next.js delivering course curricula, institutional updates, and student interaction interfaces.',
    description: 'ZIKOSCHOOL modernizes institutional communication with rapid server-rendered page delivery, responsive layouts, and clean academic program exploration.',
    challenges: [
      'Architecting structured navigation across multiple faculties and course branches',
      'Ensuring responsive layout stability across tablets and mobile viewports',
    ],
    architecture: [
      'Next.js framework utilizing modular routing and component composition',
      'TypeScript static typing across course data models and components',
      'Tailwind CSS design system providing clean typographic hierarchy',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/assets/images/project_studyflow_mockup_1793976198538.jpg',
    featured: false,
    githubUrl: 'https://github.com/yassinehaa',
    highlights: ['Server-Side Rendered Curricula', 'Strict TypeScript Typing', 'Responsive Multi-Device Layout'],
  },
  {
    id: 'event-management',
    title: 'Event Management System',
    subtitle: 'Full-Stack Event Scheduling & Attendee Platform',
    tagline: 'Angular · Spring Boot · Java · REST APIs',
    category: 'Backend & Full-Stack',
    summary: 'Enterprise event organizing platform supporting attendee registration, ticket scheduling, and administrative dashboards.',
    description: 'Engineered with an Angular frontend communicating with a Spring Boot backend, providing complete attendee lifecycle management and event scheduling.',
    challenges: [
      'Validating attendee capacity constraints and avoiding concurrent overbooking',
      'Structuring administrative dashboards with real-time registration metrics',
    ],
    architecture: [
      'Spring Boot enterprise service layer with transactional service boundaries',
      'Angular reactive components and TypeScript services',
      'RESTful endpoints with structured payload contracts and validation',
    ],
    technologies: ['Angular', 'Spring Boot', 'Java', 'REST APIs', 'TypeScript'],
    image: '/assets/images/project_skillswap_mockup_1793976197311.jpg',
    featured: false,
    githubUrl: 'https://github.com/yassinehaa',
    highlights: ['Transactional Capacity Guards', 'Angular Reactive Services', 'Robust Endpoint Contracts'],
  },
  {
    id: 'quiz-app',
    title: 'Quiz Application',
    subtitle: 'Dynamic Trivia Engine with Open Trivia DB',
    tagline: 'Angular · Open Trivia DB API · TypeScript',
    category: 'Web Apps',
    summary: 'Interactive quiz application communicating with the Open Trivia Database API, offering timed question sessions, category selection, and instant scoring.',
    description: 'Built in Angular, this application showcases real-time third-party REST API integration, asynchronous question stream handling, countdown timers, and score summaries.',
    challenges: [
      'Normalizing HTML entities returned in raw trivia payloads',
      'Managing state transitions between question retrieval, active countdown, and final review',
    ],
    architecture: [
      'Angular HTTPClient fetching data asynchronously from Open Trivia DB',
      'Reactive state management handling question progress and user answers',
      'Score calculation engine with immediate feedback and category breakdowns',
    ],
    technologies: ['Angular', 'TypeScript', 'REST API', 'HTML5', 'CSS3'],
    image: '/assets/images/project_studyflow_mockup_1793976198538.jpg',
    featured: false,
    githubUrl: 'https://github.com/yassinehaa',
    highlights: ['Third-Party API Integration', 'Reactive Countdown Timers', 'Instant Payload Sanitization'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Backend & Architecture',
    summary: 'Building secure, high-throughput service backends and normalized databases.',
    skills: [
      { name: 'Java', level: 'Core Language', focus: 'Object-Oriented Design, Concurrency, JVM' },
      { name: 'Spring Boot', level: 'Primary Framework', focus: 'REST APIs, Spring Data JPA, Security' },
      { name: 'JWT Authentication', level: 'Security Standard', focus: 'Token Validation, Stateless Auth, Roles' },
      { name: 'Node.js & Express.js', level: 'Runtime & Web', focus: 'Microservices, Middleware Pipelines' },
      { name: 'RESTful API Design', level: 'Architecture', focus: 'Contract Design, Versioning, DTOs' },
    ],
  },
  {
    title: 'Frontend & Interactive Web',
    summary: 'Crafting responsive, performant user interfaces with clean state management.',
    skills: [
      { name: 'Angular', level: 'Framework', focus: 'Reactive Forms, RxJS, Dependency Injection' },
      { name: 'React', level: 'Library', focus: 'Hooks, Component Architecture, Vite' },
      { name: 'TypeScript', level: 'Type System', focus: 'Strict Typing, Interfaces, Generics' },
      { name: 'JavaScript (ES6+)', level: 'Language', focus: 'Async/Await, DOM, Event Architecture' },
      { name: 'Tailwind CSS', level: 'Styling', focus: 'Design Tokens, Responsive Layouts, Fluid Typography' },
    ],
  },
  {
    title: 'Mobile Application Development',
    summary: 'Building fluid, cross-platform mobile experiences for iOS and Android.',
    skills: [
      { name: 'React Native', level: 'Mobile Framework', focus: 'Cross-Platform UI, Native Modules' },
      { name: 'Expo', level: 'Ecosystem', focus: 'Rapid Prototyping, Device APIs, EAS' },
      { name: 'Mobile UX & Gestures', level: 'Interaction Design', focus: 'Single-Thumb Navigation, Ergonomics' },
    ],
  },
  {
    title: 'Databases & DevOps',
    summary: 'Managing persistent relational data and containerized deployment workflows.',
    skills: [
      { name: 'MySQL', level: 'RDBMS', focus: 'Schema Normalization, Indexes, Queries' },
      { name: 'SQLite', level: 'Embedded DB', focus: 'Local Storage, Fast Read/Write, WAL Mode' },
      { name: 'Docker', level: 'Containerization', focus: 'Multi-Stage Builds, Reproducible Environments' },
      { name: 'Git & GitHub', level: 'Version Control', focus: 'Branching Workflows, Code Review, CI/CD' },
    ],
  },
];
