export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Real-time' | 'AI & DevOps' | 'Web Apps';
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  architecture: string[];
  metrics?: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  color: string;
}

export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  current?: boolean;
}

export interface SkillItem {
  name: string;
  icon: string;
  level: number;
  category: 'MERN & Web' | 'AI & Languages' | 'DevOps & Databases';
  description: string;
}

export const PERSONAL_INFO = {
  name: "Adan Adeel",
  role: "Aspiring AI Engineer | Full-Stack & DevOps Developer",
  tagline: "Building real-time collaborative platforms, intelligent AI systems, and resilient DevOps pipelines.",
  shortBio: "Computer Science undergraduate based in Pakistan, expected to graduate in 2029. Experienced in 1+ year of freelance full-stack development, building high-performance MERN applications, real-time WebSocket systems, and learning AI engineering.",
  location: "Pakistan (PKT / UTC+5)",
  status: "Open to AI & Full-Stack Opportunities",
  email: "adanadeel903@gmail.com",
  github: "https://github.com/adanadeel7",
  linkedin: "https://linkedin.com/in/adanadeel",
  twitter: "https://x.com/adancode",
  instagram: "https://instagram.com/adanadeel",
  graduationYear: "2029",
  universityJoined: "2025",
  stats: [
    { label: "Freelance Experience", value: "1 Year" },
    { label: "Projects Built", value: "8+" },
    { label: "Expected Graduation", value: "2029" },
    { label: "Target Domain", value: "AI & DevOps" },
  ],
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    year: "2025 - Present",
    role: "Freelance Full-Stack Developer",
    company: "Independent Freelancing",
    description: "Building production MERN stack web applications, SaaS dashboards, and customized invoice/LMS software for clients.",
    highlights: [
      "Shipped custom client applications including Equinox Invoicing Tool and EduPulse LMS.",
      "Engineered real-time features using WebSockets and RESTful API integrations.",
      "Implemented responsive Tailwind UI layouts and automated PDF invoice generation systems.",
    ],
    current: true,
  },
  {
    year: "2025",
    role: "B.S. Computer Science Student",
    company: "University (Joined 2025)",
    description: "Commenced Undergraduate Degree in Computer Science with a focus on AI Engineering, DevOps pipelines, and System Architecture.",
    highlights: [
      "Focusing on Machine Learning fundamentals, Data Structures & Algorithms, and OS internals.",
      "Active participant in open-source development and campus coding communities.",
    ],
    current: true,
  },
  {
    year: "2024",
    role: "Full-Stack Development & Exploration",
    company: "Self-Directed Engineering",
    description: "Mastered the MERN stack ecosystem and built foundational real-time projects including HyperCode and CraveReels.",
    highlights: [
      "Mastered React, Node.js, MongoDB, and WebSocket protocol for collaborative tools.",
      "Explored containerization using Docker and PostgreSQL database modeling.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "hypercode",
    title: "HyperCode",
    subtitle: "Real-Time Collaborative Engineering Space",
    category: "Real-time",
    description: "High-performance collaborative code editor and execution workspace for distributed engineering teams.",
    longDescription: "HyperCode allows developers to write, edit, compile, and execute code together in real-time. Built with the MERN stack and WebSockets, it features operational transformation for conflict-free concurrent editing, active cursor sync, and integrated code execution environments.",
    tags: ["MERN Stack", "WebSockets", "React", "Node.js", "Express", "Monaco Editor"],
    features: [
      "Multi-user real-time code editor with active cursor synchronization and conflict resolution.",
      "Integrated code compilation backend for multiple programming languages (JavaScript, Python, C++).",
      "Room-based workspace sessions with granular access controls and shareable invite links.",
      "Integrated live terminal output and chat panel for team communication.",
    ],
    architecture: [
      "React + Monaco Editor frontend with custom syntax highlighting themes.",
      "Node.js & Express server maintaining WebSocket connection rooms.",
      "MongoDB database storing user projects, snippet versions, and workspace state.",
    ],
    metrics: "Real-time Collaborative Workspace",
    githubUrl: "https://github.com/adanadeel7/HyperCode",
    liveUrl: "https://github.com/adanadeel7/HyperCode",
    featured: true,
    color: "#8B5CF6",
  },
  {
    id: "equinox",
    title: "Equinox",
    subtitle: "Freelance Invoicing & Billing Tool",
    category: "Full-Stack",
    description: "Professional client billing and automated invoice generation software for freelancers.",
    longDescription: "Equinox streamlines freelance financial workflows with automated invoice generation, client tracking, custom tax/discount configurations, and 1-click exportable PDF invoices.",
    tags: ["MERN Stack", "React", "Node.js", "Express", "MongoDB", "PDFKit"],
    features: [
      "Instant PDF invoice creation with custom company branding and line-item calculation.",
      "Client CRM dashboard monitoring paid, pending, and overdue invoice statuses.",
      "Search, filter, and CSV data export capabilities.",
      "Automated financial summary charts and earnings analytics.",
    ],
    architecture: [
      "Node.js & Express server with PDF generation engine.",
      "MongoDB database storing client rosters, line items, and transaction logs.",
      "React frontend with dynamic line-item forms and real-time total preview.",
    ],
    metrics: "Equinox Invoicing Tool",
    githubUrl: "https://github.com/adanadeel7/Equinox-Invoicing-Tool",
    liveUrl: "https://github.com/adanadeel7/Equinox-Invoicing-Tool",
    featured: true,
    color: "#3B82F6",
  },
  {
    id: "cravereels",
    title: "CraveReels",
    subtitle: "Short-Video Food Discovery App",
    category: "Full-Stack",
    description: "Engaging culinary discovery application featuring vertical food reels, step-by-step recipe overlays, and restaurant tagging.",
    longDescription: "CraveReels is a modern social culinary app where users can watch trending food reels, view interactive recipe step overlays, bookmark top food spots, and share short food videos.",
    tags: ["MERN Stack", "React", "Node.js", "MongoDB", "Cloudinary", "Tailwind CSS"],
    features: [
      "Smooth vertical video reel feed with auto-play on scroll and touch gestures.",
      "Interactive recipe ingredient checklists and step-by-step cooking timers.",
      "Social bookmarking, likes, and share analytics with real-time counters.",
      "Cloudinary video streaming pipeline for instant playback.",
    ],
    architecture: [
      "React frontend with video intersection observer for fluid scrolling.",
      "Express REST API managing user profiles, recipe tags, and video metadata.",
      "MongoDB database for video feeds and user bookmark collections.",
    ],
    metrics: "MERN Stack Media Platform",
    githubUrl: "https://github.com/adanadeel7/Reels-Project",
    liveUrl: "https://github.com/adanadeel7/Reels-Project",
    featured: true,
    color: "#EC4899",
  },
  {
    id: "edupulse-lms",
    title: "EduPulse LMS",
    subtitle: "Student Learning Management System",
    category: "Web Apps",
    description: "Comprehensive student management portal with course tracking, assignment submissions, and PostgreSQL relational records.",
    longDescription: "EduPulse LMS combines a React MERN frontend with PostgreSQL for robust relational academic data management. Students can enroll in courses, view grade distributions, submit assignments, and monitor attendance.",
    tags: ["MERN Stack", "PostgreSQL", "Prisma ORM", "React", "Node.js", "Express"],
    features: [
      "Relational PostgreSQL database schema for courses, student enrollments, grades, and faculty.",
      "Role-based authentication & permissions (Student, Instructor, Admin).",
      "Assignment submission portal with file upload handling and deadline alerts.",
      "Interactive grade report card viewer with GPA calculation engine.",
    ],
    architecture: [
      "PostgreSQL database connected via Prisma ORM for type-safe queries.",
      "Express REST API with JWT authentication middleware.",
      "React dashboard with Tailwind CSS tabular data views.",
    ],
    metrics: "MERN + PostgreSQL Architecture",
    githubUrl: "https://github.com/adanadeel7/LMS-Project-",
    liveUrl: "https://github.com/adanadeel7/LMS-Project-",
    featured: true,
    color: "#10B981",
  },
];

export const TECH_SKILLS: SkillItem[] = [
  { name: "React.js", icon: "⚛️", level: 90, category: "MERN & Web", description: "UI Components, Custom Hooks, State Management" },
  { name: "Node.js & Express", icon: "🟢", level: 88, category: "MERN & Web", description: "REST APIs, Middleware, Auth, WebSockets" },
  { name: "MongoDB", icon: "🍃", level: 85, category: "DevOps & Databases", description: "NoSQL Modeling, Aggregations, Mongoose" },
  { name: "PostgreSQL", icon: "🐘", level: 82, category: "DevOps & Databases", description: "Relational Schemas, Indexing, SQL Queries, Prisma" },
  { name: "WebSockets", icon: "⚡", level: 85, category: "MERN & Web", description: "Real-time socket.io communication, Live Sync" },
  { name: "Python", icon: "🐍", level: 80, category: "AI & Languages", description: "Data Analysis, Scripting, AI/ML Foundations" },
  { name: "AI Engineering", icon: "🤖", level: 75, category: "AI & Languages", description: "LLM APIs, Prompt Engineering, Neural Net Concepts" },
  { name: "Docker / DevOps", icon: "🐳", level: 78, category: "DevOps & Databases", description: "Containerization, CI/CD Basics, Deployment" },
  { name: "Tailwind CSS", icon: "🎨", level: 92, category: "MERN & Web", description: "Responsive Layouts, Custom Glassmorphism, Animations" },
  { name: "TypeScript", icon: "📘", level: 84, category: "MERN & Web", description: "Static Type Checking, Interfaces, Generics" },
  { name: "Git & GitHub", icon: "🔀", level: 90, category: "DevOps & Databases", description: "Version Control, Branching, Pull Requests" },
  { name: "C++", icon: "⚡", level: 78, category: "AI & Languages", description: "Data Structures, Algorithms, Problem Solving" },
];

export const TERMINAL_COMMANDS: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  whoami      - Display Adan Adeel's profile summary",
    "  skills      - List technical skills (MERN + AI + DevOps)",
    "  projects    - List core projects (HyperCode, Equinox, CraveReels, EduPulse)",
    "  contact     - Display email (adanadeel903@gmail.com) & GitHub",
    "  time        - Display current Pakistan time & session duration",
    "  status      - Check internship & freelance status",
    "  clear       - Clear terminal output",
  ],
  whoami: "Adan Adeel - CS Student (Graduating 2029) & Aspiring AI Engineer. 1 Year Freelancing Experience in MERN Stack, PostgreSQL, WebSockets, and DevOps.",
  skills: "MERN Stack (MongoDB, Express, React, Node), PostgreSQL, WebSockets, Python, AI Engineering, Docker, Tailwind CSS, TypeScript, C++",
  projects: "1. HyperCode (https://github.com/adanadeel7/HyperCode) | 2. Equinox (https://github.com/adanadeel7/Equinox-Invoicing-Tool) | 3. CraveReels (https://github.com/adanadeel7/Reels-Project) | 4. EduPulse LMS (https://github.com/adanadeel7/LMS-Project-)",
  contact: "Email: adanadeel903@gmail.com | GitHub: github.com/adanadeel7 | Twitter/X: x.com/adancode | Location: Pakistan",
  status: "🟢 OPEN TO AI & FULL-STACK INTERNSHIPS & FREELANCE PROJECTS (2026)",
};
