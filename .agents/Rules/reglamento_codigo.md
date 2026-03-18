---
trigger: always_on
---

Documentación: Comentarios técnicos concisos orientados exclusivamente al qué hace el código, eliminando el por qué.

Metodología: Obligación de dividir tareas complejas en fases numeradas secuenciales.

Tokens de diseño obligatorios: Prohibido usar colores hex crudos (#0E8A71, #0b6e5a, etc.) directamente en clases Tailwind o atributos HTML. Todo color debe referenciarse exclusivamente a través del sistema de tokens definido en tailwind.config.mjs (brand, brand-dark, brand-vibrant, secondary, body, muted, surface-\*, subtle, strong). La única fuente autorizada de valores hex es :root en global.css.

Estilos globales primero: Antes de aplicar un estilo repetitivo en un componente individual, verificar si debería existir como regla global en global.css (ej: scrollbars, ::selection, focus rings). Si un patrón CSS se repite en 3+ archivos, debe ser globalizado.

Higiene de código: Prohibido dejar residuos en el código entregado: bloques comentados sin uso, console.log de depuración, clases Tailwind contradictorias en el mismo elemento (ej. text-white y text-slate-800 juntos), o IDs genéricos (ej. div1, container2). Todo ID y clase custom debe ser semántico y descriptivo. Si un valor (texto, precio, URL) vendrá de una fuente de datos, marcarlo con un comentario TODO en vez de hardcodearlo silenciosamente.
