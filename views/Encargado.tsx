import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer, SectionHeader, StatusBadge, Button } from '../components/ui';
import { TicketStatus } from '../types';
import { Clock, Camera, CheckCircle, ChevronRight, MapPin, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const EncargadoDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { tickets, user } = useAppContext();
  const myTasks = tickets.filter(t => t.status === TicketStatus.ACTIVE || t.status === TicketStatus.OVERDUE);

  return (
    <PageContainer>
      <header className="bg-slate-900 text-white px-6 pt-12 pb-10 rounded-b-[2.5rem] shadow-2xl shadow-slate-900/30">
        <div className="flex justify-between items-start mb-6">
            <div>
                <h1 className="text-3xl font-bold">Hola, {user.name.split(' ')[0] || 'Encargado'}</h1>
                <p className="text-slate-400">Tenés <span className="text-white font-bold">{myTasks.length} tareas</span> pendientes.</p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-orange-500 p-1">
                 <img src="https://i.pravatar.cc/150?img=11" className="w-full h-full rounded-full object-cover" alt="Profile" />
            </div>
        </div>
        
        <div className="flex gap-4">
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex-1 border border-white/10">
                <span className="block text-3xl font-bold text-orange-400">4.8</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400">Calificación</span>
             </div>
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex-1 border border-white/10">
                <span className="block text-3xl font-bold text-white">92%</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400">SLA a Tiempo</span>
             </div>
        </div>
      </header>

      <div className="px-6 -mt-6 space-y-4">
        {myTasks.length === 0 && (
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center">
                <CheckCircle size={48} className="mx-auto mb-4 text-emerald-500" />
                <h3 className="text-xl font-bold text-slate-900">Todo limpio</h3>
                <p className="text-slate-500 text-sm">No hay incidencias activas en este momento.</p>
            </div>
        )}

        {myTasks.map(task => (
            <div key={task.id} onClick={() => navigate(`/encargado/tickets/${task.id}`)} className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 cursor-pointer active:scale-95 transition-transform relative overflow-hidden">
                {task.status === TicketStatus.OVERDUE && (
                    <div className="absolute top-0 right-0 w-2 h-full bg-rose-500"></div>
                )}
                
                <div className="flex justify-between items-start mb-3">
                    <StatusBadge status={task.status} />
                    <div className="flex items-center gap-1 text-slate-900 bg-slate-100 px-2 py-1 rounded-lg text-xs font-bold font-mono">
                        <Clock size={12} />
                        <span>01:45</span>
                    </div>
                </div>
                
                <h3 className="font-bold text-xl text-slate-900 mb-2">{task.title}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-2 mb-6">
                    <MapPin size={14} /> {task.location}
                </p>
                
                <Button fullWidth size="md" className="bg-slate-900 text-white shadow-none pointer-events-none">
                    Ver Detalles
                </Button>
            </div>
        ))}
      </div>
    </PageContainer>
  );
};

export const EncargadoTaskDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tickets, resolveTicket } = useAppContext();
    
    const task = tickets.find(t => t.id === id);

    if(!task) return <div>Tarea no encontrada</div>;

    const handleResolve = () => {
        resolveTicket(task.id);
        navigate('/encargado');
    }

    return (
        <PageContainer>
            <div className="sticky top-0 bg-white/90 backdrop-blur-md z-20 p-4 pt-12 flex items-center gap-3 border-b border-slate-100">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><ChevronRight className="rotate-180 text-slate-600" /></button>
                <h1 className="font-bold text-slate-900">Tarea #{task.id}</h1>
            </div>
            
            <div className="p-6 space-y-6">
                <div className="rounded-3xl overflow-hidden h-64 shadow-md">
                    <img src={task.imageUrl} className="w-full h-full object-cover" alt="Task" />
                </div>
                
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">{task.title}</h2>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 leading-relaxed">
                        {task.description}
                    </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-200/50 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <p className="text-xs text-orange-800 font-bold uppercase tracking-wider mb-1">Tiempo Restante</p>
                        <p className="text-4xl font-mono text-orange-900 font-bold tracking-tighter">01:45:00</p>
                    </div>
                </div>

                <div className="pt-4 pb-20">
                    <h3 className="font-bold text-slate-900 mb-4">Acciones Requeridas</h3>
                    <Button onClick={handleResolve} fullWidth size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200">
                        <Camera className="mr-2" /> Subir Prueba de Vida
                    </Button>
                    <div className="mt-4 flex gap-3 p-4 bg-blue-50 rounded-xl text-xs text-blue-800 leading-relaxed">
                        <AlertCircle className="shrink-0" size={16} />
                        Al subir la foto, el ticket pasará a estado "Resuelto" y los vecinos podrán validar tu trabajo.
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export const EncargadoHistory: React.FC = () => {
    return (
        <PageContainer>
            <SectionHeader title="Tu Legajo" />
            <div className="px-6 text-center py-20">
                <p className="text-slate-400">Historial completo próximamente.</p>
            </div>
        </PageContainer>
    )
}