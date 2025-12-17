import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer, SectionHeader, StatusBadge, Button } from '../components/ui';
import { MOCK_TICKETS } from '../constants';
import { TicketStatus } from '../types';
import { Shield, FileText, Download, CheckSquare, ChevronRight, AlertTriangle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const urgentTickets = MOCK_TICKETS.filter(t => t.status === TicketStatus.OVERDUE);
  const activeTickets = MOCK_TICKETS.filter(t => t.status === TicketStatus.ACTIVE);

  return (
    <PageContainer>
      <header className="bg-purple-900 text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
             <h1 className="text-2xl font-bold">Panel Administración</h1>
             <Shield className="text-purple-300" />
        </div>
        <p className="opacity-80 text-sm mt-1">Resumen del Consorcio Av. Libertador 2400</p>
        
        <div className="mt-6 flex gap-4">
             <div className="bg-white/10 backdrop-blur p-3 rounded-xl flex-1 border border-white/20">
                <span className="block text-2xl font-bold text-red-300">{urgentTickets.length}</span>
                <span className="text-xs opacity-75">SLA Vencidos</span>
             </div>
             <div onClick={() => navigate('/admin/reports')} className="bg-white/10 backdrop-blur p-3 rounded-xl flex-1 border border-white/20 cursor-pointer hover:bg-white/20">
                <span className="block text-2xl font-bold"><FileText size={24}/></span>
                <span className="text-xs opacity-75">Ver Reportes</span>
             </div>
        </div>
      </header>

      <SectionHeader title="Atención Requerida" />
      <div className="px-4 space-y-3">
        {urgentTickets.map(t => (
            <div key={t.id} onClick={() => navigate(`/admin/tickets/${t.id}`)} className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-sm">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-red-600 flex items-center gap-1"><AlertTriangle size={12}/> INCUMPLIMIENTO</span>
                    <span className="text-xs text-gray-400">{t.id}</span>
                </div>
                <h3 className="font-bold text-gray-900">{t.title}</h3>
                <p className="text-xs text-gray-500 mt-1">El encargado no resolvió en tiempo.</p>
                <div className="mt-3 flex justify-end">
                    <button className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg">Gestionar Incidente</button>
                </div>
            </div>
        ))}
      </div>

      <SectionHeader title="Activos" />
      <div className="px-4 space-y-3">
        {activeTickets.map(t => (
            <div key={t.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between">
                    <h3 className="font-bold text-sm text-gray-900">{t.title}</h3>
                    <StatusBadge status={t.status} />
                </div>
                <p className="text-xs text-gray-500 mt-1">Vence: 18:00hs</p>
            </div>
        ))}
      </div>
    </PageContainer>
  );
};

export const AdminTicketDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const t = MOCK_TICKETS.find(t => t.id === id) || MOCK_TICKETS[0];

    return (
        <PageContainer>
             <div className="bg-white p-4 border-b border-gray-100 sticky top-0 flex items-center gap-2">
                <button onClick={() => navigate(-1)}><ChevronRight className="rotate-180 text-gray-600" /></button>
                <h1 className="font-bold text-lg">Detalle Admin {t.id}</h1>
            </div>
            <div className="p-4 space-y-6">
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-red-900">
                    <h3 className="font-bold flex items-center gap-2"><AlertTriangle size={18}/> Incumplimiento Detectado</h3>
                    <p className="text-sm mt-1">Este ticket ha generado un registro negativo automático en el legajo del encargado.</p>
                    <Button size="sm" variant="outline" className="mt-3 bg-white border-red-200 text-red-700 w-full">Descargar Evidencia Legal</Button>
                </div>

                <div>
                    <h3 className="font-bold mb-2">Información</h3>
                    <p className="text-sm text-gray-600"><span className="font-bold">Vecino:</span> {t.author}</p>
                    <p className="text-sm text-gray-600"><span className="font-bold">Lugar:</span> {t.location}</p>
                </div>

                <div>
                    <h3 className="font-bold mb-2">Acciones Administrativas</h3>
                    <div className="space-y-2">
                        <Button variant="secondary" fullWidth>Marcar como Visto</Button>
                        <Button variant="outline" fullWidth>Enviar Nota a Encargado</Button>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export const AdminReports: React.FC = () => {
    const navigate = useNavigate();
    return (
        <PageContainer>
             <div className="bg-white p-4 border-b border-gray-100 sticky top-0 flex items-center gap-2">
                <button onClick={() => navigate(-1)}><ChevronRight className="rotate-180 text-gray-600" /></button>
                <h1 className="font-bold text-lg">Reportes Mensuales</h1>
            </div>
            <div className="p-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 mb-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold">Octubre 2023</h3>
                        <p className="text-xs text-gray-500">23 Incidentes • 4 Incumplimientos</p>
                    </div>
                    <Download className="text-gray-400" />
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 mb-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold">Septiembre 2023</h3>
                        <p className="text-xs text-gray-500">18 Incidentes • 0 Incumplimientos</p>
                    </div>
                    <Download className="text-gray-400" />
                </div>
            </div>
        </PageContainer>
    )
}