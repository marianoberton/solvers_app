export enum Role {
  CONSORCISTA = 'CONSORCISTA',
  ENCARGADO = 'ENCARGADO',
  ADMIN = 'ADMIN',
  SOLVER = 'SOLVER'
}

export enum TicketStatus {
  PENDING_VALIDATION = 'Pendiente Validación', // Waiting for neighbors
  ACTIVE = 'Activo', // SLA running
  OVERDUE = 'Vencido', // SLA breached
  RESOLVED = 'Resuelto', // Fixed by Encargado
  CLOSED = 'Cerrado', // Confirmed by neighbors
  EXTERNAL = 'Externo' // Solver assigned
}

export enum Urgency {
  LOW = 'Baja', // 24h
  MEDIUM = 'Media', // 12h
  HIGH = 'Alta' // 4h
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  status: TicketStatus;
  urgency: Urgency;
  createdAt: Date;
  deadlineAt?: Date;
  validations: number;
  requiredValidations: number;
  author: string;
  evidenceHistory: Array<{
    type: 'creation' | 'validation' | 'overdue' | 'work_proof' | 'resolved';
    timestamp: Date;
    note?: string;
    user?: string;
    hash?: string; // For bitacora
  }>;
}

export interface Solver {
  id: string;
  name: string;
  rating: number;
  distance: string;
  profession: string;
  priceEstimate: string;
  avatar: string;
}