import json
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ResearchReport
from app.schemas import ResearchReportCreate, ResearchReportResponse
from app.ai_agent import generate_ai_report
from app.export import export_report_to_json

router = APIRouter(
    prefix="/api/reports",
    tags=["Reports"]
)


@router.post("/generate", response_model=ResearchReportResponse)
def generate_report(data: ResearchReportCreate, db: Session = Depends(get_db)):
    ai_result = generate_ai_report(data)

    report = ResearchReport(
        research_type=data.research_type,
        name=data.name,
        website_url=data.website_url,
        country=data.country,
        industry=data.industry,
        research_goal=data.research_goal,
        summary=ai_result["summary"],
        products_or_services=json.dumps(ai_result["products_or_services"]),
        opportunities=json.dumps(ai_result["opportunities"]),
        risks_or_missing_information=json.dumps(ai_result["risks_or_missing_information"]),
        suggested_next_actions=json.dumps(ai_result["suggested_next_actions"]),
        confidence_score=ai_result["confidence_score"]
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report


@router.get("/", response_model=list[ResearchReportResponse])
def get_reports(db: Session = Depends(get_db)):
    return db.query(ResearchReport).order_by(ResearchReport.created_at.desc()).all()


