// Desktop apps available for download. RangeOps uses version-independent asset
// names, so its links always resolve to the latest release; LexRedact's
// electron-builder assets are versioned, so those are pinned to the current tag.
const APPS = [
  {
    name: "RangeOps Operator Console",
    blurb:
      "Desktop operator console for the RangeOps flight-test suite — schedule test missions and capture live telemetry. Built with Avalonia / .NET 8.",
    note:
      "Self-contained (no .NET install needed). The console connects to the RangeOps stack (PostgreSQL + telemetry sim) — see the repo README to run it. macOS builds are unsigned: right-click → Open the first time.",
    repo: "https://github.com/connorkoch0511/RangeOps",
    base: "https://github.com/connorkoch0511/RangeOps/releases/latest/download",
    downloads: [
      { label: "macOS (Apple Silicon)", file: "RangeOps-Console-osx-arm64.zip" },
      { label: "macOS (Intel)", file: "RangeOps-Console-osx-x64.zip" },
      { label: "Windows (x64)", file: "RangeOps-Console-win-x64.zip" },
      { label: "Linux (x64)", file: "RangeOps-Console-linux-x64.zip" },
    ],
  },
  {
    name: "LexRedact Desktop",
    blurb:
      "AI-powered legal document redaction that runs fully on-device — no document ever leaves your machine. Built with Electron.",
    note:
      "Installers for the current release. macOS builds are unsigned: right-click → Open the first time.",
    repo: "https://github.com/connorkoch0511/LexRedact",
    base: "https://github.com/connorkoch0511/LexRedact/releases/download/v0.1.27",
    downloads: [
      { label: "macOS (Apple Silicon)", file: "LexRedact-0.1.27-arm64.dmg" },
      { label: "macOS (Intel)", file: "LexRedact-0.1.27-x64.dmg" },
      { label: "Windows (x64)", file: "LexRedact-0.1.27-Setup-x64.exe" },
      { label: "Linux (AppImage)", file: "LexRedact-0.1.27.AppImage" },
    ],
  },
];

export default function Downloads() {
  return (
    <div className="page-mario">
      <div className="container">
        <div className="projects-header">
          <div>
            <h1>Downloads</h1>
            <p className="projects-subtitle">
              Desktop apps you can install and run locally — macOS, Windows, and Linux.
            </p>
          </div>
        </div>

        <div className="project-grid">
          {APPS.map((app) => (
            <div key={app.name} className="project-card retro-card">
              <div className="project-card-top">
                <div>
                  <h3>{app.name}</h3>
                  <p className="project-desc">{app.blurb}</p>
                </div>
              </div>

              <div className="tag-row">
                {["macOS", "Windows", "Linux"].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              <div className="btn-row" style={{ marginTop: "0.9rem" }}>
                {app.downloads.map((d) => (
                  <a
                    key={d.label}
                    className="btn btn-primary"
                    href={`${app.base}/${d.file}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ⬇ {d.label}
                  </a>
                ))}
                <a className="btn btn-secondary" href={app.repo} target="_blank" rel="noreferrer">
                  GitHub Repo
                </a>
              </div>

              <p className="projects-subtitle" style={{ marginTop: "0.7rem", fontSize: "0.82rem" }}>
                {app.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
