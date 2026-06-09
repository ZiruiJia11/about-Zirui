import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Code2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import profileImage from "../image/profile.jpg";
import awsBadge from "../image/aws-certified-cloud-practitioner.png";

const navItems = ["Skills", "Experience", "Projects", "Education", "CV"];

const skillGroups = [
  { title: "Frontend", items: ["React", "Vue.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"] },
  { title: "Software Engineering", items: ["Java", "Python", "SQL", "REST APIs", "Data Structures", "Algorithms"] },
  { title: "Testing & Tools", items: ["JUnit", "Jest", "Git", "GitHub", "Figma", "Agile/Scrum"] },
  { title: "AI & Data", items: ["Machine Learning", "CNN", "Vision Transformer", "Data Processing", "AI Fundamentals"] },
];

const highlights = [
  "Computer Science graduate with an AI minor from Victoria University of Wellington.",
  "Builds practical frontend, backend, testing, and data-processing projects.",
  "AWS Certified Cloud Practitioner with hands-on support and teaching experience.",
];

const experience = [
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
    name: "Reel Local Cinema SaaS",
    summary: "Full-stack cinema booking platform for local film clubs and community screenings, with movie browsing, protected routes, booking pages, profile flows, and REST API support.",
    tags: ["React", "TypeScript", "Node.js", "Express", "REST API", "Vite"],
    link: "https://reel-local-project.vercel.app/",
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
    name: "Handwriting Recognition Prototype",
    summary: "Python machine-learning prototype for classifying handwritten characters, including dataset preparation and CNN versus Vision Transformer comparison.",
    tags: ["Python", "Machine Learning", "CNN", "Vision Transformer"],
  },
  {
    name: "Inclusive Transport UX Design",
    summary: "Public transport app concept shaped through user research, wireframes, high-fidelity prototypes, and accessibility-minded interface decisions.",
    tags: ["Figma", "UX Design", "HCI", "Accessibility"],
  },
];

const cvLinks = [
  { label: "Software Engineer CV", href: "/cv.pdf" },
  { label: "Junior Web Developer CV", href: "/cv-web-developer.pdf" },
  { label: "DOCX CV", href: "/Steven_CV.docx" },
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

function App() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Zirui Jia home">ZJ</a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Wellington, New Zealand</p>
            <h1 id="hero-title">Zirui Jia</h1>
            <p className="hero-role">Graduate Software Engineer | Junior Web Developer</p>
            <p className="hero-summary">I build reliable, user-focused software with Java, Python, JavaScript, React, and Vue. My work spans web applications, route-planning algorithms, testing, technical support, and AI/data projects.</p>
            <div className="hero-actions" aria-label="Contact and profile links">
              <a className="button primary" href="mailto:steven5115115@gmail.com"><Mail size={18} /> Email</a>
              <a className="button secondary" href="https://github.com/ZiruiJia11" target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub</a>
              <a className="button secondary" href="https://www.linkedin.com/in/zirui-jia-b78314231" target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} /> LinkedIn</a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Profile and quick facts">
            <img src={profileImage} alt="Zirui Jia" />
            <div className="quick-facts">
              <span><MapPin size={16} /> Wellington</span>
              <span><Phone size={16} /> 021 119 9859</span>
              <span><Sparkles size={16} /> Work visa</span>
            </div>
          </div>
        </section>

        <section className="highlights" aria-label="Profile highlights">
          {highlights.map((item) => <article key={item}><Sparkles size={18} /><p>{item}</p></article>)}
        </section>

        <section id="skills" className="page-section">
          <SectionHeader eyebrow="Technical profile" title="Skills that connect web, systems, and testing" copy="A practical stack for junior software, web, support, and configuration developer roles." />
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="panel" key={group.title}>
                <h3>{group.title}</h3>
                <div className="tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="page-section split-section">
          <SectionHeader eyebrow="Experience" title="Teaching, support, and customer-facing technical work" copy="I bring patience from tutoring, diagnosis from repair work, and calm communication from service roles." />
          <div className="timeline">
            {experience.map((job) => (
              <article className="timeline-item" key={`${job.role}-${job.period}`}>
                <div className="timeline-marker"><BriefcaseBusiness size={18} /></div>
                <div>
                  <div className="item-heading"><h3>{job.role}</h3><span>{job.period}</span></div>
                  <p className="institution">{job.company}</p>
                  <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="page-section projects-section">
          <SectionHeader eyebrow="Selected work" title="Projects with real implementation depth" copy="A mix of frontend applications, algorithms, testing, and machine-learning prototypes." />
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project" key={project.name}>
                <div className="project-top">
                  <Code2 size={20} />
                  {project.link ? <a href={project.link} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`}><ArrowUpRight size={18} /></a> : null}
                </div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="tags compact">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="page-section education-section">
          <SectionHeader eyebrow="Education & certification" title="Computer Science, AI, and cloud fundamentals" />
          <div className="education-grid">
            <article className="education-item"><GraduationCap size={22} /><div><h3>Bachelor of Science in Computer Science</h3><p>Victoria University of Wellington | 2023 - 2025</p><p>Minor in Artificial Intelligence. Relevant study: software engineering, algorithms, databases, machine learning, networks, and HCI.</p></div></article>
            <article className="education-item certification"><img src={awsBadge} alt="AWS Certified Cloud Practitioner badge" /><div><h3>AWS Certified Cloud Practitioner</h3><p>2026</p><p>Cloud fundamentals, core AWS services, security, billing, and shared responsibility concepts.</p></div></article>
            <article className="education-item"><Award size={22} /><div><h3>VUW Git & GitHub Workshop</h3><p>2024</p><p>Version control, repository workflow, collaboration basics, and source management habits.</p></div></article>
          </div>
        </section>

        <section id="cv" className="cv-section">
          <div><p className="eyebrow">CV downloads</p><h2>Choose the version that fits the role</h2><p>I keep role-focused CV versions for software engineering and web developer applications, plus a DOCX copy for editing.</p></div>
          <div className="cv-actions">{cvLinks.map((link) => <a className="button primary" href={link.href} download key={link.label}><Download size={18} /> {link.label}</a>)}</div>
        </section>
      </main>

      <footer><p>© {new Date().getFullYear()} Zirui Jia. Built with React + Vite.</p><a href="mailto:steven5115115@gmail.com">steven5115115@gmail.com</a></footer>
    </>
  );
}

export default App;
