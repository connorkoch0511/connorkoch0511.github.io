package main

import (
	"context"
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Project struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Tags        []string `json:"tags,omitempty"`
	LiveUrl     string   `json:"liveUrl,omitempty"`
	RepoUrl     string   `json:"repoUrl,omitempty"`
	CodeUrl     string   `json:"codeUrl,omitempty"`
}

func handler(ctx context.Context) (events.APIGatewayV2HTTPResponse, error) {
	projects := []Project{
		{
			ID:          "perfectpick",
			Name:        "PerfectPick",
			Description: "Serverless fantasy football mock draft simulator with a live Big Board, pick timer, and automated drafting, built with React and AWS.",
			Tags:        []string{"AWS", "Lambda", "API Gateway", "DynamoDB", "Terraform", "React", "Tailwind CSS", "JavaScript"},
			LiveUrl:     "https://d2kf4b52rvabfv.cloudfront.net/",
			RepoUrl:     "https://github.com/connorkoch0511/sports-mock-draft",
			CodeUrl:     "https://github.com/connorkoch0511/sports-mock-draft",
		},
		{
			ID:          "mist",
			Name:        "Mist",
			Description: "Serverless game discovery + collections app (AWS + React).",
			Tags:        []string{"AWS", "CloudFront", "S3", "API Gateway", "Lambda", "DynamoDB", "Secrets Manager", "React", "Tailwind CSS", "JavaScript"},
			LiveUrl:     "https://d2l61hze39nve3.cloudfront.net/",
			RepoUrl:     "https://github.com/connorkoch0511/RAWG-Steam-Game-Discovery-Hub",
			CodeUrl:     "https://github.com/connorkoch0511/RAWG-Steam-Game-Discovery-Hub/tree/main/portfolio",
		},
		{
			ID:          "marketsync",
			Name:        "MarketSync",
			Description: "E-commerce ETL pipeline that syncs orders from Amazon/Walmart/Target APIs into PostgreSQL, with reconciliation, Slack alerting, and scheduled jobs.",
			Tags:        []string{"Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Docker", "Pandas", "APScheduler"},
			RepoUrl:     "https://github.com/connorkoch0511/marketsync",
			CodeUrl:     "https://github.com/connorkoch0511/marketsync",
		},
		{
			ID:          "flight-web-scraper",
			Name:        "Kayak Flight Web Scraper",
			Description: "Desktop app that automates Kayak flight searches, saves results to Excel, and emails a deal summary — built with a dark-mode PyQt6 GUI and Selenium.",
			Tags:        []string{"Python", "Selenium", "PyQt6", "Pandas", "openpyxl", "SMTP"},
			RepoUrl:     "https://github.com/connorkoch0511/Flight-Web-Scraper",
			CodeUrl:     "https://github.com/connorkoch0511/Flight-Web-Scraper",
		},
		{
			ID:          "job-application-tracker",
			Name:        "Job Application Tracker",
			Description: "AI-powered job tracker that scrapes remote listings daily via GitHub Actions, scores each one 0–100 against your résumé with an LLM across 7 dimensions, and tracks them through an application pipeline — built with Next.js, Clerk auth, and Neon PostgreSQL.",
			Tags:        []string{"Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Neon", "PostgreSQL", "Groq", "Python", "GitHub Actions", "Playwright", "Vercel"},
			LiveUrl:     "https://job-application-tracker-beige-xi.vercel.app",
			RepoUrl:     "https://github.com/connorkoch0511/Job-Application-Tracker",
			CodeUrl:     "https://github.com/connorkoch0511/Job-Application-Tracker",
		},
		{
			ID:          "hotfix",
			Name:        "HotFix",
			Description: "Full-stack IT helpdesk and ticketing system with role-based access control (end_user / technician / admin), immutable audit logging, threaded comments, and a live dashboard — built with Next.js App Router, Clerk auth, Neon PostgreSQL, and Drizzle ORM.",
			Tags:        []string{"Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Neon", "PostgreSQL", "Drizzle ORM", "Playwright", "Vercel"},
			LiveUrl:     "https://hotfix-eta.vercel.app",
			RepoUrl:     "https://github.com/connorkoch0511/HotFix",
			CodeUrl:     "https://github.com/connorkoch0511/HotFix",
		},
		{
			ID:          "trackcart",
			Name:        "TrackCart",
			Description: "Mock e-commerce store built to demonstrate end-to-end digital analytics — GTM container setup, GA4 Enhanced E-commerce event tracking, a type-safe dataLayer architecture, and a live analytics dashboard powered by the GA4 Reporting API.",
			Tags:        []string{"Next.js", "TypeScript", "Tailwind CSS", "Google Tag Manager", "GA4", "Playwright", "Vercel"},
			LiveUrl:     "https://trackcart.vercel.app",
			RepoUrl:     "https://github.com/connorkoch0511/TrackCart",
			CodeUrl:     "https://github.com/connorkoch0511/TrackCart",
		},
		{
			ID:          "rag-doc-qa",
			Name:        "RAG Document Q&A",
			Description: "Upload PDFs or text files and ask questions grounded in their content — a full RAG pipeline built from scratch (chunk, embed, retrieve, generate) with streaming answers and per-source citations. Backed by Neon pgvector for semantic search and Clerk auth, with no LangChain or LlamaIndex.",
			Tags:        []string{"Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Neon", "pgvector", "HuggingFace", "Groq", "Vercel AI SDK", "Playwright"},
			LiveUrl:     "https://rag-doc-qa-five.vercel.app",
			RepoUrl:     "https://github.com/connorkoch0511/RAG-Doc-QA",
			CodeUrl:     "https://github.com/connorkoch0511/RAG-Doc-QA",
		},
		{
			ID:          "squawkboard",
			Name:        "SquawkBoard",
			Description: "Real-time flight tracking dashboard streaming 40 live flights over WebSocket — Go backend with Redis pub/sub, Next.js frontend with a Leaflet map, rotating plane icons, flight trails, and a searchable sidebar.",
			Tags:        []string{"Go", "WebSocket", "Redis", "Next.js", "TypeScript", "Leaflet", "Tailwind CSS", "Playwright", "Render", "Vercel", "GitHub Actions"},
			LiveUrl:     "https://squawk-board.vercel.app",
			RepoUrl:     "https://github.com/connorkoch0511/SquawkBoard",
			CodeUrl:     "https://github.com/connorkoch0511/SquawkBoard",
		},
		{
			ID:          "rangeops",
			Name:        "RangeOps",
			Description: "Flight-test range operations suite that automates mission scheduling and telemetry capture across a heterogeneous, integrated system: a C telemetry source, a downloadable C#/.NET (Avalonia + EF Core) desktop operator console, a Python/Django web dashboard, an ASP.NET Core REST API, and legacy Classic ASP reports — all sharing one PostgreSQL schema via two ORMs. Detects and flags telemetry data-link dropouts end to end, with unit, integration, system, and Playwright tests in CI.",
			Tags:        []string{"C", "C#", ".NET 8", "Avalonia", "EF Core", "ASP.NET Core", "Python", "Django", "Classic ASP", "PostgreSQL", "Neon", "Playwright", "GitHub Actions", "Vercel"},
			LiveUrl:     "https://rangeops-dashboard.vercel.app",
			RepoUrl:     "https://github.com/connorkoch0511/RangeOps",
			CodeUrl:     "https://github.com/connorkoch0511/RangeOps",
		},
		{
			ID:          "flightbench",
			Name:        "FlightBench",
			Description: "Hardware-in-the-Loop (HIL) flight-software verification framework in C++17, modeled after real SIL/HIL aerospace environments. Drives two plants through one requirement-based harness: a fixed-wing PID autopilot with sensor fault injection, and a 6DOF interceptor with proportional-navigation guidance. Adds a Simulink Embedded Coder-autocoded guidance module run interchangeably with native C++, a real-time fixed-rate executive that verifies the guidance/control frame meets its 200 Hz deadline, and a DO-178C-style requirements traceability matrix (22 requirements, 100% verified). Ships a live dashboard visualizing fault-injection telemetry and 6DOF intercept engagements.",
			Tags:        []string{"C++17", "CMake", "6DOF Simulation", "Proportional Navigation", "Simulink Autocode", "Real-Time Systems", "Fault Injection", "Requirements Traceability", "Next.js", "Recharts", "Playwright", "Vercel", "GitHub Actions"},
			LiveUrl:     "https://flightbench-dashboard.vercel.app",
			RepoUrl:     "https://github.com/connorkoch0511/FlightBench",
			CodeUrl:     "https://github.com/connorkoch0511/FlightBench",
		},
		{
			ID:          "edgestat",
			Name:        "EdgeStat",
			Description: "Real-time multi-sport analytics platform tracking live scores, win probability, and player stats across 12 ESPN leagues. A Rust ingestion service polls ESPN's public API every 30 seconds, a Java Spring Boot REST API serves the data, and an R Shiny dashboard delivers live scoreboards, animated win probability replay, and per-sport player leaderboards. Deployed free on Oracle Cloud Always Free.",
			Tags:        []string{"Rust", "Java", "Spring Boot", "R", "Shiny", "PostgreSQL", "Docker", "Caddy", "Oracle Cloud"},
			LiveUrl:     "https://edgestat.duckdns.org",
			RepoUrl:     "https://github.com/connorkoch0511/EdgeStat",
			CodeUrl:     "https://github.com/connorkoch0511/EdgeStat",
		},
	}

	body, _ := json.Marshal(projects)

	return events.APIGatewayV2HTTPResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		Body: string(body),
	}, nil
}

func main() {
	lambda.Start(handler)
}
