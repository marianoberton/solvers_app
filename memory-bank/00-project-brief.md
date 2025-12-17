# Project Brief: Consorcio Activo

## Objetivo
Plataforma de gestión colaborativa para consorcios que empodera a los vecinos para reportar, validar y supervisar el mantenimiento del edificio. Busca transparencia en la gestión de reclamos y eficiencia en la resolución de problemas mediante un sistema de validación comunitaria y SLAs.

## Usuarios Principales
1. **Consorcista (Vecino)**: Reporta problemas, valida reportes de otros, confirma resoluciones.
2. **Encargado**: Recibe tareas validadas, marca progreso y resolución.
3. **Administrador**: Supervisa métricas, reportes y gestión global.
4. **Solver (Externo)**: Profesional contratado para problemas que exceden al encargado o plazos vencidos.

## Alcance (Core Features)
- **Sistema de Tickets**: Ciclo de vida completo (Creación -> Validación -> Activo -> Resuelto -> Cerrado).
- **Validación Comunitaria**: Mecanismo para evitar reclamos falsos o duplicados; requiere "votos" de vecinos.
- **SLA & Escalabilidad**: Tiempos de resolución definidos por urgencia. Escalado automático a proveedores externos si vence el plazo.
- **Bitácora (Blockchain-like)**: Registro inmutable de evidencias (fotos, timestamps).

## No-Objetivos (Por ahora)
- Pagos de expensas (foco en mantenimiento).
- Chat libre entre vecinos (foco en tickets estructurados).
