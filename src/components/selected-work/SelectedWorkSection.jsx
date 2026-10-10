import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Code2,
  Database,
  Github,
  Globe,
  MoveUpRight,
  X,
} from "lucide-react";
import "./selected-work.css";

const githubProfileUrl = "https://github.com/Atha-rva";

const domains = [
  {
    id: "data-engineering",
    number: "01",
    name: "Data Engineering",
    description:
      "Reliable movement, transformation, and foundations for information.",
    icon: Database,
    projects: [
      {
        id: "data-flow-study",
        name: "Data Platform Flow",
        type: "CONCEPT STUDY",
        summary:
          "An illustrative architecture study showing how source data can move through ingestion, transformation, and storage.",
        overview:
          "This concept maps a dependable data journey from incoming records to organized, reusable data. It is included as an illustrative study, not represented as a completed client or production project.",
        technologies: ["Ingestion", "Transformation", "Data modeling"],
        repositoryUrl: null,
        liveUrl: null,
        illustrative: true,
      },
    ],
  },
  {
    id: "ai-engineering",
    number: "02",
    name: "AI Engineering",
    description:
      "Useful model experiences grounded in context and thoughtful interaction.",
    icon: BrainCircuit,
    projects: [
      {
        id: "ai-intelligence-dashboard",
        name: "AI Intelligence Dashboard",
        type: "FRONTEND · REACT · TYPESCRIPT",
        summary:
          "A polished interface for exploring research insights, interactive reports, and AI-powered workflows.",
        overview:
          "An interface concept for bringing research insights and interactive reports into a focused dashboard experience.",
        technologies: ["React", "TypeScript", "GraphQL"],
        repositoryUrl: null,
        liveUrl: null,
      },
    ],
  },
  {
    id: "data-analytics",
    number: "03",
    name: "Data Analytics",
    description:
      "Clear metrics, exploration, and communication that make patterns useful.",
    icon: BarChart3,
    projects: [
      {
        id: "expense-tracker",
        name: "Expense Tracker",
        type: "WEB APP · REACT",
        summary:
          "A clean finance dashboard for tracking spending, viewing summaries, and exporting records.",
        overview:
          "A finance dashboard concept centered on clear spending summaries, practical record keeping, and readable data views.",
        technologies: ["React", "Data visualization", "Export"],
        repositoryUrl: null,
        liveUrl: null,
      },
    ],
  },
  {
    id: "software-development",
    number: "04",
    name: "Software Development",
    description:
      "Maintainable interfaces and application experiences, built with care.",
    icon: Code2,
    projects: [
      {
        id: "task-manager",
        name: "Task Manager Mobile App",
        type: "MOBILE · REACT NATIVE",
        summary:
          "A focused productivity experience with task flows, analytics, charts, and PDF export.",
        overview:
          "A mobile productivity experience combining task management with useful summaries, charts, and PDF export.",
        technologies: ["React Native", "Charts", "UX"],
        repositoryUrl: null,
        liveUrl: null,
      },
    ],
  },
];

function ProjectLinks({ project }) {
  const links = [
    {
      label: project.repositoryUrl ? "Project repository" : "GitHub profile",
      url: project.repositoryUrl ?? githubProfileUrl,
      Icon: Github,
      unavailable: "Repository link not provided",
    },
    {
      label: "Live website",
      url: project.liveUrl,
      Icon: Globe,
      unavailable: "Live website link not provided",
    },
  ];

  return (
    <div className="project-detail-links" aria-label="Project links">
      {links.map(({ label, url, Icon, unavailable }) =>
        url ? (
          <a
            className="project-link project-link-available"
            href={url}
            key={label}
            aria-label={label}
            title={label}
            target="_blank"
            rel="noreferrer"
          >
            <Icon size={19} aria-hidden="true" />
            <span className="project-link-label">{label}</span>
          </a>
        ) : (
          <span
            className="project-link project-link-unavailable"
            key={label}
            aria-label={`${label}: ${unavailable}`}
            title={unavailable}
          >
            <Icon size={19} aria-hidden="true" />
            <span className="project-link-label">{label}: {unavailable}</span>
          </span>
        ),
      )}
    </div>
  );
}

function ProjectDialog({ project, domain, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="project-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-description"
      >
        <div className="project-dialog-visual" aria-hidden="true">
          <div className="dialog-orbit dialog-orbit-one" />
          <div className="dialog-orbit dialog-orbit-two" />
          <div className="dialog-visual-core">
            <domain.icon size={46} strokeWidth={1.1} />
          </div>
          <span className="dialog-visual-index">{domain.number} / PROJECT</span>
          <span className="dialog-visual-domain">{domain.name}</span>
        </div>
        <div className="project-dialog-content">
          <div className="project-dialog-topline">
            <span>{project.type}</span>
            <button
              className="project-dialog-close"
              type="button"
              aria-label="Close project details"
              onClick={onClose}
              ref={closeButtonRef}
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>
          <h3 id="project-dialog-title">{project.name}</h3>
          <p className="project-dialog-summary" id="project-dialog-description">
            {project.summary}
          </p>
          <div className="project-dialog-section">
            <span>PROJECT OVERVIEW</span>
            <p>{project.overview}</p>
          </div>
          <div className="project-dialog-section">
            <span>TECHNOLOGIES &amp; FOCUS</span>
            <div className="project-detail-tags">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
          {project.illustrative && (
            <p className="project-illustrative-note">
              Illustrative concept — not presented as a completed production project.
            </p>
          )}
          <ProjectLinks project={project} />
        </div>
      </section>
    </div>
  );
}

export default function SelectedWorkSection() {
  const [selectedDomainId, setSelectedDomainId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const selectedDomain = domains.find((domain) => domain.id === selectedDomainId);

  const closeProjectDialog = () => setSelectedProject(null);

  return (
    <section className="section selected-work-universe" id="projects">
      <div className="selected-work-inner">
        <header className="selected-work-heading">
          <label>03 / SELECTED WORK</label>
          <div className="selected-work-heading-row">
            <h2>
              Work shaped
              <br />
              <span>with intent.</span>
            </h2>
            <p>
              Explore the practice behind each project. Choose an area to see
              selected work and its details.
            </p>
          </div>
        </header>

        {!selectedDomain ? (
          <div className="work-domain-grid" aria-label="Explore work by practice">
            {domains.map((domain) => {
              const Icon = domain.icon;
              return (
                <button
                  className="work-domain-card"
                  type="button"
                  key={domain.id}
                  onClick={() => setSelectedDomainId(domain.id)}
                >
                  <span className="work-domain-card-top">
                    <span>{domain.number} / PRACTICE</span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                  <span className="work-domain-icon">
                    <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <strong>{domain.name}</strong>
                  <span className="work-domain-description">{domain.description}</span>
                  <span className="work-domain-card-footer">
                    <span className="work-domain-count">
                      {domain.projects.length} {domain.projects.length === 1 ? "PROJECT" : "PROJECTS"}
                    </span>
                    <span className="work-domain-explore">
                      Explore projects <MoveUpRight size={14} aria-hidden="true" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="work-projects-view" key={selectedDomain.id}>
            <div className="work-projects-toolbar">
              <button
                className="work-back-button"
                type="button"
                onClick={() => setSelectedDomainId(null)}
              >
                <ArrowLeft size={16} aria-hidden="true" />
                All practices
              </button>
              <span>{selectedDomain.number} / {selectedDomain.name}</span>
            </div>
            <div className="work-projects-intro">
              <h3>{selectedDomain.name}</h3>
              <p>{selectedDomain.description}</p>
            </div>
            <div className="work-project-grid">
              {selectedDomain.projects.map((project) => (
                <button
                  className="work-project-card"
                  type="button"
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                >
                  <span className="work-project-art">
                    <span className="work-project-art-orbit" />
                    <span className="work-project-art-orbit work-project-art-orbit-small" />
                    <selectedDomain.icon size={34} strokeWidth={1.25} aria-hidden="true" />
                    <span className="work-project-art-number">{selectedDomain.number}</span>
                  </span>
                  <span className="work-project-content">
                    <span className="work-project-meta">
                      <span>{project.type}</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                    <strong>{project.name}</strong>
                    <span className="work-project-summary">{project.summary}</span>
                    <span className="work-project-tags">
                      {project.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </span>
                    <span className="work-project-open">View project details</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {selectedProject && selectedDomain && (
        <ProjectDialog
          project={selectedProject}
          domain={selectedDomain}
          onClose={closeProjectDialog}
        />
      )}
    </section>
  );
}
