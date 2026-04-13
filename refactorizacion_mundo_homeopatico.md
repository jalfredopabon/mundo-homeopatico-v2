# Refactorización Mundo Homeopático v2 - Bitácora de Estabilidad

## [2026-04-13] Reinicio de Estabilidad y Rendimiento "Elite"
- **Punto de Partida:** Commit `e9e123b` (Estructura base rápida).
- **Diagnóstico:** Se identificó que la carga masiva de datos (1.5MB) vía servidor (SSR) bloqueaba el hilo principal, causando demoras de hasta 10 segundos en la navegación.
- **Estrategia Proyectada:** 
    1. Mantener el HTML inicial ultra-ligero.
    2. Cargar los datos reales vía `fetch` desde el cliente una vez la página esté lista.
    3. Recuperar la funcionalidad de **Protocolos** y **Salto Maestro** con esta nueva arquitectura de alto rendimiento.

## Decálogo de Rendimiento
- Ningún archivo de página debe superar los 50KB de HTML inicial.
- Los datos masivos se cargan de forma asíncrona.
- El botón "Soy médico" debe responder en menos de 100ms.
