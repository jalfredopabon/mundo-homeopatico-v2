# 📝 Diario de Revisión Estructural ("Legos" y Clean Code)

## Fase 1: Auditoría de la Bóveda Global (Cimientos)
**Fecha:** 26/03/2026

### 📌 Archivo: `src/styles/global.css`
1. **[Deuda / Violación de Regla]:** Presencia de HEX crudo. En la línea 138 de `.mh-table-row` existe una clase `hover:bg-[#e6efed]`. Las reglas prohíben estrictamente colores crudos fuera del bloque `:root`.
   - *Solución:* Mover `#e6efed` al `:root` como `--bg-surface-hover` y añadirlo al `tailwind.config.mjs`.
2. **[Deuda / Sincronización]:** En los estilos de selección de texto (`::selection`) y Scrollbar (`::-webkit-scrollbar`), se utilizan colores hardcodeados como `color: #0A5C4E;` y fondos `rgba`. Si un día cambia el verde corporativo en `:root`, el scrollbar y la selección de texto no se actualizarán. 
   - *Solución:* Reemplazar esos HEX puros por `var(--primary)` y `var(--text-muted)` para asegurar consistencia tipo Lego.

### 📌 Archivo: `tailwind.config.mjs`
1. **[Ausencia de Token]:** Configuración impecable en general, pero requiere añadir el token `surface.hover` apuntando a la futura variable de `--bg-surface-hover` identificada en el punto anterior.

### 📌 Archivo: `src/layouts/BaseLayout.astro`
1. **[Rendimiento / Violación de Filosofía]:** En la línea 18 está importándose TODA la colección gigante de `Material Symbols Outlined` por red `(<link rel="stylesheet" href="https://fonts.googleapis..."/>)`. Esto destruye el rendimiento y rompe tu propia premisa de "recolección de SVGs sueltos para no traer la colección entera" (ejemplo visto en tu uso de `Icons.astro`).
   - *Solución:* Eliminar esta etiqueta `<link>`. Cualquier ícono futuro que dependa de esto, se deberá migrar a `Icons.astro` como SVG en línea.

---

## Fase 2: Auditoría de Micro-Componentes (Lote 1: Shared)
**Fecha:** 26/03/2026

### 📌 Archivo: `src/components/shared/StickyActionBox.astro`
1. **[Inconsistencia de Tokens]:** Los estilos del input utilizan paleta estática de Tailwind pura (`bg-slate-50/70`, `text-slate-800`, `placeholder:text-slate-400`) en lugar de aprovechar los design tokens que has configurado (`bg-surface-muted`, `text-body`, `text-muted`). 
   - *Solución:* Reemplazar los colores de Tailwind base por tus tokens corporativos para que todo mute cuando el tema cambie.

### 📌 Archivo: `src/components/shared/SkeletonItem.astro`
1. **[Inconsistencia de Tokens]:** Tiene un color estático `bg-slate-200/60` en vez de usar las superficies grises de tu marca (ej. `bg-surface-muted/60`).
   - *Solución:* Limpiar este valor a un token global.

### 📌 Archivo: `src/components/shared/VademecumSkeleton.astro`
1. **[CSS Basura / Violación Lego]:** El componente declara un bloque entero de estilo CSS inline `<style> @keyframes pulse-slow... </style>`. Contradice plenamente la regla de centralización. 
   - *Solución:* Eliminar el bloque `<style>` estático y registrar la animación `pulse-slow` directamente dentro de `tailwind.config.mjs` (en la llave `extend: { animation: {...}, keyframes: {...} }`). Así cualquier otro componente podrá acceder a esta animación limpiamente.

---

## Fase 3: Auditoría de Estructuras Modulares (Lote 2: Navegación)
**Fecha:** 26/03/2026

### 📌 Archivo: `src/components/shared/MobileTabNav.astro`
1. **[CSS Inline]:** Contiene un bloque `<style>` con la clase `.pb-safe` para el `safe-area-inset-bottom` de iOS.
   - *Solución:* Mover la clase `.pb-safe` a tu `global.css` (o integrarlo vía plugin de tailwind) para estandarización absoluta.
2. **[Inconsistencia de Tokens]:** Usa fondos y brillos directos de Tailwind como `bg-slate-100` o `text-slate-900` al estar "activo", ignorando las variables maestras.

### 📌 Archivo: `src/components/shared/MobileMenuDrawer.astro`
1. **[Código Muerto e Inconsistencia]:** En la línea 4 se importa `<Icons />` (desde `../catalogo/Icons.astro`), **pero jamás se utiliza**. Por el contrario, existen gigantescos bloques de SVGs en línea pegados directamente en el código a lo largo del body (líneas 80, 106, 131, etc.).
   - *Solución:* Barrer esos SVGs puros y pasarlos todos a `Icons.astro`, luego consumirlos mediante `<Icons name="..." />` como establece tu regla dictatorial sobre los SVGs.
2. **[Paleta Cruda]:** Al igual que los demás, abusa de `border-slate-700`, `text-slate-400` y `bg-slate-100` en lugar de usar los *tokens* `subtle`, `strong` o `muted`.

### 📌 Archivo: `src/components/shared/Header.astro`
1. **[Paleta Cruda / Sin Tokens]:** Utiliza `text-slate-800` en casi todos los botones de navegación, y `bg-slate-100` para estados *hover*.
   - *Solución:* Pasar estos colores al estándar (ej: `text-body` o crear un `text-strong` si precisan contraste rígido, y usar `bg-surface-muted` para los hovers).
2. **[Buscador "Gemelo Fantasma"]:** Tiene un widget de búsqueda móvil falso quemado en HTML con strings fijos (líneas 82-87) esperando lógica posterior. 
   - *Diagnóstico temporal:* Esto no rompe la app, pero añade líneas innecesarias a renderizar. Debería extraerse a un componente `MobileSearchTrigger` tipo Lego o eliminarlo si se planeó invocar un Modal más adelante.

---

## Fase 4: Auditoría de Componentes Estructurales (Lote 3: Catálogo)
**Fecha:** 26/03/2026

### 📌 Archivo: `src/components/catalogo/SidebarCatalogo.astro`
1. **[Violación Extrema - HEX Crudo]:** En la línea 179, dentro del bloque `<style>`, tienes quemado la propiedad `background-color: #e6efed;`. Esto infringe frontalmente la regla de "Cero HEX fuera de global.css / tailwind.config".
   - *Solución:* Reemplazar este HEX por tu futuro design token (ej. `var(--bg-surface-hover)` tal como detectamos en la Fase 1).
2. **[Rebeldía SVG]:** Importas correctamente `<Icons />` al principio del archivo (y lo usas muy bien para los íconos de las secciones). Pero, injustificadamente, el icono de "Chevron Down" del acordeón (línea 48) y el icono de "Redirección Lateral Externa" del pie de tu firma (línea 102) están incrustados masivamente en el HTML.
   - *Solución:* Cortar esos `<svg>` y trastearlos a la bóveda oficial de `Icons.astro` bajo llaves como `type="chevron-down"` y `type="external-link"`.
3. **[CSS Abultado]:** Tiene casi 100 líneas de CSS tradicional en el bloque `<style>`. Si esta lógica de `.accordion-content` y `.sidebar-link` se usará en otros módulos, sería inteligente moverla a `@layer components` en el `global.css`.

### 📌 Archivo: `src/components/catalogo/Icons.astro`
1. **[Diagnóstico Positivo]:** El componente está excelentemente construido. Totalmente puritano y directo (Arquitectura Lego perfecta). Únicamente requiere nutrirse de los iconos perdidos (Chevrons, logos de sedes) que logremos extraer de las otras páginas.

---

## Fase 5: Auditoría de Páginas Maestras (El Plato Fuerte)
**Fecha:** 26/03/2026

### 📌 Archivo: `src/pages/index.astro` (Catálogo)
1. **[Deuda de CSS (Repetición)]:** Al final del archivo tienes un gigantesco bloque `<style>` para definir las clases de micromovimientos (`.reveal`). Este mismo bloque está **clonado y repetido** idénticamente en `vademecum.astro`. Violación directa a la regla de *NO Repetición*.
   - *Solución:* Mover la clase `.reveal` y todas sus lógicas de animación visual directamente al `@layer utilities` de tu `global.css`.
2. **[Sobrepoblación de Archivo (SVGs y Lógica)]:** El archivo tiene 330 líneas cargadas de código. Al menos 40 líneas son puramente dibujos matemáticos `<svg>` tirados a lo largo del código. 
   - *Solución:* Enviar toda esa carga a `Icons.astro` y liberar la vista de la página madre.

### 📌 Archivo: `src/pages/vademecum.astro`
1. **[Monstruosidad Monolítica (Falta de Legos)]:** El archivo pesa **556 líneas**. ¿La razón?
   - Tiene incrustado completamente el código de un Modal de Autenticación (`#auth-modal-overlay`). Debería ser un componente `<AuthModal />` independiente.
   - Tiene repetido línea a línea el panel deslizante de "Ficha Técnica" para cada medicamento temporal. Debería ser un molde reutilizable llamado `<ClinicalSheet />` que reciba parámetros por *Astro.props*.
2. **[Rebeldía SVG Masiva]:** Tiene literalmente más de 15 SVGs copiados y pegados indiscriminadamente.
3. **[Fuga de Lógica Múltiple]:** El bloque `<script>` de 100 líneas combina lógicas de Modal, manejo de DOM, eventos de click, Intersect observers... Todo mezclado. Debería aislarse por legos.

### 📌 Archivo: `src/pages/contacto.astro`
1. **[Diagnóstico Positivo]:** Es el archivo **ejemplar** de la aplicación. Solo tiene 53 líneas porque inteligentemente usaste los componentes `<VideoSection />`, `<Locations />` y `<FAQ />`. Ese es el nivel técnico que necesitamos replicar en las otras dos páginas maestras.

---

**🔥 CONCLUSIÓN GENERAL DEL DIAGNÓSTICO:**
*El proyecto está impecable visualmente, pero por dentro esconde lógicas duplicadas, componentes amontonados en páginas maestras (Vademécum es el peor infractor), colores Tailwind crudos en vez de tus tokens globales, y decenas de SVGs quemados que desafían la existencia de `Icons.astro`.*

---

# 🔧 Plan de Soluciones (Ordenado: Cimientos → Pintura)

---

## Nivel 1 — Cimientos: Completar el sistema de tokens (Diagnóstico de Fraude al Sistema de Diseño)

**Plan Particionado:**

**Paso 0: Checkpoint Local**
- Commit de Git para salvaguardar el estado funcional antes de alterar las variables maestras. (Sin push).

**Bloque 1: Cimientos y Variables (2 archivos)**
- `src/styles/global.css`: Declarar `--bg-surface-hover: #e6efed;`, sustituir `#e6efed` crudo por `var(--bg-surface-hover)`, y `#0A5C4E` por `var(--primary)`. Analizar optimización de text-muted en scrollbar.
- `tailwind.config.mjs`: Añadir el token de Tailwind `surface: { hover: 'var(--bg-surface-hover)' }`.

**Bloque 2: Limpieza de Ecosistema (3 archivos)**
- `src/components/catalogo/SidebarCatalogo.astro`: Reemplazar `#e6efed` inline por `var(--bg-surface-hover)`.
- `src/components/contacto/SidebarContacto.astro`: Reemplazar `#e6efed` inline por `var(--bg-surface-hover)`.
- `src/layouts/BaseLayout.astro`: Eliminar etiqueta `<link>` perjudicial de Material Symbols.

**Resultado esperado:** Un `:root` y un `tailwind.config.mjs` que son la fuente única de verdad. Sin HEX crudos en ningún archivo CSS.

---

## Nivel 2 — Paredes: Centralizar el CSS fugitivo

**Archivos a tocar:** `global.css`, `tailwind.config.mjs`, eliminar bloques `<style>` de componentes

| Problema | Solución concreta |
|---|---|
| `.reveal` + `.reveal-delay-*` duplicado en `index.astro` y `vademecum.astro` | Mover ambos bloques a `global.css` bajo `@layer utilities`. Borrar los `<style>` de las dos páginas |
| `@keyframes pulse-slow` en `VademecumSkeleton.astro` | Mover a `tailwind.config.mjs` en `extend.keyframes` + `extend.animation`. Borrar el `<style>` del componente |
| `.pb-safe` en `MobileTabNav.astro` | Mover a `global.css`. Borrar el `<style>` del componente |
| `.accordion-content`, `.sidebar-link`, `.accordion-trigger` en `SidebarCatalogo.astro` | Mover el bloque completo a `global.css` bajo `@layer components`. Borrar el `<style>` del sidebar |

**Resultado esperado:** Cero bloques `<style>` en componentes. Todo el CSS vive en `global.css` o `tailwind.config.mjs`.

---

## Nivel 3 — Cableado eléctrico: Poblar `Icons.astro`

**Archivos a tocar:** `src/components/catalogo/Icons.astro` (solo agregar entradas)

| Ícono | Nombre sugerido como `type=` | Tomado de |
|---|---|---|
| Chevron Down (acordeón) | `chevron-down` | `SidebarCatalogo.astro` línea 48 |
| X / Cerrar | `close-x` | `MobileMenuDrawer.astro`, `vademecum.astro` |
| Flecha externa (LinkedIn) | `external-link` | `SidebarCatalogo.astro` línea 102 |
| Lupa / Búsqueda | `search` | `Header.astro`, `StickyActionBox.astro` |
| Carrito | `cart` | `Header.astro` |
| Hamburguesa / Menú | `menu` | `Header.astro` |
| Plus / Añadir | `plus` | `index.astro` (botón de añadir al carrito) |
| Ojo abierto | `eye-open` | `vademecum.astro` (toggle contraseña) |
| Ojo cerrado | `eye-closed` | `vademecum.astro` |
| Triángulo alerta | `alert-triangle` | `index.astro` (banner informativo) |
| Check | `check` | `index.astro` (micro-animación del botón) |
| Chevron derecho (breadcrumb) | `chevron-right` | `index.astro`, `vademecum.astro` |

**Resultado esperado:** `Icons.astro` pasa de 6 íconos a ~18. Todos los SVGs del proyecto tienen un hogar oficial.

---

## Nivel 4 — Habitaciones: Limpiar los componentes compartidos

**Archivos a tocar:** `Header.astro`, `MobileMenuDrawer.astro`, `MobileTabNav.astro`, `StickyActionBox.astro`, `SkeletonItem.astro`, `SidebarCatalogo.astro`

| Componente | Qué se hace |
|---|---|
| `Header.astro` | `text-slate-800` → `text-body`, `bg-slate-100` → `bg-surface-muted`. SVGs de lupa, carrito, menú → `<Icons type="search/cart/menu" />` |
| `MobileMenuDrawer.astro` | Activar la importación de `Icons` que estaba muerta. Todos los SVGs inline → `<Icons type="..." />`. `border-slate-700` → `border-subtle`, `text-slate-400` → `text-muted` |
| `MobileTabNav.astro` | `bg-slate-100` → `bg-surface-muted`, `text-slate-900` → `text-strong` (si no existe, declararlo en tokens) |
| `StickyActionBox.astro` | `bg-slate-50/70` → `bg-surface-muted/70`, `text-slate-800` → `text-body`, `placeholder:text-slate-400` → `placeholder:text-muted`. SVG de lupa → `<Icons type="search" />` |
| `SkeletonItem.astro` | `bg-slate-200/60` → `bg-surface-muted/60` |
| `SidebarCatalogo.astro` | `background-color: #e6efed` → `background-color: var(--bg-surface-hover)`. SVG chevron → `<Icons type="chevron-down" />`. SVG external-link → `<Icons type="external-link" />` |

**Resultado esperado:** Cero colores Tailwind crudos en componentes. Cero SVGs inline en componentes compartidos.

---

## Nivel 5 — Estructura interior: Modularizar las páginas maestras

**Archivos a tocar:** `src/pages/vademecum.astro`, `src/pages/index.astro`. **Crear:** `AuthModal.astro`, `ClinicalSheet.astro`

| Problema | Solución concreta |
|---|---|
| Modal de Auth embebido en `vademecum.astro` | Crear `src/components/vademecum/AuthModal.astro`. Mover todo el HTML del overlay allí. En `vademecum.astro` importar y usar `<AuthModal />` |
| Ficha técnica repetida línea a línea | Crear `src/components/vademecum/ClinicalSheet.astro` con props: `id`, `name`, `potency`, `indications`, `pharmacology`, `dosage`. Reemplazar los dos bloques `div#ficha-*` por `<ClinicalSheet ... />` |
| Script monolítico de 100 líneas en `vademecum.astro` | Separar en 3 bloques semánticos dentro del mismo `<script>`, cada uno con su propio comentario de sección: `// --- Auth ---`, `// --- Reveal ---`, `// --- Fichas ---` |
| SVGs crudos en `index.astro` y `vademecum.astro` | Reemplazar uno a uno por `<Icons type="..." />` según el catálogo del Nivel 3 |

**Resultado esperado:** `vademecum.astro` de 556 → ~120 líneas. `index.astro` de 330 → ~180 líneas.

---

## Nivel 6 — Pintura: Barrido final

**Archivos a tocar:** todos (solo lectura + borrado)

| Problema | Solución concreta |
|---|---|
| Importación muerta de `Icons` en `MobileMenuDrawer` | Ya resuelta en Nivel 4 al activarla |
| Comentarios de código obsoleto | Borrar bloques comentados sin uso en `SidebarCatalogo.astro` (líneas 127-130 con `position: relative` duplicado) |
| Clases contradictorias o redundantes | Revisión visual final de clases gemelas en todos los componentes tocados |

**Resultado esperado:** Código quirúrgicamente limpio. Cero deuda técnica visible.
