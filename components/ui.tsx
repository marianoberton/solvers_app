import React from 'react';
import { TicketStatus, Urgency } from '../types';
import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

// --- Badges (Refined) ---
export const StatusBadge: React.FC<{ status: TicketStatus }> = ({ status }) => {
  const styles = {
    [TicketStatus.PENDING_VALIDATION]: 'bg-yellow-50 text-yellow-700 border-yellow-200 ring-yellow-500/20',
    [TicketStatus.ACTIVE]: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20',
    [TicketStatus.OVERDUE]: 'bg-red-50 text-red-700 border-red-200 ring-red-500/20',
    [TicketStatus.RESOLVED]: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
    [TicketStatus.CLOSED]: 'bg-slate-100 text-slate-600 border-slate-200 ring-slate-500/20',
    [TicketStatus.EXTERNAL]: 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/20',
  };

  const labels = {
    [TicketStatus.PENDING_VALIDATION]: 'Validando',
    [TicketStatus.ACTIVE]: 'En Curso',
    [TicketStatus.OVERDUE]: 'Vencido',
    [TicketStatus.RESOLVED]: 'Resuelto',
    [TicketStatus.CLOSED]: 'Cerrado',
    [TicketStatus.EXTERNAL]: 'Solver',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ring-1 ring-inset ${styles[status]}`}>
      {labels[status] || status}
    </span>
  );
};

export const UrgencyBadge: React.FC<{ urgency: Urgency }> = ({ urgency }) => {
  const styles = {
    [Urgency.LOW]: 'text-slate-500 bg-slate-100',
    [Urgency.MEDIUM]: 'text-orange-600 bg-orange-50',
    [Urgency.HIGH]: 'text-rose-600 bg-rose-50 border-rose-100',
  };
  
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1.5 ${styles[urgency]}`}>
      {urgency === Urgency.HIGH && <AlertTriangle size={10} strokeWidth={3} />}
      {urgency}
    </span>
  );
};

// --- Buttons (High End) ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', size = 'md', fullWidth, className = '', ...props 
}) => {
  const base = "font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-5 py-3 text-sm rounded-xl",
    lg: "px-6 py-4 text-base rounded-2xl"
  };

  const variants = {
    primary: "bg-slate-900 text-white shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:shadow-slate-900/30 border border-transparent",
    secondary: "bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 border border-transparent",
    danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-600/20 border border-transparent",
    outline: "bg-transparent border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300",
    ghost: "text-slate-600 hover:bg-slate-100/50 hover:text-slate-900",
    glass: "bg-white/70 backdrop-blur-md border border-white/50 text-slate-800 shadow-sm hover:bg-white/90"
  };
  
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Layout Containers ---
export const PageContainer: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`min-h-screen bg-slate-50 text-slate-900 pb-32 fade-in ${className}`}>
    {children}
  </div>
);

export const SectionHeader: React.FC<{ title: string, action?: React.ReactNode }> = ({ title, action }) => (
  <div className="flex justify-between items-end mb-4 px-6 pt-8 pb-1">
    <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
    {action}
  </div>
);
