---
description: Clonación estricta de componentes HTML/Tailwind desde la versión online al proyecto local, priorizando paridad visual sobre abstracción prematura.
---

# Workflow: Clonación Estricta (UI Parity)

Este workflow se utiliza cuando el usuario proporciona un bloque de código HTML/Tailwind (generalmente de una versión online o maqueta aprobada) y desea integrarlo en el proyecto Astro local EXACTAMENTE como se ve, sin alteraciones visuales derivadas de "sobreingeniería" o uso forzado de componentes preexistentes que rompan el diseño.

## Reglas de Clonación Estricta (Obligatorias)

1. **Fidelidad Visual Absoluta (Prioridad #1):**
   - El resultado DEBE ser el MISMO diseño, sin pretextos. Ni parecido, ni similar: EL MISMO.
   - Usa EXACTAMENTE la misma estructura HTML proporcionada por el usuario.
   - Mantén TODAS las clases de Tailwind de utilidad enfocadas en diseño (`px-8`, `leading-[0.9]`, `tracking-tight`, `size-1.5`, etc.).
   - No elimines div wrappers ni spans si existen en el código original, ya que suelen controlar micro-alineación (flex, gap).

2. **Cero Sobre-Ingeniería:**
   - NO abstraigas el código en nuevos sub-componentes (`Atoms`/`Molecules`) a menos que el usuario lo solicite explícitamente.
   - NO uses componentes locales existentes de UI (ej. `ButtonElite`, `BadgeElite`, `DataRowElite`) si su uso altera mínimamente el `padding`, `font-size` o márgenes del diseño proporcionado. Es preferible HTML crudo idéntico a usar un componente "Lego" que rompa el diseño.

3. **Respeto a los Tokens, Globalización y Buenas Prácticas:**
   - La clonación estricta NO es una excusa para crear código basura.
   - Sustituye valores hexadecimales crudos (ej. `text-[#00513e]`) por los tokens oficiales del proyecto (`text-brand`, `bg-surface-muted`, `border-subtle`).
   - Aplica las clases maestras globales (`scrollbar-premium`, antialiasing) SIEMPRE Y CUANDO no cambien las distancias o tamaños del bloque clonado.
   - **Sugerencias:** Si detectas que el código clonado viola una buena práctica (ej. accesibilidad, redundancia enorme) o usa tamaños que rompen la escala de Tailwind (ej. `px-[17px]`), DEBES hacer la sugerencia al usuario, PERO entregar el componente con el diseño idéntico en primer lugar.

4. **Astroificación Limpia (`.map` y variables):**
   - Tu única alteración estructural permitida es convertir el HTML estático repetitivo en renderizado dinámico.
   - Reemplaza los textos estáticos ("Nux Vomica", "Indicaciones") por variables inyectadas (`{product.name}`).
   - Usa `array.map()` para iterar sobre listas (secciones, bullets, etiquetas) manteniendo el *markup* de un solo elemento (del original) como plantilla.

5. **Iconografía (Precisión Quirúrgica):**
   - Si el HTML incluye un `<svg>` con trazos específicos (ej. `stroke-width="1.5"`), prioriza usar ESE SVG exacto. 
   - Si debes usar el componente `<Icons />` local, asegúrate de envolverlo en un contenedor (`div` o `span`) que controle sus dimensiones exactas (`w-4 h-4 text-slate-700`) para que no rompa el layout del padre.

## Fases de Ejecución

1. **Diagnóstico y Confirmación:** Recibir el código, identificar dónde se insertará y confirmar al usuario que se aplicará la regla de "Fidelidad Visual Absoluta".
2. **Implementación Directa:** Escribir el código en el componente `.astro` destino.
3. **Verificación:** Solicitar al usuario que recargue y valide que el componente luce idéntico a su referencia antes de proceder a otra tarea.
