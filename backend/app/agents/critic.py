from crewai import Agent

def create_critic():
    """Creates a critic agent"""
    
    agent = Agent(
        role='Research Critic',
        goal='Evaluate research quality and identify gaps',
        backstory="""You are a meticulous critic with expertise in 
        research methodology. You identify weaknesses, gaps, and 
        areas that need more investigation. You're constructive 
        but thorough.""",
        verbose=True,
        allow_delegation=False
    )
    
    return agent
