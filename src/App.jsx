import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Code2,
  Download,
  GraduationCap,
  Mail,
  Phone,
  Rocket,
  Sparkles,
} from "lucide-react";
import profileImage from "../image/profile.jpg";
import awsBadge from "../image/aws-certified-cloud-practitioner.png";
import ShinyText from "./components/ShinyText/ShinyText.jsx";
import SpotlightCard from "./components/SpotlightCard/SpotlightCard.jsx";
import ShapeWaves from "./components/ShapeWaves/ShapeWaves.jsx";
import GooeyNav from "./components/GooeyNav/GooeyNav.jsx";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Experience", path: "/experience" },
  { label: "Projects", path: "/projects" },
  { label: "Profile", path: "/profile" },
  { label: "CV", path: "/cv" },
];

const skillGroups = [
  { title: "Frontend & Product", items: ["React", "Vue 3", "Inertia.js", "TypeScript", "JavaScript", "Vite", "Zustand", "Blade", "Next.js", "HTML5", "CSS3", "Responsive Design"] },
  { title: "Backend & Data", items: ["PHP", "Laravel", "C#", "ASP.NET Core", "Node.js", "Express", "Eloquent ORM", "Entity Framework Core", "PostgreSQL", "SQLite", "SQL", "Prisma"] },
  { title: "APIs & Integration", items: ["REST APIs", "OData", "Power BI", "Multi-tenancy", "Authentication", "API Rate Limiting", "Meilisearch", "Valkey", "MinIO", "Gotenberg"] },
  { title: "Laravel Ecosystem", items: ["Reverb", "Sail", "Tenancy", "Versionable", "Auditing", "Media Library", "Migrations", "Validation", "CRUD"] },
  { title: "Testing & Quality", items: ["Pest", "xUnit", "Vitest", "React Testing Library", "JUnit", "Jest", "Test Case Design", "Fuzz Testing", "Debugging"] },
  { title: "AI & Workflow", items: ["Vercel AI SDK", "OpenAI Responses API", "Tool-using Agents", "Zod", "Python", "Machine Learning", "CNN", "Vision Transformer", "AI-Assisted Development"] },
  { title: "Developer Tools", items: ["VS Code", "PyCharm", "Codex", "ChatGPT", "Git", "GitHub", "Postman", "npm", "Mailpit"] },
  { title: "Cloud & Platforms", items: ["Docker", "Vercel", "Render", "Supabase", "AWS", "Snowflake", "GitHub Pages", "GitHub Actions"] },
];

const highlights = [
  "Full Stack Developer Intern at Ocular, building PHP and Laravel web application features.",
  "Builds full-stack products across Laravel/Vue, React/TypeScript, and C#/.NET ecosystems.",
  "AWS Certified Cloud Practitioner with tutoring, support, and customer-facing experience.",
];

const profileStats = [
  { value: "10+", label: "portfolio projects" },
  { value: "AWS", label: "cloud certified" },
  { value: "Full-stack", label: "Laravel, React, Vue, .NET" },
];

const workspaceSignals = [
  { label: "Current role", value: "Ocular", status: "Interning" },
  { label: "Stack focus", value: "PHP + Laravel", status: "Building" },
  { label: "Current work", value: "MVC + CRUD workflows", status: "Shipping" },
];

const dailyPractices = [
  {
    title: "Build and refine side projects",
    copy: "I regularly turn job-search, workflow, and product ideas into small usable features, then improve them through testing, deployment, and feedback.",
  },
  {
    title: "Use AI as an engineering assistant",
    copy: "I use Codex and ChatGPT to speed up debugging, compare implementation options, review code, write clearer documentation, and learn unfamiliar tools faster.",
  },
  {
    title: "Track progress and applications",
    copy: "I keep my applications, CV versions, follow-ups, project notes, and learning tasks organized so I can make steady progress instead of guessing what to do next.",
  },
  {
    title: "Practice fundamentals",
    copy: "I keep sharpening core skills through React, SQL, Java, Python, testing, API work, cloud deployment, documentation, and reading official docs.",
  },
];

const lifeInterests = [
  {
    title: "Strategic board games",
    copy: "I enjoy games that reward planning, pattern recognition, adaptation, and calm decision-making under uncertainty.",
  },
  {
    title: "Skiing and outdoor challenges",
    copy: "Skiing helps me stay active, focused, and comfortable working through fast-changing situations with control.",
  },
  {
    title: "Nature and quiet reset time",
    copy: "I like spending time outdoors because it builds patience, observation, and balance after long stretches of technical work.",
  },
  {
    title: "Curiosity beyond assignments",
    copy: "Outside formal coursework, I like trying new tools, reading product ideas, and noticing how real apps solve everyday problems.",
  },
];

const experience = [
  {
    role: "Full Stack Developer Intern",
    company: "Ocular, Wellington",
    period: "Jul 2026 - Present",
    points: [
      "Develop and maintain web application features using PHP and Laravel in a professional development environment.",
      "Build Laravel MVC functionality with Blade, Inertia.js, TypeScript, Vite, Ziggy, Precognition, Eloquent, validation, migrations, and database-backed CRUD workflows.",
      "Work with PostgreSQL, Meilisearch, Valkey, Reverb, MinIO, Mailpit, Gotenberg, Sail, tenancy, versioning, auditing, and media-management tooling across the development cycle.",
    ],
  },
  {
    role: "Coding & Robotics Tutor",
    company: "Scots College, Wellington",
    period: "2024 - Present",
    points: [
      "Teach Python, robotics, debugging, and structured problem solving to secondary school students.",
      "Guide students preparing for RoboCup and adapt explanations for different technical backgrounds.",
      "Support live code reviews, technical exercises, teamwork, and confident learning habits.",
    ],
  },
  {
    role: "Mobile Phone & Computer Repair Technician",
    company: "UR Tech, Wellington",
    period: "Dec 2025 - Feb 2026",
    points: [
      "Diagnosed hardware and software faults across phones, computers, and household devices.",
      "Handled OS setup, local network configuration, secure data transfers, and quality checks.",
      "Translated technical issues into clear customer-facing explanations in a fast-paced support role.",
    ],
  },
  {
    role: "Front-of-House Team Member",
    company: "Sushiya, One Sushi, Dynasty Restaurant",
    period: "2021 - 2025",
    points: [
      "Built communication, teamwork, and problem-solving skills in busy service environments.",
      "Managed orders, payments, bookings, and customer enquiries with attention to detail.",
    ],
  },
];

const projects = [
  {
    name: "JobTrack Fullstack",
    summary: "Full-stack job application tracker with authenticated workflows, job-page importing, private CV storage, and an AI Match Agent that grounds structured fit reports in reviewed candidate CV evidence.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "Vercel AI SDK", "OpenAI API", "Zod"],
    link: "https://jobtrack-fullstack-ashy.vercel.app/",
    source: "https://github.com/ZiruiJia11/jobtrack-fullstack",
    featured: true,
  },
  {
    name: "Reel Local Cinema SaaS",
    summary: "Full-stack cinema booking platform for local film clubs and community screenings, with movie browsing, protected routes, booking workflows, profile pages, Express APIs, and PostgreSQL persistence through Prisma.",
    tags: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma"],
    link: "https://reel-local-project.vercel.app/",
    source: "https://github.com/ZiruiJia11/reel-local-project",
    featured: true,
  },
  {
    name: "Dependency Map",
    summary: "Interactive dependency-graph workspace for organizing projects, nodes, and relationships, with authenticated CRUD workflows, scoped resource access, and persistent graph layouts.",
    tags: ["Laravel 13", "Vue 3", "Inertia.js", "TypeScript", "PostgreSQL", "Docker"],
    source: "https://github.com/ZiruiJia11/dependency-map",
    featured: true,
  },
  {
    name: "FitQuest - MSA 2026",
    summary: "Gamified fitness quest tracker with workout CRUD, XP and level progression, streaks, achievement badges, progress history, theme switching, and animated quest battles.",
    tags: ["React", "TypeScript", "ASP.NET Core", "C#", "Entity Framework", "SQLite"],
    link: "https://msa-2026-phase-2-software.vercel.app/",
    source: "https://github.com/ZiruiJia11/msa-2026-phase-2-software",
    featured: true,
  },
  {
    name: "Power BI OData API Demo",
    summary: "Multi-tenant Laravel integration that exposes authenticated OData feeds for Power BI, including metadata, filterable datasets, connection files, and downloadable report templates.",
    tags: ["Laravel 13", "Vue 3", "Inertia.js", "OData", "Power BI", "Multi-tenancy"],
    source: "https://github.com/ZiruiJia11/power-bi-api-demo",
    featured: true,
  },
  {
    name: "Event Management Web Application",
    summary: "Responsive Vue application for event creation, authentication flows, RSVP management, form validation, and backend service integration.",
    tags: ["Vue.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
  },
  {
    name: "Transport Route Planning Application",
    summary: "Java route-planning system that processes structured transport data and calculates optimal routes using DFS, BFS, and A* algorithms.",
    tags: ["Java", "Algorithms", "Data Structures", "Testing"],
  },
  {
    name: "Java Maze Game & Testing Project",
    summary: "Team-based 2D maze game focused on reliable system behavior, gameplay debugging, JUnit coverage, and a custom fuzz testing tool.",
    tags: ["Java", "JUnit", "Git", "Fuzz Testing"],
  },
  {
    name: "Data and AI Classification Projects",
    summary: "Python projects for handwritten character recognition and text classification, including dataset preparation, preprocessing checks, model comparison, and class-level evaluation.",
    tags: ["Python", "Machine Learning", "Data Processing", "Evaluation Metrics"],
  },
  {
    name: "Inclusive Transport UX Design",
    summary: "Public transport app concept shaped through user research, wireframes, high-fidelity prototypes, and accessibility-minded interface decisions.",
    tags: ["Figma", "UX Design", "HCI", "Accessibility"],
  },
];

const cvLinks = [
  { label: "Software Engineer CV", href: "/cv-software-engineer.pdf" },
  { label: "Full Stack Developer CV", href: "/cv-full-stack.pdf" },
  { label: "Web Developer CV", href: "/cv-web-developer.pdf" },
  { label: "Data & AI Engineer CV", href: "/cv-data-ai.pdf" },
  { label: "IT Support CV", href: "/cv-it-support.pdf" },
];

function SectionHeader({ eyebrow, title, copy }) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function CardSurface({ children }) {
  return children;
}

function App() {
  const getPath = () => {
    const path = window.location.hash.replace(/^#/, "") || "/";
    return navItems.some((item) => item.path === path) ? path : "/";
  };
  const [currentPath, setCurrentPath] = useState(getPath);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(getPath());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", handleRouteChange);
    return () => window.removeEventListener("hashchange", handleRouteChange);
  }, []);

  return (
    <>
      <div className="site-waves" aria-hidden="true">
        <ShapeWaves
          text="STEVEN JIA"
          fontFamily='Geist, "Geist Sans", system-ui, sans-serif'
          fontWeight={500}
          textSize={0.56}
          shapes="mixed"
          cellSize={10}
          dotSize={0.72}
          color="#26d6c7"
          hoverColor="#ffbf5b"
          backgroundColor="#071b33"
          speed={0.72}
          scale={1}
          contrast={1.32}
          brightness={0.68}
          flow={0}
          direction={0}
          fade={0.32}
          interactive={true}
          splashRadius={40}
          splashStrength={0.42}
          glow={0.48}
          intro={true}
          introDuration={1.6}
          paused={false}
        />
      </div>
      <header className="site-header">
        <a className="brand" href="#/" aria-label="Steven Jia home">SJ</a>
        <GooeyNav
          items={navItems.map((item) => ({ label: item.label, href: `#${item.path}` }))}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={Math.max(0, navItems.findIndex((item) => item.path === currentPath))}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </header>

      <main id="top" className="site-main">
        {currentPath === "/" ? <>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
            <p className="eyebrow"><ShinyText text="Open to graduate and junior roles" /></p>
            <h1 id="hero-title">Steven <span>Jia</span></h1>
            <p className="hero-role">Full Stack Developer Intern | Laravel, Vue, React & .NET</p>
            <p className="hero-summary">I build reliable, user-focused products across PHP and Laravel, Vue and Inertia, React and TypeScript, and C# with ASP.NET Core. My recent work includes dependency visualization, gamified full-stack systems, multi-tenant OData integrations for Power BI, relational data, testing, and cloud deployment.</p>
            <div className="hero-actions" aria-label="Contact and profile links">
              <a className="button primary" href="mailto:steven5115115@gmail.com"><Mail size={18} /> Email</a>
              <a className="button secondary" href="#/projects"><ArrowUpRight size={18} /> View work</a>
              <a className="button secondary" href="https://github.com/ZiruiJia11" target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub</a>
              <a className="button secondary" href="https://www.linkedin.com/in/steven-jia-b78314231/" target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} /> LinkedIn</a>
            </div>
            <div className="profile-stats" aria-label="Profile quick proof">
              {profileStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual" aria-label="Profile and quick facts">
            <CardSurface className="portrait-glare" accentColor="#a9fff0">
              <div className="portrait-shell">
                <img src={profileImage} alt="Steven Jia" />
                <div className="portrait-badge"><Rocket size={16} /> Building in public</div>
              </div>
            </CardSurface>
            <div className="workspace-console" aria-label="Current work snapshot">
              <div className="console-header">
                <span><Activity size={16} /> Live workspace</span>
                <strong>2026</strong>
              </div>
              <div className="signal-list">
                {workspaceSignals.map((signal) => (
                  <div className="signal-row" key={signal.label}>
                    <div>
                      <span>{signal.label}</span>
                      <strong>{signal.value}</strong>
                    </div>
                    <em>{signal.status}</em>
                  </div>
                ))}
              </div>
            </div>
            <div className="quick-facts">
              <span><Phone size={16} /> 021 119 9859</span>
            </div>
            </div>
          </section>

          <section className="highlights" aria-label="Profile highlights">
            {highlights.map((item, index) => (
              <CardSurface key={item} accentColor={["#9fffe8", "#a8c7ff", "#ffd59a"][index]}>
                <article><Sparkles size={18} /><p>{item}</p></article>
              </CardSurface>
            ))}
          </section>

          <section className="feature-strip" aria-label="Featured build snapshot">
            <div>
              <p className="eyebrow">Featured build</p>
              <h2>JobTrack combines application workflows with evidence-grounded AI matching.</h2>
            </div>
            <div className="feature-metrics">
              <span>AI Match Agent</span><span>CV evidence</span><span>Job URL import</span><span>Supabase</span>
            </div>
            <a href="https://jobtrack-fullstack-ashy.vercel.app/" target="_blank" rel="noreferrer" aria-label="Open JobTrack live demo"><ArrowUpRight size={20} /></a>
          </section>

          <section className="home-next">
            <div><p className="eyebrow">Explore the portfolio</p><h2>Each part now has room to breathe.</h2></div>
            <div className="home-next-links">
              <a href="#/experience">Experience <ArrowUpRight size={18} /></a>
              <a href="#/projects">Projects <ArrowUpRight size={18} /></a>
              <a href="#/profile">Technical profile <ArrowUpRight size={18} /></a>
            </div>
          </section>
        </> : null}

        {currentPath === "/profile" ? <div className="route-page">
          <SectionHeader eyebrow="Profile" title="How I work, learn, and build" copy="A closer look at my technical range, daily practice, education, and interests beyond code." />
          <section className="page-section daily-section" aria-label="Daily practice">
          <SectionHeader eyebrow="Daily practice" title="How I keep improving outside coursework" copy="My daily routine is built around shipping small improvements, learning from real tools, and keeping my job-search workflow organized." />
          <div className="daily-grid">
            {dailyPractices.map((item) => (
              <CardSurface key={item.title} accentColor="#a8e8ff">
                <article className="daily-card">
                  <Sparkles size={18} />
                  <div><h3>{item.title}</h3><p>{item.copy}</p></div>
                </article>
              </CardSurface>
            ))}
          </div>
          </section>

          <section className="page-section life-section" aria-label="Beyond code">
          <SectionHeader eyebrow="Beyond code" title="The habits and interests that shape how I work" copy="Outside projects and job applications, I keep a mix of strategic, outdoor, and curiosity-driven interests that help me stay balanced and thoughtful." />
          <div className="life-grid">
            {lifeInterests.map((item) => (
              <CardSurface key={item.title} accentColor="#ffe0a8">
                <article className="life-card">
                  <Sparkles size={18} /><h3>{item.title}</h3><p>{item.copy}</p>
                </article>
              </CardSurface>
            ))}
          </div>
          </section>

          <section className="page-section">
          <SectionHeader eyebrow="Technical profile" title="Skills that connect product, systems, data, and testing" copy="A practical stack for graduate software, web, test, data, support, and configuration developer roles." />
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <CardSurface key={group.title} accentColor="#a7d9ff">
                <article className="panel">
                  <h3>{group.title}</h3>
                  <div className="tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              </CardSurface>
            ))}
          </div>
          </section>

          <section className="page-section education-section">
            <SectionHeader eyebrow="Education & certification" title="Computer Science, AI, and cloud fundamentals" />
            <div className="education-grid">
              <CardSurface accentColor="#a8c7ff"><article className="education-item"><GraduationCap size={22} /><div><h3>Bachelor of Science in Computer Science</h3><p>Victoria University of Wellington | 2023 - 2025</p><p>Minor in Artificial Intelligence. Relevant study: software engineering, algorithms, databases, machine learning, networks, and HCI.</p></div></article></CardSurface>
              <CardSurface accentColor="#ffd59a"><article className="education-item certification"><img src={awsBadge} alt="AWS Certified Cloud Practitioner badge" /><div><h3>AWS Certified Cloud Practitioner</h3><p>2026</p><p>Cloud fundamentals, core AWS services, security, billing, and shared responsibility concepts.</p></div></article></CardSurface>
              <CardSurface accentColor="#9fffe8"><article className="education-item"><Award size={22} /><div><h3>VUW Git & GitHub Workshop</h3><p>2024</p><p>Version control, repository workflow, collaboration basics, and source management habits.</p></div></article></CardSurface>
            </div>
          </section>
        </div> : null}

        {currentPath === "/experience" ? <div className="route-page experience-page">
          <SectionHeader eyebrow="Experience" title="Professional work, teaching, and technical support" copy="Hands-on development at Ocular, backed by tutoring, repair, and customer-facing experience." />
          <section className="page-section">
          <div className="timeline">
            {experience.map((job, index) => (
              <CardSurface key={`${job.role}-${job.period}`} accentColor={["#9fffe8", "#a8c7ff", "#ffd59a", "#ffc0b7"][index]}>
                <article className="timeline-item">
                  <div className="timeline-marker"><BriefcaseBusiness size={18} /></div>
                  <div>
                    <div className="item-heading"><h3>{job.role}</h3><span>{job.period}</span></div>
                    <p className="institution">{job.company}</p>
                    <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  </div>
                </article>
              </CardSurface>
            ))}
          </div>
          </section>
        </div> : null}

        {currentPath === "/projects" ? <div className="route-page">
          <SectionHeader eyebrow="Selected work" title="Projects with real implementation depth" copy="Full-stack products, integrations, testing work, algorithms, and machine-learning prototypes." />
          <section className="page-section projects-section">
          <div className="projects-grid">
            {projects.map((project) => (
              <CardSurface key={project.name} accentColor={project.featured ? "#9fffe8" : "#a8c7ff"}>
                <SpotlightCard className="project" spotlightColor={project.featured ? "rgba(15, 118, 110, 0.18)" : "rgba(37, 99, 235, 0.14)"}>
                  <div className="project-top">
                    <div className="project-kicker">
                      <Code2 size={20} />
                      {project.featured ? <span>Featured</span> : null}
                    </div>
                    {project.link ? <a href={project.link} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`}><ArrowUpRight size={18} /></a> : null}
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  {(project.link || project.source) ? (
                    <div className="project-links" aria-label={`${project.name} links`}>
                      {project.link ? <a href={project.link} target="_blank" rel="noreferrer">Live demo</a> : null}
                      {project.source ? <a href={project.source} target="_blank" rel="noreferrer">Source</a> : null}
                    </div>
                  ) : null}
                  <div className="tags compact">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </SpotlightCard>
              </CardSurface>
            ))}
          </div>
          </section>
        </div> : null}

        {currentPath === "/cv" ? <div className="route-page">
          <SectionHeader eyebrow="CV & contact" title="Choose the CV that fits the role" copy="Role-focused versions are available below, along with direct contact and profile links." />
          <section className="cv-section">
          <div><p className="eyebrow">CV downloads</p><h2>Role-focused CV templates</h2><p>These are my own CV templates for software engineering, full-stack, web development, data and AI, and IT support roles.</p></div>
          <div className="cv-actions">{cvLinks.map((link) => <a className="button primary" href={link.href} download key={link.label}><Download size={18} /> {link.label}</a>)}</div>
          </section>

          <section className="contact-section" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Next step</p>
            <h2 id="contact-title">Open to junior software, web, data, and support roles</h2>
            <p>I am ready to talk through the projects above, share role-specific CVs, and discuss how I can contribute on a graduate or junior engineering team.</p>
          </div>
          <div className="contact-actions">
            <a className="button primary" href="mailto:steven5115115@gmail.com"><Mail size={18} /> Contact me</a>
            <a className="button secondary" href="https://github.com/ZiruiJia11" target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub profile</a>
          </div>
          </section>
        </div> : null}
      </main>

      <footer><p>© {new Date().getFullYear()} Steven Jia. Built with React + Vite.</p><a href="mailto:steven5115115@gmail.com">steven5115115@gmail.com</a></footer>
    </>
  );
}

export default App;
