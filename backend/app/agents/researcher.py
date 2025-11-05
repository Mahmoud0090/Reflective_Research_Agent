from crewai import Agent
from crewai_tools import SerperDevTool
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_researcher():
    """Creates a research agent"""
    
    agent = Agent(
        role='Senior Research Analyst',
        goal='Conduct thorough research on given topics',
        backstory="""You are an experienced research analyst with 
        expertise in gathering and synthesizing information from 
        multiple sources. You're detail-oriented and thorough.""",
        verbose=True,
        allow_delegation=False
    )
    
    return agent
