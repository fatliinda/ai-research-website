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
    try:
        ai_result = generate_ai_report(data)
        print("AI RESULT:", ai_result)

        report = ResearchReport(
            research_type=data.research_type,
            name=data.name,
            website_url=data.website_url,
            country=data.country,
            industry=data.industry,
            research_goal=data.research_goal,
            summary=ai_result["summary"],
            products_or_services=ai_result["products_or_services"],
            opportunities=ai_result["opportunities"],
            risks_or_missing_information=ai_result["risks_or_missing_information"],
            suggested_next_actions=ai_result["suggested_next_actions"],
            confidence_score=ai_result["confidence_score"]
        )

        db.add(report)
        db.commit()
        db.refresh(report)

        return report

    except Exception as e:
        print("GENERATE REPORT ERROR:", str(e))
        raise


@router.get("/", response_model=list[ResearchReportResponse])
def get_reports(db: Session = Depends(get_db)):
    return db.query(ResearchReport).order_by(ResearchReport.created_at.desc()).all()


@router.get("/{report_id}", response_model=ResearchReportResponse)
def get_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(ResearchReport).filter(ResearchReport.id == report_id).first()

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    return report


@router.get("/{report_id}/export/json")
def export_report_json(report_id: int, db: Session = Depends(get_db)):
    report = db.query(ResearchReport).filter(ResearchReport.id == report_id).first()

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    file_path = export_report_to_json(report)

    return FileResponse(
        path=file_path,
        filename=f"research_report_{report.id}.json",
        media_type="application/json"
    )