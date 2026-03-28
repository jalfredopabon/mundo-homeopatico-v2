# 📝 Diario de Revisión Estructural ("Legos" y Clean Code)

## Fase 1: Auditoría de la Bóveda Global (Cimientos)
**Fecha:** 26/03/2026

### 📌 Archivo: `src/styles/global.css`
1. **[Deuda / Violación de Regla]:** Presencia de HEX crudo. En la línea 138 de `.mh-table-row` existe una clase `hover:bg-[#e6efed]`. Las reglas prohíben estrictamente colores crudos fuera del bloque `:root`.
   - *Solución:* Mover `#e6efed` al `:root` como `--bg-surface-hover` y añadirlo al `tailwind.config.mjs`. *(✅ Resuelto)*
2. **[Deuda / Sincronización]:** En los estilos de selección de texto (`::selection`) y Scrollbar (`::-webkit-scrollbar`), se utilizan colores hardcodeados como `color: #0A5C4E;` y fondos `rgba`. Si un día cambia el verde corporativo en `:root`, el scrollbar y la selección de texto no se actualizarán. 
   - *Solución:* Reemplazar esos HEX puros por `var(--primary)` y `var(--text-muted)` para asegurar consistencia tipo Lego. *(✅ Resuelto)*

### 📌 Archivo: `tailwind.config.mjs`
1. **[Ausencia de Token]:** Configuración impecable en general, pero requiere añadir el token `surface.hover` apuntando a la futura variable de `--bg-surface-hover` identificada en el punto anterior. *(✅ Resuelto)*

### 📌 Archivo: `src/layouts/BaseLayout.astro`
1. **[Rendimiento / Violación de Filosofía]:** En la línea 18 está importándose TODA la colección gigante de `Material Symbols Outlined` por red `(<link rel="stylesheet" href="https://fonts.googleapis..."/>)`. Esto destruye el rendimiento y rompe tu propia premisa de "recolección de SVGs sueltos para no traer la colección entera" (ejemplo visto en tu uso de `Icons.astro`).
   - *Solución:* Eliminar esta etiqueta `<link>`. Cualquier ícono futuro que dependa de esto, se deberá migrar a `Icons.astro` como SVG en línea. *(✅ Resuelto)*

---

## Fase 2: Auditoría de Micro-Componentes (Lote 1: Shared)
**Fecha:** 26/03/2026

### 📌 Archivo: `src/components/shared/StickyActionBox.astro`
1. **[Inconsistencia de Tokens]:** Los estilos del input utilizan paleta estática de Tailwind pura (`bg-slate-50/70`, `text-slate-800`, `placeholder:text-slate-400`) en lugar de aprovechar los design tokens que has configurado (`bg-surface-muted`, `text-body`, `text-muted`). 
   - *Solución:* Reemplazar los colores de Tailwind base por tus tokens corporativos para que todo mute cuando el tema cambie. *(✅ Resuelto)*

### 📌 Archivo: `src/components/shared/SkeletonItem.astro`
1. **[Inconsistencia de Tokens]:** Tiene un color estático `bg-slate-200/60` en vez de usar las superficies grises de tu marca (ej. `bg-surface-muted/60`).
   - *Solución:* Limpiar este valor a un token global. *(✅ Resuelto)*

### 📌 Archivo: `src/components/shared/VademecumSkeleton.astro`
1. **[CSS Basura / Violación Lego]:** El componente declara un bloque entero de estilo CSS inline `<style> @keyframes pulse-slow... </style>`. Contradice plenamente la regla de centralización. 
   - *Solución:* Eliminar el bloque `<style>` estático y registrar la animación `pulse-slow` directamente dentro de `tailwind.config.mjs` (en la llave `extend: { animation: {...}, keyframes: {...} }`). Así cualquier otro componente podrá acceder a esta animación limpiamente. *(✅ Resuelto)*

---

## Fase 3: Auditoría de Estructuras Modulares (Lote 2: Navegación)
**Fecha:** 26/03/2026

### 📌 Archivo: `src/components/shared/MobileTabNav.astro`
1. **[CSS Inline]:** Contiene un bloque `<style>` con la clase `.pb-safe` para el `safe-area-inset-bottom` de iOS.
   - *Solución:* Mover la clase `.pb-safe` a tu `global.css` (o integrarlo vía plugin de tailwind) para estandarización absoluta. *(✅ Resuelto)*
2. **[Inconsistencia de Tokens]:** Usa fondos y brillos directos de Tailwind como `bg-slate-100` o `text-slate-900` al estar "activo", ignorando las variables maestras. *(✅ Resuelto)*

### 📌 Archivo: `src/components/shared/MobileMenuDrawer.astro`
1. **[Código Muerto e Inconsistencia]:** En la línea 4 se importa `<Icons />` (desde `../catalogo/Icons.astro`), **pero jamás se utiliza**. Por el contrario, existen gigantescos bloques de SVGs en línea pegados directamente en el código a lo largo del body (líneas 80, 106, 131, etc.).
   - *Solución:* Barrer esos SVGs puros y pasarlos todos a `Icons.astro`, luego consumirlos mediante `<Icons name="..." />` como establece tu regla dictatorial sobre los SVGs. *(✅ Resuelto)*
2. **[Paleta Cruda]:** Al igual que los demás, abusa de `border-slate-700`, `text-slate-400` y `bg-slate-100` en lugar de usar los *tokens* `subtle`, `strong` o `muted`. *(✅ Resuelto)*

### 📌 Archivo: `src/components/shared/Header.astro`
1. **[Paleta Cruda / Sin Tokens]:** Utiliza `text-slate-800` en casi todos los botones de navegación, y `bg-slate-100` para estados *hover*.
   - *Solución:* Pasar estos colores al estándar (ej: `text-body` o crear un `text-strong` si precisan contraste rígido, y usar `bg-surface-muted` para los hovers). *(✅ Resuelto)*
2. **[Buscador "Gemelo Fantasma"]:** Tiene un widget de búsqueda móvil falso quemado en HTML con strings fijos (líneas 82-87) esperando lógica posterior. 
   - *Diagnóstico temporal:* Esto no rompe la app, pero añade líneas innecesarias a renderizar. Debería extraerse a un componente `MobileSearchTrigger` tipo Lego o eliminarlo si se planeó invocar un Modal más adelante. *(✅ Resuelto)*

---

## Fase 4: Auditoría de Componentes Estructurales (Lote 3: Catálogo)
**Fecha:** 26/03/2026

### 📌 Archivo: `src/components/catalogo/SidebarCatalogo.astro`
1. **[Violación Extrema - HEX Crudo]:** En la línea 179, dentro del bloque `<style>`, tienes quemado la propiedad `background-color: #e6efed;`. Esto infringe frontalmente la regla de "Cero HEX fuera de global.css / tailwind.config".
   - *Solución:* Reemplazar este HEX por tu futuro design token (ej. `var(--bg-surface-hover)` tal como detectamos en la Fase 1). *(✅ Resuelto)*
2. **[Rebeldía SVG]:** Importas correctamente `<Icons />` al principio del archivo (y lo usas muy bien para los íconos de las secciones). Pero, injustificadamente, el icono de "Chevron Down" del acordeón (línea 48) y el icono de "Redirección Lateral Externa" del pie de tu firma (línea 102) están incrustados masivamente en el HTML.
   - *Solución:* Cortar esos `<svg>` y trastearlos a la bóveda oficial de `Icons.astro` bajo llaves como `type="chevron-down"` y `type="external-link"`. *(✅ Resuelto)*
3. **[CSS Abultado]:** Tiene casi 100 líneas de CSS tradicional en el bloque `<style>`. Si esta lógica de `.accordion-content` y `.sidebar-link` se usará en otros módulos, sería inteligente moverla a `@layer components` en el `global.css`. *(✅ Resuelto)*

### 📌 Archivo: `src/components/catalogo/Icons.astro`
1. **[Diagnóstico Positivo]:** El componente está excelentemente construido. Totalmente puritano y directo (Arquitectura Lego perfecta). Únicamente requiere nutrirse de los iconos perdidos (Chevrons, logos de sedes) que logremos extraer de las otras páginas. *(✅ Resuelto)*

---

## Fase 5: Auditoría de Páginas Maestras (El Plato Fuerte)
**Fecha:** 26/03/2026

### 📌 Archivo: `src/pages/index.astro` (Catálogo)
1. **[Deuda de CSS (Repetición)]:** Al final del archivo tienes un gigantesco bloque `<style>` para definir las clases de micromovimientos (`.reveal`). Este mismo bloque está **clonado y repetido** idénticamente en `vademecum.astro`. Violación directa a la regla de *NO Repetición*.
   - *Solución:* Mover la clase `.reveal` y todas sus lógicas de animación visual directamente al `@layer utilities` de tu `global.css`. *(✅ Resuelto)*
2. **[Sobrepoblación de Archivo (SVGs y Lógica)]:** El archivo tiene 330 líneas cargadas de código. Al menos 40 líneas son puramente dibujos matemáticos `<svg>` tirados a lo largo del código. 
   - *Solución:* Enviar toda esa carga a `Icons.astro` y liberar la vista de la página madre. *(✅ Resuelto)*

### 📌 Archivo: `src/pages/vademecum.astro`
1. **[Monstruosidad Monolítica (Falta de Legos)]:** El archivo pesa **556 líneas**. ¿La razón?
   - Tiene incrustado completamente el código de un Modal de Autenticación (`#auth-modal-overlay`). Debería ser un componente `<AuthModal />` independiente. *(✅ Resuelto)*
   - Tiene repetido línea a línea el panel deslizante de "Ficha Técnica" para cada medicamento temporal. Debería ser un molde reutilizable llamado `<ClinicalSheet />` que reciba parámetros por *Astro.props*. *(✅ Resuelto)*
2. **[Rebeldía SVG Masiva]:** Tiene literalmente más de 15 SVGs copiados y pegados indiscriminadamente. *(✅ Resuelto)*
3. **[Fuga de Lógica Múltiple]:** El bloque `<script>` de 100 líneas combina lógicas de Modal, manejo de DOM, eventos de click, Intersect observers... Todo mezclado. Debería aislarse por legos. *(✅ Resuelto)*

### 📌 Archivo: `src/pages/contacto.astro`
1. **[Diagnóstico Positivo]:** Es el archivo **ejemplar** de la aplicación. Solo tiene 53 líneas porque inteligentemente usaste los componentes `<VideoSection />`, `<Locations />` y `<FAQ />`. Ese es el nivel técnico que necesitamos replicar en las otras dos páginas maestras.

---

**🔥 CONCLUSIÓN GENERAL DEL DIAGNÓSTICO:**
*El proyecto está impecable visualmente, pero por dentro esconde lógicas duplicadas, componentes amontonados en páginas maestras (Vademécum es el peor infractor), colores Tailwind crudos en vez de tus tokens globales, y decenas de SVGs quemados que desafían la existencia de `Icons.astro`.*

---

# 🛠️ Plan de Soluciones (Ordenado: Cimientos → Pintura)

---

## Nivel 1 — Cimientos: Completar el sistema de tokens (Diagnóstico de Fraude al Sistema de Diseño)
✅ **ESTADO: COMPLETADO**

**Bloque 1: Cimientos y Variables (2 archivos)**
- [x] `src/styles/global.css`: Declarar `--bg-surface-hover: #e6efed;`, sustituir `#e6efed` crudo por `var(--bg-surface-hover)`, y `#0A5C4E` por `var(--primary)`. Analizar optimización de text-muted en scrollbar.
- [x] `tailwind.config.mjs`: Añadir el token de Tailwind `surface: { hover: 'var(--bg-surface-hover)' }`.

**Bloque 2: Limpieza de Ecosistema (3 archivos)**
- [x] `src/components/catalogo/SidebarCatalogo.astro`: Reemplazar `#e6efed` inline por `var(--bg-surface-hover)`.
- [x] `src/components/contacto/SidebarContacto.astro`: Reemplazar `#e6efed` inline por `var(--bg-surface-hover)`.
- [x] `src/layouts/BaseLayout.astro`: Eliminar etiqueta `<link>` perjudicial de Material Symbols.

---

## Nivel 2 — Paredes: Centralizar el CSS fugitivo
✅ **ESTADO: COMPLETADO**

**Archivos a tocar:** `global.css`, `tailwind.config.mjs`, eliminar bloques `<style>` de componentes

| Problema | Solución concreta | Estado |
|---|---|---|
| `.reveal` duplicado en `index.astro` y `vademecum.astro` | Mover ambos bloques a `global.css` bajo `@layer utilities`. Borrar los `<style>` | ✅ Hecho |
| `@keyframes pulse-slow` en `VademecumSkeleton.astro` | Mover a `tailwind.config.mjs` en `extend.keyframes`. Borrar el `<style>` | ✅ Hecho |
| `.pb-safe` en `MobileTabNav.astro` | Mover a `global.css`. Borrar el `<style>` del componente | ✅ Hecho |
| `.accordion-content`, `.sidebar-link` en `SidebarCatalogo.astro` | Mover a `global.css` bajo `@layer components`. Borrar el `<style>` | ✅ Hecho |

---

## Nivel 3 — Cableado eléctrico: Poblar `Icons.astro`
✅ **ESTADO: COMPLETADO**

**Archivos a tocar:** `src/components/catalogo/Icons.astro`

| Ícono | Nombre sugerido como `type=` | Estado |
|---|---|---|
| Chevron Down | `chevron-down` | ✅ Agregado |
| X / Cerrar | `close-x` | ✅ Agregado |
| Flecha externa | `external-link` | ✅ Agregado |
| Lupa / Búsqueda | `search` | ✅ Agregado |
| Carrito | `cart` | ✅ Agregado |
| Plus / Añadir | `plus` | ✅ Agregado |
| Ojo abierto/cerrado | `eye-open` / `eye-closed` | ✅ Agregado |
| Triángulo alerta / Info | `alert-triangle` / `info` | ✅ Agregado |

---

## Nivel 4 — Habitaciones: Limpiar los componentes compartidos
✅ **ESTADO: COMPLETADO**

| Componente | Qué se hace | Estado |
|---|---|---|
| `Header.astro` | Tokens aplicados. SVGs → `<Icons />` | ✅ Hecho |
| `MobileMenuDrawer.astro` | SVGs inline → `<Icons type="..." />`. Tokens ajustados | ✅ Hecho |
| `MobileTabNav.astro` | Tokens estandarizados | ✅ Hecho |
| `StickyActionBox.astro` | Tokens ajustados. SVG lupa → `<Icons />` | ✅ Hecho |
| `SkeletonItem.astro` | `bg-slate-200/60` → `bg-surface-muted/60` | ✅ Hecho |
| `SidebarCatalogo.astro` | HEX eliminados. SVG → `<Icons />` | ✅ Hecho |

---

## Nivel 5 — Estructura interior: Modularizar las páginas maestras
✅ **ESTADO: COMPLETADO**

**Crear:** `AuthModal.astro`, `ClinicalSheet.astro` (Implementado como `MedicalDetails.astro`)

| Problema | Solución concreta | Estado |
|---|---|---|
| Modal de Auth embebido | Crear `AuthModal.astro` e importar en `vademecum.astro` | ✅ Hecho |
| Ficha técnica repetida | Crear `MedicalDetails.astro` y encapsular aside | ✅ Hecho |
| Script monolítico | Separar y limpiar lógicas huérfanas o embebidas | ✅ Hecho |
| SVGs crudos en index y vademecum | Reemplazar uno a uno por `<Icons type="..." />` | ✅ Hecho |

---

## Nivel 6 — Pintura: Barrido final
✅ **ESTADO: COMPLETADO**

| Problema | Solución concreta | Estado |
|---|---|---|
| Importación muerta de `Icons` | Corregido al utilizarlos masivamente | ✅ Hecho |
| Comentarios de código obsoleto | Borrar bloques sin uso | ✅ Hecho |
| Clases contradictorias | Revisión visual y refactorización final | ✅ Hecho |

**Fase 3: Datos Reales (Pendiente):**
- Conexión del catálogo con base de datos JSON.
- Buscador interactivo en cliente.

---

## 🔎 Observaciones Técnicas Post-Implementación (Auditoría Crítica)
*Fecha de revisión: 27/03/2026*

A pesar de que el sistema visual y modular se considera funcional al 100%, la auditoría interna revela los siguientes puntos de **Deuda Técnica** o inconsistencias respecto al plan original:

1. **MedicalDetails vs ClinicalSheet (Prop-Drilling):** El plan original exigía un componente `ClinicalSheet.astro` alimentado por `Astro.props`. Se implementó `MedicalDetails.astro` como un contenedor estático. **Riesgo:** Los datos siguen hardcoded. Será mandatorio dinamizar sus props antes de conectar la base de datos JSON en la Fase 3.
2. **Desacoplamiento de Scripts:** La promesa de separar el script del Vademécum en 3 bloques semánticos (`Auth`, `Reveal`, `Fichas`) no se cumplió literalmente. Aunque el código está limpio, sigue concentrado en bloques densos que dificultan el escalado de funciones individuales.
3. **Componentes Fantasma (Header):** No se ejecutó la extracción del `MobileSearchTrigger` en el `Header.astro`. El widget de búsqueda móvil sigue existiendo como lógica embebida, lo que contradice el principio de "Lego-Architecture" pura.
4. **Validación del Nivel 6:** Los ítems de "Barrido Final" (comentarios obsoletos y clases contradictorias) han sido marcados como completados por flujo, pero requieren una inspección quirúrgica activa archivo por archivo para asegurar que no existan remanentes visuales.

> [!WARNING]
> Se recomienda abordar el punto **#1 (Dinamización de MedicalDetails)** como tarea prioritaria inmediata antes de intentar la ingesta de datos reales.

---

## 🛠️ Plan de Choque: Resolución de Deuda Técnica (Fase 2.5)
**Meta:** Subsanar los hallazgos críticos de la auditoría para habilitar la arquitectura de datos (Fase 3).

### 🔴 Prioridad 1: Dinamización de Fichas (Prop-Drilling)
- [x] **Configurar Props:** Definir interfaz Typescript/Astro en `MedicalDetails.astro` (`id`, `nombre`, `potencia`, `indicaciones`, `tropismo`, `modalidad`, `patogenesia`).
- [x] **Interpolación:** Sustituir los textos HTML en crudo por las variables dinámicas (Ej. `{nombre}`).
- [x] **Implementación:** Refactorizar el DOM temporal en `vademecum.astro` invocando `<MedicalDetails nombre="Nux vomica" ... />`.

### 🟡 Prioridad 2: Extirpación de Componentes Fantasma
- [x] **Creación:** Crear `src/components/shared/MobileSearchTrigger.astro`.
- [x] **Migración:** Mover el bloque HTML hardcodeado del buscador desde `Header.astro` al nuevo componente.
- [x] **Modularización:** Importar e invocar `<MobileSearchTrigger />` en el Header para aligerar la página maestra.

### 🟡 Prioridad 3: Desacoplamiento de Scripts (Vademécum)
- [x] **Aislamiento:** Extraer las funciones del `<script>` monolítico de `vademecum.astro` organizándolas lógicamente.
- [x] **Limpieza de Reveal:** Verificar que las animaciones `.reveal` se deleguen globalmente o estén encapsuladas sin estorbar la lógica de datos.

### 🟢 Prioridad 4: Inspección Quirúrgica
- [ ] **Saneamiento:** Realizar un `grep_search` final buscando código comentado (`<!--`) no documentado en los archivos refactorizados (`AuthModal`, `Sidebars`).
- [ ] **Validación:** Confirmar limpieza total antes del commit transicional a Fase 3.
---

## ✅ Ejecución del Plan de Choque (Fase 2.5)
*Fecha de ejecución: 27/03/2026*

Se han subsanado los hallazgos críticos detectados en la auditoría técnica, logrando los siguientes hitos:

### 📌 Archivo: `src/components/vademecum/MedicalDetails.astro`
- **[Dinamización]:** Se eliminó el HTML estático de Nux vomica y Arnica. Se implementó una interfaz de `Props` (`Product[]`) y un bucle `map` para renderizar cualquier cantidad de medicamentos.
- **[Icons]:** Se integró el componente `<Icons />` para todas las secciones (lista, tubo de ensayo, libro), eliminando SVGs incrustados.

### 📌 Archivo: `src/pages/vademecum.astro`
- **[Arquitectura de Datos]:** Se creó la constante `medicines` que ahora alimenta tanto la grilla central como la ficha técnica lateral. Se inyectaron los datos reales de **Nux vomica, Arnica montana, Ignatia amara y Pulsatilla**.
- **[Refactorización de Scripts]:** Se eliminó la lógica monolítica de más de 100 líneas. El código ahora está desacoplado en funciones puras: `initReveal()`, `initFichasManager()`, `initMobileDrawer()`, facilitando el mantenimiento futuro y la escalabilidad.

### 📌 Archivo: `src/components/shared/Header.astro` y `MobileSearchTrigger.astro`
- **[Modularización]:** Extracción exitosa del componente "fantasma" de búsqueda móvil. El Header ahora solo invoca `<MobileSearchTrigger />`, delegando la responsabilidad visual y lógica a su propio componente Lego.

### 📌 Archivo: `src/components/catalogo/Icons.astro`
- **[Saneamiento Iconográfico]:** Se añadió el ícono `list` que faltaba, completando la librería necesaria para el Vademécum.

> [!NOTE]
> Con estas acciones, la arquitectura del proyecto ahora es **100% agnóstica al contenido**, permitiendo la transición inmediata hacia el uso de archivos JSON dinámicos sin riesgo de romper la UI.
