# Plan de Estandarización de Iconos Globales 🚀

## Objetivo
Centralizar todos los iconos del proyecto en `src/components/catalogo/Icons.astro` para eliminar el código SVG redundante, facilitar el mantenimiento y asegurar la consistencia visual.

## Propuesta Técnica: Nueva Estructura de `Icons.astro`
Refactorizaremos el componente para que sea más flexible:

```astro
---
// src/components/shared/Icons.astro (Considerar moverlo a /shared/)
interface Props {
  type: string;
  class?: string;
  strokeWidth?: number;
}

const { type, class: className = "w-5 h-5", strokeWidth = 2.5 } = Astro.props;
---

{type === "cart" && (
  <svg class={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6" />
    <path d="M6 6H22" />
    <circle cx="6" cy="20" r="2" />
    <circle cx="17" cy="20" r="2" />
    <path d="M8 20L15 20" />
    <path d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18" />
  </svg>
)}

{/* Repetir para plus, check, search, chevron-right, etc. */}
```

## Pasos para Mañana
1. **Refactorizar `Icons.astro`**: Eliminar el `div` envoltorio y aplicar la lógica de props arriba descrita.
2. **Migración en `index.astro`**:
   - Sustituir el icono del carrito en el encabezado de la tabla.
   - Sustituir los iconos de "Plus (+)" en los botones de añadir.
   - Reemplazar los chevrons en breadcrumbs y botones.
3. **Auditoría en `vademecum.astro`**: Asegurar que los iconos en las tarjetas y el sidebar usen la nueva estructura.
4. **Limpieza**: Borrar cualquier SVG crudo que quede en los documentos `.astro`.

## Beneficios
- **Código Limpio:** Reducción de ~100 líneas de código en el catálogo.
- **Mantenimiento:** Cambio de estilo en un solo lugar.
- **Peso:** Mejora marginal en la carga al evitar duplicar atributos de SVG.
- **Estética:** Consistencia absoluta en grosores de línea y curvas.
