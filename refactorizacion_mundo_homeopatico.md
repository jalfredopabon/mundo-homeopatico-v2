
## [2026-04-13] Auditoría Forense y Hitos Recuperados

### Hitos Técnicos Logrados (Rescate)
1.  **Pipeline de Datos Real:** Se logró la conexión exitosa con Google Apps Script, extrayendo 450+ productos y 220+ protocolos en tiempo real.
2.  **Motor de Vistas Dual:** Implementación de un conmutador (Switcher) que alterna entre Medicamentos y Protocolos sin recargar la página.
3.  **Salto Maestro (Master Jump):** Lógica funcional para saltar desde un protocolo directamente a la ficha técnica de un medicamento.
4.  **Filtros Globales:** Sincronización de búsqueda y filtrado por terapia, sistema y forma farmacéutica para ambas vistas.

### Informe Forense de Latencia (El "Gran Pero")
- **Bloqueo de SSR:** Al usar `await fetch` en el frontmatter de Astro, el servidor retrasaba la entrega del HTML hasta que Google Sheets terminaba de responder (latencia de red).
- **DOM Bloat:** La inyección de 1.5MB de datos crudos en el pie de página incrementaba el tiempo de parseo del navegador, causando el congelamiento de la UI.
- **Listeners Acumulados:** La lógica de sincronización de eventos de autenticación en el Header estaba creando una sobrecarga en el hilo principal durante las transiciones de Astro.

## Próximos Pasos (Reconstrucción Elite)
1.  **Capa de Hidratación Asíncrona:** Reintroducir los protocolos pero cargándolos desde el cliente *post-mount*.
2.  **Zero-Blocking Header:** Refactorizar la autenticación para que no dependa de listeners globales pesados.
3.  **Virtualización de Fichas:** En lugar de renderizar 400 fichas ocultas, renderizar solo la seleccionada bajo demanda.
