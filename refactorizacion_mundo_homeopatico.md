# Refactorización de Mundo Homeopático

> **📍 DIRECTORIO DE TRABAJO:**
> Todo el proceso de refactorización y el nuevo código reside exclusivamente en la carpeta `mundo_homeopatico_v2`.
> La carpeta original `proyecto_mundo_homeopatico` es la versión legacy y se usa **únicamente** como referencia. No se modifica.
> Los cascarones de diseño (Stitch) están en `proyecto_mundo_homeopatico/.agent/stich/`.

---

## 🛡️ REGLAMENTO OPERATIVO "ELITE"

**Protección de arquitectura:** Actuar como consultor técnico crítico. Advertir y detener la ejecución si una instrucción compromete el rendimiento, la filosofía de diseño UI/UX o las buenas prácticas de desarrollo del proyecto. Nunca ejecutar una orden incoherente sin antes presentar una observación técnica detallada.

---

## 📋 Contexto del Proyecto

### ¿Qué es?

Una plataforma web B2B para una empresa de productos homeopáticos. No es un e-commerce convencional; es un catálogo digital con sistema de pedidos por WhatsApp, dirigido a médicos y farmacias.

### ¿Qué existe hoy?

Un archivo monolítico (`index.html`) de ~10,000 líneas que mezcla HTML + CSS (Tailwind CDN) + JavaScript. Funciona, pero es inmantenible, difícil de depurar y riesgoso ante cualquier cambio.

### ¿Qué páginas tiene/tendrá?

| Página                          | Función                                                                                                    | Datos                            | Acceso      |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| **Catálogo / Lista de Precios** | Tablas de productos alimentadas por Sheets. Botones para agregar al carrito. Pedido se envía por WhatsApp. | Google Sheets (público)          | Público     |
| **Contacto / Sedes**            | Video institucional, información de contacto, distribuidores, FAQ.                                         | Google Sheets (público)          | Público     |
| **Vademécum Clínico**           | Ficha técnica de productos (composición, indicaciones, posología). Requiere autenticación con NIT/Cédula.  | Google Sheets (privado, vía GAS) | Restringido |

### Estructura y Detalles de UI por Página

**Regla Tipográfica Global:** Todos los botones, títulos y subtítulos (sin importar el nivel) llevan **solo la primera letra en mayúscula** (Sentence case). Prohibido usar mayúsculas sostenidas en la interfaz, incluyendo el nombre de la empresa.

#### 1. Página "Lista de Precios" (Catálogo)

- **Sidebar (Panel Izquierdo):**
  - Contiene un **buscador de productos** en la parte superior. Al escribir (ej. "gel"), busca coincidencias y muestra un listado interactivo.
  - El sidebar muestra la jerarquía de productos por niveles:
    - **Nivel 1:** Títulos principales ("De nuestra farmacia", "Productos exclusivos")
    - **Nivel 2:** Subcategorías (Ej. "Según prescripción", "Línea MH")
    - **Nivel 3:** Agrupadores o categorías con tabla (Ej. "Homeopáticos" [solo agrupa], "Esencias florales" [tabla])
    - **Nivel 4:** Subcategorías finales con tabla (Ej. "Oficinales", "Multipotencias")
- **Panel Principal:**
  - Muestra títulos, subtítulos, descripciones y las **Tablas de Productos**.
  - **Columnas de la tabla:** Nombre del producto (arriba) y descripción (abajo) | Precio a farmacias | Precio a público | Botón `+` para agregar al carrito.
  - **Interacción del botón:** Al hacer clic en `+` cambia a `- 1 +` permitiendo incrementar o reducir cantidad. El ícono global del carrito actualiza la suma total.

#### 2. Página "Sedes y Contacto"

- **Sidebar (Panel Izquierdo):**
  - Mismos Títulos nivel 1 ("Excelencia homeopática", "Sedes y distribuciones", "Preguntas frecuentes").
  - Un botón de Instagram (Ubicado donde va el buscador en la vista de Lista de Precios).
  - Un flexbox alineado en el borde inferior.
- **Panel Principal:**
  - **Sección 1:** Video Institucional.
  - **Sección 2:** Sede Principal (Mapa, 3 números de WhatsApp, dirección, horario, sede).
  - **Sección 3:** Distribuidores autorizados (Misma info que la principal pero sin mapa).
  - **Sección 4:** FAQ (Preguntas frecuentes con formato acordeón).

#### 3. El Header Global (Estandarizado)

- **Izquierda:** Isotipo + Nombre de la empresa (alineados al sidebar).
- **Centro (Navegación):** "Lista de precios", "Contactos y sedes", "Soy médico". Al hacer clic en "Soy médico" se despliega un **modal o recuadro solicitando contraseña**.
- **Derecha (Controles):**
  - **Botón de Accesibilidad (Zoom):** Icono `AA` con la palabra "Zoom" debajo. Permite ciclar tamaño de letra (normal, mediano, grande) solo para los ítems de las tablas de productos. Al hacer hover muestra el estado actual. _Nota: Este botón debe mostrarse SOLO en la página "Lista de precos"._
  - **Botón Carrito:** Icono del carrito con burbuja de cantidad. Visible en TODAS las páginas.
- **Drawer / Panel del Carrito:**
  - Listado de productos agregados (nombre, sumatoria `- N +`, precio unitario). Sumatoria por producto (cant. \* precio).
  - Campo de texto para notas/detalles.
  - Formulario de datos del cliente: Nombre (Oblig.), Cédula/NIT (Oblig.), WhatsApp (Oblig.), Teléfono (Opc.), Correo (Opc.), Dirección de entrega (Opc.).
  - Select para Método de Pago: "Efectivo", "Transferencia/Consignación", "Nequi/Daviplata".
  - Botón "Vaciar pedido".
  - Total global a pagar.
  - **Botones de Envío:** Un botón manda pedido a "Pedidos médicos" (WhatsApp 1) y otro a "Pedidos farmacias" (WhatsApp 2).

#### 4. El Footer Global (Estandarizado)

- Logo "MH" + Nombre "Mundo Homeopático".
- Párrafo descriptivo: "Más de 20 años elaborando productos homeopáticos con los más altos estándares de calidad."
- Sección "Síguenos" con botones sociales (Instagram, WhatsApp, Web mhmundohomeopatico.com).
- Copyright: "© 2026 Mundo Homeopático. Todos los derechos reservados."
- Créditos: "Creado por: Alfredo Pabón".
- Ubicación: "Medellín. Colombia".

#### 5. Consideraciones Transversales de UI/UX

- **Barra de Progreso (Loading Bar):** Implementación OBLIGATORIA de una línea verde sutil (2px-3px) justo debajo del Header. Proporciona feedback visual inmediato durante peticiones asíncronas o cargas de datos, evitando que el usuario perciba lentitud o haga clics compulsivos.
- **Optimización Tipográfica (Antialiasing):** Aplicar suavizado de fuentes globalmente (clase `antialiased` en el `<body>`). Esto asegura texto prolijo y nítido en monitores antiguos o de baja resolución, evitando que las letras se vean "mordidas" por el pixel-snapping.
- **Precisión Tipográfica (text-box-trim):** Implementación de la propiedad `text-box-trim` para eliminar el espacio invisible (leading) arriba y abajo de los textos. Esto permite una alineación matemática perfecta de 8px en botones y componentes con iconos, garantizando centrado quirúrgico en navegadores modernos.
- **Equilibrio Visual (text-wrap: balance/pretty):** Uso de algoritmos de balanceo de texto en títulos para evitar palabras huérfanas y asegurar bloques de texto armoniosos sin intervención manual.
- **Transiciones Orgánicas (interpolate-size):** Activación de animaciones nativas para dimensiones dinámicas (de `0` a `auto`), permitiendo que acordeones y menús se desplacen de forma fluida sin trucos de JavaScript.
- **Estabilidad Estructural (scrollbar-gutter):** Reserva de espacio estable para la barra de desplazamiento, evitando saltos horizontales del layout cuando el contenido crece o decrece.
- **Navegación Precisa (scroll-padding-top):** Configuración de margen de navegación para compensar el Header fijo, asegurando que los anclajes y secciones se posicionen perfectamente visibles debajo de la cabecera.
- **Estética Flat Design (Cero Sombras):** Eliminación total de sombras (`box-shadow`, `shadow-*`) en todos los componentes y contenedores. La jerarquía visual se define exclusivamente mediante el uso de color, bordes sutiles (`border-subtle`) y espacios, logrando una interfaz limpia, profesional y libre de profundidades artificiales.
- **Micro-animaciones Premium:** Mantener y pulir las interacciones ricas heredadas del monolito. Ejemplo: La tarjeta "Sé distribuidor / WhatsApp" del sidebar debe mantener su efecto hover expansivo hacia arriba que revela elementos gráficos (hojas). Estas animaciones se harán por CSS fluido (`transition-all`, `group-hover`) para no afectar el rendimiento y aportar vitalidad a la marca.

### Lógica de negocio crítica (funcional en el monolito):

- **Mini-lenguaje en celdas de Sheets:** Caracteres especiales (`^`, `§`, `|`) que el JS interpreta para generar UI compleja.
- **Algoritmo de jerarquía ("Fill Down"):** Infiere la estructura árbol (Categoría → Subcategoría → Producto) desde celdas vacías.
- **Caché híbrida (Stale-While-Revalidate):** Carga instantánea desde `localStorage`, actualiza en segundo plano.
- **SEO dinámico:** JSON-LD inyectado por JS desde datos de Sheets.
- **Configuración remota:** Textos legales, contacto y enlaces se inyectan desde una hoja CONFIG.

### ¿Dónde vive actualmente?

En un hosting PHP legacy (mhmundohomeopatico.com). El proyecto nuevo debe coexistir sin romper el sitio antiguo, mediante aislamiento por infraestructura (subcarpeta o subdominio).

---

## 🛠️ Stack Tecnológico Definitivo

| Capa                         | Tecnología                            | Justificación                                                                                                                                                               |
| ---------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**                | **Astro**                             | Genera HTML estático desde componentes reutilizables. Zero JS por defecto = máximo SEO y rendimiento. Sistema de layouts y rutas nativo para multipágina.                   |
| **Estilos**                  | **Tailwind CSS**                      | Integración oficial con Astro. Purgado automático de clases. Variables CSS en `:root` para Design Tokens y rebranding fácil.                                                |
| **Lenguaje**                 | **TypeScript (modo relajado)**        | Detección de errores en tiempo de desarrollo. Mejor colaboración con agentes IA (contratos de datos). Modo relajado permite JS normal donde no se requiera tipado estricto. |
| **Lógica del cliente**       | **Vanilla JavaScript (ES6 Modules)**  | La lógica de negocio se ejecuta en el navegador. No se requiere React/Vue/Angular. Los módulos ES6 dan estructura sin framework.                                            |
| **Datos públicos**           | **Google Sheets**                     | Costo cero. Los clientes editan directamente. La caché local elimina el problema de rendimiento.                                                                            |
| **Datos privados**           | **Google Apps Script (GAS) como API** | Único punto de acceso a datos sensibles. El frontend nunca ve la URL de la hoja ni las credenciales.                                                                        |
| **Optimización de imágenes** | **Componente `<Image />` de Astro**   | Conversión automática a WebP/AVIF, atributos `width`/`height` para Core Web Vitals, lazy loading nativo.                                                                    |
| **SEO**                      | **JSON-LD + meta tags dinámicos**     | Componente SEO reutilizable que inyecta datos estructurados por página.                                                                                                     |
| **Despliegue**               | **Cloudflare Pages**                  | Hosting gratuito para sitios estáticos. CDN global. HTTPS automático. Dominio ~$10 USD/año.                                                                                 |

### ¿Por qué Astro y no Vite puro?

- **Componentes reutilizables nativos:** Header, Footer, Sidebar se escriben una vez y se usan en todas las páginas. No requiere inyección vía JavaScript.
- **HTML completo desde el primer byte:** A diferencia de Vite + Vanilla JS donde los componentes compartidos se inyectan tras la carga (parpadeo, peor SEO), Astro compila todo a HTML estático completo.
- **El resultado final es idéntico:** archivos HTML, CSS y JS estáticos que se suben a cualquier hosting.
- **La lógica JS existente NO se reescribe.** Se extrae a módulos ES6 y se usa dentro de tags `<script>` en componentes Astro.

### ¿Por qué NO otros frameworks?

- **¿React/Angular/Vue?** Complejidad innecesaria. La lógica ya funciona en Vanilla JS.
- **¿Next.js/Nuxt?** Requieren servidor (Node.js). El hosting es PHP. Astro compila a estáticos.
- **¿SQL?** El cliente necesita editar datos sin panel técnico. Google Sheets ya es ese panel, gratis.

---

## 🏗️ Arquitectura de Datos

### Datos públicos (Catálogo, Contacto)

```
[Google Sheets públicas] → fetch CSV desde el navegador → PapaParse → JSON → Renderizado
```

- Estrategia de caché: **Stale-While-Revalidate** con `localStorage` y versionado.
- Fallback a `IndexedDB` si los datos superan 5MB.

### Datos privados (Vademécum)

```
[Médico] → Ingresa NIT + Contraseña
    ↓
[Frontend JS] → POST a URL de GAS (envía credenciales)
    ↓
[GAS (Servidor Google)] → Busca en Hoja "Usuarios" (PRIVADA)
    ├── ❌ No encontrado → HTTP 401 → "NIT no registrado"
    └── ✅ Encontrado → Genera Token (NIT + HMAC + Timestamp)
        → HTTP 200 + Token + Datos del Vademécum
    ↓
[Frontend JS] → Guarda Token en sessionStorage → Renderiza datos
    ↓
[Recarga/Navegación] → Frontend envía Token a GAS → GAS valida
    ├── ❌ Token inválido/expirado → Pide login de nuevo
    └── ✅ Token válido → Entrega datos
```

- **Regla innegociable:** El token se revalida en GAS con cada petición sensible. La validación exclusivamente en frontend es inútil.
- **Contraseñas:** Almacenar hashes, nunca texto plano.

---

## 📁 Estructura del Proyecto (Astro)

```
mundo_homeopatico_v2/
├── astro.config.mjs          ← Configuración de Astro (Tailwind, TypeScript)
├── tailwind.config.mjs       ← Design Tokens, colores, tipografía
├── tsconfig.json             ← TypeScript en modo relajado
├── package.json
├── refactorizacion_mundo_homeopatico.md  ← Este archivo (guía del proyecto)
│
├── src/
│   ├── components/
│   │   ├── shared/           ← Componentes presentes en TODAS las páginas
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Nav.astro
│   │   │   └── SEO.astro     ← Meta tags + JSON-LD dinámico
│   │   │
│   │   ├── sections/         ← Bloques grandes ensamblables por página
│   │   │   ├── Hero.astro
│   │   │   ├── VideoSection.astro
│   │   │   ├── FAQ.astro
│   │   │   ├── Locations.astro
│   │   │   ├── PriceTable.astro
│   │   │   ├── CartDrawer.astro
│   │   │   ├── Sidebar.astro
│   │   │   ├── VademecumGrid.astro
│   │   │   ├── VademecumDetail.astro
│   │   │   └── AuthModal.astro
│   │   │
│   │   └── ui/               ← Piezas pequeñas reutilizables
│   │       ├── Button.astro
│   │       ├── Card.astro
│   │       ├── Badge.astro
│   │       └── Toast.astro
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro  ← Esqueleto: Header + <slot /> + Footer
│   │
│   ├── pages/
│   │   ├── index.astro       ← Catálogo / Lista de Precios
│   │   ├── contacto.astro    ← Sedes y Contacto
│   │   └── vademecum.astro   ← Vademécum Clínico (acceso restringido)
│   │
│   ├── js/
│   │   ├── core/
│   │   │   ├── config.ts     ← URLs de APIs, constantes, claves de caché
│   │   │   └── utils.ts      ← Funciones puras: escapeHtml, formatCurrency, normalizeText, parsers
│   │   ├── modules/
│   │   │   ├── cart.ts        ← CartManager, CartUI, WhatsAppBuilder
│   │   │   ├── catalog.ts     ← RenderEngine, jerarquía Fill Down
│   │   │   ├── vademecum.ts   ← Búsqueda, filtros, ficha técnica
│   │   │   └── ui-handlers.ts ← Event delegation, ripple, toast, sidebar
│   │   └── services/
│   │       ├── data-service.ts ← Fetch a Sheets/GAS, caché SWR
│   │       └── auth-service.ts ← Autenticación Vademécum vía GAS
│   │
│   └── styles/
│       ├── global.css         ← Directivas Tailwind + imports de archivos CSS
│       ├── variables.css      ← Design Tokens en :root
│       ├── base.css           ← Reset, tipografía global
│       ├── layout.css         ← Header, Footer, Sidebar, Grid
│       └── components.css     ← Tarjetas, Botones, Modales, Badges
│
└── public/
    ├── images/               ← Logos, iconos, assets estáticos
    └── fonts/                ← Fuentes locales (si aplica)
```

---

## 🧱 FASES DE CONSTRUCCIÓN (Modelo de Construcción Civil)

### FASE 1: CIMIENTOS (Entorno, Herramientas y Configuración)

**Objetivo:** Tener un proyecto Astro funcional con Tailwind y TypeScript configurados, listo para recibir código.

**Tareas:**

~~1. Inicializar proyecto Astro con TypeScript en modo relajado.~~ ✅
~~2. Instalar y configurar integración oficial de Tailwind CSS.~~ ✅
~~3. Configurar `tailwind.config.mjs` con Design Tokens (colores semánticos, tipografía, espaciados).~~ ✅
~~4. Crear estructura de directorios (`components/`, `layouts/`, `pages/`, `js/`, `styles/`).~~ ✅
~~5. Crear `BaseLayout.astro` con esqueleto mínimo (HTML, head, body, slot).~~ ✅
~~6. Crear las tres páginas vacías (`index.astro`, `contacto.astro`, `vademecum.astro`) usando el layout base.~~ ✅
~~7. Verificar que `npm run dev` funciona y las tres rutas cargan correctamente.~~ ✅

**Verificación de cimientos:**

- [x] `npm run dev` / `npm run build` funciona sin errores.
- [x] Las tres páginas cargan en el navegador (/, /contacto, /vademecum).
- [x] Un texto con una clase de Tailwind se ve correctamente.

---

### FASE 2: PAREDES (Componentes Compartidos + Estructura HTML)

**Objetivo:** Tener los componentes compartidos (Header, Footer) estandarizados y las tres páginas con su estructura semántica y contenedores vacíos.

> **🧩 NOTA IMPORTANTE SOBRE DISEÑOS STITCH:**
> Contamos con 3 pantallas generadas en Google Stitch guardadas como referencia en `proyecto_mundo_homeopatico/.agent/stich/`. Dado que presentan diferencias e inconsistencias entre sí, **es OBLIGATORIO estandarizarlas primero** antes de implementarlas. Extraeremos lo que tienen en común y crearemos un **Sistema de Diseño Único**. Bajo ninguna circunstancia se copiarán y pegarán tal cual.

#### Plan de Estandarización por Componentes

Antes de crear los componentes, se realiza un proceso de unificación partiendo de los cascarones de Stitch:

1. **El Header (Cabecera):** Extraer el mejor diseño, estandarizar clases de Tailwind, fijarlo como componente único `Header.astro`.
2. **El Footer (Pie de página):** Fusionar los 3 footers, unificar paleta y tipografía, consolidarlo como `Footer.astro`.
3. **El Carrito y su Panel (Drawer):** Estructurar el panel lateral como `CartDrawer.astro`.
4. **Los Sidebars (Menús laterales):** Estandarizar márgenes y ritmos visuales como `Sidebar.astro`.
5. **El Contenido Principal:** Estandarizar grillas, tablas y textos por página.

**Tareas:**

1. Crear `Header.astro` estandarizado (navegación + carrito + accesibilidad + zona perfil Vademécum).
2. Crear `Footer.astro` estandarizado.
3. Integrar Header y Footer en `BaseLayout.astro`.
4. Crear `Nav.astro` con indicador de página activa.
5. Crear `SEO.astro` (meta tags + JSON-LD dinámico por página).
6. Definir contenedores semánticos vacíos por página:
   - **Catálogo:** Sidebar de categorías, tabla de precios, panel del carrito.
   - **Contacto:** Sección de video, grilla de sedes, acordeón FAQ.
   - **Vademécum:** Modal de autenticación, filtros, grilla de productos, panel de ficha técnica.

**Verificación de paredes:**

- [ ] Las tres páginas cargan con Header y Footer renderizados.
- [ ] La navegación entre páginas funciona.
- [ ] Los contenedores vacíos existen en el DOM.
- [ ] El HTML generado incluye Header y Footer completos (sin inyección JS).

---

### FASE 3: CABLEADO (Lógica JS Modularizada + Conexión a Datos)

**Objetivo:** Migrar toda la lógica funcional del monolito a módulos TypeScript aislados, conectados entre sí mediante `import`/`export`.

**Orden estricto de migración:**

1. **config.ts** — `APP_CONFIG` con URLs de APIs, constantes, versiones de caché. Dependencia base de todos los módulos.
2. **utils.ts** — Funciones puras: `escapeHtml`, `formatCurrency`, `normalizeText`, parser del mini-lenguaje (`^`, `§`, `|`). Documentadas con JSDoc.
3. **data-service.ts** — Fetch a Sheets públicas, parseo con PapaParse, caché SWR con `localStorage` y versionado. Fallback a IndexedDB si supera 5MB.
4. **auth-service.ts** — `login(nit, password)`, `validateToken(token)`, `isAuthenticated()`. Lee/escribe `sessionStorage`. Nunca expone la URL de Sheets.
5. **cart.ts** — CartManager (CRUD sobre `localStorage`), CartUI (renderizado del drawer), WhatsAppBuilder (mensaje formateado con items + datos personales).
6. **catalog.ts** — RenderEngine + algoritmo de jerarquía Fill Down. **No simplificar el bucle de `buildHierarchy` sin entender la lógica de celdas vacías.**
7. **vademecum.ts** — Verificación de autenticación, búsqueda con normalización bidireccional, filtrado multivalor, renderizado progresivo, History API para móvil.
8. **ui-handlers.ts** — Event delegation global, gestión de estado visual con clases CSS, toast, ripple, sidebar toggle, control de tamaño de fuente con persistencia.

**Verificación de cableado:**

- [ ] La lista de precios carga datos desde Sheets y renderiza correctamente.
- [ ] El carrito agrega, elimina, persiste entre páginas y genera el mensaje de WhatsApp.
- [ ] El Vademécum requiere login y muestra datos solo tras autenticación exitosa.
- [ ] La búsqueda con tildes funciona correctamente.
- [ ] El sidebar con jerarquía se renderiza correctamente.
- [ ] Ninguna variable está en el objeto global `window`.

---

### FASE 4: PINTURA (Estilos, Animaciones y Pulido Visual)

**Objetivo:** Trasladar el sistema visual al nuevo proyecto, aplicar Design Tokens globales y pulir la experiencia.

**Tareas:**

1. Migrar Design Tokens a `variables.css` (todas las variables `:root` del monolito).
2. Mapear cada variable al `theme.extend` de `tailwind.config.mjs`.
3. Migrar estilos base a `base.css` (reset, tipografía global).
4. Migrar estilos de layout a `layout.css` (header, footer, sidebar, grid).
5. Migrar estilos de componentes a `components.css` (tarjetas, botones, modales, badges, skeleton loaders).
6. Eliminar toda referencia al CDN de Tailwind.
7. Configurar `global.css` como punto de entrada que importa Tailwind y los archivos CSS modulares.
8. Build de producción: `npm run build` → verificar peso del CSS final (objetivo: 10-20KB).

**Verificación de pintura:**

- [ ] La página se ve idéntica o mejor que el monolito original.
- [ ] No hay parpadeos (flicker) al cargar.
- [ ] Las animaciones, ripple effects y toasts funcionan.
- [ ] El responsive es correcto en móvil.
- [ ] Core Web Vitals en verde (LCP, FID, CLS).

---

## 🔴 Consideraciones Críticas

### Seguridad

- **Contraseñas en Google Sheets:** Almacenar hashes, nunca texto plano. GAS puede hashear el input del usuario y comparar hashes.
- **Cuotas de Google Sheets/GAS:** Sheets ~300 peticiones/min. GAS ~20,000 ejecuciones/día (cuenta gratuita). La estrategia SWR es obligatoria.
- **CORS:** Probar temprano las peticiones `fetch` desde el dominio hacia `script.google.com`.

### Dependencias

- **PapaParse:** Instalar vía `npm install papaparse` (no CDN). Vite/Astro lo incluye en el bundle optimizado.
- **Variables de entorno (.env):** URLs de Sheets y GAS no deben estar hardcodeadas. Astro soporta `import.meta.env.PUBLIC_*` nativamente. Agregar `.env` al `.gitignore`.

### Despliegue

- Configurar `base` en `astro.config.mjs` si se usa subcarpeta (ej. `/catalogo/`).
- Agregar regla en `.htaccess` para que Apache sirva la subcarpeta directamente.

---

## 🟡 Mejoras Futuras (Post-MVP)

- **Service Worker:** Permitir consulta offline del Vademécum para fichas ya descargadas.
- **Decap CMS:** Para el boilerplate de landing pages (segundo proyecto). No aplica para Mundo Homeopático.
- **Monitoreo de errores:** Módulo de logging que envíe reportes de errores a un Google Form.
- **Accesibilidad (a11y):** `aria-labels` en botones de acción, contraste 4.5:1 mínimo, control de tamaño de fuente.
- **Transición visual:** Banner "Estás en nuestro nuevo catálogo digital" con enlace al sitio legacy.

---

## 📊 Resumen de Decisiones

| Decisión                             | Veredicto                                                                                |
| ------------------------------------ | ---------------------------------------------------------------------------------------- |
| ¿Astro?                              | **Sí, obligatorio.**                                                                     |
| ¿Tailwind?                           | **Sí, integración oficial con Astro.**                                                   |
| ¿TypeScript?                         | **Sí, modo relajado.**                                                                   |
| ¿Vanilla JS para lógica?             | **Sí, con módulos ES6.**                                                                 |
| ¿Google Sheets?                      | **Sí, mantener.**                                                                        |
| ¿GAS para seguridad?                 | **Sí, viable para este nivel B2B.**                                                      |
| ¿SQL?                                | **No por ahora.** La arquitectura modular permite migrar tocando solo `data-service.ts`. |
| ¿Framework reactivo (React/Angular)? | **No.** Complejidad innecesaria.                                                         |
| ¿CMS para este proyecto?             | **No.** Google Sheets es el CMS.                                                         |
| ¿Coexistencia con PHP?               | **Aislamiento por infraestructura.**                                                     |
| ¿Hosting?                            | **Cloudflare Pages (gratis) + dominio Cloudflare (~$10/año).**                           |

---

## 📝 Pendientes (Backlog)

_Este listado consolida tareas menores de integración y optimización que deben abordarse en fases de "Cableado" avanzado o al final del proyecto:_

- [ ] **`Header.astro`**: Ligar el ancho (`w-[X%]`) de la Barra de Progreso (Loading Bar) a los estados asíncronos reales (actualmente hardcodeada en `w-[30%]`).
- [ ] **`Header.astro`**: Volver dinámica la "Burbuja de notificación" (Badge) del icono de Pedidos para que refleje la longitud real del arreglo `cart` (actualmente está fija en `3`).
- [ ] **Herencia de Radios (Nested Radii)**: Ajustar radios de bordes matemáticamente para asegurar armonía visual (Radio Exterior - Padding = Radio Interior).
- [ ] **Etiquetado para Analítica**: Inyectar atributos `data-analytics` o `data-cta` en todos los puntos de conversión para rastreo de métricas futuro.
- [ ] **Rejilla Estricta de 8px**: Auditoría de espaciados (paddings, margins, gaps) para asegurar que todos los valores sean múltiplos de 8.
- [ ] **Identidad de Iconos**: Finalización de la migración a Hugeicons Rounded con sistema de estados Stroke/Solid.

---

## 📓 Bitácora de Avance

_(Este registro es exclusivo para marcar hitos relevantes y tareas arquitectónicas o visuales completadas de manera íntegra, no para ediciones menores.)_

- **[2026-02-26] Finalización y Estandarización Modular Global (Cimientos y Cascarones Base):**
  - Creación e integración del layour base (`BaseLayout.astro`) permitiendo reutilizar estructura general, metadatos y control de dependencias sin duplicar código.
- **[2026-02-26] Finalización del componente Header:**
  - Implementación del diseño interactivo en Header responsivo con Glassmorphism (`backdrop-blur`).
  - Integración del modo inactivo/activo usando un indicador inferior verde ('brand') exclusivo para la página actual, suprimiendo líneas bajo páginas inactivas por reglas de minimalismo.
  - Botón "Soy médico" convertido a una cápsula dinámica (Call To Action invertida) como factor visual diferencial ante la navegación pública.
- **[2026-02-26] Finalización del componente Footer:**
  - Reajuste estético alineado al contraste corporativo (modo oscuro premium verde sólido) manteniendo las tipografías consistentes (sin mayúsculas sostenidas) y limpiando el modelo del reseteo del navegador a todo lo ancho de la ventana.
  - Alineación de malla fina ('Baseline misalignment' corregido) estructurando la altura idéntica de las cabeceras de 3 columnas y reubicación simétrica centralizada del crédito de agencia de desarrollo.
- **[2026-02-26] Consolidación Fase 2 (Estructura Perimetral Completada):**
  - Componentes `Header` y `Footer` auditados con estándares premium de UI/UX minimalista funcional. Despliegue correcto de los layouts responsivos en las páginas `/` (Lista de precios/Catálogo) y `/vademecum` (Soy médico). Activación cruzada del prop dinámico `mostrarZoom`.
- **[2026-02-26] Arquitectura de Layout Principal tipo "Dashboard":**
  - Reestructuración del `index.astro` para abandonar el formato de página web tradicional y adoptar un modelo de aplicación (Dashboard).
  - Columna Izquierda (Sidebar) fija con scrollbar invisible customizada (solo visible en hover) y lógica de acordeones minimalista.
  - Columna Derecha fluida (Scrollable Main Content) con anclaje flexbox absoluto que garantiza que el Footer siempre se mantenga en el fondo de la pantalla, sin importar la cantidad de datos.
- **[2026-02-26] Implementación de Jerarquía Visual Premium (Main Content):**
  - Diseño e integración de Migas de Pan (Breadcrumbs) minimalistas en el encabezado de las tablas.
- **[2026-02-27] Implementación Arquitectónica y Lógica Core del Carrito de Compras (CartDrawer):**
  - Construcción del componente `CartDrawer.astro` con tres niveles estructurales (Header fijo, body scrollable, footer de formulario).
  - Desarrollo de funcionalidad lógica definitiva en Vanilla JS (gestión de estado `cart[]`, cálculos de subtotales, interacción dinámica `[- 1 +]`).
  - Implementación de Eventos Personalizados (`addToCart`, `toggleCart`) como puente de comunicación asíncrona entre componentes desconectados en el DOM (Botones estáticos vs. Panel vs. Header).
- **[2026-02-28] Estandarización Homóloga de Sidebars (Contacto y Catálogo):**
  - Implementación estricta de herencia estructural y visual (alineaciones matemáticas Edge-to-Edge) entre los paneles laterales.
  - Corrección global de la regla tipográfica `Sentence case` eliminando mayúsculas sostenidas de contenedores auxiliares.
- **[2026-02-28] ScrollSpy Dinámico Inteligente (Catálogo):**
  - Creación de lógica asíncrona mediante `IntersectionObserver` para auto-resaltado topológico de secciones en pantalla, eliminaciones temporales de conflictos `hover` en Tailwind, e inyección dinámica del estado activo al menú e íconos interactivos de cuarto nivel (Jerarquía visual).
- **[2026-02-28] Cinta de Alerta Frontal UI Premium (Catálogo):**
  - Maquetación y posicionamiento nativo edge-to-edge con padding heredado para banner desestimatorio interactivo, integrando microanimaciones de cierre limpio e ícono verde corporativo acorde a UI Premium.
- **[2026-02-28] Cascarón Completo del Vademécum Clínico (/vademecum):**
  - Construcción del Dashboard de 3 columnas (Sidebar w-64 de filtros, Grilla central de tarjetas clínicas, Panel lateral derecho de Ficha Técnica).
  - Implementación del Modal de Autenticación con Glassmorphism, campos NIT/Contraseña, toggle de visibilidad, caja de error, y CTA premium.
  - Migración de iconografía de `material-symbols` (librería externa) a SVGs nativos de trazado puro en todas las secciones.
  - Purificación tipográfica completa: eliminación de `uppercase`/`tracking-widest` del borrador Stitch, aplicación estricta de Sentence Case.
- **[2026-03-01] Consolidación Fase 2 (Paredes) - Sedes y Contacto:**
  - Limpieza profunda de HTML/CSS (Higiene de código): erradicación de redundancias y sombras `rgba` crudas, reemplazadas por tokens del sistema (`shadow-brand/50`).
  - Estandarización Homóloga con Catálogo: inyección de proporciones espaciales simétricas (paddings, gaps) y jerarquía tipográfica exacta en el contenido principal.
  - Aplicación estricta de la regla Tipográfica Global (Sentence case) en todos los nodos de texto de la vista.
- **[2026-03-01] Ejecución Micro-Quirúrgica UI (Patrón "Lienzo y Componentes"):**
  - Implementación definitiva del "Dashboard App Feel" inyectando gris corporativo (`bg-surface-muted/30`) a los contenedores principales fluidos de las tres páginas maestras, reservando el blanco inmaculado (`bg-surface-white`) estrictamente para Sidebars, Tarjetas, Tablas de Precios y Fichas Técnicas.
  - Purga global visual (UI): Destrucción de bordes crudos Slate y sombras monstruosas personalizadas herencia de diseños previos en todas las grillas e interfaces. Se estandariza a `border-subtle` y `shadow-sm`, recuperando el minimalismo premium.
  - Modificación estructural del Footer: Eliminación total en el entorno médico (`/vademecum`) purificando su naturaleza como herramienta clínica de uso intenso sin interrupciones visuales panfletarias. En Catálogo e Inicio conservó un rediseño de UI contenida solo dentro de la columna main fluid para jerarquizar el poder de acción del Sidebar global.
- **[2026-03-02] Componentización y Orquestación Modular de Sedes y Contacto:**
  - Migración atómica de la página de contacto a componentes de sección en `src/components/sections/` (`VideoSection`, `Locations`, `FAQ`).
  - Refactorización de `contacto.astro` eliminando lógica inline extensiva y transformándola en un lienzo de ensamblaje modular.
  - Estandarización de `Sentence case` y Design Tokens en todos los nuevos sub-componentes extraídos.
- **[2026-03-02] Migración Cromática al Verde Petróleo Premium:**
  - Sustitución del verde medio (`#0E8A71/#12A388/#0B6E5A`) por el esquema bicromático del legacy: Verde Petróleo Profundo (`#0A5C4E`) como color corporativo base y Verde Jade (`#158C77`) como color vibrante de acción. Comportamiento de botones estandarizado: "Soy médico" oscuro→jadeal hover, CTAs y botones "+" jade→oscuro al hover. Sincronización global en `global.css`, `index.astro`, `vademecum.astro`, `Header.astro` y `Locations.astro`.
- **[2026-03-02] Purga Global de Sombras (Flat Design Consistente):**
  - Eliminación sistemática de todas las clases `shadow-*` en contenedores principales de las tres vistas: tablas del Catálogo (`index.astro`), tarjetas y acordeones de Sedes y Contacto (`Locations.astro`, `FAQ.astro`, `VideoSection.astro`), y tarjetas del Vademécum (`vademecum.astro`). Se conservan bordes sutiles (`border-subtle`) como única separación visual, logrando un diseño plano premium sin elevaciones artificiales.
- **[2026-03-02] Alineamiento Estructural del Sidebar Vademécum y Estandarización Cromática de Controles:**
  - Corrección de la lupa desalineada: extracción del texto "8 resultados" fuera del contenedor `relative` del input, restaurando el centrado vertical perfecto del ícono de búsqueda.
  - Creación de eje vertical unificado (`pl-3`) para alinear lupa, texto auxiliar, títulos de categoría, íconos y checkboxes a una misma línea de plomada invisible.
  - Íconos de títulos de sección igualados cromáticamente con su texto (`text-slate-800`).
  - Checkboxes migrados a `accent-brand text-brand`: chulitos verdes corporativos eliminando el azul nativo del navegador.
  - Botones de cantidad del carrito (`CartDrawer`) transformados de texto gris sutil a botones sólidos con fondo jade y hover petróleo, replicando la estética del legacy.
  - Ícono de eliminar producto oscurecido para visibilidad (`slate-300` → `slate-400`). Ícono de carrito en headers de tabla igualado al token `text-muted`.
- **[2026-03-10] Estandarización cromática y estructural del laboratorio de iconos:**
  - Evolución cromática: Transición total del verde petróleo (`#0A5C4E`) al azul pizarra profundo (`#1e293b`) en todo el inventario de SVGs para un contraste más neutro y profesional.
  - Unificación del layout de tarjetas: Implementación de "Macro Tarjetas" tripartitas que visualizan de forma simultánea los estados Stroke, Solid e interacción real (Hover).
  - Preparación arquitectónica: Creación de secciones dedicadas para "Página de contactos" y "Página de vademécum", estableciendo la infraestructura grid para recibir nuevos activos especializados.
  - Aplicación estricta de la regla de *Sentence case* en los encabezados y etiquetas del laboratorio.
  - Eliminación de ruidos visuales: Supresión de sombras elevadas y fondos grises en las zonas interactivas para priorizar el minimalismo premium y la claridad del trazo SVG.
- **[2026-03-12] Definición de Estrategia para Sidebars (Estandarización Homóloga):**
  - Acuerdo de arquitectura: "Ajustar primero el máster (Catálogo) y luego heredar/unificar".
  - **Plan de Intervención Micro-Quirúrgica (Sidebar Maestro):**
    1. **Fase 1: Cimientos (Plomada y Estructura):**
       - Eliminación de acordeones (Arquitectura Flat).
       - Implementación de los 4 Ejes de Plomada (Eje B: Borde 0px integrado con buscador, Eje C: Icono 12px, Eje D: Texto 36px).
       - Configuración de `Sticky Search` y `Sticky Headers` (Secciones L2).
    2. **Fase 2: Cableado (Jerarquía y Accesibilidad):**
       - Mapeo de la lista completa de 25 ítems (Nivel 3 y 4).
       - Aplicación de contraste médico `slate-800` (WCAG AAA).
       - Sincronización de pesos tipográficos (Semi-bold N3 vs Medium N4).
    3. **Fase 3: Pintura (Iconografía y Estados):**
       - Inserción de íconos pulidos (Doble Capa: Stroke/Solid inyectados en SVG nativo con `currentColor`).
       - Sincronización de micro-animaciones premium (`scale-95` a `scale-100` con `opacity`) estilo "Neutralidad Médica".
       - Implementación de la "Cápsula Premium" (`bg-brand/10` como único indicador de estado activo, texto en `slate-800`).
       - Activación de Scrollbar Invisible mediante utilidades globales.

---

## Pendientes (Backlog de UI/UX Dinámica)

Estos aspectos visuales y de interacción se implementarán obligatoriamente durante la Fase de Cableado JS y Ajustes Responsivos para asegurar la certificación "Premium" de la UI:

- [ ] **Responsividad Compleja en Móvil (Vademécum):** Implementar un "Drawer" (cajón deslizable) para los filtros del menú izquierdo, y un Modal de formato Mobile que ocupe el 100% de la pantalla para mostrar la Ficha Técnica clínica al tocar un medicamento.
- [ ] **Skeleton Loaders y Feedback Visual:** Diseñar `Skeletons` animados en grillas y paneles mientras la información de la base de datos carga para evitar saltos. Activar la clásica Loading Bar Verde superior.
- [ ] **Empty States y Botón "Limpiar":** Si una búsqueda o filtro multicriterio devuelve 0 resultados, reemplazar la columna central vacía con un "Empty State" (estado vacío) premium ilustrado, y un botón directo de "Limpiar filtros" para no frustrar la navegación.
- [ ] **Interacción "Mapa" Sede Principal (Contacto):** Cuando se integren datos reales, conectar el "mapa fake" (fondo borroso con pin) a un enlace o iframe real de Google Maps. Añadir un efecto hover que quite parcialmente el blur e indique al usuario que puede hacer clic para ver la ruta.
- [ ] **Comportamiento Orgánico en Acordeones FAQ (Contacto):** Durante la fase de Javascript, asegurar que el ícono (ej: `+` o flecha) no cambie bruscamente, sino que rote de forma fluida (ej: `transform: rotate(45deg)` o `180deg`) al abrir y cerrar la respuesta.
- [ ] **Sombras Modernas y Difusas (Contacto/Sedes):** Implementar sombras tipo "Ambient Occlusion" con tinte de marca (`shadow-brand/10`) y baja opacidad exclusivamente en las tarjetas de Sedes y Contacto. **Nota:** No aplicar a listas de precios ni Vademécum para mantener un estilo plano y profesional en datos densos.
- [x] **Estandarización de Alineación Sidebar (Plomada 12/36):** Unificación de ejes verticales para íconos (12px) e indentación de texto (36px) en las tres vistas principales (Catálogo, Contacto, Vademécum). Alineación simétrica de Checkboxes y controles de búsqueda.
- [x] **Sincronización de Contenedores y Ritmo Visual:** Estandarización de paddings de página (`px-8 md:px-16 pt-8 md:pt-10 pb-24`) y `gaps` de sección (`gap-16 md:gap-20`) en todas las vistas maestras. Se garantiza que el contenido principal de Contacto, Catálogo y Vademécum respete la misma retícula espacial.
- **[2026-03-15] Implementación de Precisión Tipográfica Elite:**
  - Integración global de `text-box-trim` y `text-box-edge` en `global.css`.
  - Aplicación automática a todos los elementos `button`, `.btn-elite` y `.badge-elite` para asegurar alineación vertical matemática.
  - Establecimiento del estándar de "Mejora Progresiva" para tipografía de vanguardia (Chrome 133+ / Safari 18.2+).
- **[2026-03-15] Adopción de Estándares CSS Modernos 2025 y Flat Design:**
  - Configuración de `text-wrap: balance` y `pretty` para una composición tipográfica profesional automática.
  - Implementación de `interpolate-size: allow-keywords` en el bloque raíz para habilitar animaciones de altura fluida (`height: auto`).
  - Integración de `scrollbar-gutter: stable` y `scroll-padding-top: 5rem` para garantizar estabilidad visual y navegación precisa bajo el Header fijo. 
  - Definición de arquitectura selectora basada en `:has()` para estados relacionales eficientes.
  - **Migración total a Flat Design**: Eliminación sistemática de todas las sombras (`box-shadow`, `shadow-*`) en todos los componentes del proyecto (Header, Footer, Vademécum, Catálogo, Contacto y CartDrawer), logrando una estética minimalista premium basada en bordes y color en lugar de elevación artificial.
  - **Refinamiento de Navegación**: Ajuste de la línea indicadora de página activa en el Header para que quede perfectamente pegada al borde inferior, mejorando la solidez arquitectónica del menú.
  - **Reingeniería del Sidebar (Navegación Elite)**:
    - Implementación de sistema de **acordeones inteligentes** para niveles profundos (4to nivel).
    - Creación de **guía visual de árbol (Tree-guide)** con líneas verticales y brazos en "L" curvos para una jerarquía clara y moderna.
    - Unificación de estados activos mediante "cápsulas" (bg-muted) para consistencia visual absoluta entre niveles.
    - Alineación matemática de chevrons e ítems con el buscador superior.

- **[2026-03-15] Estandarización de Legibilidad y Contraste (WCAG 2.1):**
  - Implementación global de un contraste mínimo de `slate-700` para todos los elementos de texto sobre fondos claros, asegurando legibilidad elite en todas las vistas (Catálogo, Vademécum, Contacto).
  - Actualización quirúrgica de componentes compartidos (`CartDrawer`, `FAQ`, `Locations`, `VideoSection`) y sidebars, eliminando tonos `slate-400/500/600` y `muted` en favor del estándar de legibilidad.
  - Sincronización de iconos auxiliares (breadcrumbs, inputs, estados vacíos) para heredar el color `slate-700`, logrando una cohesión visual integral entre texto y activos gráficos.

- **[2026-03-16] Reingeniería de Sidebar Estilo "Elite App" (Inspiración Figma/Notion):**
  - **Sincronización a Rejilla de 16px (1rem):** Alineación global de plomada entre Logotipo del Header, Buscador y Títulos del Sidebar.
  - **Compresión Vertical de Alta Densidad:** Reducción de altura de cápsulas a `h-8` (32px) y compactado de gaps (`space-y-6`, `gap-4`), logrando una organización tipo software profesional.
  - **Alineación de Extrema Precisión:** Iconos y lupa sincronizados a 6px del borde de sus cápsulas, con guía de árbol (tronco) reubicada al eje de 31px.
  - **Jerarquía Tipográfica y Cromática:** Títulos N1 elevados a `slate-900` para autoridad, guías de árbol suavizadas a `slate-500` para sutileza, y herencia de medidas del buscador desde el menú.
  - **Higiene Visual Final:** Eliminación del modo diagnóstico y purga de caracteres parásitos (`>`), logrando una interfaz limpia, robusta y libre de ruido.

---

## Deuda Técnica (Limpiar antes de producción)

- [ ] **Lógica de Escape Modal (Vademécum):** Cambiar los enlaces hardcodeados de escape (`href="/"`) en el overlay y la "X" por una directiva Javascript (`window.history.back()`) nativa para asegurar que el usuario retorne siempre a su vista anterior exacta (Catálogo o Contacto) sin romper su flujo.
- [ ] **vademecum.astro `<script>`:** Credenciales hardcodeadas (`Alfredo`/`1234`) para desarrollo. Reemplazar por autenticación real contra GAS en Fase 3 de Cableado. Eliminar constantes `TEMP_USER` y `TEMP_PASS`.
- [x] **Migración de hex `#0E8A71` a tokens Tailwind:** ~~Reemplazar las 50+ ocurrencias del hex crudo.~~ Completado: 65 líneas migradas en 7 archivos. Variable `--primary` sincronizada a `#0E8A71`. Token `brand-dark` redirigido a `--primary-hover` (`#0b6e5a`).
- [x] **Sombras `rgba(14,138,113,...)` residuales:** ~~3 sombras decorativas en `contacto.astro` (líneas 50, 115, 223) usan el rgba del verde brand en `shadow-[...]`.~~ Completado: Purgadas y reemplazadas exitosamente por clases nativas de tailwind usando el token de color modificado con opacidad (ej. `shadow-brand/50`).
- [ ] **Precios hardcodeados en index.astro:** 4 precios estáticos (`$19.500`, `$36.000`, `$25.500`, `$44.000`) directamente en el HTML. Se reemplazarán por datos dinámicos al conectar la fuente de datos Google Sheets/GAS en Fase de Cableado.
   
 