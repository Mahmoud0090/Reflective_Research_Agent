# Research Agent Backend

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create .env file:
OPENAI_API_KEY=your_key_here

4. Run server:
```bash
uvicorn app.main:app --reload
```

## API Endpoints

- `GET /` - Health check
- `POST /research` - Submit research query
