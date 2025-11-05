import React from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';

export default function SearchBar({ query, setQuery, onSearch, isLoading, error }) {
  const maxLength = 500;
  const remaining = maxLength - query.length;
  const isOverLimit = remaining < 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && !isOverLimit && onSearch()}
            placeholder="What would you like to research today?"
            disabled={isLoading}
            maxLength={maxLength}
            className={`w-full px-4 py-3 pr-10 border-2 rounded-lg focus:outline-none disabled:bg-gray-100 ${
              isOverLimit ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500'
            }`}
          />
          <Search className="absolute right-3 top-3.5 text-gray-400" size={20} />
        </div>
        <button
          onClick={onSearch}
          disabled={isLoading || !query.trim() || isOverLimit}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Researching
            </>
          ) : (
            <>
              <Search size={20} />
              Research
            </>
          )}
        </button>
      </div>
      
      {/* Character counter */}
      <div className={`text-sm mt-2 ${isOverLimit ? 'text-red-600' : 'text-gray-500'}`}>
        {remaining} characters remaining
      </div>

      {/* Validation message */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-600">
          <AlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
}
