from sqlalchemy import Column, Integer, String, Text, DateTime, CheckConstraint, JSON
from sqlalchemy.sql import func
from app.database import Base


class ResearchReport(Base):
    __tablename__ = "research_reports"

    id = Column(Integer, primary_key=True, index=True)
    research_type = Column(String(50), nullable=False)
    name = Column(String(255), nullable=False)
    website_url = Column(String(500), nullable=True)
    country = Column(String(100), nullable=True)
    industry = Column(String(150), nullable=True)
    research_goal = Column(Text, nullable=False)

    summary = Column(Text, nullable=True)
    products_or_services = Column(JSON, nullable=True)
    opportunities = Column(JSON, nullable=True)
    risks_or_missing_information = Column(JSON, nullable=True)
    suggested_next_actions = Column(JSON, nullable=True)

    confidence_score = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())