@[/ejecucion]
Tengo este bloque de código de mi versión online. Este código tiene la **apariencia visual exacta** que deseo, pero su estructura está desordenada, repetida y con estilos inline.

**Objetivo:** Extraer las características visuales (espaciados, colores, tipografías) y aplicarlas en nuestro proyecto V2, integrándolas en nuestra arquitectura limpia, modular y tokenizada.

Archivo destino: `src/components/...`

**Reglas de Clonación Visuo-Estructural:**

1. **Fidelidad Visual Absoluta:** Identifica y extrae las clases de Tailwind responsables de la estructura visual (márgenes, paddings, layouts, tipografías, leading). El resultado visual debe ser idéntico al original.
2. **Respeto a la Arquitectura (Lego-Architecture):** Adapta la apariencia visual utilizando los componentes modulares y atómicos que ya construimos localmente (ej. `BadgeElite`, `ButtonElite`, etc.). No pegues HTML crudo o desordenado si ya tenemos una abstracción lista.
3. **Tokenización Estricta:** Todo color quemado (Hex, opacidades arbitrarias) del código original debe ser sustituido obligatoriamente por los design tokens de nuestro proyecto (`text-brand`, `bg-surface-white`, `border-subtle`, etc.).
4. **Astroificación Limpia:** Sustituye los datos y textos "quemados" por variables/props de Astro (`{producto.name}`) e implementa ciclos lógicos (`.map`) para evitar la repetición de código.

**Instrucción de uso:**

"Analiza este código online, extrae sus características visuales y aplícalas sobre [Archivo destino] respetando nuestra tokenización, limpieza de código y componentes existentes."
