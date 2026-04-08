Análisis Integral: Refactorización de Mundo Homeopático
He leído y procesado todo el contexto que proporcionaste. A continuación, lo organizo de forma coherente y te entrego las cuatro secciones que solicitaste.

> **📍 DIRECTORIO DE TRABAJO:**
> Todo el proceso de refactorización y el nuevo código residirá exclusivamente en la carpeta `mundo_homeopatico_v2` (nuestro entorno de trabajo limpio).
> La carpeta original `proyecto_mundo_homeopatico` representa la versión anterior (legacy) y se usará **únicamente** como material de consulta o referencia temporal de lógica, pero **no** se reescribirá ni alterará.

📋 Contexto Organizado y Cohesionado
¿Qué es el proyecto?
Una plataforma web B2B para una empresa de productos homeopáticos. No es un e-commerce convencional; es un catálogo digital con sistema de pedidos por WhatsApp, dirigido a médicos y farmacias.

¿Qué existe hoy?
Un archivo monolítico (index.html) de ~10,000 líneas que mezcla HTML + CSS (Tailwind CDN) + JavaScript. Funciona, pero es inmantenible, difícil de depurar y riesgoso ante cualquier cambio.

¿Qué páginas tiene/tendrá?
Página Función Datos Acceso
Catálogo / Lista de Precios Tablas de productos alimentadas por Sheets. Botones para agregar al carrito de pedidos. Pedido se envía por WhatsApp. Google Sheets (público) Público
Contacto / Sedes Video institucional, información de contacto, distribuidores, FAQ. Google Sheets (público) Público
Vademécum Clínico Ficha técnica de productos (composición, indicaciones, posología). Requiere autenticación con NIT/Cédula. Google Sheets (privado, vía GAS) Restringido
¿Cuál es la arquitectura de datos?
Google Sheets = Base de datos y CMS (los clientes editan aquí y se refleja en la web).
Google Apps Script (GAS) = Middleware / API. Actúa como "caja negra" que protege los datos sensibles. El frontend nunca accede directamente a Sheets para datos privados.
localStorage = Caché local de datos públicos + estado del carrito + datos personales del comprador.
¿Dónde vive actualmente?
En un hosting PHP legacy (mhmundohomeopatico.com) con jQuery 1.6 y MooTools. El proyecto nuevo debe coexistir sin romper el sitio antiguo.

Lógica de negocio crítica que ya funciona:
Mini-lenguaje en celdas de Sheets: Caracteres especiales (^, §, |) que el JS interpreta para generar UI compleja.
Algoritmo de jerarquía ("Fill Down"): Infiere la estructura árbol (Categoría → Subcategoría → Producto) desde celdas vacías.
Caché híbrida (Stale-While-Revalidate): Carga instantánea desde localStorage, actualiza en segundo plano.
SEO dinámico: JSON-LD inyectado por JS desde datos de Sheets.
Configuración remota: Textos legales, contacto y enlaces se inyectan desde una hoja CONFIG.

1. La Lógica: Qué Debes Hacer y Por Qué
   Stack Tecnológico Definitivo
   Capa Tecnología Justificación
   Orquestador / Bundler Vite Permite dividir 10,000 líneas en módulos durante desarrollo y compilar a un paquete optimizado para producción. Sin él, la modularización no tiene motor.
   Estructura HTML5 multipágina Tres archivos .html reales. No una SPA simulada. Vite soporta esto nativamente.
   Estilos Tailwind CSS (CLI/PostCSS) + Variables CSS Tailwind CLI purga clases no usadas (archivo final de ~10-15KB vs. ~100KB+ del CDN). Las variables CSS en :root mantienen tus Design Tokens para rebranding fácil.
   Lógica Vanilla JavaScript (ES6 Modules) Ya dominas la manipulación del DOM. Introducir React/Angular agregaría complejidad sin beneficio real para tu caso. Los módulos ES6 (import/export) dan estructura sin framework.
   Datos públicos Google Sheets (mantener) Costo cero. Los clientes editan directamente. La caché local elimina el problema de rendimiento. No migrar a SQL a menos que superes las cuotas de Google.
   Datos privados Google Apps Script como API Es el único punto que toca Sheets. El frontend nunca ve la URL de la hoja ni las credenciales de otros usuarios.
   Despliegue Aislamiento por Infraestructura El proyecto compilado vive en una subcarpeta (/catalogo/) o subdominio (catalogo.midominio.com), aislado del PHP.
   ¿Por qué esta combinación y no otra?
   ¿Por qué NO Astro? Astro es excelente, pero tu lógica de negocio (mini-lenguaje de celdas, jerarquía Fill Down, caché SWR) ya está escrita en Vanilla JS. Migrarla a componentes Astro sería reescribirla, no refactorizarla. Vite preserva tu inversión de código.
   ¿Por qué NO solo Vanilla CSS? Porque ya tienes 10,000 líneas con clases de Tailwind. Reemplazarlas todas por CSS manual multiplicaría el trabajo. Tailwind CLI te da lo mejor de ambos mundos: utilidades atómicas + purga automática.
   ¿Por qué NO SQL? Porque tu requisito principal es que personas no técnicas actualicen contenido. Con SQL necesitarías construir un panel de administración (CRUD) desde cero. Google Sheets ya ES ese panel, gratis.
   Sobre la seguridad del Vademécum con Google Sheets + GAS
   Tu idea es viable, con una implementación estricta. Aquí está la evaluación honesta:

Aspecto Evaluación
¿Los datos del Vademécum estarán expuestos en el HTML/CSS/JS? No, si GAS los entrega solo tras autenticación exitosa. El JS solo recibe el JSON después de validar credenciales.
¿La URL pública de Sheets es un riesgo? Sí, si publicas la hoja del Vademécum o Usuarios en la web. Solución: Esas hojas deben ser privadas (no publicadas). Solo GAS las lee porque ejecuta con permisos del propietario.
¿Es seguridad de nivel bancario? No. Es un "Soft Gate" suficiente para disuadir al público general y proteger información B2B. Un atacante sofisticado podría manipular el sessionStorage, pero eso es aceptable para tu modelo de negocio.
Regla innegociable El token debe revalidarse en GAS con cada petición de datos sensibles. Si solo lo validas en el frontend, es inútil.
Flujo correcto de autenticación:

[Médico] → Ingresa NIT + Contraseña
↓
[Frontend JS] → POST a URL de GAS (envía credenciales)
↓
[GAS (Servidor Google)] → Busca en Hoja "Usuarios" (PRIVADA)
├── ❌ No encontrado → Responde HTTP 401 → Frontend muestra "NIT no registrado"
└── ✅ Encontrado → Genera Token (NIT + HMAC + Timestamp)
→ Responde HTTP 200 + Token + Datos del Vademécum
↓
[Frontend JS] → Guarda Token en sessionStorage
→ Renderiza datos del Vademécum
↓
[Recarga/Navegación] → Frontend envía Token a GAS → GAS valida matemáticamente
├── ❌ Token inválido/expirado → Pide login de nuevo
└── ✅ Token válido → Entrega datos desde caché o Sheets 2. Instrucciones: Cómo Llegar a Realizarlo
Modelo de Construcción Civil
FASE 1: CIMIENTOS → Entorno de desarrollo + herramientas
FASE 2: PAREDES → Estructura HTML multipágina + componentes compartidos
FASE 3: CABLEADO → Lógica JS modularizada + conexión a datos
FASE 4: PINTURA → Sistema de diseño, estilos, animaciones, pulido visual
FASE 1: CIMIENTOS (Entorno, Herramientas y Configuración)
Objetivo: Tener un proyecto Vite funcional con Tailwind CLI configurado, listo para recibir código.

Pasos:

Respaldo total del monolito actual.

Crear un commit en Git con tag v1.0-monolito-final.
Nunca más se edita este archivo directamente.
Inicializar proyecto Vite.

npm create vite@latest . -- --template vanilla (en la carpeta del proyecto).
Verificar que npm run dev levanta el servidor local.
Instalar Tailwind CSS + PostCSS + Autoprefixer.

npm install -D tailwindcss postcss autoprefixer
Generar archivos de configuración: npx tailwindcss init -p
Configurar tailwind.config.js.

Mapear los content paths a ./index.html, ./vademecum.html, ./contacto.html, ./src/\*_/_.js.
Desactivar preflight si el proyecto se inyectará en el PHP: corePlugins: { preflight: false }.
Extender el theme con tus Design Tokens actuales (colores semánticos, espaciados, fuentes).
Configurar vite.config.js para multipágina.

Definir build.rollupOptions.input con las tres páginas HTML como entradas independientes.
Configurar nombres de archivo estáticos y predecibles para la salida.
Crear estructura de directorios vacía:

/src
├── css/
│ ├── main.css (importa Tailwind base + variables + componentes)
│ ├── variables.css (Design Tokens en :root)
│ ├── base.css (Reset, tipografía global)
│ ├── layout.css (Header, Footer, Sidebar, Grid)
│ └── components.css (Tarjetas, Botones, Modales, Badges)
├── js/
│ ├── core/
│ │ ├── config.js (APP_CONFIG: URLs, constantes)
│ │ └── utils.js (escapeHtml, formatters, mini-lenguaje parser)
│ ├── modules/
│ │ ├── cart.js (CartManager, CartUI, WhatsAppBuilder)
│ │ ├── catalog.js (RenderEngine, jerarquía Fill Down)
│ │ ├── vademecum.js (Búsqueda, filtros, ficha técnica)
│ │ └── ui-handlers.js (Eventos delegados, ripple, toast, sidebar)
│ └── services/
│ ├── data-service.js (Fetch a Sheets/GAS, caché SWR)
│ └── auth-service.js (Autenticación Vademécum vía GAS)
└── main.js (Orquestador: importa módulos, ejecuta init())
/public
├── images/ (Logos, iconos, assets estáticos)
└── fonts/ (Si usas fuentes locales)
Verificación de cimientos:

npm run dev funciona sin errores.
Un "Hola Mundo" con una clase de Tailwind se compila y se ve correctamente.
Las tres páginas HTML cargan independientemente en el servidor de desarrollo.
FASE 2: PAREDES (Estructura HTML Multipágina)
Objetivo: Tener los tres archivos HTML con su esqueleto semántico, componentes compartidos (Header, Footer, Sidebar) y contenedores vacíos listos para inyección de datos.

> **🧩 NOTA IMPORTANTE SOBRE DISEÑOS STITCH:**
> Contamos con 3 pantallas generadas en Google Stitch guardadas como referencia. Dado que estas 3 pantallas presentan diferencias e inconsistencias entre sí, **es OBLIGATORIO estandarizarlas primero** antes de implementarlas. Extraeremos lo que tienen en común y crearemos un **Sistema de Diseño Único**. Bajo ninguna circunstancia se copiarán y pegarán tal cual; servirán como cascarones o bocetos para levantar una estructura armónica y consistente.

Pasos:

Crear el HTML base de cada página.

Cada archivo (index.html, vademecum.html, contacto.html) tiene:

<head> con meta tags SEO, fuentes de Google, enlace al CSS compilado.
Header compartido (navegación entre las 3 páginas + icono de carrito con contador).
Footer compartido.
Contenedor principal vacío (<main id="app-content">).
Script de entrada (<script type="module" src="/src/main.js"></script>).
Implementar componentes compartidos via JS.

Crear un módulo shared-components.js que inyecte el Header y Footer al cargar.
Esto evita duplicar HTML en tres archivos.
El header debe marcar como activo el enlace de la página actual (.is-active).
Definir los contenedores semánticos vacíos por página:

Catálogo: #sidebar-nav, #catalog-grid, #cart-drawer.
Contacto: #video-section, #locations-grid, #faq-accordion.
Vademécum: #auth-modal, #vademecum-filters, #vademecum-grid, #product-detail-modal.
Verificación de paredes:

Las tres páginas cargan con Header y Footer renderizados.
La navegación entre páginas funciona.
Los contenedores vacíos existen en el DOM (verificable con DevTools).
FASE 3: CABLEADO (Lógica JS Modularizada + Conexión a Datos)
Objetivo: Migrar toda la lógica funcional del monolito a módulos ES6 aislados, conectados entre sí mediante import/export.

Orden estricto de migración:

config.js — Mover APP_CONFIG (URLs de APIs, constantes, versiones de caché). Es la dependencia base de todos los demás módulos.

utils.js — Extraer todas las funciones puras: escapeHtml, formatCurrency, normalizeText (la función de eliminar tildes), el parser del mini-lenguaje (^, §, |). Estas funciones no dependen de nada más.

data-service.js — Migrar DataService. Este módulo es el único autorizado a hacer fetch. Incluir:

Descarga de CSV de Sheets públicas.
Parseo con PapaParse.
Lógica de caché SWR (localStorage con versionado).
Fallback a IndexedDB si supera 5MB.
auth-service.js — Crear nuevo módulo para la autenticación del Vademécum:

login(nit, password) → POST a GAS → Recibe token.
validateToken() → Envía token a GAS → Recibe confirmación.
getVademecumData(token) → Envía token a GAS → Recibe JSON.
Lee/escribe en sessionStorage.
cart.js — Migrar CartManager, CartUI, WhatsAppBuilder:

CRUD del carrito sobre localStorage (mh_cart).
Notas por producto.
Controles de cantidad (+/-).
Cálculo de subtotales y total.
Generación del mensaje de WhatsApp con los datos del pedido + datos personales.
Persistencia cross-page (lee localStorage al cargar cualquier página).
catalog.js — Migrar RenderEngine y el algoritmo de jerarquía (Fill Down):

buildHierarchy(rows) → Genera la estructura árbol.
renderSidebar(tree) → Genera el HTML del menú lateral.
renderCatalog(products) → Genera las tarjetas y tablas.
Regla crítica: No simplificar el bucle de buildHierarchy sin entender la lógica de celdas vacías.
vademecum.js — Implementar la lógica de la pantalla Vademécum:

Verificar autenticación al cargar.
Motor de búsqueda con normalización bidireccional (tildes).
Filtrado de columnas multivalor (.split('|')).
Renderizado progresivo (lotes de 20 tarjetas).
Diccionario de precios (preciosMap) para el cruce con el carrito.
History API para el botón "Atrás" en móvil.
ui-handlers.js — Migrar UIHandlers:

Event Delegation global (un solo listener en document).
Gestión de estado visual con clases CSS (.hidden, .is-open, .is-active, .is-loading).
Toast notifications, ripple effects, sidebar toggle.
Control de tamaño de fuente (accesibilidad) con persistencia en localStorage.
main.js — Orquestador:

Detecta en qué página está (window.location.pathname).
Importa y ejecuta solo los módulos necesarios para esa página.
Inicializa el estado global (carrito, preferencias de UI, caché).
Verificación de cableado:

La lista de precios carga datos desde Sheets y renderiza correctamente.
El carrito agrega, elimina, persiste entre páginas y genera el mensaje de WhatsApp.
El Vademécum requiere login, muestra datos solo tras autenticación exitosa.
La búsqueda con tildes funciona.
El sidebar con jerarquía se renderiza correctamente.
Ninguna variable está en el objeto global window.
FASE 4: PINTURA (Estilos, Animaciones y Pulido Visual)
Objetivo: Trasladar el sistema visual completamente al nuevo proyecto, eliminar el CDN de Tailwind, y pulir la experiencia.

Pasos:

Migrar Design Tokens a variables.css.

Todas las variables de :root del monolito van aquí.
Mapear cada variable al theme.extend de tailwind.config.js.
Migrar estilos base a base.css.

Reset CSS, tipografía global, reglas del body.
Migrar estilos de layout a layout.css.

Header, Footer, Sidebar, Grid principal.
Protocolo estético del Sidebar (regla de 24px, Sentence Case, pesos tipográficos).
Migrar estilos de componentes a components.css.

Tarjetas de producto, botones, modales, badges, toast, skeleton loaders.
Clases semánticas (.text-brand, .bg-surface-white, .border-subtle).
Eliminar <script src="https://cdn.tailwindcss.com"> de todos los HTML.

Configurar main.css como punto de entrada:

css
@tailwind base;
@tailwind components;
@tailwind utilities;
@import './variables.css';
@import './base.css';
@import './layout.css';
@import './components.css';
Build de producción:

npm run build → Verificar que Vite + Tailwind generan un paquete optimizado.
El CSS final debe pesar entre 10-20KB (vs. 100KB+ del CDN).
Verificación de pintura:

La página se ve idéntica o mejor que el monolito original.
No hay parpadeos (flicker) al cargar.
Las animaciones, ripple effects y toasts funcionan.
El responsive es correcto en móvil. 3. Instrucciones para Agentes de IA (Google Antigravity)
Regla General
Nunca entregues las 10,000 líneas al agente en un solo prompt. Trabaja módulo por módulo. Al finalizar cada módulo, verifica que funciona antes de avanzar al siguiente.

Prompts por Fase
🔧 FASE 1 — Cimientos:

"Inicializa un proyecto Vite con template Vanilla JS en el directorio actual. Instala Tailwind CSS, PostCSS y Autoprefixer como dependencias de desarrollo. Configura tailwind.config.js con corePlugins: { preflight: false } y con paths de contenido apuntando a los archivos HTML raíz y a ./src/\*_/_.js. Configura vite.config.js para multipágina con tres entradas: index.html, vademecum.html y contacto.html. Crea la estructura de directorios: src/css/, src/js/core/, src/js/modules/, src/js/services/, public/images/. Verifica que npm run dev funciona."

🧱 FASE 2 — Paredes:

"Crea el esqueleto HTML semántico de tres páginas: index.html (Catálogo de Precios), vademecum.html (Vademécum Clínico), contacto.html (Sedes y Contacto). Cada página debe tener: meta tags SEO descriptivos, enlace a Google Fonts (Inter), un <main> con contenedores vacíos con IDs específicos para inyección dinámica, y un script de entrada type="module". Crea un módulo src/js/modules/shared-components.js que inyecte el Header (con navegación entre páginas y icono de carrito con contador) y Footer de forma dinámica al cargar cualquier página. El enlace de la página actual debe tener la clase .is-active."

⚡ FASE 3 — Cableado (un prompt por módulo):

Módulo Prompt
config.js "Crea el módulo src/js/core/config.js con el objeto APP_CONFIG exportado. Debe contener: URLs base de Google Sheets públicas, URL del Web App de Google Apps Script, claves de localStorage, y constantes de la aplicación. Todo debe ser export const. Ninguna variable en window."
utils.js "Crea src/js/core/utils.js con funciones puras exportadas: escapeHtml(str), formatCurrency(num), normalizeText(str) (minúsculas + sin tildes con normalize('NFD')), parseSpecialSyntax(cellValue) que interprete los caracteres ^ (nuevo bloque), § (modo badges), | (separador de listas). Cada función debe estar documentada con JSDoc."
data-service.js "Crea src/js/services/data-service.js. Debe exportar una clase DataService con métodos: fetchPrices() (descarga CSV de Sheets, parsea con PapaParse, retorna JSON), getCachedData(key) (lee de localStorage con verificación de versión), setCachedData(key, data, version). Implementa la estrategia Stale-While-Revalidate: retorna datos de caché inmediatamente y actualiza en segundo plano. Importa constantes desde config.js."
auth-service.js "Crea src/js/services/auth-service.js. Debe exportar funciones: login(nit, password) que haga POST a la URL de GAS y retorne el token, validateToken(token) que envíe el token a GAS para revalidación, isAuthenticated() que verifique sessionStorage. El frontend nunca debe conocer la URL de Google Sheets ni la estructura de la base de datos de usuarios."
cart.js "Crea src/js/modules/cart.js. Exporta CartManager (CRUD sobre localStorage clave 'mh_cart': addItem, removeItem, updateQuantity, addNote, getTotal, clearCart) y CartUI (renderDrawer, updateCounter, animateAdd). Exporta WhatsAppBuilder que genera el mensaje formateado con los items del carrito + datos personales del comprador (leídos de localStorage). Ninguna variable global."
Continúa con el mismo patrón para catalog.js, vademecum.js, ui-handlers.js y main.js.

🎨 FASE 4 — Pintura:

"Extrae todos los estilos del bloque <style> que te proporcionaré y distribúyelos en los archivos CSS modulares según esta regla: variables de :root van a variables.css, estilos de body/reset/tipografía van a base.css, estilos de header/footer/sidebar/grid van a layout.css, estilos de tarjetas/botones/modales/badges van a components.css. Crea un archivo main.css que importe las directivas de Tailwind y luego los cuatro archivos en orden. Reemplaza todo valor hardcodeado por la variable CSS correspondiente."

Regla de verificación entre fases:
"Antes de avanzar a la siguiente fase, verifica que: (1) npm run dev no muestra errores, (2) la funcionalidad de la fase anterior sigue intacta, (3) no hay variables en el objeto global window."

4. Recomendaciones Adicionales (Puntos Ciegos)
   🔴 Críticas (Riesgo alto si se ignoran)
   Contraseñas en Google Sheets: Si almacenas contraseñas en texto plano en una hoja de Sheets, cualquier persona con acceso a la hoja las ve. Aunque GAS sea el intermediario, el dueño de la hoja, editores compartidos, o alguien con el enlace podría verlas. Solución mínima: Almacena un hash de la contraseña (no la contraseña en sí). GAS puede hashear el input del usuario y comparar hashes. Esto no requiere SQL.

Cuotas de Google Sheets/GAS: Google impone límites estrictos:

Sheets: ~300 peticiones por minuto por proyecto.
GAS: ~20,000 ejecuciones/día (cuenta gratuita).
Si tu catálogo recibe tráfico significativo sin caché, Google bloqueará temporalmente el acceso. Tu estrategia SWR es obligatoria, no opcional.
CORS con el hosting PHP: Si el hosting tiene reglas de seguridad estrictas, las peticiones fetch desde tu dominio hacia script.google.com podrían ser bloqueadas. Prueba esto temprano en la Fase 1 para evitar sorpresas.

🟡 Importantes (Mejoran significativamente el resultado)
PapaParse como dependencia de npm: Ya que usarás Vite, instala PapaParse vía npm install papaparse en lugar de vía CDN. Así Vite lo incluye en el bundle optimizado y no dependes de un CDN externo para funcionalidad crítica.

Variables de entorno (.env): Las URLs de Google Sheets y GAS no deben estar hardcodeadas en el código fuente, especialmente si subes el proyecto a GitHub. Usa un archivo .env (que Vite soporta nativamente con import.meta.env.VITE\_\*) y agrégalo al .gitignore.

Estrategia de despliegue: Si eliges Aislamiento por Infraestructura con subcarpeta (/catalogo/), necesitarás:

Configurar base: '/catalogo/' en vite.config.js.
Agregar la regla en .htaccess para que Apache sirva la carpeta directamente sin pasarla por el index.php del framework PHP.
Service Worker (futura mejora): Para la fase de Vademécum, considerar un Service Worker básico que permita al médico consultar fichas ya descargadas sin conexión a internet. No es prioridad para el MVP, pero la arquitectura modular lo permitirá fácilmente.

🟢 Deseables (Polish profesional)
Transición visual entre sitio viejo y nuevo: El salto estético entre la web PHP de 2010 y tu interfaz moderna será abrupto. Considera un banner sutil tipo "Estás en nuestro nuevo catálogo digital" con un enlace de "Volver al sitio principal".

Monitoreo de errores: Considera agregar un pequeño módulo de logging que, cuando ocurra un error de red o de parseo, envíe un reporte básico a un Google Form (que se guarda en... Google Sheets 😉). Así puedes detectar problemas sin que el médico tenga que reportarlos.

Accesibilidad (a11y): Tu sistema de tamaño de fuente ajustable es excelente. Complementa con aria-labels en botones de acción (carrito, filtros) y asegura contraste de color suficiente (ratio 4.5:1 mínimo) en los textos sobre fondos de marca.

Resumen Ejecutivo
Decisión Veredicto
¿Vite? Sí, obligatorio.
¿Tailwind? Sí, pero CLI/PostCSS, no CDN.
¿Vanilla JS? Sí, con módulos ES6.
¿Google Sheets? Sí, mantener.
¿GAS para seguridad? Sí, viable para este nivel B2B.
¿SQL? No por ahora. La arquitectura modular permite migrar en el futuro tocando solo data-service.js.
¿Framework (React/Angular)? No. Complejidad innecesaria para tu caso.
¿Coexistencia con PHP? Aislamiento por Infraestructura (subcarpeta o subdominio).
