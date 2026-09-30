import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  Cpu,
  FileText,
  FolderOpen,
  Globe2,
  Home,
  MapPin,
  Orbit,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import CardSwap, { Card } from "../CardSwap/CardSwap.jsx";
import Folder from "../Folder/Folder.jsx";
import GlowCursor from "../GlowCursor.jsx";
import GlitchText from "../GlitchText.jsx";
import FoldText from "../FoldText.jsx";
import SplitFlapText from "../SplitFlapText.jsx";
import tourScenes from "./tourScenes.js";
import "./PortfolioTour.css";

const CyberWorld = lazy(() => import("./CyberWorld.jsx"));
const DriftWall = lazy(() => import("../DriftWall.jsx"));
const Prism = lazy(() => import("../Prism.jsx"));
const LetterGlitch = lazy(() => import("../LetterGlitch.jsx"));
const Dither = lazy(() => import("../Dither.jsx"));
const GridScan = lazy(() => import("../GridScan.jsx").then(module => ({ default: module.GridScan })));
const AcidSquares = lazy(() => import("../AcidSquares.jsx"));
const DepthCarousel = lazy(() => import("../DepthCarousel.jsx"));
const ShapeWaves = lazy(() => import("../ShapeWaves.jsx"));
const FallingText = lazy(() => import("../FallingText.jsx"));
const StrokeText = lazy(() => import("../StrokeText.jsx"));

const projectPages = [
  {
    id: "dependency-map",
    number: "01",
    name: "Dependency Map",
    type: "Multi-tenant graph workspace",
    summary: "Authenticated dependency graphs with scoped ownership, persistent layouts, 31 feature tests, and CI-backed PostgreSQL integration.",
    stack: ["Laravel 13", "Vue 3", "PostgreSQL"],
    color: "#a855f7",
    source: "https://github.com/ZiruiJia11/dependency-map",
  },
  {
    id: "fitquest",
    number: "02",
    name: "FitQuest",
    type: "Gamified fitness tracker",
    summary: "Quest CRUD, XP progression, streaks, achievements, validation, rate limiting, and tested React-to-.NET API workflows.",
    stack: ["React", "ASP.NET Core", "SQLite"],
    color: "#d946ef",
    live: "https://msa-2026-phase-2-software.vercel.app/",
    source: "https://github.com/ZiruiJia11/msa-2026-phase-2-software",
  },
  {
    id: "jobtrack",
    number: "03",
    name: "JobTrack Fullstack",
    type: "Evidence-grounded AI workspace",
    summary: "SEEK and LinkedIn job capture with editable records and structured OpenAI fit reports grounded in the latest private CV evidence.",
    stack: ["Next.js", "Supabase", "OpenAI"],
    color: "#8b5cf6",
    live: "https://jobtrack-fullstack-ashy.vercel.app/",
    source: "https://github.com/ZiruiJia11/jobtrack-fullstack",
  },
  {
    id: "kiwi-supplement-watch",
    number: "04",
    name: "Kiwi Supplement Watch",
    type: "Live price-monitoring dashboard",
    summary: "New Zealand retailer collectors, source-health reporting, price history, stale-data fallback, and automated daily delivery.",
    stack: ["React", "GitHub Actions", "Vercel"],
    color: "#6366f1",
    live: "https://kiwi-supplement-watch.vercel.app/",
    source: "https://github.com/ZiruiJia11/kiwi-supplement-watch",
  },
  {
    id: "ml-classification",
    number: "05",
    name: "ML Classification",
    type: "Vision and NLP experiments",
    summary: "CNN and Vision Transformer comparison across 62 handwritten-character classes, plus AG News modelling reaching about 94.7% accuracy.",
    stack: ["Python", "CNN", "Vision Transformer"],
    color: "#38bdf8",
    source: "https://github.com/ZiruiJia11/hand-written-letter-recognizer",
  },
  {
    id: "power-bi-odata",
    number: "06",
    name: "Power BI OData API",
    type: "Tenant-isolated data integration",
    summary: "Discoverable OData feeds with filters, Basic and Bearer auth, rate limiting, PBIDS/PBIT assets, and 11 feature tests.",
    stack: ["Laravel", "OData", "Power BI"],
    color: "#22d3ee",
    source: "https://github.com/ZiruiJia11/power-bi-api-demo",
  },
];

const experienceRecords = [
  {
    id: "ocular",
    number: "01",
    tag: "CURRENT",
    company: "Ocular",
    location: "Wellington",
    role: "Full Stack Developer Intern",
    period: "Jul 2026 — Present",
    summary: "Developing multi-tenant application features across a Vue 3 frontend and Laravel/PostgreSQL backend.",
    points: [
      "Develop features using Vue 3, TypeScript, Inertia.js, PHP, Laravel, Eloquent ORM, and PostgreSQL.",
      "Work across frontend components, business logic, REST APIs, validation, migrations, authentication, authorisation, and search.",
      "Deliver search, storage, email, document-generation, queue, and real-time features through Docker, Laravel Sail, Git workflows, and structured debugging.",
    ],
  },
  {
    id: "scots",
    number: "02",
    tag: "TEACHING",
    company: "Scots College",
    location: "Wellington",
    role: "Coding & Robotics Tutor",
    period: "Jan 2024 — Present",
    summary: "Helping secondary school students turn programming ideas into working code and robots.",
    points: [
      "Teach Python, coding, and robotics to students with varied experience.",
      "Adapt technical explanations and support structured problem solving.",
      "Guide debugging, testing, and RoboCup preparation while strengthening mentoring, planning, and teamwork.",
    ],
  },
  {
    id: "urtech",
    number: "03",
    tag: "SUPPORT",
    company: "UR Tech",
    location: "Wellington",
    role: "Mobile Phone & Computer Repair Technician",
    period: "Dec 2025 — Feb 2026",
    summary: "Diagnosing device problems and translating technical fixes into clear customer outcomes.",
    points: [
      "Diagnosed hardware, software, and operating-system faults across computers, phones, and electronic devices.",
      "Completed setup, data transfers, updates, and quality checks.",
      "Investigated user-reported issues methodically and explained reliable solutions clearly to customers.",
    ],
  },
];

const skillModules = [
  {
    number: "01",
    code: "LANG",
    title: "Languages",
    subtitle: "Core programming toolkit",
    color: "#818cf8",
    items: ["Python", "PHP", "TypeScript", "JavaScript", "C#", "Java"],
  },
  {
    number: "02",
    code: "APP",
    title: "Application development",
    subtitle: "Full-stack product delivery",
    color: "#60a5fa",
    items: ["Laravel", "Vue 3", "Inertia.js", "React", "Next.js", "ASP.NET Core"],
  },
  {
    number: "03",
    code: "API",
    title: "Services & integration",
    subtitle: "Connected application systems",
    color: "#a78bfa",
    items: ["Node.js", "Express", "REST APIs", "OData", "Authentication", "Multi-tenancy"],
  },
  {
    number: "04",
    code: "DATA",
    title: "Data & persistence",
    subtitle: "Relational data systems",
    color: "#c084fc",
    items: ["PostgreSQL", "SQLite", "Supabase", "Eloquent ORM", "EF Core", "Prisma ORM"],
  },
  {
    number: "05",
    code: "TEST",
    title: "Testing & engineering",
    subtitle: "Reliable implementation",
    color: "#f472b6",
    items: ["Pest", "xUnit", "Vitest", "Integration testing", "Static analysis", "Fuzz testing"],
  },
  {
    number: "06",
    code: "OPS",
    title: "Cloud & delivery",
    subtitle: "Build, ship, and operate",
    color: "#22d3ee",
    items: ["Git", "GitHub Actions", "Docker", "Laravel Sail", "Vercel", "AWS Cloud Practitioner"],
  },
];

function escapeSvgText(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function createSkillTileImage({ skill, module, index }) {
  const title = escapeSvgText(skill);
  const group = escapeSvgText(module.title.toUpperCase());
  const fontSize = skill.length > 14 ? 38 : skill.length > 10 ? 46 : 58;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#1d1d34"/>
          <stop offset="1" stop-color="#080913"/>
        </linearGradient>
        <radialGradient id="core" cx="84%" cy="12%" r="76%">
          <stop offset="0" stop-color="${module.color}" stop-opacity="0.5"/>
          <stop offset="1" stop-color="${module.color}" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="${module.color}" stroke-opacity="0.11" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="600" height="400" rx="30" fill="url(#bg)"/>
      <rect width="600" height="400" rx="30" fill="url(#core)"/>
      <rect x="1.5" y="1.5" width="597" height="397" rx="28.5" fill="none" stroke="${module.color}" stroke-opacity="0.8" stroke-width="3"/>
      <rect x="18" y="18" width="564" height="364" rx="20" fill="url(#grid)" stroke="#ffffff" stroke-opacity="0.07"/>
      <path d="M42 50H188" stroke="${module.color}" stroke-width="6"/>
      <text x="42" y="90" fill="${module.color}" font-family="monospace" font-size="18" font-weight="700" letter-spacing="2">${module.code} / SKILL ${String(index + 1).padStart(2, "0")}</text>
      <text x="558" y="88" text-anchor="end" fill="#ffffff" fill-opacity="0.34" font-family="monospace" font-size="16">READY</text>
      <text x="300" y="230" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="800" letter-spacing="-1">${title}</text>
      <text x="300" y="278" text-anchor="middle" fill="#ffffff" fill-opacity="0.48" font-family="Arial, sans-serif" font-size="18">${group}</text>
      <rect x="42" y="318" width="516" height="1" fill="#ffffff" fill-opacity="0.1"/>
      <circle cx="54" cy="352" r="6" fill="${module.color}"/>
      <text x="74" y="359" fill="#ffffff" fill-opacity="0.4" font-family="monospace" font-size="16">STACK FORGE / SYSTEM ONLINE</text>
    </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const skillWallItems = skillModules.flatMap(module => module.items.map((skill, index) => ({
  image: createSkillTileImage({ skill, module, index }),
  title: `${skill} — ${module.title}`,
})));

const hobbyProfiles = [
  {
    number: "01",
    title: "Board games",
    subtitle: "Strategy / social play",
    description: "Planning several moves ahead, adapting to uncertainty, and finding better decisions with other people.",
    color: "#38bdf8",
  },
  {
    number: "02",
    title: "Skiing",
    subtitle: "Focus / momentum",
    description: "A fast outdoor challenge that rewards control, confidence, and staying composed as conditions change.",
    color: "#67e8f9",
  },
  {
    number: "03",
    title: "Hunting & nature",
    subtitle: "Patience / observation",
    description: "Quiet time outdoors sharpens attention to detail and gives me space to reset between demanding projects.",
    color: "#34d399",
  },
  {
    number: "04",
    title: "Tech exploration",
    subtitle: "Curiosity / experiments",
    description: "Testing new frameworks, AI tools, and programming ideas keeps my learning practical and continuous.",
    color: "#a78bfa",
  },
];

function createHobbyTileImage(hobby, index) {
  const title = escapeSvgText(hobby.title);
  const subtitle = escapeSvgText(hobby.subtitle.toUpperCase());
  const description = escapeSvgText(hobby.description);
  const number = String(index + 1).padStart(2, "0");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#102637"/>
          <stop offset="1" stop-color="#050b12"/>
        </linearGradient>
        <radialGradient id="glow" cx="84%" cy="10%" r="72%">
          <stop offset="0" stop-color="${hobby.color}" stop-opacity="0.58"/>
          <stop offset="1" stop-color="${hobby.color}" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="${hobby.color}" stroke-opacity="0.09"/>
        </pattern>
      </defs>
      <rect width="800" height="1000" rx="44" fill="url(#bg)"/>
      <rect width="800" height="1000" rx="44" fill="url(#glow)"/>
      <rect x="28" y="28" width="744" height="944" rx="32" fill="url(#grid)" stroke="${hobby.color}" stroke-opacity="0.62" stroke-width="3"/>
      <text x="64" y="104" fill="${hobby.color}" font-family="monospace" font-size="25" font-weight="700" letter-spacing="3">HOBBY / ${number}</text>
      <text x="736" y="104" text-anchor="end" fill="#ffffff" fill-opacity="0.42" font-family="monospace" font-size="21">OFF-DUTY</text>
      <text x="64" y="390" fill="${hobby.color}" fill-opacity="0.2" font-family="Arial, sans-serif" font-size="260" font-weight="900">${number}</text>
      <text x="64" y="560" fill="#ffffff" font-family="Arial, sans-serif" font-size="70" font-weight="800" letter-spacing="-3">${title}</text>
      <text x="64" y="618" fill="${hobby.color}" font-family="monospace" font-size="24" font-weight="700" letter-spacing="2">${subtitle}</text>
      <foreignObject x="64" y="680" width="650" height="170">
        <div xmlns="http://www.w3.org/1999/xhtml" style="color:rgba(255,255,255,.62);font:28px/1.48 Arial,sans-serif">${description}</div>
      </foreignObject>
      <circle cx="72" cy="906" r="9" fill="${hobby.color}"/>
      <path d="M102 906H736" stroke="#ffffff" stroke-opacity="0.14" stroke-width="2"/>
      <text x="64" y="944" fill="#ffffff" fill-opacity="0.34" font-family="monospace" font-size="18">PERSONAL MODULE / ACTIVE</text>
    </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const hobbyCarouselItems = hobbyProfiles.map((hobby, index) => ({
  image: createHobbyTileImage(hobby, index),
  alt: `${hobby.title} — ${hobby.subtitle}`,
}));

function ProjectArchive({ onPreviousScene, onNextScene }) {
  return (
    <section className="project-archive" style={{ "--project-color": "#a855f7" }} aria-label="Project archive">
      <div className="project-archive-glow" aria-hidden="true" />
      <header className="project-archive-header">
        <div className="project-folder-tab">
          <FolderOpen size={18} />
          <span><strong>Project archive</strong><em>Selected CV projects / 2026</em></span>
        </div>
        <div className="project-file-count">6 FILES / AUTO SWAP</div>
      </header>
      <div className="project-card-swap-stage" style={{ height: "600px", position: "relative" }}>
        <aside className="project-stroke-intro" aria-label="My selected CV projects">
          <span>03 / SELECTED CV PROJECTS</span>
          <Suspense fallback={<h2>MY PROJECTS</h2>}>
            <div className="project-stroke-lines">
              <StrokeText
                text="MY"
                strokeColor="#C084FC"
                fillColor="#F8FAFC"
                strokeWidth={1.4}
                drawDuration={1.35}
                fillDelay={0.16}
                stagger={0.05}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                fontSize={86}
                fontWeight={850}
                letterSpacing={-3}
              />
              <StrokeText
                text="PROJECTS"
                strokeColor="#A78BFA"
                fillColor="#F8FAFC"
                strokeWidth={1.4}
                drawDuration={1.6}
                fillDelay={0.2}
                stagger={0.045}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                fontSize={76}
                fontWeight={850}
                letterSpacing={-4}
              />
              <StrokeText
                text="SHIP READY"
                strokeColor="#67E8F9"
                fillColor="#DDD6FE"
                strokeWidth={1.25}
                drawDuration={1.45}
                fillDelay={0.18}
                stagger={0.04}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                fontSize={62}
                fontWeight={800}
                letterSpacing={-2}
              />
            </div>
          </Suspense>
          <p>Six selected CV projects across full-stack systems, AI workflows, live data, and machine learning.</p>
        </aside>
        <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
          {projectPages.map((project) => (
            <Card key={project.id} customClass="project-swap-card" style={{ "--card-accent": project.color }}>
              <header><span>PROJECT FILE / {project.number}</span><em>{project.type}</em></header>
              <div className="project-swap-content">
                <h2>{project.name}</h2>
                <p>{project.summary}</p>
                <div className="project-swap-tech">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
              <footer>
                {project.live ? <a href={project.live} target="_blank" rel="noreferrer"><Globe2 size={16} /> Live demo</a> : <span />}
                <a href={project.source} target="_blank" rel="noreferrer"><Code2 size={16} /> Source code</a>
              </footer>
            </Card>
          ))}
        </CardSwap>
      </div>
      <footer className="project-archive-footer">
        <button type="button" className="project-scene-back" onClick={onPreviousScene}><ArrowLeft size={17} /> Experience</button>
        <div className="project-swap-note"><i /> Auto swap · 5 seconds</div>
        <button type="button" className="project-scene-next" onClick={onNextScene}>Continue to skills <ArrowRight size={17} /></button>
      </footer>
    </section>
  );
}

function ExperienceFolder({ onPreviousScene, onNextScene, onSelectExperience }) {
  const [dropText, setDropText] = useState(false);
  const experienceFiles = experienceRecords.map((experience) => (
    <article className="experience-paper-file" key={experience.id}>
      <span>{experience.number} / {experience.tag}</span>
      <strong>{experience.company}</strong>
      <em>{experience.role}</em>
      <b>OPEN FILE ↗</b>
    </article>
  ));

  return (
    <section className="experience-folder-shell" aria-label="Experience file archive">
      <header className="experience-folder-header">
        <div className="experience-folder-label"><FolderOpen size={18} /><span>Experience files</span><em>Open the folder, then choose a file</em></div>
        <div className="experience-folder-count">3 FILES / INTERACTIVE</div>
      </header>
      <div className="experience-folder-stage" style={{ position: "relative" }}>
        <div className="experience-holo-array" aria-hidden="true">
          <span className="holo-ring holo-ring-one" />
          <span className="holo-ring holo-ring-two" />
          <span className="holo-cube holo-cube-one"><b>V</b></span>
          <span className="holo-cube holo-cube-two"><b>L</b></span>
          <span className="holo-cube holo-cube-three"><b>R</b></span>
        </div>
        <div className="experience-drone experience-drone-left" aria-hidden="true">
          <span className="drone-chassis"><i className="drone-top-panel" /><i className="drone-depth" /><i className="drone-lens" /></span><span className="drone-scan-grid" />
        </div>
        <div className="experience-drone experience-drone-right" aria-hidden="true">
          <span className="drone-chassis"><i className="drone-top-panel" /><i className="drone-depth" /><i className="drone-lens" /></span><span className="drone-scan-grid" />
        </div>
        <div className="experience-drone experience-drone-left-secondary" aria-hidden="true">
          <span className="drone-chassis"><i className="drone-top-panel" /><i className="drone-depth" /><i className="drone-lens" /></span><span className="drone-scan-grid" />
        </div>
        <div className="experience-drone experience-drone-right-secondary" aria-hidden="true">
          <span className="drone-chassis"><i className="drone-top-panel" /><i className="drone-depth" /><i className="drone-lens" /></span><span className="drone-scan-grid" />
        </div>
        <div className="experience-falling-prompt" aria-label="Open this file">
          <Suspense fallback={<span>OPEN THIS FILE</span>}>
            <FallingText
              text="OPEN THIS FILE"
              highlightWords={["O", "F"]}
              highlightClass="highlighted"
              trigger={dropText ? "auto" : "manual"}
              triggerDelay={0}
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="2rem"
              mouseConstraintStiffness={0.9}
            />
          </Suspense>
        </div>
        <Folder size={2.58} color="#5227FF" className="custom-folder" items={experienceFiles} onItemClick={onSelectExperience} onMouseEnter={() => setDropText(true)} />
        <p className="experience-folder-instruction"><i /> Click the folder to reveal three roles</p>
      </div>
      <footer className="experience-folder-footer">
        <button type="button" onClick={onPreviousScene}><ArrowLeft size={17} /> Profile</button>
        <span><i /> EXPERIENCE ARCHIVE</span>
        <button type="button" onClick={onNextScene}>Continue to projects <ArrowRight size={17} /></button>
      </footer>
    </section>
  );
}

function ExperienceDetail({ selectedIndex, onClose }) {
  const closeButtonRef = useRef(null);
  const selectedExperience = selectedIndex === null ? null : experienceRecords[selectedIndex];

  useEffect(() => {
    if (!selectedExperience) return undefined;
    const handleEscape = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEscape);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, selectedExperience]);

  if (!selectedExperience) return null;
  return createPortal(
    <div className="experience-detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <article className="experience-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="experience-scene-detail-title">
        <header>
          <div><span>EXPERIENCE FILE / {selectedExperience.number}</span><em>{selectedExperience.tag}</em></div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close experience details"><X size={20} /></button>
        </header>
        <div className="experience-detail-copy">
          <p>{selectedExperience.company}</p>
          <h2 id="experience-scene-detail-title">{selectedExperience.role}</h2>
          <div className="experience-detail-meta">
            <span><CalendarDays size={15} /> {selectedExperience.period}</span>
            <span><MapPin size={15} /> {selectedExperience.location}</span>
          </div>
          <p className="experience-detail-summary">{selectedExperience.summary}</p>
          <ul>{selectedExperience.points.map((point) => <li key={point}><i />{point}</li>)}</ul>
        </div>
        <footer><BriefcaseBusiness size={16} /> Steven Jia · Experience archive</footer>
      </article>
    </div>,
    document.body,
  );
}

function SkillsForge({ onPreviousScene, onNextScene }) {
  return (
    <section className="skills-forge" aria-label="Technical skill forge">
      <header className="skills-forge-header">
        <div className="skills-forge-title-block">
          <span><Cpu size={15} /> 04 / TECHNICAL LOADOUT</span>
          <GlitchText
            speed={1}
            enableShadows
            enableOnHover={false}
            afterShadowColor="#ff3de8"
            beforeShadowColor="#22d3ee"
            className="skills-glitch-title"
          >
            STACK FORGE
          </GlitchText>
        </div>
        <div className="skills-forge-count">36 SKILLS / LIVE WALL</div>
      </header>
      <div className="skills-drift-stage">
        <Suspense fallback={<div className="skills-drift-loading">Loading skill wall…</div>}>
          <DriftWall
            items={skillWallItems}
            columns={5}
            tileWidth={200}
            tileHeight={132}
            gap={18}
            tilt={16}
            turn={-14}
            perspective={1400}
            depth={120}
            speed={42}
            direction="up"
            variance={0.45}
            parallax={0.6}
            lift={64}
            fade={0.6}
            dim={0.9}
            overlayColor="#060010"
          />
        </Suspense>
        <div className="skills-drift-instruction"><i /> Continuous skill stream / 36 systems online</div>
      </div>
      <footer className="skills-forge-footer">
        <button type="button" onClick={onPreviousScene}><ArrowLeft size={17} /> Projects</button>
        <span><i /> FULL-STACK CORE</span>
        <button type="button" onClick={onNextScene}>Continue to hobbies <ArrowRight size={17} /></button>
      </footer>
    </section>
  );
}

function HobbiesVault({ onPreviousScene, onNextScene }) {
  return (
    <section className="hobbies-vault" aria-label="Hobbies and interests">
      <header className="hobbies-vault-header">
        <div>
          <span>05 / OFF-DUTY ARCHIVE</span>
          <h1>Life beyond the build.</h1>
        </div>
        <p>Four ways I reset, stay observant, and keep learning.</p>
      </header>
      <div className="hobbies-carousel-stage">
        <Suspense fallback={<div className="skills-drift-loading">Loading hobby archive…</div>}>
          <DepthCarousel
            items={hobbyCarouselItems}
            cardWidth={380}
            cardHeight={475}
            perspective={1200}
            depth={250}
            spread={112}
            tilt={22}
            tiltDirection="right"
            visibleCards={4}
            falloff={0.2}
            blur={6}
            autoplay
            loop
          />
        </Suspense>
      </div>
      <footer className="hobbies-vault-footer">
        <button type="button" onClick={onPreviousScene}><ArrowLeft size={17} /> Skills</button>
        <span><i /> LEISURE VAULT</span>
        <button type="button" onClick={onNextScene}>Continue to contact <ArrowRight size={17} /></button>
      </footer>
    </section>
  );
}

function ContactSignal({ onFinish }) {
  const [showCvFold, setShowCvFold] = useState(false);
  const contact = tourScenes[tourScenes.length - 1];
  const contactLinks = [
    { label: "PHONE", value: "021 119 9859", href: "tel:+64211199859" },
    { label: "EMAIL", value: "steven5115115@gmail.com", href: "mailto:steven5115115@gmail.com" },
    { label: "GITHUB", value: "ZiruiJia11", href: "https://github.com/ZiruiJia11", external: true },
    { label: "LINKEDIN", value: "Steven Jia", href: "https://www.linkedin.com/in/steven-jia-b78314231/", external: true },
    { label: "PORTFOLIO", value: "stevenjia.co.nz", href: "https://stevenjia.co.nz/", external: true },
  ];
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
    const timer = window.setTimeout(() => setShowCvFold(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="contact-signal" aria-label="Contact Steven Jia">
        <p className="contact-signal-kicker"><span>06</span> FINAL TRANSMISSION / CHANNEL OPEN</p>
        <h1>
          Let&apos;s build
          <strong data-text="something useful.">something useful.</strong>
        </h1>
        <p className="contact-signal-summary">{contact.summary}</p>
        <div className="contact-signal-lines">
          {contactLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
            >
              <span>0{index + 1}</span>
              <strong>{link.label}</strong>
              <em>{link.value}</em>
              <ArrowRight size={14} />
            </a>
          ))}
        </div>
      </section>

      <div className="contact-portal-status" aria-label="Return to homepage portal">
        <span>HOMEBOUND GATE / CLICK TO RETURN</span>
        <SplitFlapText
          words={['RETURN HOME', 'BACK TO MAIN', 'PORTAL READY']}
          flipDuration={0.12}
          stagger={0.06}
          cycleDelay={2400}
          charset="alphanumeric"
          flipsPerChar={8}
          tileColor="#111827"
          textColor="#f8fafc"
          tileRadius={8}
          gap={6}
          fontSize={52}
          loop
          padTo={12}
        />
      </div>

      <button type="button" className="contact-cv-showcase" onClick={openCvPopup} aria-label="View my CV">
        <span className="contact-cv-showcase-meta"><FileText size={16} aria-hidden="true" /> PERSONNEL FILE / PDF</span>
        <span className="contact-cv-showcase-title">
          {showCvFold ? (
            <>
              <span className="contact-cv-title-line">
                <FoldText
                  text="VIEW MY"
                  splitBy="char"
                  hinge="top"
                  trigger="mount"
                  duration={0.72}
                  stagger={0.07}
                  ease="power3.out"
                  perspective={700}
                  creaseShading={0.7}
                  fontSize="clamp(2.25rem, 4.25vw, 4.9rem)"
                  fontWeight={800}
                  color="#d8ffec"
                  className="contact-cv-fold-text"
                />
              </span>
              <span className="contact-cv-title-line">
                <FoldText
                  text="CV"
                  splitBy="char"
                  hinge="top"
                  trigger="mount"
                  duration={0.72}
                  stagger={0.07}
                  ease="power3.out"
                  perspective={700}
                  creaseShading={0.7}
                  fontSize="clamp(2.25rem, 4.25vw, 4.9rem)"
                  fontWeight={800}
                  color="#d8ffec"
                  className="contact-cv-fold-text"
                />
              </span>
            </>
          ) : (
            <>
              <span className="contact-cv-placeholder contact-cv-title-line" aria-hidden="true">VIEW MY</span>
              <span className="contact-cv-placeholder contact-cv-title-line" aria-hidden="true">CV</span>
            </>
          )}
        </span>
        <span className="contact-cv-showcase-cta">OPEN DOCUMENT <ArrowRight size={19} /></span>
      </button>
    </>
  );
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export default function PortfolioTour() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [liteMode, setLiteMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 820
      || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [webGLReady, setWebGLReady] = useState(null);
  const [moving, setMoving] = useState(false);
  const [portalExiting, setPortalExiting] = useState(false);
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);
  const [revealedSceneIndex, setRevealedSceneIndex] = useState(0);
  const shellRef = useRef(null);
  const portalExitTimerRef = useRef(null);
  const activeScene = tourScenes[activeIndex];
  const isLast = activeIndex === tourScenes.length - 1;
  const sceneContentReady = ![1, 2].includes(activeIndex) || revealedSceneIndex === activeIndex;
  const closeExperienceDetail = useCallback(() => setSelectedExperienceIndex(null), []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(media.matches);
    syncMotion();
    media.addEventListener?.("change", syncMotion);
    setWebGLReady(supportsWebGL());
    return () => media.removeEventListener?.("change", syncMotion);
  }, []);

  useEffect(() => () => {
    if (portalExitTimerRef.current) window.clearTimeout(portalExitTimerRef.current);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    setMoving(true);
    const timer = window.setTimeout(() => setMoving(false), 1150);
    return () => window.clearTimeout(timer);
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    setSelectedExperienceIndex(null);
  }, [activeIndex]);

  useEffect(() => {
    if (![1, 2].includes(activeIndex) || reducedMotion || webGLReady === false) {
      setRevealedSceneIndex(activeIndex);
      return undefined;
    }

    const timer = window.setTimeout(() => setRevealedSceneIndex(activeIndex), 1450);
    return () => window.clearTimeout(timer);
  }, [activeIndex, reducedMotion, webGLReady]);

  const changeScene = (nextIndex) => setActiveIndex(Math.max(0, Math.min(tourScenes.length - 1, nextIndex)));
  const returnToMainPortfolio = () => {
    if (portalExitTimerRef.current) return;
    setPortalExiting(true);
    portalExitTimerRef.current = window.setTimeout(() => {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
      portalExitTimerRef.current = null;
    }, reducedMotion ? 180 : 1120);
  };
  const handleNext = () => {
    if (isLast) {
      returnToMainPortfolio();
      return;
    }
    changeScene(activeIndex + 1);
  };

  const handleKeyDown = (event) => {
    if (event.target.closest?.(".drift-wall")) return;
    if (event.key === "ArrowRight" || (["Enter", " "].includes(event.key) && event.target === event.currentTarget)) {
      event.preventDefault();
      handleNext();
    }
    if (event.key === "ArrowLeft" && activeIndex > 0) {
      event.preventDefault();
      changeScene(activeIndex - 1);
    }
  };

  const handlePointerMove = (event) => {
    shellRef.current?.style.setProperty("--pointer-x", `${event.clientX}px`);
    shellRef.current?.style.setProperty("--pointer-y", `${event.clientY}px`);
  };

  return (
    <GlowCursor
      className="tour-glow-cursor"
      color="#67E8F9"
      secondaryColor="#A78BFA"
      trailLength={40}
      trailWidth={8}
      trailTaper={0.8}
      followSpeed={0.16}
      glowIntensity={1.9}
      glowSpread={1.2}
      hotspot={0.65}
      brightness={1.25}
      opacity={1}
      pulseSpeed={1.1}
      noiseStrength={0.035}
      idleFade
      idleTimeout={700}
      fadeDuration={900}
      blendMode="screen"
    >
      <section
      className={`portfolio-tour${moving ? " is-moving" : ""}${portalExiting ? " is-portal-exiting" : ""}${liteMode ? " is-lite-mode" : ""}${activeScene.id === "projects" ? " is-project-scene" : ""}${activeScene.id === "experience" ? " is-experience-scene" : ""}${activeScene.id === "skills" ? " is-skills-scene" : ""}${activeScene.id === "hobbies" ? " is-hobbies-scene" : ""}${!liteMode && [0, 1, 2, 3, 4, 5].includes(activeIndex) ? " has-react-bits-background" : ""}`}
      ref={shellRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
      onPointerDown={(event) => { if (event.target.tagName === "CANVAS") shellRef.current?.focus({ preventScroll: true }); }}
      aria-label="Guided 3D portfolio tour"
    >
      <div className="tour-canvas" aria-hidden="true">
        {liteMode ? <div className={`tour-lite-background is-${activeScene.id}`} /> : null}
        {!liteMode && activeIndex === 0 ? (
          <div className="tour-prism-background">
            <Suspense fallback={null}>
              <Prism
                animationType="rotate"
                timeScale={0.5}
                height={3.5}
                baseWidth={5.5}
                scale={3.6}
                hueShift={0}
                colorFrequency={1}
                noise={0.5}
                glow={1}
              />
            </Suspense>
          </div>
        ) : null}
        {!liteMode && activeIndex === 1 ? (
          <div className="tour-gridscan-background">
            <Suspense fallback={null}>
              <GridScan
                sensitivity={0.55}
                lineThickness={1}
                linesColor="#3d3152"
                gridScale={0.1}
                scanColor="#b86cff"
                scanOpacity={0.44}
                enablePost
                bloomIntensity={0.6}
                chromaticAberration={0.002}
                noiseIntensity={0.01}
              />
            </Suspense>
          </div>
        ) : null}
        {!liteMode && activeIndex === 2 ? (
          <div className="tour-dither-background">
            <Suspense fallback={null}>
              <Dither
                waveColor={[0.44, 0.16, 0.68]}
                backgroundColor={[0.018, 0.008, 0.04]}
                disableAnimation={false}
                enableMouseInteraction
                mouseRadius={0.3}
                colorNum={4}
                waveAmplitude={0.3}
                waveFrequency={3}
                waveSpeed={0.05}
              />
            </Suspense>
          </div>
        ) : null}
        {!liteMode && activeIndex === 3 ? (
          <div className="tour-acid-background">
            <Suspense fallback={null}>
              <AcidSquares
                color1="#5227FF"
                color2="#A855F7"
                color3="#FFFFFF"
                detail="medium"
                speed={0.7}
                waveDepth={1}
                zoom={1.3}
                density={10}
                glow={1}
                exposure={2700}
                spread={0.3}
                stepSize={0.002}
                colorShift={0}
                contrast={1}
                brightness={1}
                opacity={1}
                mouseInteraction
                mouseStrength={0.1}
                mouseRadius={0.35}
                blur={0}
                grain
                grainIntensity={0.05}
              />
            </Suspense>
          </div>
        ) : null}
        {!liteMode && activeIndex === 4 ? (
          <div className="tour-shape-waves-background">
            <Suspense fallback={null}>
              <ShapeWaves
                text="OFF DUTY"
                fontFamily={'Geist, "Geist Sans", system-ui, sans-serif'}
                fontWeight={500}
                textSize={0.6}
                shapes="mixed"
                cellSize={10}
                dotSize={0.75}
                color="#72ff45"
                hoverColor="#ff3de8"
                backgroundColor="#070011"
                speed={1}
                scale={1}
                contrast={1}
                brightness={0.4}
                flow={0}
                direction={0}
                fade={0.25}
                interactive
                splashRadius={40}
                splashStrength={0.4}
                glow={0.35}
                intro
                introDuration={1.6}
                paused={false}
              />
            </Suspense>
          </div>
        ) : null}
        {!liteMode && isLast ? (
          <div className="tour-letter-glitch-background">
            <Suspense fallback={null}>
              <LetterGlitch
                glitchSpeed={50}
                centerVignette
                outerVignette={false}
                smooth
              />
            </Suspense>
          </div>
        ) : null}
        {webGLReady ? (
          <Suspense fallback={<div className="tour-static-backdrop" />}>
            <CyberWorld
              activeIndex={activeIndex}
              reducedMotion={reducedMotion || liteMode}
              liteMode={liteMode}
              moving={moving}
              onNext={handleNext}
              portalExiting={portalExiting}
            />
          </Suspense>
        ) : <div className="tour-static-backdrop" />}
      </div>

      <div className="portal-exit-transition" aria-hidden="true">
        <i />
        <span>RETURNING TO MAIN PORTFOLIO</span>
      </div>

      <header className="tour-header">
        <a className="tour-brand" href="/" aria-label="Return to Steven Jia portfolio"><span className="tour-logo"><Orbit size={21} strokeWidth={2.4} /></span><strong>Steven<span> / Lab</span></strong></a>
        <div className="tour-world-heading" aria-label="Cyber World — interactive VR 3D portfolio">
          <span>VR / 3D portfolio</span>
          <strong>Cyber World</strong>
        </div>
        <div className="tour-header-tools">
          <div className="tour-command"><Search size={15} /><span>Zone</span><kbd>{activeScene.number} / 06</kbd></div>
          <button
            className="tour-settings"
            type="button"
            aria-label={`Switch to ${liteMode ? "full" : "lite"} visual effects`}
            aria-pressed={liteMode}
            title={`Visual effects: ${liteMode ? "Lite" : "Full"}`}
            onClick={() => setLiteMode((current) => !current)}
          >
            <SlidersHorizontal size={17} />
            <span>{liteMode ? "Lite" : "Full"}</span>
          </button>
          <a className="tour-exit" href="/"><Home size={16} /> <span>Exit tour</span></a>
        </div>
      </header>

      {activeScene.id === "projects" ? (
        sceneContentReady ? <ProjectArchive onPreviousScene={() => changeScene(activeIndex - 1)} onNextScene={handleNext} /> : null
      ) : activeScene.id === "experience" ? (
        sceneContentReady ? <ExperienceFolder
          onPreviousScene={() => changeScene(activeIndex - 1)}
          onNextScene={handleNext}
          onSelectExperience={setSelectedExperienceIndex}
        /> : null
      ) : activeScene.id === "skills" ? (
        <SkillsForge onPreviousScene={() => changeScene(activeIndex - 1)} onNextScene={handleNext} />
      ) : activeScene.id === "hobbies" ? (
        <HobbiesVault onPreviousScene={() => changeScene(activeIndex - 1)} onNextScene={handleNext} />
      ) : activeScene.id === "contact" ? (
        <ContactSignal onFinish={handleNext} />
      ) : null}

      <ExperienceDetail selectedIndex={selectedExperienceIndex} onClose={closeExperienceDetail} />

      {!isLast ? <div className="tour-mode"><i /> {liteMode ? "Lite effects" : reducedMotion || webGLReady === false ? "Accessible view" : moving ? "Travelling" : activeScene.label}</div> : null}
      </section>
    </GlowCursor>
  );
}
