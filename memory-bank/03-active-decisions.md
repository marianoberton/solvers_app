# Active Decisions

## [2025-12-17] Inicialización del Memory Bank
- **Contexto**: Se requiere documentar el proyecto para mantener contexto persistente.
- **Decisión**: Crear estructura `memory-bank/` siguiendo las reglas del usuario.

## [2025-12-17] Fix de Entry Point
- **Contexto**: La aplicación mostraba pantalla blanca al inicio.
- **Decisión**: Se agregó `<script type="module" src="/index.tsx"></script>` en `index.html`.
- **Rationale**: Vite requiere la inyección explícita del módulo de entrada en el HTML si no se usa un plugin que lo inyecte automáticamente de otra forma.
- **Cambio Adicional**: Se eliminó `<script type="importmap">` que estaba presente en `index.html` ya que entraba en conflicto o era redundante con el manejo de dependencias de Vite/NPM.

## Convenciones (Do/Don't)
- **Do**: Usar `TodoWrite` para tareas complejas.
- **Do**: Mantener componentes pequeños y funcionales.
- **Don't**: Hardcodear textos largos en componentes (usar constantes o i18n futuro).
