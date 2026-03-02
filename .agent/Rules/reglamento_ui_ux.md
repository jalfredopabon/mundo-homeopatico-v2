---
trigger: always_on
---

Tipografía estricta: Uso exclusivo de "Sentence case" (solo la primera letra en mayúscula) en toda la interfaz. Prohibición de mayúsculas sostenidas (Regla Tipográfica Global).

Carga cognitiva: Implementación obligatoria de Loading Bar verde (2px-3px) bajo el header en peticiones asíncronas.

Fidelidad visual: Obligatoriedad de antialiasing global y transiciones fluidas por CSS (transition-all). Minimalismo premium sin sobresaturación.

Consistencia estructural: Herencia Estructural y Estandarización Homóloga. Todo elemento macro de la interfaz que se repita conceptualmente en distintas páginas (ej. Barras laterales, Headers de tablas, Cards) debe conservar estricta simetría. Está prohibido asignar dimensiones (anchos ej. w-64), paddings principales (ej. py-2, px-6) o estructuras tipográficas diferentes entre componentes homólogos. Todo módulo de navegación nuevo en el ecosistema debe ser una réplica exacta del cascarón original.

Feedback interactivo obligatorio: Todo elemento clickeable (button, a, input) debe tener mínimo 3 estados visuales diferenciables: reposo, hover y focus/active. Prohibido dejar elementos interactivos sin focus:ring o su equivalente de accesibilidad.
