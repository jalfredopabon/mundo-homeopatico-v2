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

---

## 🏗️ Deuda Técnica Pendiente (Fase 3: Datos)
- **Tipado de Props:** Implementar interfaces de TypeScript estrictas para todos los componentes de la tabla.
- **Validación de Datos:** Preparación del esquema de datos para la ingesta de JSON real en el Catálogo.
- **Optimización de Imágenes:** Sustituir placeholders por activos finales generados.
