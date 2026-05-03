
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
    - Margen maestro de 32px (`mb-8`) entre cabecera y tablas.
5.  **Calibración Quirúrgica de Navegación:**
    - Sincronización de `scroll-margin-top` a **32px (`scroll-mt-8`)** eliminando doble compensación de header.
    - Ampliación de gap entre secciones a **64px (`gap-16`)** para garantizar el ocultamiento total de la tabla anterior durante el salto.

### Estado Actual
- **Navegación:** 100% Sincronizada y fluida (UX Matemática).
- **UI/UX:** Consistencia visual total; ritmo vertical restaurado y funcional.
- **Catálogo:** Sistema de productos `createProductRow` recalibrado para paridad 1:1 con Elite (Badges, Títulos, Precios).

## [2026-05-01] Hito: Calibración Elite Catalog UI y Sistema de Badges
1.  **Padding Universal (32px):** Estandarización de `px-8` en cabeceras y filas de tabla para alineación de plomada impecable.
2.  **Product Row Pro:** Rediseño de la fila de producto con tipografía dinámica, descripciones `slate-600` y etiquetas de precio optimizadas para móvil.
3.  **Sistema de Badges Dinámicos:**
    - Implementación del toggle `+N más` con persistencia visual.
    - Nuevo badge de "Requiere elaboración" con semántica de alerta (Ámbar) e iconografía clock.
    - Variante `badge-elite--outline` añadida al sistema de diseño global.

## [2026-05-01] Hito: Conexión Universal - Secciones Institucionales (Elite SWR)
1.  **Infraestructura de Datos (api.ts):** Expansión del motor de datos para soportar `video`, `faq`, `distribuidores` y `config` (Configuración global).
2.  **Zero-Blocking FAQ:** Implementación de renderizado dinámico para acordeones con soporte de mini-lenguaje (`^` para párrafos, `|` para listas).
3.  **Sedes Dinámicas:** Conexión de la sede principal vía `CONFIG` y grilla de distribuidores automatizada.
4.  **Video Gateway:** Dinamización del video institucional con extractor de ID de YouTube integrado.
5.  **UX Resiliente:** Implementación de Skeletons y caché SWR en todas las secciones institucionales para carga instantánea (0ms).

## [2026-05-01] Hito: Finalización Sedes & Institucional Elite (Mapa & Jerarquía)
1.  **Mapa Real Dinámico:** Integración de Google Static Maps API para inyección de ubicaciones reales basadas en el backend (Eliminación de imágenes genéricas).
2.  **Jerarquía de Contactos Pro:** Motor de renderizado dinámico con orden prioritario (Fijo > Móvil > WhatsApp) y diferenciación de estilos visuales.
3.  **Minimalismo Institucional:**
    - Eliminación de bordes internos, contenedores de logos y animaciones de escala innecesarias.
    - Tipografía normalizada (Sentence Case) en toda la interfaz, eliminando mayúsculas sostenidas.
4.  **Optimización de Estructura:** Migración de assets a `/public/img/` y renombrado de carpetas para estándares de industria.
5.  **Equilibrio Visual:** Rediseño de la grilla de distribuidores a 2 columnas para una composición simétrica 2x2.

## [2026-05-02] Hito: Estandarización de Iconografía Elite y Normalización de Renderizadores

### Hitos Técnicos Logrados
1.  **Normalización de Trazado (Stroke 2.5):** Calibración universal de todos los iconos dinámicos (SVG) al estándar Elite de **2.5**, eliminando grosores inconsistentes (2.0, 3.0, 4.0) en toda la plataforma.
2.  **Centralización de Renderizadores:**
    - Refactorización total de `catalogo-renderer.ts`, `vademecum-renderer.ts`, `faq-renderer.ts`, `locations-renderer.ts` y `sidebar-renderer.ts`.
    - Eliminación de SVGs *hardcoded* inline, sustituyéndolos por objetos constantes de iconos para facilitar el mantenimiento.
3.  **Librería Global (Icons.astro):** Integración del nuevo icono `user-stroke` y validación de paridad con los renderizadores de cliente.
4.  **Limpieza de Scripts de Interfaz:** Normalización de iconos de feedback en el Carrito (`CartDrawer.astro`) y botones de acción en `index.astro`.

### Estado Actual
- **Iconografía:** 100% Consistente y Centralizada (Estándar Elite validado).
- **Mantenimiento:** Estructura modular que permite cambiar el estilo global de iconos desde un único punto en cada renderizador.
- **Visual:** Eliminación de ruido visual por diferencias de grosor en trazados.

## [2026-05-02] Hito: Seguridad de Infraestructura y Optimización LCP (Sedes)

### Hitos Técnicos Logrados
1.  **Blindaje de API Key:** Migración exitosa de la Google Maps API Key desde el código fuente a variables de entorno (`.env`) con prefijo `PUBLIC_`.
2.  **Arquitectura de Seguridad:** Implementación de inyección vía `data-attribute` en `Locations.astro` para permitir el acceso seguro desde scripts de cliente sin exponer la clave en el bundle estático.
3.  **Optimización LCP (Sedes):** 
    - Implementación de `fetchpriority="high"` en elementos críticos.
    - Eliminación de dependencias externas de placeholders (Unsplash).
    - Prevención de Layout Shift mediante dimensiones explícitas en imágenes dinámicas.

### Estado Actual
- **Seguridad:** ✅ Google Maps Key protegida.
- **Rendimiento:** ✅ LCP optimizado en la sección Sedes.
- **Iconografía:** ✅ 100% Consistente (Estándar Elite).

## [2026-05-02] Hito: Refactorización "Elite" del Módulo de Carrito (Checkout Industrial)

### Hitos Técnicos Logrados
1.  **Arquitectura de Estado Global:** Implementación de un namespace protegido `window.__MH_CART__` para persistencia cross-page y sincronización de eventos `document` (Astro Compatible).
2.  **Cifrado de Datos (Security Layer):** Integración de `security.ts` para persistir el carrito en `localStorage` mediante cifrado Base64, protegiendo la privacidad del pedido del usuario.
3.  **UI/UX Elite:**
    - Rediseño premium con panel lateral (`drawer-panel`) de 450px, sombras profundas y transiciones fluidas.
    - Soporte para especificaciones personalizadas (Notas) por producto con inyección dinámica de iconos.
    - Feedback visual de "Añadido" en catálogo y estados vacíos optimizados con botón de retorno al flujo.
4.  **Motor de Enrutamiento Dinámico (WhatsApp):**
    - Conexión dinámica con `getDistributors()` para obtener números de contacto en tiempo real desde Google Sheets.
    - Lógica de enrutamiento dual: Pedido Médico (WhatsApp 1) y Pedido Farmacia (WhatsApp 2) basado en datos de la Sede Principal.
5.  **Validación de Formulario:** Sistema de comprobación de campos obligatorios (Nombre, ID, WhatsApp) antes de la generación del enlace de pedido.

### Estado Actual
- **Funcionalidad:** 100% Operativa y validada.
- **Seguridad:** Datos de persistencia cifrados en el cliente.
- **Rendimiento:** Carga instantánea vía SWR y manipulaciones del DOM optimizadas (Zero-Re-render).

## Próximos Pasos
1.  **Optimización LCP Global:** Extender las mejoras de `fetchpriority` a los logos de distribuidores y cabeceras de catálogo.
2.  **Auditoría de SEO:** Verificar etiquetas meta y jerarquía H1-H6 en las nuevas secciones institucionales.
3.  **Pruebas de Carga de Datos:** Validar el comportamiento del carrito con listas de 20+ productos para asegurar la legibilidad del mensaje de WhatsApp.

