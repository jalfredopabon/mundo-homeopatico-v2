
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

## [2026-04-28] Hito: Vademécum Elite - Paridad Visual Total

### Hitos Técnicos Logrados
1.  **Clonación Estricta Online:** Se logró paridad visual 1:1 con la versión de producción para tarjetas de producto, protocolos y columna editorial.
2.  **Motor de Renderizado Dinámico:** Implementación en `vademecum-renderer.ts` para inyección de HTML premium bajo demanda (Zero-Blocking).
3.  **Simplificación de UI (Professional Tool):** Refactorización del Header eliminando saludos, migas de pan y descripciones redundantes. Reubicación del Switcher al inicio del contexto.
4.  **Sistema de Badges Inteligentes:** Clasificación automática por color para Terapia, Sistema y Forma Farmacéutica.
4.  **Optimización PostCSS:** Resolución de errores críticos de compilación local mediante el uso de `color-mix` nativo en lugar de utilidades Tailwind no configuradas.
5.  **Interconectividad:** Restauración del "Salto Maestro" que vincula protocolos clínicos con fichas de producto individuales.

### Estado Actual
- **UI/UX:** 100% Funcional y Premium.
- **Data:** Integrada con Google Sheets vía `api.ts`.
- **Rendimiento:** Carga asíncrona validada sin bloqueos de DOM.

## [2026-04-29] Hito: Backend Universal y Catálogo Dinámico Elite

### Hitos Técnicos Logrados
1.  **Gateway Universal (GAS):** Consolidación del backend en una única función `doGet` para servir múltiples hojas (Maestro, Protocolos, Navegación, Precios).
2.  **Esquemas Flexibles:** Implementación de validación Zod para encabezados dinámicos, permitiendo configurar columnas de tabla desde Google Sheets.
3.  **Navegación de Nivel 2:** Refactorización de `SidebarCatalogo.astro` para soportar vínculos directos a subcategorías y blindaje contra datos nulos.
4.  **Visibilidad Granular:** Control de publicación de productos desde el backend mediante una columna de "estado".

### Estado Actual
- **Infraestructura:** 100% Dinámica.
- **Mantenimiento:** Bajo (todo se gestiona desde Sheets).
- **Paridad Visual:** 1:1 con diseño Elite.

## [2026-04-30] Hito: Estandarización Elite y Alineación Quirúrgica (Sidebar & UI)

### Hitos Técnicos Logrados
1.  **Sincronización de Plomada (Master Line):** Establecimiento de la línea maestra a los **23px** (iconos/check) y **48px** (texto) en todos los sidebars.
2.  **Paridad Estricta de Sidebars:** Refactorización de Vademécum: 12px Sentence Case, eliminación de bordes y negrillas redundantes.
3.  **Calibración de Alertas:** Banner informativo a Naranja (`orange-500`) para contraste de seguridad.
4.  **Refinamiento de Espaciado Profesional:**
    - Reversión de paddings excesivos (100px) a un estándar de **32px** funcional.
    - Restauración de jerarquía vertical en cabeceras de catálogo: Gaps de 8px entre Breadcrumbs > Título > Descripción.
    - Margen maestro de 32px (`mb-8`) entre cabecera y tablas para evitar colisiones visuales.

### Estado Actual
- **Navegación:** 100% Sincronizada entre páginas.
- **UI/UX:** Consistencia visual total; ritmo vertical restaurado y funcional.

## Próximos Pasos
1.  **Refactorización de Checkout:** Aplicar el mismo estándar "Elite" al flujo de carrito y pedidos.
2.  **Dashboard de Usuario:** Sincronización de perfiles médicos con el nuevo diseño.
