# Architecture

## Estructura del Proyecto
Aplicación React (SPA) construida con Vite.

### Directorios
- `components/`: Componentes reutilizables de UI y Layout.
- `context/`: Estado global de la aplicación (AppContext).
- `views/`: Vistas agrupadas por rol de usuario.
  - `Consorcista/`: Dashboard y flujos del vecino.
  - `Encargado/`: Gestión de tareas del encargado.
  - `Admin/`: Panel de control general.
  - `Solver/`: Interfaz para proveedores externos.
  - `Public/`: Landing, Login, Onboarding.

### Flujo de Datos
- **Estado Global**: `AppContext` maneja el estado de tickets, usuarios y autenticación simulada.
- **Routing**: `react-router-dom` con `HashRouter`. Rutas protegidas por rol en `App.tsx`.

### Modelado de Dominio (Types)
Ver `types.ts` para definiciones clave:
- `Role`: Roles de usuario.
- `Ticket`: Entidad central.
- `TicketStatus`: Máquina de estados del ticket (PENDING_VALIDATION -> ACTIVE -> RESOLVED -> CLOSED).

### Patrones
- **Layouts por Rol**: Cada perfil de usuario tiene un wrapper de layout específico (`Layout.tsx` maneja la navegación según `role`).
- **Container/Presenter**: Vistas (`views/`) actúan como contenedores que usan componentes de `components/`.
