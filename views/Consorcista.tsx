import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Plus, Bell, MapPin, Camera, Clock, CheckCircle2, 
  XCircle, ChevronRight, ExternalLink, ThumbsUp, ThumbsDown, LogOut, Settings, MoreVertical, Calendar, ArrowUpRight, Shield, RefreshCcw
} from 'lucide-react';
import { MOCK_SOLVERS } from '../constants';
import { TicketStatus, Urgency } from '../types';
import { PageContainer, SectionHeader, StatusBadge, UrgencyBadge, Button } from '../components/ui';
import { useAppContext } from '../context/AppContext';

// --- Components ---
const TicketCard = ({ ticket, onClick }: any) => (
    <div onClick={onClick} className="group bg-white rounded-2xl p-4 shadow-sm border border-slate-100 active:scale-[0.99] transition-all cursor-pointer hover:border-blue-200 hover:shadow-md">
        <div className="flex gap-4">
            <div className="relative w-20 h-20 flex-shrink-0">
                <img src={ticket.imageUrl} className="w-full h-full rounded-xl object-cover bg-slate-100" alt="Evidence" />
                {ticket.status === TicketStatus.OVERDUE && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-100"></div>
                )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <StatusBadge status={ticket.status} />
                        <span className="text-[10px] text-slate-400 font-medium">
                            {new Date(ticket.createdAt).getHours()}:{String(new Date(ticket.createdAt).getMinutes()).padStart(2, '0')}
                        </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 truncate leading-tight">{ticket.title}</h4>
                </div>
                <div className="flex items-center gap-3">
                    <UrgencyBadge urgency={ticket.urgency} />
                    <span className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                        <MapPin size={10} /> {ticket.location}
                    </span>
                </div>
            </div>
        </div>
    </div>
);

// --- Dashboard (Bento Style) ---
export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { tickets, user } = useAppContext();

  const activeTickets = tickets.filter(t => t.status === TicketStatus.ACTIVE);
  const pendingValidation = tickets.filter(t => t.status === TicketStatus.PENDING_VALIDATION);
  const overdueTickets = tickets.filter(t => t.status === TicketStatus.OVERDUE);

  return (
    <PageContainer>
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-start">
        <div>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tu Unidad</p>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2" onClick={() => navigate('/app/profile')}>
              {user.unit} <ChevronRight size={18} className="text-slate-300" />
           </h1>
           <p className="text-sm text-slate-500 mt-1">Hola, {user.name.split(' ')[0]}</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm relative">
            <Bell size={18} className="text-slate-600" />
            {overdueTickets.length > 0 && <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full"></span>}
        </button>
      </header>

      {/* Hero Stats */}
      <div className="px-6 grid grid-cols-2 gap-3 mb-8">
         <div 
            onClick={() => navigate('/app/validate')}
            className="bg-slate-900 text-white p-5 rounded-3xl shadow-xl shadow-slate-900/20 relative overflow-hidden group cursor-pointer"
         >
            <div className="absolute top-0 right-0 p-4 opacity-20"><CheckCircle2 size={40} /></div>
            <p className="text-4xl font-bold mb-1 group-hover:scale-110 transition-transform origin-left">{pendingValidation.length}</p>
            <p className="text-sm font-medium text-slate-300">Por Validar</p>
            <div className="mt-4 flex items-center text-[10px] text-slate-400 gap-1">
                Tu voto cuenta <ArrowUpRight size={10} />
            </div>
         </div>

         <div className="flex flex-col gap-3">
             <div onClick={() => navigate('/app/tickets')} className="flex-1 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center cursor-pointer hover:border-blue-200">
                <p className="text-2xl font-bold text-slate-900">{activeTickets.length}</p>
                <p className="text-xs text-slate-500 font-medium">En curso</p>
             </div>
             <div className="flex-1 bg-rose-50 p-4 rounded-3xl border border-rose-100 flex flex-col justify-center">
                <p className="text-2xl font-bold text-rose-600">{overdueTickets.length}</p>
                <p className="text-xs text-rose-800 font-medium">SLA Vencido</p>
             </div>
         </div>
      </div>

      <SectionHeader title="Acciones" />
      <div className="px-6 mb-8">
        <Button onClick={() => navigate('/app/tickets/new')} fullWidth size="lg" className="bg-blue-600 shadow-blue-600/30">
          <Camera className="mr-2" size={20} /> Reportar Incidencia
        </Button>
      </div>

      <SectionHeader title="Últimos Reportes" action={<span onClick={() => navigate('/app/tickets')} className="text-xs font-bold text-blue-600 cursor-pointer">Ver todos</span>} />
      <div className="px-6 space-y-3">
        {tickets.slice(0, 3).map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} onClick={() => navigate(`/app/tickets/${ticket.id}`)} />
        ))}
      </div>
    </PageContainer>
  );
};

// --- Ticket List ---
export const TicketList: React.FC = () => {
    const navigate = useNavigate();
    const { tickets } = useAppContext();
    const [tab, setTab] = useState<'active' | 'history'>('active');

    const activeList = tickets.filter(t => t.status !== TicketStatus.CLOSED && t.status !== TicketStatus.RESOLVED);
    const historyList = tickets.filter(t => t.status === TicketStatus.CLOSED || t.status === TicketStatus.RESOLVED);
    const list = tab === 'active' ? activeList : historyList;

    return (
        <PageContainer>
            <div className="sticky top-0 bg-slate-50/90 backdrop-blur-md z-20 px-6 pt-12 pb-4 border-b border-slate-200/50">
                <h1 className="text-2xl font-bold mb-4 text-slate-900">Incidencias</h1>
                <div className="flex bg-slate-200/50 p-1 rounded-xl">
                    <button 
                        onClick={() => setTab('active')} 
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'active' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                    >
                        Activos ({activeList.length})
                    </button>
                    <button 
                        onClick={() => setTab('history')} 
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'history' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                    >
                        Historial
                    </button>
                </div>
            </div>

            <div className="px-6 py-4 space-y-3">
                {list.length === 0 && (
                     <div className="text-center py-10 text-slate-400">
                        <p>No hay tickets en esta sección.</p>
                     </div>
                )}
                {list.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} onClick={() => navigate(`/app/tickets/${ticket.id}`)} />
                ))}
            </div>
            
            <div className="fixed bottom-24 right-6 z-40">
                <button onClick={() => navigate('/app/tickets/new')} className="w-14 h-14 bg-slate-900 text-white rounded-2xl shadow-2xl shadow-slate-900/40 flex items-center justify-center hover:scale-105 transition-transform">
                    <Plus size={28} />
                </button>
            </div>
        </PageContainer>
    );
};

// --- New Ticket (Functional) ---
export const NewTicket: React.FC = () => {
  const navigate = useNavigate();
  const { addTicket } = useAppContext();
  
  // DEMO MODE: Pre-filled form
  const [title, setTitle] = useState('Manija puerta de servicio');
  const [desc, setDesc] = useState('Se salió la manija de la puerta que da a las escaleras. Quedó tirada en el piso.');
  const [loc, setLoc] = useState('4to Piso - Servicio');
  const [cat, setCat] = useState('🔒 Seguridad');
  const [photo, setPhoto] = useState<string | null>(null);

  const handleSubmit = () => {
      if(!title) return; // Basic validation
      addTicket(title, desc, cat, loc, photo);
      navigate('/app/tickets');
  }

  return (
    <PageContainer className="bg-white">
      <div className="px-6 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100">
            <XCircle className="text-slate-400" size={24} />
        </button>
        <span className="font-bold text-slate-900">Nuevo Reporte</span>
        <div className="w-10" />
      </div>

      <div className="p-6 space-y-8">
        {/* Photo Area */}
        <div 
          onClick={() => setPhoto('https://picsum.photos/400/600?random=' + Math.random())}
          className={`aspect-[4/3] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden ${photo ? 'border-transparent' : 'border-slate-200 bg-slate-50'}`}
        >
          {photo ? (
            <img src={photo} className="absolute inset-0 w-full h-full object-cover" alt="Evidence" />
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera size={32} className="text-blue-600" />
              </div>
              <span className="text-sm text-slate-500 font-medium">Tocar para añadir evidencia</span>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 block">Categoría</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {['💡 Electricidad', '🧹 Limpieza', '💧 Plomería', '🔒 Seguridad'].map(c => (
                    <button 
                        key={c} 
                        onClick={() => setCat(c)}
                        className={`px-5 py-3 rounded-xl border text-sm font-medium whitespace-nowrap transition-all ${cat === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-600'}`}
                    >
                        {c}
                    </button>
                    ))}
                </div>
            </div>

             <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Título</label>
                <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm focus:bg-white outline-none font-bold" 
                    placeholder="Ej: Luz quemada" 
                />
            </div>

            <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">¿Qué pasó?</label>
                <textarea 
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all" 
                    rows={3} 
                    placeholder="Describí el problema..." 
                />
            </div>

            <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Ubicación</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        value={loc}
                        onChange={(e) => setLoc(e.target.value)}
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm focus:bg-white outline-none" 
                        placeholder="Ej: Palier Piso 3" 
                    />
                </div>
            </div>
        </div>

        <div className="pt-4">
          <Button fullWidth size="lg" onClick={handleSubmit} disabled={!title}>Publicar Reporte (Demo)</Button>
          <p className="text-center text-[10px] text-slate-400 mt-4">
            Al publicar, notificás automáticamente a la administración.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Ticket Detail (Functional) ---
export const TicketDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, hireSolver } = useAppContext();
  
  const ticket = tickets.find(t => t.id === id);
  if (!ticket) return <div className="p-10 text-center">Ticket no encontrado</div>;

  const isOverdue = ticket.status === TicketStatus.OVERDUE;

  const handleHire = () => {
    // If ticket is overdue, allow direct navigation to solver list to hire.
    navigate(`/app/tickets/${ticket.id}/external`);
  }

  return (
    <PageContainer>
        {/* Immersive Header */}
        <div className="relative h-80">
            <img src={ticket.imageUrl} className="w-full h-full object-cover" alt="Evidence" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-slate-50"></div>
            
            <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center text-white">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <ChevronRight className="rotate-180" size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <MoreVertical size={20} />
                </button>
            </div>
        </div>

        {/* Content Sheet */}
        <div className="relative -mt-10 px-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex justify-between items-start mb-3">
                    <StatusBadge status={ticket.status} />
                    <span className="text-xs font-mono text-slate-400">#{ticket.id}</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-2">{ticket.title}</h1>
                <p className="text-sm text-slate-500 flex items-center gap-2 mb-4">
                    <MapPin size={14} className="text-blue-500" /> {ticket.location}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {ticket.description}
                </p>
                {/* Progress for Validation */}
                {ticket.status === TicketStatus.PENDING_VALIDATION && (
                     <div className="mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex justify-between text-xs font-bold mb-1">
                            <span>Validación Vecinal</span>
                            <span>{ticket.validations} / {ticket.requiredValidations}</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(ticket.validations / ticket.requiredValidations) * 100}%` }}></div>
                        </div>
                     </div>
                )}
            </div>

            {/* SLA Timer */}
            {(ticket.status === TicketStatus.ACTIVE || ticket.status === TicketStatus.OVERDUE) && (
                <div className={`rounded-2xl p-5 border flex items-center justify-between ${isOverdue ? 'bg-rose-50 border-rose-100' : 'bg-white border-slate-200'}`}>
                    <div>
                        <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${isOverdue ? 'text-rose-600' : 'text-slate-500'}`}>
                            {isOverdue ? 'Plazo Vencido' : 'Tiempo Restante'}
                        </p>
                        <p className={`text-2xl font-mono font-bold ${isOverdue ? 'text-rose-700' : 'text-slate-900'}`}>
                            {isOverdue ? '- 20:45:12' : '04:12:30'}
                        </p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isOverdue ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-400'}`}>
                        <Clock size={24} />
                    </div>
                </div>
            )}

            {/* Timeline */}
            <div>
                <h3 className="font-bold text-slate-900 mb-4 px-1">Seguimiento</h3>
                <div className="space-y-0 pl-4 border-l-2 border-slate-100 ml-3">
                    {ticket.evidenceHistory.map((ev, idx) => (
                    <div key={idx} className="relative pl-8 pb-8 last:pb-0">
                        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-slate-50 ${ev.type === 'overdue' ? 'bg-rose-500' : 'bg-blue-600'}`}></div>
                        <p className="text-xs text-slate-400 font-mono mb-1">{new Date(ev.timestamp).toLocaleString()}</p>
                        <p className="text-sm font-medium text-slate-900">
                        {ev.type === 'creation' && 'Reporte creado'}
                        {ev.type === 'validation' && 'Validado por vecino'}
                        {ev.type === 'overdue' && 'INCUMPLIMIENTO REGISTRADO'}
                        {ev.type === 'resolved' && ev.note}
                        {ev.type === 'work_proof' && 'Prueba de Vida subida por Encargado'}
                        </p>
                    </div>
                    ))}
                </div>
            </div>

            <div className="h-20"></div> {/* Spacer */}
        </div>
        
        {/* Sticky Bottom Action */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200 flex gap-3 z-40 max-w-md mx-auto">
             {isOverdue ? (
                <Button onClick={handleHire} variant="secondary" fullWidth className="shadow-lg shadow-indigo-200">
                    <ExternalLink size={18} /> Buscar Solver
                </Button>
            ) : (
                <Button variant="outline" fullWidth disabled className="bg-slate-100 text-slate-400 border-transparent">
                    {ticket.status === TicketStatus.RESOLVED ? 'Esperando Cierre' : 'En proceso...'}
                </Button>
            )}
        </div>
    </PageContainer>
  );
};

// --- Validation Feed (Functional) ---
export const ValidationFeed: React.FC = () => {
  const navigate = useNavigate();
  const { tickets, validateTicket } = useAppContext();
  
  // Find tickets needing validation (not mine logic omitted for MVP)
  const queue = tickets.filter(t => t.status === TicketStatus.PENDING_VALIDATION);
  const ticket = queue[0]; // Just take first one

  if (!ticket) {
      return (
          <div className="h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
              <CheckCircle2 size={48} className="text-emerald-500 mb-4" />
              <h2 className="text-2xl font-bold">¡Estás al día!</h2>
              <p className="text-slate-400 mb-6">No hay reportes pendientes de validación en tu edificio.</p>
              <Button onClick={() => navigate(-1)} variant="outline" className="text-white border-white/20">Volver</Button>
          </div>
      )
  }

  const handleVote = (isValid: boolean) => {
      validateTicket(ticket.id, isValid);
      // For demo purposes, validation is instant, so we might need to navigate away if list is empty
      // But React will re-render and if queue is empty show the success screen above
  }

  return (
    <div className="h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 pt-12 z-30 flex justify-between items-center text-white/90">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"><XCircle /></button>
        <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <span className="text-xs font-bold uppercase tracking-widest">Zona de Fiscalización</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 relative">
        <img src={ticket.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Validate" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-28 text-white z-20">
          
          <div className="flex items-center gap-2 mb-4">
             <div className="bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded uppercase">Validación Pendiente</div>
             <div className="bg-white/20 backdrop-blur text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1"><MapPin size={10} /> {ticket.location}</div>
          </div>

          <h2 className="text-3xl font-bold mb-3 leading-tight">{ticket.title}</h2>
          <p className="text-base text-gray-200 mb-8 font-light border-l-2 border-yellow-500 pl-4">
            {ticket.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
             <button onClick={() => handleVote(false)} className="h-16 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
                <ThumbsDown className="text-rose-400" />
                <span className="text-sm font-bold">Descartar</span>
             </button>
             <button onClick={() => handleVote(true)} className="h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] active:scale-95 transition-transform">
                <ThumbsUp size={24} />
                <span className="text-sm font-bold">Validar Real</span>
             </button>
          </div>
          <p className="text-center text-[10px] text-gray-500 mt-6 uppercase tracking-widest">
             {/* Demo tweak: Make it seem like your vote is the final one */}
            Falta 1 voto para activar SLA
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Bitacora (Blockchain Style) ---
export const Bitacora: React.FC = () => {
    const navigate = useNavigate();
    const { tickets } = useAppContext();
    const bitacoraItems = tickets.filter(t => t.status === TicketStatus.OVERDUE || t.status === TicketStatus.RESOLVED || t.status === TicketStatus.EXTERNAL);

    return (
        <PageContainer>
            <SectionHeader title="Bitácora Legal" />
            <div className="px-6">
                <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl mb-8 shadow-xl shadow-slate-900/20 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                    
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500">Hash de Integridad</p>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                    </div>
                    <p className="font-mono text-xs break-all text-emerald-400 bg-black/30 p-3 rounded-lg border border-white/5">
                        0x7d3a8f91b2c3d4e5f6...
                    </p>
                </div>

                <div className="relative border-l border-slate-200 ml-3 space-y-8">
                    {bitacoraItems.length === 0 && <p className="text-slate-400 text-sm pl-6">No hay registros legales aún.</p>}
                    {bitacoraItems.map(t => (
                        <div key={t.id} onClick={() => navigate(`/app/bitacora/${t.id}`)} className="pl-6 relative group cursor-pointer">
                            <div className="absolute -left-1.5 top-0 w-3 h-3 bg-slate-200 rounded-full border-2 border-slate-50 group-hover:bg-blue-600 group-hover:scale-125 transition-all"></div>
                            
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm group-hover:shadow-md group-hover:border-blue-100 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${t.status === TicketStatus.OVERDUE ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                                        {t.status === TicketStatus.OVERDUE ? 'INCUMPLIMIENTO' : 'RESOLUCIÓN'}
                                    </span>
                                    <span className="font-mono text-[10px] text-slate-400">{new Date(t.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="font-bold text-sm text-slate-900 mb-1">{t.title}</h3>
                                <div className="flex items-center gap-1 text-[10px] text-blue-600 font-medium mt-2">
                                    Ver Evidencia <ExternalLink size={10} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageContainer>
    )
}

// --- Bitacora Detail ---
export const BitacoraDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tickets } = useAppContext();
    const ticket = tickets.find(t => t.id === id);

    if(!ticket) return null;

    return (
        <PageContainer>
             <div className="sticky top-0 bg-slate-900 text-white z-20 px-6 pt-12 pb-6 rounded-b-3xl shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                        <ChevronRight className="rotate-180 text-white" size={24} />
                    </button>
                    <h1 className="text-xl font-bold">Registro #B-{ticket.id}</h1>
                </div>
                
                <div className="bg-black/30 p-4 rounded-xl border border-white/10 font-mono text-xs text-emerald-400 break-all">
                    Hash: 0x8f1...a2b9c8d7e6f5g4h3i2j1k0l9m8n7o6p5
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Evento</p>
                    <h2 className="text-xl font-bold text-slate-900">{ticket.title}</h2>
                    <p className="text-slate-600 mt-2 text-sm">{ticket.description}</p>
                </div>

                 <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                         <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Fecha</p>
                         <p className="font-bold text-slate-900">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                     </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                         <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Estado Final</p>
                         <StatusBadge status={ticket.status} />
                     </div>
                 </div>

                 <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Evidencia Blockchain</p>
                    <div className="relative pl-4 border-l-2 border-slate-200 space-y-6">
                        {ticket.evidenceHistory.map((ev, i) => (
                             <div key={i} className="relative">
                                 <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-slate-400 border-2 border-slate-50"></div>
                                 <p className="text-xs text-slate-400 font-mono mb-1">{new Date(ev.timestamp).toLocaleString()}</p>
                                 <p className="text-sm font-bold text-slate-900 capitalize">{ev.type.replace('_', ' ')}</p>
                                 {ev.hash && <p className="text-[10px] font-mono text-slate-500 mt-1 bg-slate-100 p-1 rounded w-fit">{ev.hash}</p>}
                             </div>
                        ))}
                    </div>
                 </div>
            </div>
        </PageContainer>
    )
}

// --- User Profile ---
export const UserProfile: React.FC = () => {
    const navigate = useNavigate();
    const { user, resetApp } = useAppContext();

    return (
        <PageContainer>
             <div className="px-6 pt-12 pb-8">
                 <h1 className="text-3xl font-bold text-slate-900">Perfil</h1>
             </div>
             
             <div className="px-6">
                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 mb-8 relative overflow-hidden">
                     <div className="absolute right-0 top-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -z-0"></div>
                     <div className="w-20 h-20 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-slate-900/20 relative z-10">
                         {user.name.charAt(0)}
                     </div>
                     <div className="relative z-10">
                         <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                         <p className="text-sm text-slate-500">Unidad {user.unit} • {user.role}</p>
                         <div className="flex items-center gap-1 mt-2 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit font-bold">
                             <CheckCircle2 size={10} /> Identidad Verificada
                         </div>
                     </div>
                 </div>

                 <div className="space-y-3">
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 pl-2">General</div>
                     
                     <button onClick={() => navigate('/app/building')} className="w-full bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600"><Settings size={20}/></div>
                            <span className="font-medium text-sm text-slate-700">Consorcio</span>
                        </div>
                        <ChevronRight size={18} className="text-slate-300" />
                     </button>
                     
                     <button className="w-full bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600"><Bell size={20}/></div>
                            <span className="font-medium text-sm text-slate-700">Notificaciones</span>
                        </div>
                        <ChevronRight size={18} className="text-slate-300" />
                     </button>

                     <button onClick={resetApp} className="w-full bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center hover:border-rose-200 transition-colors mt-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600"><RefreshCcw size={20}/></div>
                            <span className="font-medium text-sm text-slate-700">Resetear App (Demo)</span>
                        </div>
                     </button>
                 </div>
             </div>
        </PageContainer>
    )
}

// --- External Solvers ---
export const ExternalSolvers: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { hireSolver } = useAppContext();

  const handleHire = (solverId: string) => {
      if(id) {
          hireSolver(id);
          navigate(`/app/tickets/${id}`);
      }
  }

  return (
    <PageContainer>
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-20 px-6 pt-12 pb-4 border-b border-slate-200/50 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100">
            <ChevronRight className="rotate-180 text-slate-400" size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Solvers Disponibles</h1>
      </div>

      <div className="p-6 space-y-4">
        {MOCK_SOLVERS.map(solver => (
           <div key={solver.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
               <img src={solver.avatar} className="w-14 h-14 rounded-full object-cover bg-slate-200" alt={solver.name} />
               <div className="flex-1">
                   <div className="flex justify-between items-start mb-1">
                       <h3 className="font-bold text-slate-900">{solver.name}</h3>
                       <div className="flex items-center text-xs font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">
                           ★ {solver.rating}
                       </div>
                   </div>
                   <p className="text-xs text-slate-500 mb-2">{solver.profession}</p>
                   <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-bold text-slate-900">{solver.priceEstimate}</span>
                        <Button onClick={() => handleHire(solver.id)} size="sm" variant="secondary" className="px-4 py-2 h-auto text-xs">Contratar</Button>
                   </div>
               </div>
           </div>
        ))}
      </div>
    </PageContainer>
  );
};

// --- Building Info ---
export const BuildingInfo: React.FC = () => {
    const navigate = useNavigate();
    return (
        <PageContainer>
             <div className="sticky top-0 bg-white/90 backdrop-blur-md z-20 px-6 pt-12 pb-4 border-b border-slate-200/50 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100">
                    <ChevronRight className="rotate-180 text-slate-400" size={24} />
                </button>
                <h1 className="text-xl font-bold text-slate-900">Mi Consorcio</h1>
            </div>

            <div className="p-6 space-y-6">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-md relative">
                    <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" className="w-full h-full object-cover" alt="Building" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                        <h2 className="font-bold text-lg">Av. Libertador 2400</h2>
                        <p className="text-sm opacity-90">Belgrano, Buenos Aires</p>
                    </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl shadow-slate-900/20">
                     <h3 className="font-bold mb-4 flex items-center gap-2"><Shield size={18} className="text-blue-400"/> Administración</h3>
                     <div className="space-y-4 text-sm">
                         <div className="flex justify-between border-b border-white/10 pb-2">
                             <span className="text-slate-400">Administrador</span>
                             <span className="font-medium">Carlos López</span>
                         </div>
                         <div className="flex justify-between border-b border-white/10 pb-2">
                             <span className="text-slate-400">Teléfono</span>
                             <span className="font-medium text-blue-300">11 5555-1234</span>
                         </div>
                         <div className="flex justify-between">
                             <span className="text-slate-400">Email</span>
                             <span className="font-medium text-blue-300">admin@libertador2400.com</span>
                         </div>
                     </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                        <p className="text-3xl font-bold text-slate-900 mb-1">32</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Unidades</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                        <p className="text-3xl font-bold text-slate-900 mb-1">95%</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">SLA Cumplido</p>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}