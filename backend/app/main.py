from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from crewai import Crew, Process
from app.agents.researcher import create_researcher
from app.agents.analyzer import create_analyzer
from app.agents.critic import create_critic
from app.agents.writer import create_writer
from app.tasks.research_tasks import (
    create_research_task,
    create_analysis_task,
    create_critique_task,
    create_writing_task
)
import os
from dotenv import load_dotenv
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

app = FastAPI(title="Research Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResearchQuery(BaseModel):
    query: str
    
    @validator('query')
    def query_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Query cannot be empty')
        if len(v) > 500:
            raise ValueError('Query too long (max 500 characters)')
        return v.strip()

@app.get("/")
def home():
    return {
        "message": "Multi-Agent Research System Running!",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok"}

@app.post("/research")
def research(query: ResearchQuery):
    try:
        logger.info(f"Starting research for query: {query.query}")
        
        # Create all agents
        researcher = create_researcher()
        analyzer = create_analyzer()
        critic = create_critic()
        writer = create_writer()
        
        # Create all tasks
        research_task = create_research_task(researcher, query.query)
        analysis_task = create_analysis_task(analyzer)
        critique_task = create_critique_task(critic)
        writing_task = create_writing_task(writer, query.query)
        
        # Create crew with all agents
        crew = Crew(
            agents=[researcher, analyzer, critic, writer],
            tasks=[research_task, analysis_task, critique_task, writing_task],
            process=Process.sequential,
            verbose=True
        )
        
        # Execute
        logger.info("Executing crew tasks...")
        result = crew.kickoff()
        logger.info("Research completed successfully")
        
        return {
            "status": "success",
            "query": query.query,
            "report": str(result),
            "timestamp": "2024-11-04"
        }
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    
    except Exception as e:
        logger.error(f"Research failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Research failed. Please try again or contact support."
        )
