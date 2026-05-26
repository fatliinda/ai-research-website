from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.models import ResearchReport
from app.routes.reports import router as reports_router

app = FastAPI(
    title="Internal AI Research Agent",
    debug=True
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(reports_router)


@app.get("/")
def root():
    return {"message": "Internal AI Research Agent API is running"}