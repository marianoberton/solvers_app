import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, List, CheckSquare, FileText, User, Briefcase, Shield, Search } from 'lucide-react';
import { Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  role: Role;
}

export const Layout: React.FC<LayoutProps> = ({ children, role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isTabActive = (path: string) => location.pathname === path;

  // Reusable Nav Item
  const NavItem = ({ path, icon: Icon, label, accentColor = 'text-blue-600' }: { path: string, icon: any, label: string, accentColor?: string }) => {
    const active = isTabActive(path);
    return (
      <button 
        onClick={() => navigate(path)}
        className="group flex flex-col items-center justify-center w-full h-full relative"
      >
        <div className={`transition-all duration-300 ${active ? '-translate-y-1' : ''}`}>
           <Icon 
             size={22} 
             className={`transition-colors duration-300 ${active ? accentColor : 'text-slate-400 group-hover:text-slate-500'}`} 
             strokeWidth={active ? 2.5 : 2}
             fill={active ? "currentColor" : "none"}
             fillOpacity={active ? 0.2 : 0}
           />
        </div>
        {active && (
            <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-slate-900"></span>
        )}
      </button>
    );
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative bg-slate-50 shadow-2xl overflow-hidden">
      {/* Content Area */}
      <div className="h-full overflow-y-auto pb-28 scrollbar-hide">
        {children}
      </div>

      {/* Floating Island Navigation */}
      <div className="fixed bottom-6 left-4 right-4 max-w-[calc(28rem-2rem)] mx-auto z-50">
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-glass rounded-2xl h-16 flex justify-between items-center px-2">
            
            {role === Role.CONSORCISTA && (
            <>
                <NavItem path="/app" icon={Home} label="Home" accentColor="text-slate-900" />
                <NavItem path="/app/tickets" icon={List} label="Tickets" accentColor="text-slate-900" />
                {/* Floating Action Button for Validate */}
                <div className="relative -top-6">
                    <button 
                        onClick={() => navigate('/app/validate')}
                        className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center shadow-lg shadow-slate-900/40 border-4 border-slate-50 active:scale-95 transition-transform"
                    >
                        <CheckSquare className="text-white" size={24} />
                    </button>
                </div>
                <NavItem path="/app/bitacora" icon={FileText} label="Bitácora" accentColor="text-slate-900" />
                <NavItem path="/app/profile" icon={User} label="Perfil" accentColor="text-slate-900" />
            </>
            )}

            {role === Role.ENCARGADO && (
            <>
                <NavItem path="/encargado" icon={List} label="Tareas" accentColor="text-orange-600" />
                <NavItem path="/encargado/history" icon={FileText} label="Legajo" accentColor="text-orange-600" />
                <NavItem path="/app/profile" icon={User} label="Perfil" accentColor="text-orange-600" />
            </>
            )}

            {role === Role.ADMIN && (
            <>
                <NavItem path="/admin" icon={Shield} label="Panel" accentColor="text-purple-600" />
                <NavItem path="/admin/reports" icon={FileText} label="Reportes" accentColor="text-purple-600" />
            </>
            )}

            {role === Role.SOLVER && (
            <>
                <NavItem path="/solvers" icon={Search} label="Explorar" accentColor="text-emerald-600" />
                <NavItem path="/app/profile" icon={User} label="Perfil" accentColor="text-emerald-600" />
            </>
            )}
        </div>
      </div>
    </div>
  );
};