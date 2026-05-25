from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ResearchReportCreate(BaseModel):
    research_type: str = Field(..., example="Company")
    name: str = Field(..., example="Tesla")
    website_url: Optional[str] = Field(None, example="https://tesla.com")
    country: Optional[str] = Field(None, example="USA")
    industry: Optional[str] = Field(None, example="Automotive")
    research_goal: str = Field(
        ...,
        example="Evaluate Tesla as a potential supplier"
    )


class ResearchReportResponse(BaseModel):
    id: int
    research_type: str
    name: str
    website_url: Optional[str]
    country: Optional[str]
    industry: Optional[str]
    research_goal: str

    summary: Optional[str]
    products_or_services: Optional[str]
    opportunities: Optional[str]
    risks_or_missing_information: Optional[str]
    suggested_next_actions: Optional[str]

    confidence_score: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True