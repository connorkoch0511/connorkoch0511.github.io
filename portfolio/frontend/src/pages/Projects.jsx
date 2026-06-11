import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "https://2h3azmze1h.execute-api.us-east-1.amazonaws.com/prod";

const META = {
  "hotfix": {
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Neon", "PostgreSQL", "Drizzle ORM", "Playwright", "Vercel"],
    liveUrl: "https://hotfix-eta.vercel.app",
    repoUrl: "https://github.com/connorkoch0511/HotFix",
    codeUrl: "https://github.com/connorkoch0511/HotFix",
  },
  "aws-portfolio": {
    tags: ["AWS", "Lambda", "API Gateway", "DynamoDB", "SES", "Terraform", "React", "Go"],
    liveUrl: "https://d2k3tmmmuxn4oo.cloudfront.net",
    repoUrl: "https://github.com/connorkoch0511/AWS-Resume-Website",
    codeUrl: "https://github.com/connorkoch0511/AWS-Resume-Website/tree/main/portfolio",
  },
  "job-application-tracker": {
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Neon", "PostgreSQL", "Groq", "Python", "GitHub Actions", "Playwright", "Vercel"],
    liveUrl: "https://job-application-tracker-beige-xi.vercel.app",
    repoUrl: "https://github.com/connorkoch0511/Job-Application-Tracker",
    codeUrl: "https://github.com/connorkoch0511/Job-Application-Tracker",
  },
  "rag-doc-qa": {
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Neon", "pgvector", "HuggingFace", "Groq", "Vercel AI SDK", "Playwright"],
    liveUrl: "https://rag-doc-qa-five.vercel.app",
    repoUrl: "https://github.com/connorkoch0511/RAG-Doc-QA",
    codeUrl: "https://github.com/connorkoch0511/RAG-Doc-QA",
  },
  "flightbench": {
    tags: ["C++17", "CMake", "PID Control", "Sensor Noise Models", "Fault Injection", "Next.js", "Recharts", "Playwright", "Vercel", "GitHub Actions"],
    liveUrl: "https://flightbench-dashboard.vercel.app",
    repoUrl: "https://github.com/connorkoch0511/FlightBench",
    codeUrl: "https://github.com/connorkoch0511/FlightBench",
  },
  "squawkboard": {
    tags: ["Go", "WebSocket", "Redis", "Next.js", "TypeScript", "Leaflet", "Tailwind CSS", "Playwright", "Render", "Vercel", "GitHub Actions"],
    liveUrl: "https://squawk-board.vercel.app",
    repoUrl: "https://github.com/connorkoch0511/SquawkBoard",
    codeUrl: "https://github.com/connorkoch0511/SquawkBoard",
  },
  "edgestat": {
    tags: ["Rust", "Java", "Spring Boot", "R", "Shiny", "PostgreSQL", "Docker", "ESPN API", "plotly", "JSONB"],
    liveUrl: "https://edgestat.duckdns.org",
    repoUrl: "https://github.com/connorkoch0511/EdgeStat",
    codeUrl: "https://github.com/connorkoch0511/EdgeStat",
  },
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [apiTest, setApiTest] = useState({ loading: false, output: "" });

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  const merged = useMemo(
    () => projects.map((p) => ({ ...p, meta: META[p.id] || null })),
    [projects]
  );

  const testProjectsApi = async () => {
    setApiTest({ loading: true, output: "" });
    try {
      const res = await fetch(`${API_BASE}/projects`);
      const text = await res.text();
      setApiTest({ loading: false, output: text });
    } catch {
      setApiTest({ loading: false, output: "Failed to call API." });
    }
  };

  return (
    <div className="page-mario">
    <div className="container">
      <div className="projects-header">
        <div>
          <h1>Level Select</h1>
          <p className="projects-subtitle">
            Choose your stage — live demos and AWS-backed features you can try.
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={testProjectsApi}
          disabled={apiTest.loading}
        >
          {apiTest.loading ? "Testing..." : "Try Projects API"}
        </button>
      </div>

      {apiTest.output && <pre className="code-block">{apiTest.output}</pre>}

      <div className="project-grid">
        {merged.map((project) => (
          <div key={project.id} className="project-card retro-card">
            <div className="project-card-top">
              <div>
                <h3>
                  <Link to={`/projects/${project.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {project.name}
                  </Link>
                </h3>
                <p className="project-desc">{project.description}</p>
              </div>
              <span className="pill">{project.id}</span>
            </div>

            {(project.meta?.tags || project.tags)?.length ? (
              <div className="tag-row">
                {(project.meta?.tags || project.tags).map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            ) : null}

            <div className="btn-row">
              <Link className="btn btn-secondary" to={`/projects/${project.id}`}>
                Details
              </Link>

              {(project.meta?.liveUrl || project.liveUrl) && (
                <a className="btn btn-primary" href={project.meta?.liveUrl || project.liveUrl} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              )}
              {(project.meta?.repoUrl || project.repoUrl) && (
                <a className="btn btn-secondary" href={project.meta?.repoUrl || project.repoUrl} target="_blank" rel="noreferrer">
                  GitHub Repo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}