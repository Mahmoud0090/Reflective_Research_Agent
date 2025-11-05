from crewai import Agent

def create_writer():
    """Creates a writer agent"""
    
    agent = Agent(
        role='Technical Writer',
        goal='Create comprehensive, well-structured reports',
        backstory="""You are an experienced technical writer who 
        creates clear, engaging, and well-organized reports. You 
        excel at making complex information accessible.""",
        verbose=True,
        allow_delegation=False
    )
    
    return agent
