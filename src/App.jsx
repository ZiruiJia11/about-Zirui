import { lazy, Suspense, useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Code2,
  FileText,
  Gamepad2,
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
import DepthText from "./components/DepthText/DepthText.jsx";

const PortfolioTour = lazy(() => import("./components/PortfolioTour/PortfolioTour.jsx"));

const navItems = [
  { label: "Home", path: "/" },
  { label: "Experience", path: "/experience" },
  { label: "Projects", path: "/projects" },
  { label: "Profile", path: "/profile" },
  { label: "CV", path: "/cv" },
];

const skillGroups = [
  { title: "Frontend & Product", items: ["React", "Vue 3", "Inertia.js", "TypeScript", "JavaScript", "Vite", "Zustand", "Next.js", "HTML5", "CSS3", "Responsive Design", "Progressive Web Apps", "Three.js", "React Three Fiber", "WebGL"] },
  { title: "Backend & Data", items: ["PHP", "Laravel", "C#", "ASP.NET Core", "Node.js", "Express", "Eloquent ORM", "Entity Framework Core", "PostgreSQL", "SQLite", "SQL", "Prisma", "Relational Data Modelling"] },
  { title: "APIs & Integration", items: ["REST APIs", "OData", "Power BI", "Multi-tenancy", "Authentication", "Authorisation", "API Rate Limiting", "Queues", "Real-time Features", "Meilisearch", "Valkey", "MinIO", "Gotenberg"] },
  { title: "Laravel Ecosystem", items: ["Reverb", "Sail", "Tenancy", "Versionable", "Auditing", "Media Library", "Migrations", "Validation", "CRUD"] },
  { title: "Testing & Quality", items: ["Pest", "xUnit", "Vitest", "React Testing Library", "JUnit", "Jest", "Unit Testing", "Integration Testing", "Feature Testing", "Static Analysis", "Fuzz Testing", "Debugging", "CI/CD"] },
  { title: "AI, Data & Automation", items: ["Vercel AI SDK", "OpenAI Responses API", "Tool-using Agents", "Zod", "Python", "Machine Learning", "NLP", "Computer Vision", "CNN", "Vision Transformer", "Model Evaluation", "Error Analysis", "Data Automation", "Explainable Systems"] },
  { title: "Developer Tools", items: ["VS Code", "PyCharm", "Codex", "ChatGPT", "Git", "GitHub", "Postman", "npm", "Mailpit"] },
  { title: "Cloud & Platforms", items: ["Docker", "Vercel", "Render", "Supabase", "AWS", "Snowflake", "GitHub Pages", "GitHub Actions"] },
];

const highlights = [
  "Full Stack Developer Intern at Ocular, building multi-tenant features across Vue 3, TypeScript, Laravel, and PostgreSQL.",
  "Builds deployed products across Laravel/Vue, React/TypeScript, Next.js/Supabase, and C#/.NET ecosystems.",
  "AWS Certified Cloud Practitioner with tutoring, support, and customer-facing experience.",
];

const profileStats = [
  { value: "10+", label: "portfolio projects" },
  { value: "AWS", label: "cloud certified" },
  { value: "Full-stack", label: "Laravel, React, Vue, .NET" },
];

const workspaceSignals = [
  { label: "Current role", value: "Ocular", status: "Interning" },
  { label: "Stack focus", value: "Vue + Laravel", status: "Building" },
  { label: "Current work", value: "Multi-tenant features", status: "Shipping" },
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
      "Develop multi-tenant application features using Vue 3, TypeScript, Inertia.js, PHP, Laravel, Eloquent ORM, and PostgreSQL.",
      "Deliver complete request lifecycles across reusable interfaces, REST APIs, validation, middleware, business logic, migrations, and ownership-aware database queries.",
      "Integrate authentication and authorisation, search, storage, email, document generation, queues, and real-time services through Docker, Laravel Sail, and Git-based delivery workflows.",
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
    summary: "Full-stack job tracker with SEEK and LinkedIn importing, browser-extension capture, editable records, private CV storage, and an OpenAI agent that returns structured fit reports grounded in the latest reviewed CV evidence.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "Vercel AI SDK", "OpenAI Responses API", "Zod"],
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
    summary: "Authenticated dependency-graph workspace with scoped project, node, and relationship CRUD, persistent layouts, 31 domain-focused feature tests, and a CI pipeline backed by PostgreSQL integration.",
    tags: ["Laravel 13", "Vue 3", "Inertia.js", "TypeScript", "PostgreSQL", "Pest", "GitHub Actions"],
    source: "https://github.com/ZiruiJia11/dependency-map",
    featured: true,
  },
  {
    name: "FitQuest - MSA 2026",
    summary: "Deployed gamified fitness tracker with quest CRUD, XP progression, streaks, achievements, responsive navigation, animated feedback, request validation, API rate limiting, and frontend and backend tests.",
    tags: ["React", "TypeScript", "ASP.NET Core", "C#", "Entity Framework Core", "SQLite", "xUnit"],
    link: "https://msa-2026-phase-2-software.vercel.app/",
    source: "https://github.com/ZiruiJia11/msa-2026-phase-2-software",
    featured: true,
  },
  {
    name: "Power BI OData API Demo",
    summary: "Tenant-isolated Laravel integration exposing discoverable OData feeds with filters, Basic and Bearer authentication, rate limiting, downloadable PBIDS/PBIT assets, and 11 domain-focused feature tests.",
    tags: ["Laravel", "Vue 3", "Inertia.js", "OData", "Power BI", "Multi-tenancy", "Pest"],
    source: "https://github.com/ZiruiJia11/power-bi-api-demo",
    featured: true,
  },
  {
    name: "Kiwi Supplement Watch",
    summary: "New Zealand supplement price-monitoring dashboard with live retailer collectors, source-health reporting, price history, stale-data fallback, and automated daily collection, smoke testing, dataset updates, and deployment.",
    tags: ["React", "Vite", "JavaScript", "GitHub Actions", "Data Automation", "Vercel"],
    link: "https://kiwi-supplement-watch.vercel.app/",
    source: "https://github.com/ZiruiJia11/kiwi-supplement-watch",
    featured: true,
  },
  {
    name: "Data and AI Classification Projects",
    summary: "Prepared image and text datasets, compared CNN, Vision Transformer, traditional ML, and transformer approaches, and used class-level error analysis to improve models; the strongest AG News model reached about 94.7% test accuracy.",
    tags: ["Python", "Machine Learning", "NLP", "CNN", "Vision Transformer", "Model Evaluation"],
    source: "https://github.com/ZiruiJia11/hand-written-letter-recognizer",
  },
  {
    name: "Tax Case Triage Assistant",
    summary: "Explainable case-prioritisation prototype using synthetic data, deterministic risk rules, visible evidence, mandatory human approval, timestamped audit logging, local-only data handling, and automated tests.",
    tags: ["Python", "SQLite", "JavaScript", "Explainable Rules", "Audit Logging", "Human in the Loop"],
  },
  {
    name: "Java Algorithms and Automated Testing",
    summary: "Route-planning application using DFS, BFS, and A* over structured transport data, paired with a team-built 2D maze game, JUnit test cases, and a custom fuzzing tool for regressions and edge cases.",
    tags: ["Java", "Algorithms", "Data Structures", "JUnit", "Git", "Fuzz Testing"],
  },
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
    return navItems.some((item) => item.path === path) || path === "/tour" ? path : "/";
  };
  const [currentPath, setCurrentPath] = useState(getPath);
  const [showExperiencePicker, setShowExperiencePicker] = useState(() => {
    try {
      return getPath() === "/" && window.sessionStorage.getItem("portfolio-experience-selected") !== "true";
    } catch {
      return getPath() === "/";
    }
  });

  const rememberExperienceChoice = () => {
    try {
      window.sessionStorage.setItem("portfolio-experience-selected", "true");
    } catch {
      // The choice still works when browser storage is unavailable.
    }
  };

  const chooseStandardExperience = () => {
    rememberExperienceChoice();
    setShowExperiencePicker(false);
  };

  const chooseTourExperience = () => {
    rememberExperienceChoice();
    setShowExperiencePicker(false);
    window.location.hash = "/tour";
  };

  const openCvPopup = () => {
    const cvUrl = new URL(`${import.meta.env.BASE_URL}cv-complete.pdf`, window.location.origin).href;
    const width = Math.min(1100, window.screen.availWidth - 80);
    const height = Math.min(860, window.screen.availHeight - 80);
    const left = Math.max(0, Math.round((window.screen.availWidth - width) / 2));
    const top = Math.max(0, Math.round((window.screen.availHeight - height) / 2));
    const popup = window.open(
      cvUrl,
      "steven-jia-complete-cv",
      `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    );
    popup?.focus();
  };

  useEffect(() => {
    const handleRouteChange = () => {
      const nextPath = getPath();
      setCurrentPath(nextPath);
      if (nextPath === "/") {
        try {
          setShowExperiencePicker(window.sessionStorage.getItem("portfolio-experience-selected") !== "true");
        } catch {
          setShowExperiencePicker(true);
        }
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", handleRouteChange);
    return () => window.removeEventListener("hashchange", handleRouteChange);
  }, []);

  useEffect(() => {
    if (!showExperiencePicker) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") chooseStandardExperience();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showExperiencePicker]);

  if (currentPath === "/tour") {
    return (
      <Suspense fallback={<div className="tour-route-loading" role="status"><span /> Loading guided tour</div>}>
        <PortfolioTour />
      </Suspense>
    );
  }

  return (
    <>
      {showExperiencePicker ? (
        <div className="experience-picker-backdrop" role="presentation">
          <section className="experience-picker" role="dialog" aria-modal="true" aria-labelledby="experience-picker-title">
            <header className="experience-picker-header">
              <p className="eyebrow">Choose your experience</p>
              <h1 id="experience-picker-title">How would you like to explore?</h1>
              <p>Both paths contain the same portfolio. Choose the version that suits your time and device.</p>
            </header>

            <div className="experience-picker-options">
              <button type="button" className="experience-option standard" onClick={chooseStandardExperience} autoFocus>
                <span className="experience-option-icon"><Code2 size={25} /></span>
                <span className="experience-option-label">QUICK &amp; SMOOTH</span>
                <strong>Standard portfolio</strong>
                <span className="experience-option-copy">The fastest way to review my experience, projects, skills, and CV.</span>
                <span className="experience-option-note">Recommended if you are short on time or want to avoid performance issues.</span>
                <span className="experience-option-action">ENTER STANDARD <ArrowUpRight size={18} /></span>
              </button>

              <button type="button" className="experience-option immersive" onClick={chooseTourExperience}>
                <span className="experience-option-icon"><Gamepad2 size={25} /></span>
                <span className="experience-option-label">BEST EXPERIENCE</span>
                <strong>3D guided tour</strong>
                <span className="experience-option-copy">An interactive cyber-world journey with animated scenes and project exhibits.</span>
                <span className="experience-option-note">Choose this for the full visual experience on a capable device.</span>
                <span className="experience-option-action">ENTER 3D TOUR <ArrowUpRight size={18} /></span>
              </button>
            </div>

            <p className="experience-picker-footnote">You can switch between both versions at any time from the navigation.</p>
          </section>
        </div>
      ) : null}

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
        <div className="site-header-nav">
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
          <a className="header-tour-button" href="#/tour" aria-label="Enter the 3D guided tour">
            <Gamepad2 size={17} />
            <span>3D Tour</span>
          </a>
        </div>
      </header>

      <main id="top" className="site-main">
        {currentPath === "/" ? <>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
            <p className="eyebrow"><ShinyText text="Open to graduate and junior roles" /></p>
            <h1 id="hero-title">
              <DepthText
                text="Steven Jia"
                layers={34}
                depth={2.4}
                faceColor="#1455d9"
                depthColor="#ff7a45"
                tilt={7.5}
                pointerTracking
                smoothing={0.14}
                perspective={900}
                autoOrbit
                orbitSpeed={0.35}
                fontSize="clamp(3rem, 8vw, 6.4rem)"
                fontWeight={900}
                shadow
              />
            </h1>
            <p className="hero-role">Software Engineer &amp; Full Stack Developer Intern | Laravel, Vue, React &amp; .NET</p>
            <p className="hero-summary">I build reliable, data-backed products across Vue and Laravel, React and TypeScript, Next.js and Supabase, and C# with ASP.NET Core. Recent work includes multi-tenant product features, evidence-grounded AI workflows, live data automation, OData integrations, automated testing, CI/CD, and cloud deployment.</p>
            <div className="hero-actions" aria-label="Contact and profile links">
              <a className="button primary" href="mailto:steven5115115@gmail.com"><Mail size={18} /> Email</a>
              <a className="button secondary" href="#/projects"><ArrowUpRight size={18} /> View work</a>
              <a className="button secondary" href="https://github.com/ZiruiJia11" target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub</a>
              <a className="button secondary" href="https://www.linkedin.com/in/steven-jia-b78314231/" target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} /> LinkedIn</a>
              <a className="button game" href="#/tour"><Gamepad2 size={18} /> 3D guided tour</a>
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
          <SectionHeader eyebrow="Technical profile" title="Skills that connect product, systems, data, AI, and testing" copy="A practical stack for graduate and junior software, full-stack, web, data, automation, and applied AI roles." />
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
          <SectionHeader eyebrow="Experience" title="Professional product development, teaching, and technical support" copy="Multi-tenant application work at Ocular, backed by tutoring, repair, and customer-facing problem solving." />
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
          <SectionHeader eyebrow="Selected work" title="Projects with real implementation depth" copy="Deployed full-stack products, evidence-grounded AI, live data automation, integrations, testing, algorithms, and machine-learning prototypes." />
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
          <SectionHeader eyebrow="CV & contact" title="View my CV" copy="Open my complete CV in a dedicated window, then use the contact links below if you would like to talk." />
          <section className="cv-section">
            <div>
              <p className="eyebrow">Complete profile / PDF</p>
              <h2>Steven Jia — Complete CV</h2>
              <p>Experience, education, projects, technical skills, certifications, and contact details in one current document.</p>
            </div>
            <button type="button" className="cv-view-button" onClick={openCvPopup}>
              <span><FileText size={22} /> Current CV</span>
              <strong>VIEW MY CV</strong>
              <em>OPEN DOCUMENT <ArrowUpRight size={20} /></em>
            </button>
          </section>

          <section className="contact-section" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Next step</p>
            <h2 id="contact-title">Open to graduate and junior software, full-stack, web, data, and applied AI roles</h2>
            <p>I am ready to discuss the engineering decisions behind these projects and how I can contribute across product development, data-backed systems, testing, automation, and technical problem solving.</p>
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
