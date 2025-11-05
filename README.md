# 🔬 Reflective Research Agent

A multi-agent AI system that conducts comprehensive research using specialized AI agents that collaborate to gather, analyze, critique, and write detailed research reports.


## ✨ Features

- 🤖 **Multi-Agent System**: 4 specialized AI agents working together
  - **Researcher**: Gathers comprehensive information
  - **Analyzer**: Structures and organizes data
  - **Critic**: Evaluates quality and identifies gaps
  - **Writer**: Creates polished final reports

- 🎨 **Beautiful UI**: Modern, responsive interface with real-time progress tracking
- ⚡ **Fast & Efficient**: Built with FastAPI and React
- 🔒 **Error Handling**: Robust validation and user feedback
- 📋 **Search History**: Track your recent research queries
- 📄 **Copy Reports**: One-click copy to clipboard

## 🏗️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **CrewAI** - Multi-agent orchestration
- **OpenAI API** - Large language models
- **Python 3.8+**

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📋 Prerequisites

Before you begin, ensure you have:

- **Python 3.8 or higher** ([Download](https://www.python.org/downloads/))
- **Node.js 16 or higher** ([Download](https://nodejs.org/))
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))
- **Git** ([Download](https://git-scm.com/downloads))

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Mahmoud0090/Reflective_Research_Agent.git
cd reflective-research-agent
```

### 2. Backend Setup
```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env  # Windows
# OR
cp .env.example .env    # Mac/Linux

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=sk-your-key-here
```

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend folder
cd frontend

# Install dependencies
npm install

# (Optional) Create .env file
echo "REACT_APP_API_URL=http://127.0.0.1:8000" > .env
```

## ▶️ Running the Application

### Option 1: Run Manually (2 Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Option 2: Quick Start Script

**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

## 🌐 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://127.0.0.1:8000
- **API Documentation:** http://127.0.0.1:8000/docs

## 📖 Usage

1. Enter your research query in the search bar
2. Click "Research" or press Enter
3. Watch the agents work in real-time
4. View your comprehensive research report
5. Copy the report or start a new search

## 📁 Project Structure
```
reflective-research-agent/
│
├── backend/
│   ├── app/
│   │   ├── agents/           # AI agent definitions
│   │   │   ├── researcher.py
│   │   │   ├── analyzer.py
│   │   │   ├── critic.py
│   │   │   └── writer.py
│   │   ├── tasks/            # Task definitions
│   │   ├── main.py           # FastAPI application
│   │   └── ...
│   ├── .env.example          # Environment variables template
│   ├── requirements.txt      # Python dependencies
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── App.js            # Main application
│   │   └── ...
│   ├── public/
│   ├── package.json          # Node dependencies
│   └── README.md
│
├── .gitignore
└── README.md                 # This file
```

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env`:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Frontend Environment Variables (Optional)

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://127.0.0.1:8000
```

## 🐛 Troubleshooting

### Backend Issues

**ModuleNotFoundError:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

**OpenAI API Error:**
- Check your API key in `.env`
- Ensure you have credits in your OpenAI account
- Verify key starts with `sk-`

### Frontend Issues

**Module not found:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**CORS Error:**
- Ensure backend is running on port 8000
- Check CORS settings in `backend/app/main.py`

**Tailwind not working:**
```bash
npm install -D tailwindcss@3.3.0 postcss autoprefixer
```


