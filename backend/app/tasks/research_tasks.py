from crewai import Task

def create_research_task(agent, topic):
    """Research task"""
    task = Task(
        description=f"""Research: {topic}
        
        Gather comprehensive information including:
        - Overview and context
        - Key concepts and definitions  
        - Recent developments
        - Important facts and statistics""",
        agent=agent,
        expected_output="Detailed research findings"
    )
    return task

def create_analysis_task(agent):
    """Analysis task"""
    task = Task(
        description="""Analyze the research findings and:
        
        1. Identify main themes
        2. Organize information logically
        3. Highlight key insights
        4. Structure the data clearly""",
        agent=agent,
        expected_output="Structured analysis of research"
    )
    return task

def create_critique_task(agent):
    """Critique task"""
    task = Task(
        description="""Review the research and analysis:
        
        1. Identify any gaps or weaknesses
        2. Check for accuracy concerns
        3. Suggest improvements
        4. Validate key claims""",
        agent=agent,
        expected_output="Critical evaluation with improvement suggestions"
    )
    return task

def create_writing_task(agent, topic):
    """Writing task"""
    task = Task(
        description=f"""Create final report on: {topic}
        
        Include:
        - Executive summary
        - Main findings (organized sections)
        - Key insights
        - Conclusion
        
        Format in clear markdown with headers.""",
        agent=agent,
        expected_output="Comprehensive final report in markdown"
    )
    return task