import { Ticket, TicketStatus, Urgency, Solver } from './types';

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'T-1024',
    title: 'Luz quemada Palier 4to Piso',
    description: 'La luz parpadea y se apagó, zona oscura peligrosa.',
    location: 'Torre A - Piso 4',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    status: TicketStatus.PENDING_VALIDATION,
    urgency: Urgency.LOW,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    validations: 1,
    requiredValidations: 3,
    author: 'Unidad 4B',
    evidenceHistory: [
      { type: 'creation', timestamp: new Date(Date.now() - 1000 * 60 * 30), user: 'Unidad 4B' }
    ]
  },
  {
    id: 'T-0998',
    title: 'Filtración en Cochera',
    description: 'Gotea agua sobre el auto de la cochera 12. Olor a humedad.',
    location: 'Subsuelo 1',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    status: TicketStatus.ACTIVE,
    urgency: Urgency.HIGH,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    deadlineAt: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours left
    validations: 5,
    requiredValidations: 3,
    author: 'Unidad 2A',
    evidenceHistory: [
      { type: 'creation', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { type: 'validation', timestamp: new Date(Date.now() - 1000 * 60 * 50) }
    ]
  },
  {
    id: 'T-0850',
    title: 'Puerta de entrada no cierra',
    description: 'El imán de la puerta principal no traba. Seguridad comprometida.',
    location: 'PB - Acceso',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    status: TicketStatus.OVERDUE,
    urgency: Urgency.HIGH,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
    deadlineAt: new Date(Date.now() - 1000 * 60 * 60 * 20), // Overdue by 20 hours
    validations: 12,
    requiredValidations: 3,
    author: 'Unidad 8C',
    evidenceHistory: [
      { type: 'creation', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
      { type: 'overdue', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20), hash: '0x8f1...a2b' }
    ]
  }
];

export const MOCK_SOLVERS: Solver[] = [
  {
    id: 'S-1',
    name: 'Jorge Martínez',
    profession: 'Encargado Edificio Lindero',
    rating: 4.9,
    distance: '50m',
    priceEstimate: '$15.000',
    avatar: 'https://picsum.photos/100/100?random=10'
  },
  {
    id: 'S-2',
    name: 'ElectroFast SA',
    profession: 'Electricista Matriculado',
    rating: 4.5,
    distance: '1.2km',
    priceEstimate: '$35.000',
    avatar: 'https://picsum.photos/100/100?random=11'
  }
];