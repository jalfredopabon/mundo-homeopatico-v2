@[/ejecucion]
Tengo este bloque de código HTML (o componente) de mi versión online que quiero clonar en el V2.
Archivo destino: `src/components/...`

**Reglas de Clonación Estricta:**

1. **Fidelidad Visual Absoluta:** Usa EXACTAMENTE el mismo HTML, las mismas clases de Tailwind (márgenes, tipografías, leading) de mi código fuente.
2. **Cero Sobre-Ingeniería:** NO crees sub-componentes nuevos (`Atoms`/`Molecules`) ni abstraigas cosas a menos que yo lo pida expresamente. NO uses componentes viejos locales si cambian el diseño.
3. **Astroificación Limpia:** Solo reemplaza los textos/datos "quemados" (ej: "Nux Vomica") por las variables de Astro (`{producto.name}`) y usa `.map` para las listas.
4. **Respetar Tokens Globales:** Sustituye los hex (#xxx) por los tokens de Mundo Homeopático (`text-brand`, `bg-surface-white`, `border-subtle`).

   **Instrucción:**

"Ejecuta @/clonacion_estricta con este código: [tu código HTML]"
