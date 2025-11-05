import React from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function ProgressTracker({ steps, isActive }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Loader2 
          className={isActive ? "animate-spin text-indigo-600" : "text-green-600"} 
          size={24} 
        />
        Research Progress
      </h2>
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <div className="font-semibold text-gray-800">{step.agent}</div>
              <div className="text-sm text-gray-600">{step.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
