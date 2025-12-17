import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ticket, TicketStatus, Urgency, Role } from '../types';
import { MOCK_TICKETS } from '../constants';

interface UserProfile {
  name: string;
  unit: string;
  role: Role;
}

interface AppContextType {
  tickets: Ticket[];
  user: UserProfile;
  addTicket: (title: string, description: string, category: string, location: string, image: string | null) => void;
  validateTicket: (id: string, isValid: boolean) => void;
  resolveTicket: (id: string) => void; // Encargado action
  hireSolver: (id: string) => void; // Admin/Consorcista action
  updateUserProfile: (name: string, unit: string, role: Role) => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or fall back to Mocks
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('ca_tickets');
    // For DEMO purposes, we will ensure MOCK_TICKETS is used if saved data is empty/weird
    // to guarantee there is something to show.
    if (saved) {
        try {
            return JSON.parse(saved, (key, value) => {
                if (key === 'createdAt' || key === 'deadlineAt' || key === 'timestamp') return new Date(value);
                return value;
            });
        } catch (e) {
            return MOCK_TICKETS;
        }
    }
    return MOCK_TICKETS;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ca_user');
    return saved ? JSON.parse(saved) : { name: 'Usuario Nuevo', unit: '4B', role: Role.CONSORCISTA };
  });

  // Persist on change
  useEffect(() => {
    localStorage.setItem('ca_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('ca_user', JSON.stringify(user));
  }, [user]);

  const addTicket = (title: string, description: string, category: string, location: string, image: string | null) => {
    const newTicket: Ticket = {
      id: `T-${Math.floor(Math.random() * 10000)}`,
      title,
      description,
      location,
      imageUrl: image || 'https://picsum.photos/400/300', // Fallback image
      status: TicketStatus.PENDING_VALIDATION,
      urgency: Urgency.LOW, // Default
      createdAt: new Date(),
      validations: 1, // Self vote
      requiredValidations: 3,
      author: user.unit,
      evidenceHistory: [
        { type: 'creation', timestamp: new Date(), user: user.name }
      ]
    };
    setTickets([newTicket, ...tickets]);
  };

  const validateTicket = (id: string, isValid: boolean) => {
    if (!isValid) return; // For MVP we only handle positive validation logic easily
    
    setTickets(prev => prev.map(t => {
      if (t.id !== id) return t;
      
      const newCount = t.validations + 1;
      let newStatus = t.status;
      const history = [...t.evidenceHistory, { type: 'validation', timestamp: new Date(), user: user.name } as any];

      // DEMO LOGIC: Make it loose. If it has 2 validations (like the mock one), 1 more makes it ACTIVE.
      // Or if it's the one we just created (1 val), allow it to pass quickly for demo speed?
      // Let's keep logic: >= required.
      if (newCount >= t.requiredValidations && t.status === TicketStatus.PENDING_VALIDATION) {
        newStatus = TicketStatus.ACTIVE;
      }

      return {
        ...t,
        validations: newCount,
        status: newStatus,
        evidenceHistory: history
      };
    }));
  };

  const resolveTicket = (id: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== id) return t;
      return {
        ...t,
        status: TicketStatus.RESOLVED,
        evidenceHistory: [...t.evidenceHistory, { type: 'work_proof', timestamp: new Date(), user: user.name }]
      };
    }));
  };

  const hireSolver = (id: string) => {
    setTickets(prev => prev.map(t => {
        if (t.id !== id) return t;
        return {
          ...t,
          status: TicketStatus.EXTERNAL,
          evidenceHistory: [...t.evidenceHistory, { type: 'resolved', timestamp: new Date(), note: 'External Solver Hired' }]
        };
      }));
  }

  const updateUserProfile = (name: string, unit: string, role: Role) => {
    setUser({ name, unit, role });
  };

  const resetApp = () => {
    localStorage.removeItem('ca_tickets');
    localStorage.removeItem('ca_user');
    window.location.reload();
  };

  return (
    <AppContext.Provider value={{ tickets, user, addTicket, validateTicket, resolveTicket, hireSolver, updateUserProfile, resetApp }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};