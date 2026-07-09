import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  "rangeops": {
    tags: ["C", "C#", ".NET 8", "Avalonia", "EF Core", "ASP.NET Core", "Python", "Django", "Classic ASP", "PostgreSQL", "Neon", "Playwright", "GitHub Actions", "Vercel"],
    liveUrl: "https://rangeops-dashboard.vercel.app",
    repoUrl: "https://github.com/connorkoch0511/RangeOps",
    codeUrl: "https://github.com/connorkoch0511/RangeOps",
    downloads: [
      { label: "macOS (Apple Silicon)", url: "https://github.com/connorkoch0511/RangeOps/releases/latest/download/RangeOps-Console-osx-arm64.zip" },
      { label: "macOS (Intel)", url: "https://github.com/connorkoch0511/RangeOps/releases/latest/download/RangeOps-Console-osx-x64.zip" },
      { label: "Windows (x64)", url: "https://github.com/connorkoch0511/RangeOps/releases/latest/download/RangeOps-Console-win-x64.zip" },
      { label: "Linux (x64)", url: "https://github.com/connorkoch0511/RangeOps/releases/latest/download/RangeOps-Console-linux-x64.zip" },
    ],
  },
  "flightbench": {
    tags: ["C++17", "CMake", "6DOF Simulation", "Proportional Navigation", "Simulink Autocode", "Real-Time Systems", "Fault Injection", "Requirements Traceability", "Next.js", "Recharts", "Playwright", "Vercel", "GitHub Actions"],
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

export default function ProjectDetail() {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiTest, setApiTest] = useState({ loading: false, output: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${API_BASE}/projects`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load projects");
        return res.json();
      })
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch((e) => setError(e.message || "Error"))
      .finally(() => setLoading(false));
  }, []);

  const project = useMemo(() => {
    const base = projects.find((p) => p.id === id) || null;
    const meta = META[id] || null;
    return base ? { ...base, meta } : null;
  }, [projects, id]);

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

  if (loading) {
    return (
      <div className="container">
        <p className="projects-subtitle">Loading project…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Project</h1>
        <p className="error">{error}</p>
        <Link className="btn btn-secondary" to="/projects">Back to Projects</Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container">
        <h1>Not found</h1>
        <p className="projects-subtitle">No project with id: {id}</p>
        <Link className="btn btn-secondary" to="/projects">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="projects-header">
        <div>
          <h1>{project.name}</h1>
          <p className="projects-subtitle">{project.description}</p>
        </div>
        <Link className="btn btn-secondary" to="/projects">← Back</Link>
      </div>

      {project.meta?.tags?.length ? (
        <div className="tag-row" style={{ marginTop: "1rem" }}>
          {project.meta.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      ) : null}

      <div className="btn-row" style={{ marginTop: "1.25rem" }}>
        {project.meta?.liveUrl && (
          <a className="btn btn-primary" href={project.meta.liveUrl} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        )}
        {project.meta?.repoUrl && (
          <a className="btn btn-secondary" href={project.meta.repoUrl} target="_blank" rel="noreferrer">
            GitHub Repo
          </a>
        )}
        <button className="btn btn-secondary" onClick={testProjectsApi} disabled={apiTest.loading}>
          {apiTest.loading ? "Testing..." : "Try Projects API"}
        </button>
      </div>

      {project.meta?.downloads?.length ? (
        <div style={{ marginTop: "1.75rem" }}>
          <h3 style={{ margin: "0 0 .6rem" }}>Download the desktop console</h3>
          <div className="btn-row">
            {project.meta.downloads.map((d) => (
              <a key={d.label} className="btn btn-secondary" href={d.url} target="_blank" rel="noreferrer">
                ⬇ {d.label}
              </a>
            ))}
          </div>
          <p className="projects-subtitle" style={{ marginTop: ".6rem", fontSize: "0.85rem" }}>
            Self-contained builds (Avalonia / .NET 8). Download and run — no setup; the
            console connects to the same database as the live dashboard. macOS builds are
            unsigned (right-click → Open).
          </p>
        </div>
      ) : null}

      {apiTest.output && <pre className="code-block">{apiTest.output}</pre>}
    </div>
  );
}
