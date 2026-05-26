Internal AI Research Agent Website
Overview

Internal AI Research Agent Website is a full-stack prototype platform designed to help teams quickly generate structured business research reports for companies, suppliers, clients, competitors, products, and websites using AI.


Features
FastAPI backend
PostgreSQL integration
AI-powered report generation
Pydantic validation
SQLAlchemy ORM
JSON report export
Swagger API testing
Modular backend architecture
Tech Stack
Technology	Purpose
Python	Backend language
FastAPI	API framework
PostgreSQL	Database
SQLAlchemy	ORM
Pydantic	Validation
Uvicorn	ASGI server
OpenRouter	AI integration
Project Structure
backend/
│
├── app/
│   ├── routes/
│   │   └── reports.py
│   │
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── ai_agent.py
│   └── export.py
│
├── .env
├── .env.example
├── requirements.txt
Setup
1. Clone Project
git clone <repository-url>
cd internal-ai-research-agent/backend
2. Install Dependencies
pip install -r requirements.txt
3. Configure Environment Variables

Create .env

DATABASE_URL=postgresql://postgres:password@localhost:5432/research_agent
OPENROUTER_API_KEY=your_api_key
PostgreSQL Setup

Create database:

CREATE DATABASE research_agent;
Run Backend
uvicorn app.main:app --reload

Backend:

http://127.0.0.1:8000

Swagger Docs:

http://127.0.0.1:8000/docs
API Endpoints
Method	Endpoint	Description
POST	/api/reports/generate	Generate report
GET	/api/reports	Get all reports
GET	/api/reports/{id}	Get single report
GET	/api/reports/{id}/export/json	Export JSON
Database Model

Main table:

research_reports

Fields:

id
research_type
name
website_url
country
industry
research_goal
summary
products_or_services
opportunities
risks_or_missing_information
suggested_next_actions
confidence_score
created_at