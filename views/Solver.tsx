import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer, SectionHeader, Button } from '../components/ui';
import { MOCK_TICKETS } from '../constants';
import { TicketStatus } from '../types';
import { MapPin, DollarSign, Briefcase, ChevronRight, Navigation } from 'lucide-react';

export const SolverDashboard: React.FC = () => {
  const navigate = useNavigate();
  // Mock available tasks for solver
  const availableTasks = MOCK_TICKETS.filter(t => t.status === TicketStatus.OVERDUE || t.status === TicketStatus.EXTERNAL);

  return (
    <PageContainer>
      <header className="bg-green-700 text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
             <h1 className="text-2xl font-bold">Portal Solvers</h1>
             <Briefcase className="text-green-300" />
        </div>
        <p className="opacity-80 text-sm mt-1">Trabajos disponibles en tu zona (Belgrano).</p>
      </header>

      <div className="px-4 -mt-4 space-y-4">
        {availableTasks.length === 0 && <p className="text-center py-10 text-gray-500">No hay tareas cercanas.</p>}
        {availableTasks.map(task => (
            <div key={task.id} onClick={() => navigate(`/solvers/tasks/${task.id}`)} className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                     <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Disponible</span>
                     <span className="text-gray-400 text-xs font-mono">500m</span>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={12}/> Av. Libertador 2400</p>
                </div>
                <div className="border-t border-gray-50 pt-3 flex justify-between items-center">
                     <div>
                         <p className="text-[10px] text-gray-400 uppercase">Pago estimado</p>
                         <p className="text-lg font-bold text-gray-900 flex items-center"><DollarSign size={16}/> 15.000</p>
                     </div>
                     <Button size="sm" className="bg-green-600 hover:bg-green-700">Ver Detalles</Button>
                </div>
            </div>
        ))}
      </div>
    </PageContainer>
  );
};

export const SolverTaskDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const task = MOCK_TICKETS.find(t => t.id === id) || MOCK_TICKETS[0];

    return (
        <PageContainer>
            <div className="sticky top-0 bg-white z-10 p-4 flex items-center gap-2 border-b border-gray-100">
                <button onClick={() => navigate(-1)}><ChevronRight className="rotate-180 text-gray-500" /></button>
                <h1 className="font-bold">Oferta de Trabajo</h1>
            </div>

            <div className="p-4 space-y-6">
                 <img src={task.imageUrl} className="w-full h-48 rounded-xl object-cover" alt="Work" />
                 
                 <div>
                     <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
                     <p className="text-gray-600 mt-2">{task.description}</p>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                     <div className="bg-gray-50 p-3 rounded-xl">
                         <p className="text-xs text-gray-500 uppercase">Ubicación</p>
                         <p className="font-bold text-sm">Av. Libertador 2400</p>
                     </div>
                     <div className="bg-gray-50 p-3 rounded-xl">
                         <p className="text-xs text-gray-500 uppercase">Pago</p>
                         <p className="font-bold text-sm text-green-600">$15.000 (ARS)</p>
                     </div>
                 </div>

                 <Button fullWidth className="bg-green-600 hover:bg-green-700 py-4 text-lg shadow-green-200">
                    Aceptar Trabajo
                 </Button>
                 
                 <Button variant="outline" fullWidth className="flex items-center justify-center gap-2">
                    <Navigation size={16} /> Cómo llegar
                 </Button>
            </div>
        </PageContainer>
    )
}