# Internal AI Research Agent Website

## Overview

Internal AI Research Agent Website is a full-stack prototype platform designed to help teams quickly generate structured AI-powered business research reports for companies, suppliers, competitors, products, clients, and websites.

The platform allows users to:

- Generate structured research reports using AI
- Store reports in PostgreSQL
- View historical reports in a dashboard
- Filter and search reports
- Export reports as JSON
- Manage internal research workflows faster

This project focuses on backend architecture, AI integration, database persistence, dashboard design, and scalable frontend structure.

---

# Features

## Backend Features

- FastAPI REST API
- PostgreSQL database integration
- SQLAlchemy ORM models
- Pydantic validation
- AI-powered report generation
- Report persistence
- Report history retrieval
- JSON export support
- Swagger API documentation
- Modular backend architecture

## Frontend Features

- Modern React dashboard
- Statistics overview cards
- Report filtering system
- Search functionality
- Report table with confidence visualization
- Responsive dashboard layout
- Component-based frontend structure

---

# Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| AI Integration | OpenRouter |
| HTTP Client | Axios |
| Routing | React Router DOM |
| API Server | Uvicorn |
| Environment Variables | python-dotenv |

---

# Project Structure

```txt
internal-ai-research-agent/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   └── reports.py
│   │   │
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── ai_agent.py
│   │   └── export.py
│   │
│   ├── output/
│   ├── .env.example
│   ├── requirements.txt
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── api/
|   |          └── report.js
│   │   ├── components/
|   |            └── Navbar.jsx
|   |            └── ReportFilters.jsx
|   |            └── ReportForm.jsx
|   |            └── ReportTable.jsx
|   |            └── StateCards.jsx
│   │   ├── pages/
|   |               └── Dashboard.jsx
|   |              └── GenerateReport.jsx
|   |              └── ReportDetails.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Application Workflow

```txt
1. User enters company, supplier, client, product, competitor, or website data
2. AI research agent processes request
3. Structured business report is generated
4. Report is stored in PostgreSQL
5. Dashboard displays report history
6. User can filter, search, and export reports
```

---

# Backend Setup

## 1. Navigate to Backend

```bash
cd backend
```

---

## 2. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/research_agent
OPENROUTER_API_KEY=your_api_key_here
```

---

## 4. PostgreSQL Setup

Create database:

```sql
CREATE DATABASE research_agent;
```

---

## 5. Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL:

```txt
http://127.0.0.1:8000
```

Swagger Documentation:

```txt
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

## 1. Navigate to Frontend

```bash
cd frontend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Run Frontend

```bash
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/reports/generate` | Generate AI report |
| GET | `/api/reports` | Get all reports |
| GET | `/api/reports/{id}` | Get single report |
| GET | `/api/reports/{id}/export/json` | Export report as JSON |

---

# Database Model

Main table:

```txt
research_reports
```

Fields:

- id
- research_type
- name
- website_url
- country
- industry
- research_goal
- summary
- products_or_services
- opportunities
- risks_or_missing_information
- suggested_next_actions
- confidence_score
- created_at

---

# Dashboard Features

The dashboard includes:

- Total reports generated
- Reports grouped by research type
- Average confidence score
- Search functionality
- Filtering by:
  - research type
  - country
  - industry/category
  - confidence score
- Report table with:
  - name
  - type
  - country
  - industry
  - confidence score
  - created date
  - details button

---

# AI Research Agent Logic

The AI agent receives:

- research type
- company/product/client/supplier name
- country
- industry
- website URL
- research goal

The backend then:

1. Creates structured AI prompt
2. Sends request to AI model
3. Parses structured JSON response
4. Saves report to PostgreSQL
5. Returns data to frontend dashboard

---

# Validation

Validation is implemented using Pydantic schemas.

Validation includes:

- required fields
- allowed research types
- confidence score limits
- type validation
- response schema validation

---

# JSON Export

Reports can be exported as JSON files.

Example:

```txt
output/research_report_001.json
```

---

# Current Progress

```txt
✅ Backend architecture completed
✅ PostgreSQL integration completed
✅ AI integration completed
✅ React frontend setup completed
✅ Dashboard UI implemented
✅ Filtering system implemented
✅ Report table implemented
✅ Report persistence working
✅ Swagger API testing completed
✅ JSON export completed
```

---

# Future Improvements

- PDF export
- Website scraping
- Authentication system
- Report status tracking
- Docker support
- Backend unit tests
- AI agent step logs
- Analytics charts
- Pagination
- Deployment pipeline

---

# Known Limitations

- AI responses depend on external model quality
- No authentication implemented yet
- PDF export not implemented yet
- Website scraping not implemented yet
- No background task queue

---

# License

Internal prototype project for research workflow automation.
