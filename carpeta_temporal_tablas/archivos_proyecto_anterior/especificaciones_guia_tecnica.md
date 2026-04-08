# ESPECIFICACIONES TÉCNICAS Y GUÍA DE DESARROLLO (V2.0 - POST-REFACTOR)
# PROYECTO: CATALOGO MUNDO HOMEOPÁTICO

## 🚨 REGLAS DE ORO DEL DESARROLLADOR (LEER ANTES DE TOCAR CÓDIGO)

### 1. SISTEMA DE DESIGN TOKENS (SEMÁNTICA HÍBRIDA)
Hemos erradicado los valores hardcodeados. Si vas a escribir CSS o clases de Tailwind, **DEBES** seguir estas equivalencias:

| Concepto Visual | ❌ NO USAR (Legacy/Tailwind) | ✅ USAR (Variable / Clase Semántica) |
| :--- | :--- | :--- |
| **Acción / Precio** | `text-emerald-600`, `#10b981` | `text-brand-vibrant` / `var(--primary-vibrant)` |
| **Color Principal** | `text-green-900` | `text-brand` / `var(--primary)` |
| **Títulos** | `text-slate-900`, `text-blue-900` | `text-brand-dark` / `var(--secondary)` |
| **Texto Cuerpo** | `text-slate-600` | `text-body` / `var(--text-body)` |
| **Metadatos** | `text-slate-400`, `text-slate-500` | `text-muted` / `var(--text-muted)` |
| **Fondo Tarjeta** | `bg-white` | `bg-surface-white` / `var(--bg-surface)` |
| **Fondo Sección** | `bg-slate-50`, `bg-slate-100` | `bg-surface-muted` / `var(--bg-muted)` |
| **Borde Sutil** | `border-slate-100`, `border-slate-200` | `border-subtle` / `var(--border-light)` |
| **Borde Fuerte** | `border-slate-300` | `border-strong` / `var(--border-medium)` |

**¿Por qué?** Para que al cambiar el tema (ej: Dark Mode o Rebranding), baste con tocar `:root`.

---

### 2. PROTOCOLO DE INTERACCIÓN (EVENT DELEGATION)
**PROHIBIDO:** Usar `onclick="..."` en elementos HTML generados dinámicamente o estáticos.
**CORRECTO:** Usar `UIHandlers.initDelegatedEvents()`.

**Patrón de Implementación:**
1. Agregar una clase "hook" al elemento (ej: `.btn-toggle-sidebar`).
2. En `initDelegatedEvents`, capturar el click globalmente:
   ```javascript
   const btn = e.target.closest('.btn-toggle-sidebar');
   if (btn) return this.toggleSidebar();
   ```

---

### 3. GESTIÓN DE ESTADO VISUAL
**PROHIBIDO:** Manipular `style` directamente en JS (ej: `el.style.display = 'none'`).
**CORRECTO:** Usar clases de estado CSS.

| Estado | Clase CSS |
| :--- | :--- |
| Oculto | `.hidden` |
| Abierto/Desplegado | `.is-open` (para acordeones/menús) |
| Activo/Seleccionado | `.is-active` |
| Cargando | `.is-loading` |

---

### 4. LÓGICA DE NEGOCIO CRÍTICA (NO TOCAR SIN COMPRENDER)
El `index.html` contiene lógica avanzada que emula un Framework SPA. **Cualquier refactorización debe respetar estos 5 pilares:**

#### A. SINTAXIS ESPECIAL DE DATOS (Mini-Lenguaje en Excel)
El renderizado no es plano. Interpretamos caracteres especiales en las celdas de Google Sheets para generar UI compleja:
- **`^` (Circunflejo):** Crea nuevos bloques/párrafos en la sección de Notas.
- **`§` (Párrafo):** Activa el modo "Badges/Etiquetas" en línea (ej: `§Ingrediente1|Ingrediente2`). **NO ELIMINAR**.
- **`|` (Pipe):** Separador de listas y subtítulos (ej: en Banner o Títulos SEO).

#### B. ALGORITMO DE JERARQUÍA ("Fill Down Agresivo")
La tabla de precios no es lineal. El código infiere la estructura árbol (Categoría -> Subcategoría -> Producto) basándose en **celdas vacías**.
- **Regla:** Si una celda `Nivel 1` está vacía, el producto hereda el padre anterior.
- **Riesgo:** Si simplificas el bucle `rows.forEach` en `RenderEngine.buildHierarchy`, romperás la navegación lateral.

#### C. ESTRATEGIA DE CACHÉ HÍBRIDA (Stale-While-Revalidate)
La velocidad es la prioridad #1.
1. La app carga **Inmediatamente** desde `localStorage` (`mh_cache_prices_v2`).
2. En segundo plano, busca cambios en Google Sheets (`DataService`).
3. Si hay cambios, actualiza la UI silenciosamente.
**PROHIBIDO:** Eliminar la lectura de `localStorage` o poner `await fetch` bloqueante al inicio.

#### D. INYECCIÓN DINÁMICA DE SEO
El SEO no está hardcodeado en el HTML. `SchemaManager` inyecta JSON-LD dinámicamente:
- **LocalBusiness:** Basado en la hoja `DISTRIBUIDORES`.
- **FAQPage:** Basado en la hoja `FAQ`.
- **OfferCatalog:** Basado en la hoja `PRECIOS`.

#### E. CONFIGURACIÓN REMOTA (CMS)
No hardcodear textos legales o de contacto.
- Textos como `lbl_footer_copy`, enlaces de WhatsApp y Redes Sociales se inyectan desde la hoja `CONFIG`.
- El código busca IDs específicos (`lbl_...`) para inyectar estos valores.

#### F. PROTOCOLO ESTÉTICO DEL SIDEBAR (MASTER REFINEMENT)
Para mantener la armonía visual y rítmica del menú lateral, se debe respetar el siguiente sistema de espaciado y jerarquía:

1. **Estructura Semántica:**
   - **Nivel 1 (Capitanes):** Clase `.sidebar-lvl1-container`.
   - **Nivel 2 (Sub-capitanes):** Clase `.sidebar-lvl2-container`.
   - El CSS controla los márgenes, NO inyectar `mt-` o `py-` desde JS.

2. **Ritmo Visual (Regla de Oro de Espaciado):**
   - **Espacio rítmico:** Se ha unificado a **24px (`var(--space-l)`)** el margen superior antes de CUALQUIER título (ya sea Nivel 1 o Nivel 2). Esto crea un ritmo de escaneo constante para el usuario.
   - **Excepción Proximal:** Si un Nivel 2 sigue inmediatamente a un Nivel 1 (ej: "De nuestra farmacia" -> "Según prescripción"), el margen desaparece para mantener la cohesión familiar. Esto se logra mediante el selector de CSS: `.sidebar-lvl1-label + .sidebar-lvl2-group > .sidebar-lvl2-container:first-child`.

3. **Tipografía Orgánica (Identidad de Marca):**
   - **Sentence Case:** PROHIBIDO el uso de `uppercase` (mayúsculas sostenidas). Todo debe ir con la primera en mayúscula y el resto en minúscula para un tono suave y homeopático.
   - **Diferenciación Sutil:** El Nivel 1 usa `font-weight: 800` (ExtraBold) y el Nivel 2 usa `font-weight: 500` (Medium) con un color `-muted`.

4. **Optimización Móvil:**
   - La cabecera del sidebar móvil debe ser compacta (`py-2`) y usar el logo horizontal (`h-5`) para maximizar el área de navegación útil.

---

## ARQUITECTURA TÉCNICA (Index.html Monolítico)

### A. ESTRUCTURA DE REGIONES
1. **INFRAESTRUCTURA (Head):** Metadatos SEO, Tailwind CDN, Fuentes.
2. **SISTEMA DE DISEÑO (CSS):**
    - `:root`: Definición de todos los tokens (Colores, Espacios, Radios).
    - **Utilidades Semánticas:** Clases puente (`.text-brand`, etc.).
    - Componentes Base (`.btn`, `.card`, `.badge`).
3. **INTERFAZ (Body):**
    - Headers Semánticos (`h1` -> `h2` -> `h3`).
    - Contenedores vacíos (`#catalog-grid`) para inyección.
4. **LÓGICA (Script):**
    - `STATE`: Store reactivo simple.
    - `RenderEngine`: Generador de HTML puro (Strings Template Literals).
    - `UIHandlers`: Controlador de eventos centralizado.
    - `DataService`: Fetching de Google Sheets (CSV).

### B. FLUJO DE DATOS
1. `init()` arranca la app.
2. `DataService` descarga CSV de Google Sheets.
3. `PapaParse` convierte CSV a JSON.
4. `RenderEngine` toma el JSON y :
   - Genera HTML de Sidebar (Categorías).
   - Genera HTML de Catálogo (Tarjetas y Tablas).
   - Inyecta en el DOM.
5. `UIHandlers` despierta y escucha clicks delegados.

---

## HISTORIAL DE REFACTORIZACIÓN
- **Fase 1 (Lógica):** Completada. Se eliminó `onclick` y `style.display`.
- **Fase 2 (Visual):** Completada. Se implementó Sistema de Tokens Híbrido.
- **Fase 3 (Datos):** Pendiente. Mover textos estáticos a Excel.
- **Fase 4 (Documentación):** Inclusión de protocolos de datos ocultos y caché.
