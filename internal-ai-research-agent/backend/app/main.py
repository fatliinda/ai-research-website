from fastapi import FastAPI
from app.database import Base, engine
from app.models import ResearchReport
from app.routes.reports import router as reports_router

app = FastAPI(
    title="Internal AI Research Agent",
    debug=True
)

Base.metadata.create_all(bind=engine)

app.include_router(reports_router)


@app.get("/")
def root():
    return {
        "message": "Internal AI Research Agent API is running"
    }