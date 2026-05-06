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
			Description: "AI-powered job tracker that scrapes remote listings daily, scores them against your resume using an LLM, and surfaces the roles most worth your time.",
			Tags:        []string{"Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Groq", "Python", "GitHub Actions", "Playwright", "Vercel"},
			LiveUrl:     "https://job-application-tracker-beige-xi.vercel.app",
			RepoUrl:     "https://github.com/connorkoch0511/Job-Application-Tracker",
			CodeUrl:     "https://github.com/connorkoch0511/Job-Application-Tracker",
		},
		{
			ID:          "rag-doc-qa",
			Name:        "RAG Document Q&A",
			Description: "Upload PDFs or text files and ask questions grounded in their content. Built from scratch with a full RAG pipeline — chunk, embed, retrieve, and generate — with streaming answers and source citations.",
			Tags:        []string{"Next.js", "TypeScript", "Tailwind CSS", "Supabase", "pgvector", "HuggingFace", "Groq", "Vercel AI SDK", "Playwright"},
			LiveUrl:     "https://rag-doc-3hofto540-connorkoch0511s-projects.vercel.app",
			RepoUrl:     "https://github.com/connorkoch0511/RAG-Doc-QA",
			CodeUrl:     "https://github.com/connorkoch0511/RAG-Doc-QA",
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
