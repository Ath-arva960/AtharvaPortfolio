import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Brain,
  Code2,
  Database,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  Move,
  ArrowUpRight,
  X,
} from "lucide-react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./style.css";
import "./hero-background.css";
import "./technology-globe-loader.css";
import SelectedWorkSection from "./components/selected-work/SelectedWorkSection.jsx";
import SystemIntro from "./components/system-intro/SystemIntro.jsx";

const contactLinks = {
  github: "https://github.com/Atha-rva",
  email: "https://mail.google.com/mail/?view=cm&fs=1&to=deshmukhatharva024%40gmail.com",
  linkedin: "https://www.linkedin.com/in/atharva-deshmukh-9b61b325b/",
};

function shouldShowSystemIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  try {
    if (window.sessionStorage.getItem("portfolio-system-intro-seen")) {
      return false;
    }
    window.sessionStorage.setItem("portfolio-system-intro-seen", "true");
    return true;
  } catch (error) {
    if (error instanceof DOMException) {
      console.warn("Intro session preference could not be saved.", error);
      return false;
    }
    throw error;
  }
}

const TechnologyGlobeSection = React.lazy(() =>
  import("./components/technology-globe/TechnologyGlobeSection.jsx"),
);

class TechnologyGlobeErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Failed to render the technology globe section.", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="technology-load-error" role="alert">
          The technology globe could not be loaded. Please refresh the page to try
          again.
        </div>
      );
    }

    return this.props.children;
  }
}

function DeferredTechnologyGlobe() {
  const sectionRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldLoad) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "160px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div className="toolkit-deferred" id="skills" ref={sectionRef}>
      {shouldLoad && (
        <TechnologyGlobeErrorBoundary>
          <React.Suspense
            fallback={
              <div className="technology-load-fallback" role="status">
                Loading interactive technology globe…
              </div>
            }
          >
            <TechnologyGlobeSection />
          </React.Suspense>
        </TechnologyGlobeErrorBoundary>
      )}
    </div>
  );
}

const navigation = ["Home", "About", "Skills", "Projects", "Contact"];

const technologies = [
  { name: "React", url: "https://react.dev/", className: "react-logo" },
  { name: "TypeScript", url: "https://www.typescriptlang.org/", className: "typescript-logo" },
  { name: "JavaScript", url: "https://developer.mozilla.org/docs/Web/JavaScript", className: "javascript-logo" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com/", className: "tailwind-logo" },
  { name: "Node.js", url: "https://nodejs.org/", className: "node-logo" },
  { name: "Git", url: "https://git-scm.com/", className: "git-logo" },
];

const practiceAreas = [
  {
    number: "01",
    title: "Data engineering",
    description: "Reliable ingestion, transformation, and storage.",
    icon: Database,
  },
  {
    number: "02",
    title: "AI engineering",
    description: "Useful model integrations grounded in trusted context.",
    icon: Brain,
  },
  {
    number: "03",
    title: "Software development",
    description: "Maintainable interfaces, services, and tests.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Data analytics",
    description: "Clear metrics, exploration, and communication.",
    icon: BarChart3,
  },
];

const toolkitTechnologies = [
  {
    name: "React",
    category: "INTERFACES",
    role: "Building responsive, component-driven product experiences.",
    examples: "Reusable UI · dashboards · interactive tools",
    position: "react",
  },
  {
    name: "TypeScript",
    category: "FOUNDATIONS",
    role: "Keeping application logic predictable as products grow.",
    examples: "Typed APIs · safer refactors · shared contracts",
    position: "typescript",
  },
  {
    name: "Node.js",
    category: "SERVICES",
    role: "Connecting interfaces to dependable application services.",
    examples: "API routes · integrations · server-side workflows",
    position: "node",
  },
  {
    name: "GraphQL",
    category: "DATA",
    role: "Shaping flexible data access around real product needs.",
    examples: "Queries · schema design · connected experiences",
    position: "graphql",
  },
  {
    name: "Tailwind",
    category: "DESIGN SYSTEMS",
    role: "Translating visual systems into consistent interface details.",
    examples: "Responsive layouts · design tokens · UI polish",
    position: "tailwind",
  },
  {
    name: "Git",
    category: "WORKFLOW",
    role: "Making collaboration and iteration clear and dependable.",
    examples: "Version control · reviews · release workflows",
    position: "git",
  },
];

function ToolkitSection() {
  const [selectedTechnology, setSelectedTechnology] = useState(
    toolkitTechnologies[0],
  );
  const [rotation, setRotation] = useState(0);
  const dragRef = useRef(null);
  const globeClipId = `${React.useId().replace(/:/g, "")}-globe-clip`;

  const startGlobeDrag = (event) => {
    if (event.button !== 0) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startRotation: rotation,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const rotateGlobe = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setRotation(drag.startRotation + (event.clientX - drag.startX) * 0.55);
  };

  const stopGlobeDrag = (event) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
    }
  };

  return (
    <section className="section toolkit-section" id="skills">
      <label>02 — TECHNOLOGY &amp; PRACTICE</label>
      <div className="toolkit-heading">
        <h2>
          Tools serve
          <br />
          <span>the work.</span>
        </h2>
        <p>
          A thoughtful toolkit is only as useful as the problems it helps
          solve. I bring the right technologies together across four connected
          areas of practice.
        </p>
      </div>

      <div className="toolkit-layout">
        <div className="practice-grid" aria-label="Focus areas">
          {practiceAreas.map(({ number, title, description, icon: Icon }) => (
            <article className="practice-card" key={number}>
              <div className="practice-card-top">
                <span className="practice-number">{number} / 04</span>
                <span className="practice-icon" aria-hidden="true">
                  <Icon size={19} strokeWidth={1.6} />
                </span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <ArrowUpRight className="practice-arrow" size={16} aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="toolkit-orbit-card">
          <div className="orbit-card-heading">
            <div>
              <span className="orbit-overline">A CONNECTED TOOLKIT</span>
              <h3>Built to work together.</h3>
            </div>
            <span className="orbit-status">
              <i aria-hidden="true" />
              IN PRACTICE
            </span>
          </div>

          <div
            className="toolkit-globe"
            aria-label="Interactive technology globe. Drag horizontally to rotate."
            onPointerDown={startGlobeDrag}
            onPointerMove={rotateGlobe}
            onPointerUp={stopGlobeDrag}
            onPointerCancel={stopGlobeDrag}
            onLostPointerCapture={stopGlobeDrag}
          >
            <div className="globe-halo" aria-hidden="true" />
            <div className="globe-disc" aria-hidden="true">
              <svg className="globe-map" viewBox="0 0 320 320">
                <defs>
                  <clipPath id={globeClipId}>
                    <circle cx="160" cy="160" r="144" />
                  </clipPath>
                  <radialGradient id={`${globeClipId}-fill`} cx="35%" cy="28%">
                    <stop offset="0%" stopColor="#244f7d" />
                    <stop offset="68%" stopColor="#102947" />
                    <stop offset="100%" stopColor="#09182b" />
                  </radialGradient>
                </defs>
                <circle
                  cx="160"
                  cy="160"
                  r="144"
                  fill={`url(#${globeClipId}-fill)`}
                />
                <g
                  className="globe-map-rotation"
                  clipPath={`url(#${globeClipId})`}
                  style={{ "--globe-rotation": `${rotation}deg` }}
                >
                  <g className="globe-grid">
                    <ellipse cx="160" cy="160" rx="138" ry="48" />
                    <ellipse cx="160" cy="160" rx="138" ry="94" />
                    <ellipse cx="160" cy="160" rx="138" ry="122" />
                    <ellipse cx="160" cy="160" rx="50" ry="138" />
                    <ellipse cx="160" cy="160" rx="94" ry="138" />
                    <path d="M22 160h276M39 105h242M39 215h242" />
                  </g>
                  <g className="globe-land">
                    <path d="m74 94 20-18 25 5 11 17-10 12 5 17-17 9-6 22-18 8-12-15-15-3 3-19-11-12 8-16 16-7Z" />
                    <path d="m116 173 17 5 11 19-5 24-12 19-8 30-13-18 1-27-9-17 4-23 14-12Z" />
                    <path d="m157 91 17-13 21 7 9 15 21 2 17 16-6 17-20 2-10 14-20-3-7-13-19-1-10-18-17 2-9-11 3-12 15-4Z" />
                    <path d="m190 155 17-8 21 9 12 18-8 21-13 8-7 25-17-5-7-19-17-11 2-20-8-11 5-7Z" />
                    <path d="m257 199 13 2 8 10-8 12-14-4-5-10 6-10Z" />
                    <circle cx="160" cy="160" r="3" className="globe-core" />
                  </g>
                  <g className="globe-signal">
                    <circle cx="113" cy="128" r="3" />
                    <circle cx="204" cy="110" r="3" />
                    <circle cx="205" cy="196" r="3" />
                    <circle cx="133" cy="215" r="3" />
                  </g>
                </g>
                <circle className="globe-outline" cx="160" cy="160" r="144" />
              </svg>
            </div>
            <span className="globe-orbit orbit-one" aria-hidden="true" />
            <span className="globe-orbit orbit-two" aria-hidden="true" />

            {toolkitTechnologies.map((technology) => (
              <button
                className={`technology-node node-${technology.position}${
                  selectedTechnology.name === technology.name ? " is-active" : ""
                }`}
                key={technology.name}
                type="button"
                aria-pressed={selectedTechnology.name === technology.name}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => setSelectedTechnology(technology)}
              >
                <i aria-hidden="true" />
                {technology.name}
              </button>
            ))}
          </div>

          <div className="technology-detail" aria-live="polite">
            <div className="technology-detail-icon" aria-hidden="true">
              <Move size={16} strokeWidth={1.6} />
            </div>
            <div className="technology-detail-copy">
              <span>{selectedTechnology.category}</span>
              <p>{selectedTechnology.role}</p>
              <small>{selectedTechnology.examples}</small>
            </div>
          </div>
          <p className="globe-instruction">
            Drag to rotate the globe or select a technology to inspect its role
            and examples.
          </p>
        </div>
      </div>
    </section>
  );
}

function TechBadges() {
  return (
    <div className="tech" aria-label="Technologies I work with">
      {technologies.map((technology) => (
        <a
          className={`tech-badge ${technology.className}`}
          href={technology.url}
          key={technology.name}
          target="_blank"
          rel="noreferrer"
          aria-label={`Learn about ${technology.name}`}
          title={technology.name}
        >
          {technology.name === "React" && (
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="2.5" />
              <ellipse cx="20" cy="20" rx="17" ry="6.5" />
              <ellipse cx="20" cy="20" rx="17" ry="6.5" transform="rotate(60 20 20)" />
              <ellipse cx="20" cy="20" rx="17" ry="6.5" transform="rotate(120 20 20)" />
            </svg>
          )}
          {technology.name === "TypeScript" && <span>TS</span>}
          {technology.name === "JavaScript" && <span>JS</span>}
          {technology.name === "Tailwind CSS" && (
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <path d="M8 17c2.7-5.3 6.7-8 12-8 8 0 9 6 13 7-2.7 5.3-6.7 8-12 8-8 0-9-6-13-7Zm-3 11c2.7-5.3 6.7-8 12-8 8 0 9 6 13 7-2.7 5.3-6.7 8-12 8-8 0-9-6-13-7Z" />
            </svg>
          )}
          {technology.name === "Node.js" && <span>JS</span>}
          {technology.name === "Git" && (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v6m0 0 5 4m-5-4-5 4m5 0v7" />
              <circle cx="12" cy="3" r="2" />
              <circle cx="12" cy="21" r="2" />
              <circle cx="7" cy="13" r="2" />
              <circle cx="17" cy="13" r="2" />
            </svg>
          )}
        </a>
      ))}
    </div>
  );
}

function TouchCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    let lastScrollY = window.scrollY;
    let hideTimeout;
    let resetTimeout;
    let animationFrame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let hasPosition = false;

    const animatePosition = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      cursor.style.setProperty("--cursor-x", `${currentX}px`);
      cursor.style.setProperty("--cursor-y", `${currentY}px`);

      if (
        Math.abs(targetX - currentX) > 0.5 ||
        Math.abs(targetY - currentY) > 0.5
      ) {
        animationFrame = window.requestAnimationFrame(animatePosition);
      } else {
        currentX = targetX;
        currentY = targetY;
        cursor.style.setProperty("--cursor-x", `${currentX}px`);
        cursor.style.setProperty("--cursor-y", `${currentY}px`);
        animationFrame = 0;
      }
    };

    const showCursor = (x, y, emoji, shouldHide = false) => {
      targetX = x;
      targetY = y;
      if (!hasPosition) {
        currentX = x;
        currentY = y;
        hasPosition = true;
        cursor.style.setProperty("--cursor-x", `${x}px`);
        cursor.style.setProperty("--cursor-y", `${y}px`);
      } else if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animatePosition);
      }
      cursor.textContent = emoji;
      cursor.classList.add("visible");
      window.clearTimeout(hideTimeout);
      window.clearTimeout(resetTimeout);

      if (shouldHide) {
        hideTimeout = window.setTimeout(() => {
          cursor.classList.remove("visible");
        }, 1000);
      } else {
        resetTimeout = window.setTimeout(() => {
          cursor.textContent = "TOUCH";
        }, 650);
      }
    };

    const handlePointerMove = (event) => {
      if (event.pointerType === "touch") {
        showCursor(event.clientX, event.clientY, "TOUCH", true);
      } else if (hasFinePointer) {
        showCursor(event.clientX, event.clientY, "TOUCH");
      }
    };

    const handlePointerDown = (event) => {
      showCursor(
        event.clientX,
        event.clientY,
        "TOUCH",
        event.pointerType === "touch",
      );
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === lastScrollY) return;

      lastScrollY = currentScrollY;
      showCursor(
        hasPosition ? targetX : window.innerWidth / 2,
        hasPosition ? targetY : window.innerHeight / 2,
        "SCROLL",
        !hasFinePointer,
      );
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(hideTimeout);
      window.clearTimeout(resetTimeout);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div className="touch-cursor" ref={cursorRef} aria-hidden="true" />;
}

function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showSystemIntro, setShowSystemIntro] = useState(shouldShowSystemIntro);
  const completeSystemIntro = useCallback(() => setShowSystemIntro(false), []);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lenis = null;
    const updateSmoothScroll = () => {
      if (motionPreference.matches) {
        lenis?.destroy();
        lenis = null;
        return;
      }

      if (!lenis) {
        lenis = new Lenis({
          anchors: true,
          autoRaf: true,
          lerp: 0.08,
          smoothWheel: true,
          wheelMultiplier: 0.9,
        });
        lenis.on("scroll", () => {
          window.dispatchEvent(new Event("portfolio:lenis-scroll"));
        });
      }
    };
    updateSmoothScroll();
    motionPreference.addEventListener("change", updateSmoothScroll);
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    navigation.forEach((item) => {
      const section = document.getElementById(item.toLowerCase());
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", updateHeader);
      observer.disconnect();
      motionPreference.removeEventListener("change", updateSmoothScroll);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      {showSystemIntro && (
        <SystemIntro
          onComplete={completeSystemIntro}
        />
      )}
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <a className="brand" href="#home" onClick={() => setActiveSection("home")}>
          <img className="brand-logo" src="/images/logo-transparent.png" alt="" />
          Atharva Deshmukh
        </a>
        <button
          className="menu"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          className={open ? "nav show" : "nav"}
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const id = item.toLowerCase();
            return (
              <a
                className={activeSection === id ? "active" : ""}
                key={item}
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => {
                  setOpen(false);
                  setActiveSection(id);
                }}
              >
                {item}
              </a>
            );
          })}
        </nav>
        <a
          className="connect connect-btn"
          href={contactLinks.email}
          target="_blank"
          rel="noreferrer"
          aria-label="Let's Connect by email"
        >
          <span className="connect-label">Let's Connect</span>
          <ArrowRight className="arrow" size={16} aria-hidden="true" />
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="sky" />
          <div className="mountain m1" />
          <div className="mountain m2" />
          <div className="mountain m3" />
          <div className="hero-copy">
            <div className="pill">
              <i /> AVAILABLE FOR OPPORTUNITIES
            </div>
            <p className="hello">Hi, I'm</p>
            <h1>
              Atharva
              <br />
              <span>Deshmukh</span>
            </h1>
            <h2>Software Developer</h2>
            <p className="desc">
              I turn complex challenges into thoughtful digital experiences
              through intuitive design, reliable engineering, and seamless
              delivery.
            </p>
            <div className="actions">
              <a className="btn primary" href="#projects">
                View My Work <ArrowRight size={17} />
              </a>
              <a className="btn ghost" href="#contact">
                <Download size={16} /> Download Resume
              </a>
            </div>
            <TechBadges />
          </div>
          <div className="person-glow" />
          <img
            className="person"
            src="/images/atharva-cutout.png"
            alt="Atharva wearing a dark top, white scarf and olive cargo trousers"
          />
          <a className="scroll" href="#about" aria-label="Scroll to the About section">
            <span className="scroll-mouse" aria-hidden="true">
              <i />
            </span>
            <span>Scroll to explore</span>
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </section>

        <section className="section" id="about">
          <label>01 / ABOUT ME</label>
          <div className="heading">
            <h2>
              Crafting digital
              <br />
              <span>experiences.</span>
            </h2>
            <p>
              I’m drawn to the moment a complex problem becomes simple to use.
              I listen, ask better questions, and turn uncertainty into
              considered digital experiences—built with care, made to last, and
              grounded in what people actually need.
            </p>
          </div>
        </section>

        <DeferredTechnologyGlobe />

        <SelectedWorkSection />

        <section className="contact" id="contact">
          <label>04 / WHAT'S NEXT?</label>
          <h2>
            Have a good idea?
            <br />
            <span>Let's build it.</span>
          </h2>
          <p>
            I'm open to frontend opportunities, collaborations, and interesting
            product problems.
          </p>
          <a
            className="btn primary"
            href={contactLinks.email}
            target="_blank"
            rel="noreferrer"
          >
            Get in touch <ArrowRight size={17} />
          </a>
          <div className="social">
            <a href={contactLinks.github} aria-label="GitHub" target="_blank" rel="noreferrer">
              <Github />
            </a>
            <a href={contactLinks.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <Linkedin />
            </a>
            <a
              href={contactLinks.email}
              aria-label="Email"
              target="_blank"
              rel="noreferrer"
            >
              <Mail />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <a className="brand" href="#home">
          <img className="brand-logo" src="/images/logo-transparent.png" alt="" />
          Atharva Deshmukh
        </a>
        <span>Designed with intention · © {new Date().getFullYear()}</span>
        <a href="#home">Back to top ↑</a>
      </footer>
      <TouchCursor />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
