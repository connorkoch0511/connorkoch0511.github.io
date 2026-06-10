# Connor Koch — Developer Portfolio

A full-stack personal portfolio: a retro, game-themed React front end backed by a serverless AWS API, all defined as infrastructure-as-code and shipped through two independent CI/CD pipelines.

**Live:**
- GitHub Pages → [connorkoch0511.github.io](https://connorkoch0511.github.io)
- AWS (S3 + CloudFront) → [d2k3tmmmuxn4oo.cloudfront.net](https://d2k3tmmmuxn4oo.cloudfront.net)

The same build is deployed to both targets, so the site stays online even if one provider has an issue.

---

## Highlights

- **Serverless backend, zero idle cost** — two Go Lambdas behind an API Gateway HTTP API. The projects list is served from `GET /projects`; the contact form POSTs to `POST /contact`, which persists the message to DynamoDB and emails a notification via SES.
- **Infrastructure as code** — the API Gateway, routes, Lambda integrations, and DynamoDB table are all managed in Terraform (`infra/`).
- **Keyless CI/CD** — the AWS deploy authenticates with **GitHub OIDC** (a repo-scoped, least-privilege IAM role), so there are no long-lived AWS keys stored anywhere in the repo.
- **Dual deployment** — every push to `main` builds the front end once and ships it to both GitHub Pages and an S3/CloudFront distribution.

---

## Architecture

```
                          ┌─────────────────────────────┐
   Browser  ──────────▶   │  React + Vite SPA           │
                          │  (Tailwind, React Router)   │
                          └──────────────┬──────────────┘
                                         │  fetch()
                                         ▼
                          ┌─────────────────────────────┐
                          │  API Gateway (HTTP API)      │
                          │   GET  /projects             │
                          │   POST /contact              │
                          └───────┬─────────────┬────────┘
                                  │             │
                       AWS_PROXY  │             │  AWS_PROXY
                                  ▼             ▼
                        ┌───────────────┐  ┌───────────────┐
                        │ projects-api  │  │ contact-api   │
                        │ (Go Lambda)   │  │ (Go Lambda)   │
                        └───────────────┘  └───────┬───────┘
                                                   │
                                          ┌────────┴────────┐
                                          ▼                 ▼
                                   ┌─────────────┐   ┌─────────────┐
                                   │  DynamoDB   │   │     SES     │
                                   │ (messages)  │   │  (email)    │
                                   └─────────────┘   └─────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Front end | React 19, Vite (rolldown-vite), React Router 7, Tailwind CSS 4 |
| Backend | Go 1.25 AWS Lambda (`provided.al2`, arm64), AWS SDK for Go v2 |
| API | API Gateway v2 (HTTP API), AWS_PROXY integrations |
| Data | DynamoDB (contact messages), Amazon SES (email delivery) |
| Infrastructure | Terraform |
| Hosting | GitHub Pages **and** S3 + CloudFront |
| CI/CD | GitHub Actions with OIDC (no static AWS keys) |

---

## Repository Structure

```
.
├── portfolio/
│   ├── frontend/                 # React + Vite SPA
│   │   └── src/
│   │       ├── pages/            # Home, Projects, ProjectDetail, Contact
│   │       └── components/       # Navbar, Layout, Experience
│   └── backend/                  # Go Lambdas (module: portfolio-backend)
│       ├── projects/main.go      # GET /projects   → project catalog
│       └── contact/main.go       # POST /contact   → DynamoDB + SES
├── infra/                        # Terraform: API Gateway, routes, integrations, DynamoDB
└── .github/workflows/
    ├── deploy-github-pages.yml   # build → GitHub Pages
    └── deploy-frontend.yml       # build → S3 sync + CloudFront invalidation (OIDC)
```

---

## API

Base URL: `https://2h3azmze1h.execute-api.us-east-1.amazonaws.com/prod`

| Method | Route | Description |
|---|---|---|
| `GET` | `/projects` | Returns the project catalog (id, name, description, tags, links) as JSON. |
| `POST` | `/contact` | Accepts `{ name, email, message }`; stores it in DynamoDB and emails a notification via SES. |

```bash
curl https://2h3azmze1h.execute-api.us-east-1.amazonaws.com/prod/projects
```

CORS is restricted to the CloudFront origin; the contact handler also answers `OPTIONS` preflight.

---

## Local Development

### Front end

```bash
cd portfolio/frontend
npm install
npm run dev        # Vite dev server (default http://localhost:5173)
npm run build      # production build → dist/
npm run lint       # ESLint
```

### Backend (Go Lambdas)

```bash
cd portfolio/backend
go build ./...     # compile-check both handlers
```

Each handler builds to an arm64 `bootstrap` binary for the `provided.al2` runtime:

```bash
cd portfolio/backend/projects
GOOS=linux GOARCH=arm64 CGO_ENABLED=0 go build -tags lambda.norpc -o bootstrap main.go
zip function.zip bootstrap
aws lambda update-function-code --function-name projects-api \
  --zip-file fileb://function.zip --region us-east-1
```

> Terraform references the Lambdas by ARN for the API Gateway integration; the function **code** is published with `aws lambda update-function-code` (above), not by `terraform apply`.

---

## Deployment

Both pipelines run on every push to `main`:

1. **`deploy-github-pages.yml`** — builds the SPA and publishes it to GitHub Pages using the built-in `GITHUB_TOKEN`.
2. **`deploy-frontend.yml`** — builds the SPA, syncs `dist/` to the S3 bucket, and invalidates the CloudFront distribution. It authenticates to AWS with **GitHub OIDC**: the job requests an OIDC token (`id-token: write`) and assumes the IAM role `gha-portfolio-deploy`, which is trust-scoped to this repository and granted only the S3 and CloudFront-invalidation permissions it needs — no access keys are stored in GitHub.

### Infrastructure

```bash
cd infra
terraform init
terraform plan
terraform apply
```

Provisions the API Gateway HTTP API, its `/projects` and `/contact` routes, the Lambda integrations, and the DynamoDB table.

---

## Featured Projects

The portfolio showcases a range of full-stack and systems work, including:

| Project | What it is | Live |
|---|---|---|
| **RAG Document Q&A** | A from-scratch retrieval-augmented-generation pipeline (chunk → embed → retrieve → generate) over Neon pgvector with Clerk auth and streaming, cited answers. | [demo](https://rag-doc-qa-five.vercel.app) |
| **HotFix** | IT helpdesk & ticketing system with role-based access control, audit logging, and a live dashboard. | [demo](https://hotfix-eta.vercel.app) |
| **EdgeStat** | Real-time multi-sport analytics across 12 ESPN leagues — Rust ingestion, Java/Spring API, R Shiny dashboard. | [demo](https://edgestat.duckdns.org) |
| **SquawkBoard** | Real-time flight-tracking dashboard streaming live aircraft over WebSocket (Go + Redis + Leaflet). | [demo](https://squawk-board.vercel.app) |
| **FlightBench** | Hardware-in-the-loop flight-sim test harness in C++17 with PID altitude hold and fault injection. | [demo](https://flightbench-dashboard.vercel.app) |

The full, always-current list is served live from the [`/projects` API](https://2h3azmze1h.execute-api.us-east-1.amazonaws.com/prod/projects) and rendered on the site's **Projects** page.
