import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DevNav } from './components/DevNav';
import { AppProvider } from './context/AppContext';
import { Landing, Login, AuthVerify, Onboarding, OnboardingProfile, OnboardingSuccess } from './views/Public';
import { Dashboard, TicketList, TicketDetail, NewTicket, ValidationFeed, ExternalSolvers, Bitacora, BitacoraDetail, UserProfile, BuildingInfo } from './views/Consorcista';
import { EncargadoDashboard, EncargadoTaskDetail, EncargadoHistory } from './views/Encargado';
import { AdminDashboard, AdminTicketDetail, AdminReports } from './views/Admin';
import { SolverDashboard, SolverTaskDetail } from './views/Solver';
import { Role } from './types';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>(Role.CONSORCISTA);

  return (
    <AppProvider>
      <HashRouter>
        <DevNav />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/auth/verify" element={<AuthVerify />} />
          
          {/* Onboarding */}
          <Route path="/onboarding" element={<Onboarding setRole={setRole} />} />
          <Route path="/onboarding/profile" element={<OnboardingProfile />} />
          <Route path="/onboarding/success" element={<OnboardingSuccess />} />

          {/* Consorcista Routes */}
          <Route path="/app" element={<Layout role={Role.CONSORCISTA}><Dashboard /></Layout>} />
          <Route path="/app/tickets" element={<Layout role={Role.CONSORCISTA}><TicketList /></Layout>} />
          <Route path="/app/tickets/new" element={<NewTicket />} />
          <Route path="/app/tickets/:id" element={<Layout role={Role.CONSORCISTA}><TicketDetail /></Layout>} />
          <Route path="/app/tickets/:id/external" element={<Layout role={Role.CONSORCISTA}><ExternalSolvers /></Layout>} />
          <Route path="/app/validate" element={<ValidationFeed />} />
          <Route path="/app/bitacora" element={<Layout role={Role.CONSORCISTA}><Bitacora /></Layout>} />
          <Route path="/app/bitacora/:id" element={<Layout role={Role.CONSORCISTA}><BitacoraDetail /></Layout>} />
          <Route path="/app/profile" element={<Layout role={Role.CONSORCISTA}><UserProfile /></Layout>} />
          <Route path="/app/building" element={<Layout role={Role.CONSORCISTA}><BuildingInfo /></Layout>} />

          {/* Encargado Routes */}
          <Route path="/encargado" element={<Layout role={Role.ENCARGADO}><EncargadoDashboard /></Layout>} />
          <Route path="/encargado/tickets/:id" element={<Layout role={Role.ENCARGADO}><EncargadoTaskDetail /></Layout>} />
          <Route path="/encargado/history" element={<Layout role={Role.ENCARGADO}><EncargadoHistory /></Layout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Layout role={Role.ADMIN}><AdminDashboard /></Layout>} />
          <Route path="/admin/tickets/:id" element={<Layout role={Role.ADMIN}><AdminTicketDetail /></Layout>} />
          <Route path="/admin/reports" element={<Layout role={Role.ADMIN}><AdminReports /></Layout>} />

          {/* Solver Routes */}
          <Route path="/solvers" element={<Layout role={Role.SOLVER}><SolverDashboard /></Layout>} />
          <Route path="/solvers/tasks/:id" element={<Layout role={Role.SOLVER}><SolverTaskDetail /></Layout>} />

          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;