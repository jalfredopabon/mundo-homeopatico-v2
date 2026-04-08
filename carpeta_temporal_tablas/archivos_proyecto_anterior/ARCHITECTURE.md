# Arquitectura del Proyecto: Mundo Homeopático (v2.0 - Modular)

Este documento es la **brújula técnica definitiva** del proyecto. Define cómo se debe construir, organizar y mantener cada componente. Ninguna decisión de código debe contradecir lo aquí establecido.

**Stack Tecnológico:** HTML5 + CSS3 (Vanilla) + JavaScript (Vanilla) + Google Apps Script (Middleware) + Google Sheets (Backend).

---

## 1. Filosofía de Desarrollo: Separación de Responsabilidades (SoC)

Cada archivo tiene un único propósito. El código mezclado (HTML + CSS + JS en un solo archivo) está **estrictamente prohibido** en la nueva estructura.

### 🌐 HTML — Estructura

- Solo define _qué_ es el contenido (tablas, botones, contenedores).
- **Prohibido:** Estilos inline (`style="..."`), lógica inline compleja (`onclick="..."`).
- **Data Attributes:** Usaremos `data-*` para almacenar estado que el JS necesite (ej: `data-product-id`, `data-product-stock`).

### 🎨 CSS — Presentación

- Solo define _cómo se ve_ el contenido.
- **Tokens de Diseño (Variables CSS):** Todo valor visual reutilizable (colores, fuentes, sombras, espaciados) debe definirse en `:root` como variable global.
  - Ejemplo: `--color-primary: #1e40af;`, `--spacing-md: 1rem;`.
  - _Beneficio:_ Un cambio de identidad visual (rebranding) solo requiere editar estas variables.
- **Metodología:** Clases semánticas para componentes (`.cart-drawer`, `.product-card`) + utilidades nativas para ajustes finos.

### ⚙️ JavaScript — Comportamiento

- Solo define _qué hace_ el contenido.
- **Módulos lógicos:**
  - `Core`: Configuración global (URLs de APIs, constantes) y utilidades genéricas (formato de moneda, escape HTML).
  - `Services`: Comunicación con APIs externas (Google Sheets, Google Apps Script).
  - `Modules`: Lógica de negocio específica (Carrito, Catálogo, Vademécum, WhatsApp).

---

## 2. Estructura de Directorios

```text
/proyecto_mundo_homeopatico
├── assets/
│   ├── css/
│   │   ├── variables.css      (Tokens de diseño: colores, fuentes, sombras)
│   │   ├── base.css           (Reset, tipografía global, body)
│   │   ├── layout.css         (Header, Footer, Sidebar, Grid)
│   │   └── components.css     (Tarjetas, Botones, Modales, Badges)
│   │
│   └── js/
│       ├── core/
│       │   ├── config.js      (APP_CONFIG: URLs de APIs, constantes)
│       │   └── utils.js       (escapeHtml, Formatters, renderText)
│       │
│       ├── modules/
│       │   ├── cart.js        (CartManager, CartUI, WhatsAppBuilder)
│       │   ├── catalog.js     (RenderEngine: tablas de precios)
│       │   ├── vademecum.js   (Búsqueda, Filtros, Ficha Técnica)
│       │   └── ui-handlers.js (UIHandlers: eventos, ripple, toast, sidebar)
│       │
│       └── services/
│           └── data-service.js (DataService: fetch a Sheets/GAS, caché)
│
├── index.html                 (Página: Lista de Precios / Catálogo)
├── vademecum.html             (Página: Vademécum Clínico)
├── contacto.html              (Página: Video, Distribuidores, FAQ)
└── ARCHITECTURE.md            (Este documento)
```

---

## 3. Estrategia de Seguridad (Modelo "Caja Negra")

### 🔒 Capas de Protección

| Capa                 | Responsabilidad                            | Qué sabe / Qué NO sabe                                                            |
| :------------------- | :----------------------------------------- | :-------------------------------------------------------------------------------- |
| **Frontend (JS)**    | Enviar peticiones y renderizar respuestas. | Solo conoce la URL pública del Script. **NUNCA** credenciales ni URLs de Sheets.  |
| **Middleware (GAS)** | Validar acceso y consultar datos.          | Ejecuta con permisos del propietario ("Execute as: Me"). Accede a hojas privadas. |
| **Backend (Sheets)** | Almacenar datos.                           | Hojas **privadas** (no publicadas en la web). Solo GAS las lee.                   |

### 🔑 Control de Acceso al Vademécum (Soft Gate)

El Vademécum es exclusivo para profesionales de la salud (médicos y farmacias).

1.  **Barrera de Entrada:**
    - Al cargar `vademecum.html`, todo el contenido está oculto por defecto (CSS: `display: none`).
    - Se muestra un modal que solicita **NIT o Cédula Profesional**.
2.  **Flujo de Validación (2 pasos encadenados):**
    - **Paso 1 (Autenticación):** JS envía el NIT a GAS → GAS busca en la hoja privada `Usuarios` → Si es válido, retorna un Token de Sesión:
      ```json
      { "status": "ok", "token": "NIT_BASE64_TIMESTAMP", "expires": 1709856000 }
      ```
    - **Paso 2 (Datos):** JS envía el Token a GAS → GAS valida el Token → Si es válido, devuelve el JSON completo del Vademécum.
3.  **Persistencia de Sesión:**
    - El Token se guarda en `sessionStorage` (se pierde al cerrar el navegador).
    - Mientras el Token no expire (24h), el médico no tiene que volver a autenticarse al recargar.
4.  **Limitación conocida:** Es un "Soft Gate". Un experto podría modificar el JS para saltar la barrera. Para este MVP B2B, es un nivel de protección aceptable que disuade al público general.

---

## 4. Estrategia Técnica del Vademécum

### 📊 Modelo de Datos (Google Sheets - Vista Materializada)

Se creará una hoja maestra `BD_Vademecum`, optimizada para lectura. Las relaciones complejas (producto ↔ síntoma) se pre-calculan con fórmulas de Sheets (`TEXTJOIN`, `FILTER`) para que GAS solo lea y envíe.

| Columna          | Propósito                                            | Ejemplo                             |
| :--------------- | :--------------------------------------------------- | :---------------------------------- |
| **ID_UNICO**     | PK. Debe coincidir con el ID de la lista de precios. | `MH-DIG-001`                        |
| **NOMBRE**       | Título del producto.                                 | `NUX VOMICA D4`                     |
| **CATEGORIA**    | Filtro principal del Sidebar.                        | `Homeopatía Compleja`               |
| **SISTEMA**      | Filtro clínico. **Multivalor** separado con `\|`.    | `Digestivo \| Nervioso`             |
| **FORMA**        | Forma farmacéutica.                                  | `Gotas 30ml`                        |
| **COMPOSICION**  | Principios activos. Separados con `\|`.              | `Nux Vomica D4 \| Bryonia D4`       |
| **INDICACIONES** | Texto clínico completo para la ficha.                | `Tratamiento de gastritis aguda...` |
| **POSOLOGIA**    | Instrucciones de toma.                               | `15 gotas, 3 veces al día`          |
| **TAGS**         | Palabras clave ocultas para el buscador.             | `acidez, reflujo, estomago, colon`  |
| **RELACIONES**   | IDs de productos complementarios.                    | `MH-VIT-002, MH-OLI-005`            |

### � Mapeo de Columnas (Google Sheets - Vademécum)

Guía para la implementación de columnas desde la hoja de cálculo hacia la interfaz:

- **Filtros:** Columnas C, D, E.
- **Lista:** Columnas B, G, E.
- **Detalle:** Columnas B, F, H, I, J.

### �🔗 Cruce de Datos: Precios ↔ Vademécum (Diccionario en RAM)

El Vademécum **NO contiene precios** (para evitar redundancia y desincronización).

- Al iniciar `vademecum.html`, se carga también la lista de precios y se transforma en un **Diccionario (Map):**
  ```javascript
  const preciosMap = { "MH-DIG-001": 25000, "MH-NER-002": 32000, ... };
  ```
- Cuando el médico pulsa "Agregar al Pedido", el JS busca el precio en `preciosMap[id]`.
- **Ventaja:** Acceso instantáneo O(1) en lugar de recorrer 4,000 registros O(n).

### 🔍 Motor de Búsqueda y Filtrado

1.  **Descarga de datos:**
    - GAS entrega el JSON **completo** en una sola petición. **GAS NO filtra.**
    - Todo el filtrado ocurre en la memoria del navegador (RAM).

2.  **Normalización Bidireccional (Crítico para Español):**
    - Antes de comparar, tanto el input del usuario como los datos de Sheets se limpian:
      - Convertir a minúsculas.
      - Eliminar tildes: `.normalize("NFD").replace(/[\u0300-\u036f]/g, "")`.
    - Ejemplo: El médico escribe `"migrana"` → El sistema encuentra `"Migraña"`.

3.  **Filtrado de Celdas Multivalor:**
    - Las columnas `SISTEMA` y `COMPOSICION` contienen múltiples valores separados por `|`.
    - **Prohibido:** Usar comparación estricta (`===`). Producirá falsos negativos.
    - **Obligatorio:** Usar `.includes()` o `.split('|')` para verificar si el valor buscado existe dentro de la celda.

4.  **Renderizado Progresivo:**
    - Si un filtro devuelve 200+ resultados, renderizamos en lotes de 20 tarjetas.
    - Al hacer scroll al final o pulsar "Ver más", se cargan las siguientes 20.

### 📱 Experiencia Móvil: Botón "Atrás" (History API)

En el diseño Maestro-Detalle (Lista → Ficha), si el médico pulsa "Atrás" en su celular, el navegador lo saca de la web completa.

- **Solución:**
  1. Al abrir una ficha: `history.pushState({modal: true}, null, '#ficha')`.
  2. Escuchar `window.addEventListener('popstate', ...)`.
  3. Si el estado indica modal abierto → cerrar modal, no salir de la página.

---

## 5. Rendimiento: Caché y Versionado

### 💾 Almacenamiento Local de Datos

Para evitar descargar 4,000 registros cada vez que el médico recarga:

1.  **Primera visita:** Descarga completa desde GAS → Se guarda en `localStorage`.
2.  **Visitas siguientes:** Muestra datos guardados **inmediatamente** (carga instantánea).
3.  **Límite de `localStorage` (5MB):**
    - Si el JSON del Vademécum supera los 5MB, se usará `IndexedDB` automáticamente como fallback.
4.  **Skeleton Loaders:**
    - Mientras se descarga (primera vez) o verifica (siguientes), se muestran tarjetas "esqueleto" (animación de pulso gris) para que el médico sepa que la app está trabajando.

### 🔄 Estrategia "Stale-While-Revalidate"

1.  GAS incluye un campo de versión en cada respuesta: `"vademecum_version": "2026-02-19_REV01"`.
2.  Al cargar la página, el JS compara la versión guardada con la del servidor (en segundo plano).
3.  **Si la versión cambió:** Descarga los nuevos datos silenciosamente y muestra: _"Datos actualizados"_.
4.  **Si no cambió:** No hace nada. Cero tráfico innecesario.

---

## 6. Estado Global de UI y Preferencias del Usuario

Para garantizar una experiencia consistente entre páginas, el estado visual debe persistir.

### 🧠 Preferencias de Accesibilidad (Tamaño de Letra)

El médico puede ajustar el tamaño de fuente según su necesidad visual.

1.  **Persistencia:** Al cambiar el tamaño en cualquier página, se guarda en `localStorage` (`ui_preferences: { fontSize: 'medium' }`).
2.  **Aplicación Automática:** Al cargar `vademecum.html` o `contacto.html`, el JS lee esta preferencia y aplica la clase correspondiente al `<body>` (`.font-size-md`) antes de renderizar el contenido. Estose evita el "flicker" (parpadeo) de cambio de tamaño.

### 🛒 Sincronización del Carrito Global

El carrito es omnipresente y su estado debe ser idéntico en todas las vistas.

1.  **Contador en Tiempo Real:** El número de ítems en el icono del carrito (Header) se actualiza automáticamente al modificar el `localStorage` desde cualquier pestaña.
2.  **Feedback Visual (Toast):** Al agregar un producto desde el Vademécum, se dispara una notificación flotante universal (_"Producto agregado"_) para confirmar la acción sin necesidad de abrir el carrito.

---

## 7. Manejo de Errores y UX Defensiva

| Escenario               | Qué ve el usuario                                                 |
| :---------------------- | :---------------------------------------------------------------- |
| GAS tarda >8 segundos   | _"La conexión es inestable. [Reintentar]"_                        |
| Búsqueda sin resultados | _"No encontramos 'X'. Intenta buscar por síntoma."_ + Sugerencias |
| NIT inválido            | _"NIT no registrado. Contacta a tu asesor."_                      |
| Error de red (offline)  | _"Sin conexión a internet."_ + Mostrar datos cacheados si existen |
| GAS devuelve error 500  | _"Servicio temporalmente no disponible."_                         |

---

## 8. Carrito Compartido entre Páginas

El carrito de pedidos debe funcionar de forma consistente en las 3 páginas.

- **Persistencia:** El carrito vive en `localStorage` (clave: `mh_cart`).
- **Sincronización:** Al cargar cualquier página, el JS lee `localStorage` y renderiza el estado del carrito (contador + contenido).
- **Flujo Cross-Page:** Si el médico agrega un producto desde el Vademécum y luego navega al Catálogo, el producto sigue en el carrito.
- **Notas por Producto:** Cada ítem del carrito permite agregar una nota/observación editable.
- **Controles de Cantidad:** Se puede aumentar o disminuir la cantidad tanto desde la tabla de productos como desde el panel del carrito.
- **Sumatoria:** El carrito muestra el subtotal por producto y el total general del pedido.

---

## 9. Despliegue en Hosting Legacy (PHP)

El sitio actual (`mhmundohomeopatico.com`) usa PHP con un framework antiguo (jQuery 1.6 + MooTools).

### ⚠️ Reglas de Convivencia:

1.  **Aislamiento Total:** Nuestro código vivirá en una subcarpeta independiente (ej: `/catalogo/` o `/app/`). **Nunca** se mezcla con el PHP/CSS/JS antiguo.
2.  **Excepción en `.htaccess`:** El framework PHP probablemente redirige todo al `index.php`. Se debe añadir una regla para que nuestra subcarpeta sea servida directamente:
    ```apache
    RewriteRule ^catalogo/ - [L]
    ```
3.  **CORS con GAS:** Verificar que el hosting no bloquee peticiones `fetch` hacia `script.google.com`. Si lo hace, se configura la cabecera en el `.htaccess`.
4.  **UX de Transición:** El salto visual entre la web antigua (2010) y nuestra interfaz moderna será abrupto. Incluir un botón "Volver al Inicio" que apunte al sitio principal.

---

## 10. Plan de Migración (Fases)

### Fase 0: Respaldo

- Crear una copia completa del `index.html` actual antes de tocar cualquier línea.
- Commit en Git con tag: `v1.0-monolito-final`.

### Fase 1: Separar CSS

- Extraer todos los estilos del `<style>` del `index.html`.
- Crear `assets/css/variables.css`, `base.css`, `layout.css`, `components.css`.
- Enlazar con `<link rel="stylesheet">` en el HTML.
- **Verificar:** Que la página se vea exactamente igual que antes.

### Fase 2: Separar JS

- Extraer toda la lógica del `<script>` del `index.html`.
- Crear los archivos en `assets/js/` según la estructura definida.
- Enlazar con `<script src="...">` al final del `<body>`.
- **Verificar:** Que el carrito, sidebar, búsqueda y envío a WhatsApp funcionen igual.

### Fase 3: Crear páginas independientes

- Crear `vademecum.html` y `contacto.html` con la misma estructura base (Header, Footer, enlace a CSS/JS compartido).
- Implementar la lógica específica de cada página en su módulo JS correspondiente.

### Fase 4: Implementar Vademécum

- Crear la hoja `BD_Vademecum` en Google Sheets.
- Escribir el Google Apps Script de autenticación y entrega de datos.
- Construir la interfaz Maestro-Detalle con filtros facetados.
- Conectar el botón "Agregar al Pedido" con el Diccionario de Precios.

---

## 11. Evolución del Proyecto

Esta arquitectura prepara el terreno para escalar sin reescribir:

- **Nuevas secciones** (Blog, Zona Privada) = nuevo HTML + nuevo módulo JS.
- **Migración futura a SQL** (Supabase) = solo se cambia `data-service.js`, el resto no se toca.
- **Migración futura a Framework** (Astro/Next.js) = la lógica modular en JS se reutiliza casi intacta.
