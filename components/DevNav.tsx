import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';

export const DevNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const routes = [
    { label: 'Landing', path: '/' },
    { label: 'Auth: Login', path: '/auth' },
    { label: 'Auth: Verify', path: '/auth/verify' },
    { label: 'Onboarding: Start', path: '/onboarding' },
    { label: 'Onboarding: Profile', path: '/onboarding/profile' },
    { label: 'Onboarding: Success', path: '/onboarding/success' },
    { label: 'App: Dashboard', path: '/app' },
    { label: 'App: Tickets List', path: '/app/tickets' },
    { label: 'App: New Ticket', path: '/app/tickets/new' },
    { label: 'App: Ticket Detail (Mock)', path: '/app/tickets/T-1024' },
    { label: 'App: Validate', path: '/app/validate' },
    { label: 'App: Bitacora', path: '/app/bitacora' },
    { label: 'App: Bitacora Detail', path: '/app/bitacora/L-999' },
    { label: 'App: Profile', path: '/app/profile' },
    { label: 'App: Building Info', path: '/app/building' },
    { label: 'Encargado: Home', path: '/encargado' },
    { label: 'Encargado: Task', path: '/encargado/tickets/T-0998' },
    { label: 'Encargado: History', path: '/encargado/history' },
    { label: 'Admin: Dashboard', path: '/admin' },
    { label: 'Admin: Ticket', path: '/admin/tickets/T-0850' },
    { label: 'Admin: Reports', path: '/admin/reports' },
    { label: 'Solver: Marketplace', path: '/solvers' },
    { label: 'Solver: Task', path: '/solvers/tasks/T-0850' },
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 bg-black/80 text-white p-3 rounded-full shadow-2xl z-[100] hover:bg-black transition-colors backdrop-blur-md border border-white/20"
      >
        <Terminal size={20} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-gray-900 border border-gray-700 w-full max-w-sm max-h-[80vh] rounded-2xl flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h3 className="text-white font-mono font-bold flex items-center gap-2"><Terminal size={16}/> DEV NAVIGATION</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
        </div>
        <div className="overflow-y-auto p-2 space-y-1">
          {routes.map((r, i) => (
            <button 
              key={i}
              onClick={() => { navigate(r.path); setIsOpen(false); }}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 text-sm font-mono transition-colors flex justify-between group"
            >
              {r.label}
              <span className="text-gray-600 group-hover:text-gray-400 text-xs">{r.path}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};