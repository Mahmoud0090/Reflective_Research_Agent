import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ProgressTracker from './components/ProgressTracker';
import ReportDisplay from './components/ReportDisplay';
import Instructions from './components/Instructions';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState([]);
  const [report, setReport] = useState('');
  const [error, setError] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [history, setHistory] = useState([]);

  // Use environment variable for API URL (configurable)
  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

  const simulateProgress = () => {
    const steps = [
      { agent: '👨‍🔬 Researcher', status: 'Gathering information from sources...' },
      { agent: '📊 Analyzer', status: 'Organizing and structuring data...' },
      { agent: '🔍 Critic', status: 'Evaluating quality and gaps...' },
      { agent: '✍️ Writer', status: 'Creating final report...' },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setProgress(prev => [...prev, step]);
      }, index * 1500);
    });
  };

  const handleSearch = async () => {
    // Validation
    if (!query.trim()) {
      setError('Please enter a research query');
      return;
    }

    if (query.length > 500) {
      setError('Query is too long (max 500 characters)');
      return;
    }
    
    setIsLoading(true);
    setReport('');
    setProgress([]);
    setError('');
    setGlobalError('');
    
    simulateProgress();

    try {
      const response = await fetch(`${API_URL}/research`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Research failed');
      }

      const data = await response.json();
      setReport(data.report);
      
      // Save to history (keep last 5 searches)
      setHistory(prev => [
        { query: query, timestamp: new Date().toLocaleString() },
        ...prev.slice(0, 4)
      ]);
      
    } catch (error) {
      console.error('Research error:', error);
      
      if (error.message.includes('Failed to fetch')) {
        setGlobalError(`Cannot connect to backend. Make sure the server is running on ${API_URL}`);
      } else {
        setGlobalError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryClick = (historicQuery) => {
    setQuery(historicQuery);
    setError('');
    setGlobalError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🔬 Reflective Research Agent
          </h1>
          <p className="text-gray-600">
            Multi-agent AI system for comprehensive research
          </p>
        </div>

        {globalError && (
          <ErrorMessage 
            message={globalError} 
            onDismiss={() => setGlobalError('')}
          />
        )}

        <SearchBar 
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          isLoading={isLoading}
          error={error}
        />

        {progress.length > 0 && (
          <ProgressTracker steps={progress} isActive={isLoading} />
        )}

        <ReportDisplay report={report} />

        {/* Search History */}
        {history.length > 0 && !isLoading && !report && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              🕒 Recent Searches
            </h3>
            <div className="space-y-2">
              {history.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleHistoryClick(item.query)}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                >
                  <div className="text-gray-700 font-medium">{item.query}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.timestamp}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {!report && !isLoading && !globalError && <Instructions />}
      </div>
    </div>
  );
}

export default App;
