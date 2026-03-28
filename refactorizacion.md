# Plan de RefactorizaciÃ³n y Blindaje: Mundo HomeopÃ¡tico v2

Este documento detalla el diagnÃ³stico tÃ©cnico real del proyecto y el mapa de ruta para eliminar la fragilidad visual y la deuda tÃ©cnica acumulada en los Sidebars.

## ðŸš¨ DiagnÃ³stico de Vulnerabilidades

### 1. Fragilidad Visual (CSS "MÃ¡gico")

- **Problema:** Uso excesivo de valores negativos calculados a mano (`mt-[-2.5px]`, `top-[72px]`).
- **Impacto:** Cualquier cambio mÃ­nimo en el Header global (fuente, borde, interlineado) rompe la alineaciÃ³n de todos los sidebars de forma impredecible.
- **Riesgo:** Desfases de 1-3 pÃ­xeles entre pÃ¡ginas "gemelas" (VademÃ©cum vs. CatÃ¡logo).

### 2. FragmentaciÃ³n de LÃ³gica (CÃ³digo Espejo)

- **Problema:** El "CajÃ³n Maestro" del buscador/acciÃ³n rÃ¡pida estÃ¡ copiado y pegado en 3 archivos:
  1. `SidebarCatalogo.astro`
  2. `vademecum.astro`
  3. `SidebarContacto.astro`
- **Impacto:** El mantenimiento es triple. Cada ajuste estÃ©tico o de accesibilidad requiere 3 ediciones idÃ©nticas. La probabilidad de error u olvido en un archivo es alta.

### 3. Ausencia de VerificaciÃ³n de Tipos (Type Safety)

- **Problema:** No hay validaciÃ³n de las propiedades (`props`) que fluyen entre componentes.
- **Impacto:** En producciÃ³n, un valor `undefined` o mal formateado puede causar que el buscador no funcione o que el layout colapse silenciosamente.

## @

## 🗓️ Tareas Prioritarias — Próxima Sesión (2026-03-25)

> **CONTEXTO:** Al inicio de la siguiente sesión, comenzar por aquí. Consolidan la globalización de componentes actualmente repetidos o sin estandarizar.

### Tarea 1 — Clase .mh-sidebar en global.css ⚡ ALTA PRIORIDAD

**Objetivo:** Centralizar los estilos estructurales repetidos en los 3 sidebars.
**Qué unificar:** h-[calc(100vh-72px)] · sticky top-[72px] · overflow-y-auto scrollbar-premium · w-64 shrink-0 · order-r border-subtle bg-surface-white  
**Archivos a actualizar:** SidebarCatalogo.astro · SidebarContacto.astro · ademecum.astro (aside inline)



## ✅ 🗓️ Tareas Completadas (2026-03-26)

### ~~Tarea 1 — Clase .mh-sidebar en global.css~~
**Estado:** ¡Completada! Se centralizaron los estilos y la variable `--header-offset`.

### ~~Tarea 2 — Extraer Sidebar de Vademécum a componente propio~~
**Estado:** ¡Completada! Se creó `SidebarVademecum.astro` y se limpió `vademecum.astro`.

### ~~Tarea 3 — Clase .mh-pill en global.css~~
**Estado:** ¡Completada! Se globalizó la estética de las etiquetas de categorías.

---

## 📖 Bitácora de Avance

### Hito 1: Eliminación de Deuda Técnica en Sidebars y CSS (26/03/2026)
- **Logro Estructural:** Se erradicó el "CSS Mágico" y el "Código Espejo" en los 3 sidebars principales (Catálogo, Vademécum, Contacto).
- **Globalización CSS:** Se introdujeron utilidades Elite en `global.css` (`.mh-sidebar`, `.mh-pill`) y la variable fundacional `--header-offset: 72px`.
- **Aislamiento de Componentes:** Refactorización extrema del archivo `vademecum.astro` mediante la extracción de su barra de navegación lateral a un módulo independiente (`SidebarVademecum.astro`), reduciendo su volumen en >100 líneas y facilitando la mantenibilidad futura.
- **Resultado:** Píxel-perfect cross-page asegurado; cualquier modificación al offset del header o a los estilos del sidebar y píldoras se propaga simétricamente a todo el ecosistema.
