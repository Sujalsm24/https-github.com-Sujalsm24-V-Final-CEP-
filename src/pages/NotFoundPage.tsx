import React from 'react';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  return (
    <div className="py-24 text-center max-w-md mx-auto space-y-4">
      <div className="text-6xl font-extrabold text-indigo-600">404</div>
      <h2 className="text-xl font-bold text-slate-900">Page Not Found</h2>
      <p className="text-xs text-slate-500">
        The requested language learning screen does not exist or has been moved.
      </p>
      <div>
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs"
        >
          <Home size={14} />
          <span>Return Home</span>
        </button>
      </div>
    </div>
  );
};
