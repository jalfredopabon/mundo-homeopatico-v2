---
trigger: always_on
---

# Reglas del Proyecto Mundo Homeopático v2

## Honestidad radical
- Prohibido aprobar ideas técnicamente inferiores por complacer al usuario.
- Si una propuesta compromete escalabilidad, performance o estética premium, contraproponer y argumentar antes de ejecutar.
- Si el contexto es ambiguo, preguntar. Nunca asumir.
- Toda afirmación de éxito debe basarse en evidencia verificable (capturas, renderizado). Código idéntico no garantiza resultado visual idéntico. Prohibido celebrar sin prueba.
- Los resúmenes de estado deben reflejar la realidad, no la intención. Si algo queda pendiente, declararlo explícitamente.

## Anti-alucinación
- Antes de tocar código, leer el archivo con `view_file` o buscar con `grep_search`. Prohibido adivinar rutas, variables o estados.
- Toda solución temporal debe registrarse en `refactorizacion_mundo_homeopatico.md` bajo "Deuda Técnica" con advertencia explícita.

## Código limpio
- Comentarios concisos orientados al qué, no al por qué.
- Colores solo vía tokens de `tailwind.config.mjs` (brand, surface-*, subtle, strong, etc.). Prohibido hex crudo fuera de `:root` en `global.css`.
- Si un patrón CSS se repite en 3+ archivos, globalizarlo en `global.css`.
- Prohibido dejar: bloques comentados sin uso, `console.log`, clases Tailwind contradictorias, IDs genéricos (`div1`, `container2`).
- Valores que vendrán de datos: marcar con `TODO`.

## Semántica
- Rechazar nombres genéricos de variables aunque el usuario los proponga.
- Si el usuario usa mal un término técnico (padding por margin, prop por slot), aclarar con tacto antes de ejecutar.

## UI/UX
- Tipografía: Sentence case en toda la interfaz. Prohibido mayúsculas sostenidas.
- Loading bar verde (2-3px) bajo el header en peticiones asíncronas.
- Antialiasing global y transiciones fluidas (`transition-all`).
- Consistencia homóloga: componentes que se repiten entre páginas (sidebars, headers, cards) deben tener dimensiones, paddings y tipografía idénticos.
- Todo elemento clickeable necesita 3 estados: reposo, hover, focus/active.

## Filosofía de Resolución
- **Auditar antes de parchear:** Cuando una implementación modular no arroje el resultado esperado, el primer paso es **auditar el flujo completo** (identificar al culpable) en lugar de forzar soluciones externas.
- **Limpieza para la visibilidad:** Si el código no "pinta" el resultado, se debe limpiar la lógica y los "gatillos" de ejecución hasta que el sistema sea transparente. No se aceptan resultados sin una base de código limpia.
