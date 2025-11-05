from crewai import Agent

def create_analyzer():
    """Creates an analysis agent"""
    
    agent = Agent(
        role='Data Analyst',
        goal='Analyze and structure research findings',
        backstory="""You are a skilled data analyst who excels at 
        organizing information, identifying patterns, and creating 
        clear, structured summaries. You have a keen eye for detail.""",
        verbose=True,
        allow_delegation=False
    )
    
    return agent
