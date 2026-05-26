from pydantic import BaseModel, Field
from typing import Optional, Literal, List
from datetime import datetime


class ResearchReportCreate(BaseModel):
    research_type: Literal[
        "Company",
        "Supplier",
        "Client",
        "Product",
        "Competitor"
    ] = Field(..., example="Company")

    name: str = Field(..., example="Tesla")
    website_url: Optional[str] = Field(None, example="https://tesla.com")
    country: Optional[str] = Field(None, example="USA")
    industry: Optional[str] = Field(None, example="Automotive")
    research_goal: str = Field(..., example="Evaluate Tesla as a potential supplier")


class ResearchReportResponse(BaseModel):
    id: int
    research_type: str
    name: str
    website_url: Optional[str]
    country: Optional[str]
    industry: Optional[str]
    research_goal: str

    summary: Optional[str]
    products_or_services: Optional[List[str]]
    opportunities: Optional[List[str]]
    risks_or_missing_information: Optional[List[str]]
    suggested_next_actions: Optional[List[str]]

    confidence_score: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True