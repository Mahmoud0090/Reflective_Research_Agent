import React from 'react';

export default function Instructions() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        🤖 How It Works
      </h2>
      <div className="space-y-2 text-gray-600">
        <p>
          <strong>1. Researcher Agent:</strong> Gathers comprehensive information
        </p>
        <p>
          <strong>2. Analyzer Agent:</strong> Structures and organizes findings
        </p>
        <p>
          <strong>3. Critic Agent:</strong> Evaluates quality and identifies gaps
        </p>
        <p>
          <strong>4. Writer Agent:</strong> Creates the final polished report
        </p>
      </div>
    </div>
  );
}
