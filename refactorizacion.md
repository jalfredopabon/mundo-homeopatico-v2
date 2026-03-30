# Filosofía de Construcción: Mundo Homeopático v2

> **REGLA DE ORO:** Este proyecto se construye bajo el paradigma de "Lego-Architecture". Todo elemento visual o lógico debe ser modular, escalable y basado estrictamente en estándares de desarrollo de software moderno.

## 🛡️ Principios Innegociables
1. **Modularización:** Ninguna página maestra (`.astro`) debe contener lógica compleja o bloques extensos de HTML. Todo debe extraerse a componentes (`src/components/`).
2. **Tokenización:** Prohibido el uso de colores hexadecimales o valores mágicos (dimensiones inline) fuera de `tailwind.config.mjs` y `:root`.
3. **Estandarización Iconográfica:** Uso exclusivo y obligatorio del componente centralizado `Icons.astro`. No se permiten SVGs inline en el código.
4. **Respeto a las Buenas Prácticas:** Se prioriza la legibilidad, mantenibilidad y el rendimiento por encima de la velocidad de entrega. Si un patrón se repite 3 veces, se globaliza en `global.css`.

---

# Bitácora de Refactorización y Blindaje

## 🗓️ Hitos del Proyecto

### Hito 1: Cimentación y Layouts (25/03/2026)
- Creación de `BaseLayout.astro` con sistema de Header y Footer integrados.
- Implementación de `MobileMenuDrawer.astro` para navegación responsiva.
- Centralización de fuentes (`Inter`, `Outfit`) y antialiasing global.

### Hito 2: Blindaje del Sistema de Diseño (26/03/2026)
- **Erradicación de Fraude al Diseño:** Eliminación total de hexadecimales crudos.
- **Tokens Maestros:** Integración de `surface.hover`, `brand-vibrant` y `subtle` en Tailwind.
- **Variable `--header-offset`:** Sincronización perfecta de Sidebars con el Header.

### Hito 3: Modularización de Navegación (27/03/2026)
- Extracción de sidebars específicos: `SidebarCatalogo.astro` y `SidebarVademecum.astro`.
- Creación de `CartDrawer.astro` para gestión de pedidos.
- Implementación de `StickyActionBox.astro` (SSoT del buscador).

### Hito 4: Centralización Iconográfica (27/03/2026)
- Unificación de 30+ íconos en `Icons.astro`.
- Eliminación del 90% de los SVGs inline del proyecto.
- Estandarización de trazo (`stroke-width="2.5"`) y redondeo.

### Hito 5: Saneamiento Visual y Componentes Compartidos (27/03/2026)
- **SVG-Less Project:** Limpieza total en Header, Sidebars y Skeletons.
- **Migración a Tokens:** Uso de `body`, `secondary`, `muted` y `surface-muted` en todo el sitio.
- **Skeletons Modulares:** Creación de `SkeletonItem.astro` para estados de carga uniformes.

### Hito 6: Modularización de Páginas Maestras (27/03/2026)
- **AuthModal.astro:** Extracción de la lógica de acceso médico.
- **MedicalDetails.astro:** Modularización del panel de fichas clínicas del Vademécum.
- **InfoBanner.astro:** Sistema modular de avisos para toda la aplicación.
- **Limpieza Final:** `index.astro` y `vademecum.astro` ahora son orquestadores puros de componentes LEGO.

### Hito 7: Arquitectura Atómica "Elite" (28/03/2026)
- **Átomos Fundamentales:** Creación de `BadgeElite.astro` y `ButtonElite.astro` para estandarizar etiquetas y acciones en todo el sitio.
- **Moléculas de Navegación:** Implementación de `SidebarItem.astro` (jerarquía de 4 niveles) y `SidebarSearch.astro` (buscador con backdrop-blur).
- **Moléculas de Información:** Creación de `DataRowElite.astro` para unificar la presentación de datos técnicos en el Vademécum.
- **Organismos del Catálogo:** Creación de `ProductRowElite.astro` para gestionar filas de productos responsivas.
- **Refactorización de Vademécum:** Limpieza total de `MedicalDetails.astro` logrando paridad visual absoluta con el sitio online y 100% de modularidad.

### Hito 8: Clonación Estricta y Paridad Visual Vademécum (28/03/2026)
- **UI Parity 1:1:** Logro de simetría total en tarjetas, eliminando bordes asimétricos y unificando el diseño de badges.
- **Scrollbar Premium:** Implementación de scrollbars estéticos (6px, redondeados, hover) integrados al sistema de diseño.
- **Optimización de UX:** Reubicación estratégica del contador de medicamentos y refinamiento del sistema de migas de pan.
- **Limpieza Técnica:** Ajuste de paddings y carril de scroll en `MedicalDetails.astro` para maximizar el área de visualización.

### Hito 9: Estandarización de Superficies y "Branded Grays" (29/03/2026)
- **Hallazgo UI Crítico:** Identificación de distorsión visual (tintes azulinos fríos) al usar grises neutros sobre el sistema de diseño.
- **Técnica de Capas:** Implementación de la técnica de mezcla de marca (15-20% de opacidad del color primario sobre una base cremosa `#FCFCF9`).
- **Standard Sage Green:** Establecimiento del tono `#EAF3F1` como el color oficial para fondos de paneles principales (Columna 2).
- **Aislamiento Arquitectónico:** Uso de selectores de ID únicos y estilos locales para aplicar el fondo sin afectar a componentes globales (Header/Sidebar).

### Hito 10: Unificación de Contacto y Sedes (30/03/2026)
- **Clonación Estricta:** Replicación de la página de Sedes y Contacto bajo el estándar "Elite".
- **Consistencia Visual:** Aplicación del "Branded Gray" (#EAF3F1) para mantener paridad con el Vademécum.
- **Modularidad:** Integración de componentes reutilizables (Video, Locations, FAQ, Footer) para asegurar escalabilidad.

### Hito 11: Paridad Visual Total y Catálogo "Elite" (30/03/2026)
- **Clonación Estricta Catálogo:** Reemplazo del panel principal de `index.astro` con el diseño premium online.
- **Unificación Sistémica:** Aplicación del estándar "Branded Gray" (#EAF3F1) en todas las superficies maestras (Catálogo, Vademécum, Contacto).
- **Interactividad:** Integración de la cinta de alerta (Banner informativo) y lógica de "Back to Top" personalizada para contenedores con scroll independiente.
### Hito 13: Header Global y Accesibilidad Condicional (30/03/2026)
- **Clonación Estricta Header:** Implementación 1:1 del encabezado principal con navegación rítmica.
- **Botón de Accesibilidad Inteligente:** El control de "Tamaño de Texto" solo se muestra en Catálogo y Vademécum, optimizando la UI para el resto de las páginas.
- **Navegación Dinámica:** Sincronización automática de estados activos (`active`) y subrayados según la ruta actual.
- **Feedback Visual (UX):** Barra de progreso integrada para indicar carga de navegación y micro-interacciones en botones operativos.

- **Scrollbar Global:** Evaluar la implementación del scrollbar premium en el Catálogo y Contacto para paridad total del sitio.
- **Migración de Catálogo:** Reemplazar el resto de las secciones estáticas de `index.astro` con el organismo `ProductRowElite`.
- **Tipado de Props:** Implementar interfaces de TypeScript estrictas para todos los componentes de la tabla.
- **Validación de Datos:** Preparación del esquema de datos para la ingesta de JSON real en el Catálogo.
- **Optimización de Imágenes:** Sustituir placeholders por activos finales generados.
