# Auditoría Técnica: Integración Google Sheets (Legacy vs. v2)

Este documento resume el diagnóstico de la lógica de datos encontrada en el proyecto original y define los estándares de seguridad y eficiencia para la nueva versión.

---

## 🔑 1. Directorio de Conexiones Identificado
Se han localizado los "endpoints" que actúan como fuente de la verdad.

### 📊 Google Sheets (Públicos vía CSV)
| Hoja | Función | URL Identificada (GID) |
| :--- | :--- | :--- |
| **PRICES** | Catálogo Maestro y Precios | `...gid=1411473006` |
| **NAV** | Estructura del Sidebar (Niveles 1-4) | `...gid=1582460222` |
| **CONFIG** | Textos legales, Footer y Contacto | `...gid=257526078` |
| **SEO** | Inyección de JSON-LD dinámica | `...gid=494400744` |
| **ORDERS** | Histórico/Respaldo de pedidos | `...gid=1100464838` |

### ⚙️ Middleware (Google Apps Script)
- **Endpoint:** `https://script.google.com/macros/s/AKfycbwop2KSzn3vEOX5ic79SNBH-msCINlL4JFSRI2RQDV-zLEXzwfZTtLHgWkc1yp007E/exec`
- **Función:** Procesa el envío de pedidos y valida acceso al Vademécum.

```javascript
/**
 * SISTEMA DE GESTIÓN DE PEDIDOS - MUNDO HOMEOPÁTICO
 * Este script recibe los datos de la web, los guarda y genera el ID consecutivo.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pedidos");
  var data = JSON.parse(e.postData.contents);
  var fechaNum = Utilities.formatDate(new Date(), "GMT-5", "ddMM");
  
  // 1. Obtener el último ID para calcular el siguiente
  var lastRow = sheet.getLastRow();
  var consecutivo = 1;
  
  if (lastRow > 1) {
    var lastId = sheet.getRange(lastRow, 1).getValue(); // Ejemplo: "1902-004"
    var parts = lastId.split("-");
    var lastFecha = parts[0];
    var lastNum = parseInt(parts[1]);
    
    // Si la fecha es igual a hoy, sumamos 1. Si es día nuevo, volvemos a 1.
    if (lastFecha === fechaNum) {
      consecutivo = lastNum + 1;
    }
  }
  
  // 2. Formatear el ID (Ejemplo: 1902-005)
  var orderId = fechaNum + "-" + ("000" + consecutivo).slice(-3);
  
  // 3. Guardar en el Excel
  sheet.appendRow([
    orderId,
    new Date(),
    data.nombre,
    data.whatsapp,
    data.detalle,
    data.total,
    data.tipo
  ]);
  
  // 4. Devolver la respuesta a la web
  return ContentService.createTextOutput(JSON.stringify({ "orderId": orderId }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 🧠 2. Lógica de Negocio y Algoritmos ("The Brain")

### A. Algoritmo de Jerarquía (Fill-Down)
El sistema antiguo inyecta herencia basándose en celdas vacías.
- **Lógica:** Si la celda `Nivel 1` está vacía, el producto pertenece a la última categoría no vacía encontrada arriba.
- **Riesgo:** Si el Excel tiene un salto de línea accidental, la jerarquía se rompe.
- **Mejora v2:** Implementar un validador que detecte "huérfanos" antes de renderizar.

### B. Mini-Lenguaje de Celdas (MD Lite)
Interpretación de caracteres especiales dentro de las celdas:
- `^` (Circunflejo): Salto de bloque en notas.
- `§` (Párrafo): Disparador de Badges dinámicos (Ingredientes/Composición).
- `|` (Pipe): Separador de listas multivalor.

### C. Estrategia de Caché SWR (Stale-While-Revalidate)
Utiliza `localStorage` para persistir los datos descargados.
- **Ventaja:** Carga instantánea (0ms) en visitas subsecuentes.
- **Funcionamiento:** Muestra lo viejo mientras descarga lo nuevo en segundo plano (`fetch` no bloqueante).

### D. Mapeo Relacional (NAV ↔ PRICES)
El sistema de datos funciona como una base de datos relacional simplificada:
1. **Hoja NAV:** Define la jerarquía del Sidebar (Niveles 1 al 4).
2. **Hoja PRICES:** Almacena los ítems planos.
3. **Vínculo:** La columna `tabla_id` en NAV busca coincidencias exactas en la columna `tabla_id` de PRICES.
4. **Renderizado:** Si una categoría en NAV no tiene `tabla_id`, actúa solo como un nodo contenedor (sin productos).

---

## 🛡️ 3. Análisis de Seguridad: Fortalecer vs. Eliminar

### ✅ Buenas Prácticas (Conservar)
1. **Delegación de Eventos:** No hay `onclick` en el HTML; el JS escucha globalmente (eficiencia pura).
2. **CORS Proxy:** El uso de un proxy evita bloqueos de seguridad del navegador al consumir los CSVs.
3. **Uso de PapaParse:** Conversión robusta de CSV a JSON que respeta comas y caracteres especiales.

### ❌ Vulnerabilidades y Prácticas a Fortalecer

#### 1. Exposición de IDs de Hojas (Crítico)
- **Vulnerabilidad:** Las URLs de los CSVs están directamente en el código del cliente.
- **Riesgo:** Cualquier usuario puede copiar la URL y descargar el catálogo completo o ver hojas que no deberían ser públicas si tienen la ID.
- **Mejora v2:** Mover las IDs a variables de entorno (`.env`) en el servidor (Cloudflare) o intermediarlas 100% por GAS.

#### 2. Seguridad "Soft Gate" (Débil)
- **Vulnerabilidad:** El acceso al Vademécum depende de un `sessionStorage` que puede ser manipulado manualmente desde la consola del navegador.
- **Riesgo:** Un usuario con mínimos conocimientos técnicos puede saltarse el modal de login.
- **Mejora v2:** Implementar validación de tokens real (JWT o similar) en cada petición de datos sensibles vía GAS.

#### 3. Redundancia de Datos en RAM
- **Vulnerabilidad:** El proyecto antiguo carga MILES de líneas en la memoria del navegador aunque solo veas una página.
- **Riesgo:** Ralentización en móviles de gama baja.
- **Mejora v2:** Implementar renderizado progresivo y filtrado inteligente para no saturar el DOM.

---

## 📊 4. Validación de Estructura de Tablas (Checklist)

Se realiza una auditoría campo por campo para asegurar la compatibilidad con el nuevo motor de renderizado.

### ✅ TABLA: FAQ (Preguntas Frecuentes)
- **Estado:** LISTA / FUNCIONAL
- **Estructura:**
  - **Columna A:** Pregunta (Texto plano).
  - **Columna B:** Respuesta (Soporta mini-lenguaje `^` para párrafos).
- **Observaciones:** Estructura óptima para componentes tipo acordeón.

### ⚠️ TABLA: ACCESOS (Control de Acceso)
- **Estado:** REQUIERE FORTALECIMIENTO (CRÍTICO)
- **Estructura:**
  - **Columna A:** Usuario (NIT / Cédula).
  - **Columna B:** Contraseña.
- **Observaciones Críticas:**
  - **Seguridad:** Esta hoja debe ser 100% privada. NO publicar vía CSV.
  - **Protocolo:** La validación debe ser del lado del servidor (GAS).
  - **Mejora Sugerida:** Almacenar hashes en lugar de texto plano para blindar la base de datos ante accesos no autorizados al Excel.

### 🛡️ TABLA: ACCESOS (Protocolo de Seguridad Avanzada)
- **Estado:** DISEÑO APROBADO (Fort Knox)
- **Estructura:**
  - **Columna A:** Usuario (Identificador único).
  - **Columna B:** Hash/Contraseña protegida.
- **Protocolo de Conexión (v2):**
  - **API Gateway Único:** Se utilizará un solo endpoint de Google Apps Script para centralizar TODAS las consultas (Precios, Accesos, Pedidos).
  - **Token Secreto (X-Secret-Key):** Todas las peticiones desde Astro incluirán un token de seguridad que GAS validará. Si el token no coincide, GAS rechazará la petición, blindando el sistema contra ataques externos (Postman, Bots).
  - **Privacidad de Hojas:** Todas las hojas de Google Sheets se mantendrán en modo **PRIVADO** (no públicas a la web). Solo el Middleware (GAS) tendrá acceso.

### ✅ TABLA: VIDEO (Contenido Multimedia)
- **Estado:** LISTA / FUNCIONAL
- **Estructura:**
  - **Columna A:** Nombre del Vídeo (Título descriptivo).
  - **Columna B:** URL (Link de YouTube/Vimeo).
- **Observaciones:** El motor de la v2 debe normalizar la URL para asegurar compatibilidad con el modo "embed" de los reproductores.

### ✅ TABLA: BANNER (Comunicación Principal)
- **Estado:** LISTA / FUNCIONAL
- **Estructura:**
  - **Celda A1:** Encabezado (H1 o Título del Hero).
  - **Celda A2:** Contenido del Banner (Mensaje de marketing / CTA).
- **Observaciones:** Estructura ideal para mensajes estáticos de alto impacto. Si se desea un carrusel en el futuro, se migrará a un sistema de filas.

### ✅ TABLA: SEO (Optimización de Buscadores)
- **Estado:** LISTA / FUNCIONAL (Con sugerencia de ampliación)
- **Estructura:**
  - **Celda A1:** Meta Title (Título que aparece en la pestaña y Google).
  - **Celda A2 en adelante:** Keywords (Palabras clave).
- **Observación Pro:** Se recomienda incluir una celda para **Meta Descripción**, ya que es el factor #1 para mejorar el CTR (clics) desde Google hacia tu web.

### ✅ TABLA: AUTHOR (Crédito y Atribución)
- **Estado:** LISTA / FUNCIONAL
- **Estructura:**
  - **Columna A:** Nombre del Desarrollador (Alfredo Pabón).
  - **Columna B:** URL de destino (LinkedIn / Portafolio).
- **Observaciones:** Permite actualización dinámica de marca personal sin tocar el código. El enlace se configurará como `external` para no interrumpir la navegación del catálogo.

### ✅ TABLA: DESCUENTOS (Lógica Comercial)
- **Estado:** LISTA / DISEÑO MODULAR APROBADO
- **Estructura:**
  - **Columna A:** Cédula / NIT (Llave primaria).
  - **Columna B:** Nombre / Razón Social.
  - **Columna C:** Porcentaje de Descuento (Valor numérico).
- **Observaciones:**
  - **Modularidad:** Se mantiene independiente de la tabla de ACCESOS para permitir descuentos a no-médicos (farmacias/distribuidores).
  - **Privacidad:** Debe gestionarse vía GAS para evitar la exposición pública de condiciones comerciales personalizadas.

### 🛒 TABLA: PEDIDOS (Arquitectura de Inteligencia de Negocios)
- **Estado:** DISEÑO APROBADO (Esquema de Estrella)
- **Estructura Dual:**
  1. **PEDIDOS_MAESTRO (Dimensiones):** Registra una fila por pedido con datos logísticos (ID, Fecha, Cliente, WhatsApp, Dirección, Pago, Total).
  2. **PEDIDOS_DETALLE (Hechos):** Registra una fila por cada producto dentro de un pedido (ID_Pedido, Producto, Cantidad, Precio_Unitario).
- **Ventajas:**
  *   Permite análisis avanzado de ventas (Top productos, estacionalidad, recurrencia).
  *   Compatible con herramientas de BI (Looker Studio / Power BI).
  *   Orden absoluto en la trazabilidad de inventario.

### ⚙️ TABLA: CONFIG (Control de Interfaz y Variables)
- **Estado:** LISTA / FUNCIONAL
- **Estructura:**
  - **Columna A (clave):** Identificador técnico del texto (ID).
  - **Columna B (valor):** Contenido que se mostrará en la web.
- **Contenido Auditado:**
  *   Textos de Branding (Nombre, Marca, Copyright).
  *   Configuración de Contacto (WhatsApp, Email, Horarios).
  *   SEO & Multimedia (Títulos de video, descripciones de footer).
- **Ventaja:** Permite cambios estéticos y de contacto en tiempo real sin intervención de código.

### 🛠️ TABLAS PENDIENTES DE AUDITORÍA DETALLADA
1.  **NAVEGACIÓN:** Estructura de niveles y jerarquías del catálogo.
2.  **LISTA_PRECIOS:** Mapeo de productos, presentaciones y mini-lenguaje.
3.  **DISTRIBUIDORES:** Nueva tabla para la red nacional de distribución.

### 📚 TABLA 1: vademecum_maestro (Ficha Técnica y Listado A-Z)
- **Estado:** LISTA / AUDITADA (450 Registros)
- **Estructura Normalizada (8 Columnas):**
  - **Columna A:** `id_producto` (Ej: prod_001)
  - **Columna B:** `linea` (Filtro 1 - Sentence Case)
  - **Columna C:** `nombre` (Título Tarjeta - Regex Refinado)
  - **Columna D:** `principios_activos` (Ficha Técnica Detalle - Separador `; `)
  - **Columna E:** `indicaciones` (Extracto Tarjeta y Ficha Técnica Detalle)
  - **Columna F:** `posologia` (Ficha Técnica Detalle)
  - **Columna G:** `presentaciones` (Filtro 2 - Extracto Regex)
  - **Columna H:** `estado` (Control visibilidad - activo/oculto)

### 🩺 TABLA 2: vademecum_protocolos (Buscador por Enfermedades)
- **Estado:** LISTA / AUDITADA (220 Registros)
- **Estructura Normalizada (8 Columnas):**
  - **Columna A:** `id_protocolo` (Ej: prot_001)
  - **Columna B:** `patologia` (Filtro Maestro - Sentence Case)
  - **Columna C:** `principales` (Rol P)
  - **Columna D:** `sistema` (Rol S)
  - **Columna E:** `complementarios` (Rol C)
  - **Columna F:** `oligoelementos` (Rol O)
  - **Columna G:** `topicos` (Rol T)
  - **Columna H:** `estado` (Control visibilidad - activo/oculto)

---

> [!IMPORTANT]
> **Estado del Diagnóstico:** FAQ, ACCESOS, VIDEO, BANNER, SEO, AUTHOR, DESCUENTOS, PEDIDOS y CONFIG validadas. **Pendiente:** NAVEGACIÓN, LISTA_PRECIOS y DISTRIBUIDORES.

---

## 🚀 5. Hoja de Ruta de Implementación (Cableado Vademécum v2)

### Fase 1: Estructuración y Datos de Prueba (Google Sheets)
- **Acción:** Creación de las hojas `vademecum_maestro` y `vademecum_protocolos` en el documento oficial.
- **Objetivo:** Rellenar 2 a 3 filas con datos reales para tener un JSON válido y probar que el motor MD Lite interpreta correctamente los caracteres `|` y `^`.

### Fase 2: Desarrollo del "API Gateway" (Google Apps Script)
- **Acción:** Evolucionar el script actual añadiendo una función `doGet()`.
- **Objetivo:** 
  1. Leer las hojas maestras de forma programática.
  2. Implementar el blindaje de seguridad exigiendo un token `X-Secret-Key`.
  3. Retornar la data estructurada en formato JSON puro.

### Fase 3: Fetcher Inteligente y UI (Código Astro)
- **Acción:** Crear la capa de integración técnica local.
- **Objetivo:**
  1. **Servicio TS (`src/data/api.ts`):** Para consultar el GAS enviando la llave secreta.
  2. **Sistema SWR (Caché):** Implementar la estrategia *Stale-While-Revalidate* vía `localStorage` para garantizar cargas en 0ms en visitas recurrentes.
  3. **Conexión UI:** Remplazar el archivo de datos local y *hardcodeado* de `Hito 28` por la integración dinámica, asegurando que la interfaz "Elite" absorba los datos sin romper el diseño renderizando.

---

## 🎨 6. Arquitectura UX/UI (Patrón Maestro-Detalle Dual)

El diseño de 3 columnas (Master-Detail) se adaptará con una mentalidad **Mobile-First**, optimizando el espacio visual y utilizando un sistema de "Switch" dinámico que reutiliza el código de la UI base.

### 📱 Reestructuración Visual Base
1. **Perfil de Usuario al Sidebar:** Se mueve el área de cuenta ("Hola, Invitado") a la cima de la **Columna 1**. Esto despeja el panel central y consolida el Sidebar como el "Centro de Control" (estándar tipo SaaS/Notion).
2. **Switch Maestro en Columna 2:** El interruptor general `[ Productos | Protocolos ]` se ancla justo bajo el Título Principal en la **Columna 2**. Esto garantiza que en teléfonos móviles sea lo primero que interactúe el usuario sin tener que abrir el panel de filtros.
3. **Sincronía de Color (Filtros ↔ Badges):** Lógica visual "Elite". Los checkboxes del Sidebar y los badges de las tarjetas (Columna 2) operan bajo el mismo espectro cromático. *Ejemplo:* Si la tarjeta define "Gotas" en color naranja, el checkbox "Gotas" se pintará de naranja al estar activo. Esto reduce la carga cognitiva a cero.

### 🕹️ Estado A: Modo VADEMÉCUM (Búsqueda de producto específico)
- **Columna 1 (Panel de Control):**
  - Perfil de Usuario.
  - Buscador General de Catálogo.
  - Checkboxes Sincronizados (por color): `Línea de Terapia` y `Forma Farmacéutica`.
- **Columna 2 (Listing General):**
  - Switch en Posición: "Vademécum".
  - Tarjetas de MEDICAMENTOS (`nombre`, extracto de `indicaciones`, badges colorizados de `linea` y `presentación`).
- **Columna 3 (Ficha Técnica Elite):**
  - Al seleccionar un medicamento en C2, se despliega: Nombre, Indicaciones (lista), Principios Activos Formateados, Posología y Presentación detallada.

### 🔬 Estado B: Modo PROTOCOLOS (Búsqueda por Patología)
- **Columna 1 (Panel de Control):**
  - Perfil de Usuario.
  - Buscador de Patologías.
  - (Los filtros de formato farmacéutico desaparecen dinámicamente).
- **Columna 2 (Listing General):**
  - Switch en Posición: "Guía de Protocolos".
  - Tarjetas de ENFERMEDADES (`patologia`).
- **Columna 3 (La Receta / Detalle Relacional):**
  - Al seleccionar una enfermedad en C2, se despliega el cuadro clínico:
    - **(P) Principal:** `principales`
    - **(S) Sistema:** `sistema`
    - **(C) Complementarios:** `complementarios`
    - **(O) Oligoelementos:** `oligoelementos`
    - **(T) Tópico:** `topicos`
  - *Sinergia Elite:* Los nombres de medicamentos impresos en esta receta serán links interactivos que llevarán de regreso al *Estado A* para ver la ficha técnica del medicamento.

---

### 🏗️ ARQUITECTURA DE VISUALIZACIÓN (Elite 3-Column Layout)

Esta sección define el mapeo exacto de los datos hacia la interfaz de usuario en las tres columnas maestras.

#### 💊 VISTA 1: PRODUCTOS (Vademécum Maestro)
- **Columna 1 (Sidebar / Filtros):**
    - Grupo de Filtros: Basado en valores únicos de la columna `linea`.
    - Funcionalidad: Checkboxes interactivos vinculados a los Badges de las tarjetas.
- **Columna 2 (Listing / Tarjetas):**
    - Componente: `MedicalCard.astro`.
    - Título: `nombre`.
    - Badge: `linea` (Linkeado funcionalmente al filtro del Sidebar).
    - Resumen: `indicaciones` (Tratamiento corto/truncado).
- **Columna 3 (Detail / Ficha Técnica):**
    - Componente: `MedicalDetails.astro`.
    - Contenido: `nombre` (H1), `linea` (Badge), `principios_activos`, `indicaciones` (Full), `posologia`, `presentaciones`.

#### 📋 VISTA 2: PROTOCOLOS (Vademécum Protocolos)
- **Columna 1 (Sidebar / Filtros):**
    - *Estado:* Pendiente definición (Propuesta: Sistemas Corporales o Alfabético).
- **Columna 2 (Listing / Tarjetas):**
    - Componente: `ProtocolCard.astro` (Homólogo a MedicalCard).
    - Título: `patologia`.
    - Badge: Categoría derivada / "Protocolo".
    - Resumen: `principales` (Primer vistazo).
- **Columna 3 (Detail / Receta Relacional):**
    - Título: `patologia` (H1).
    - Cuerpo: Bloques estructurados por tipo:
        - `principales` (Medicamento base).
        - `sistema` (Apoyo sistémico).
        - `complementarios` (Refuerzos).
        - `oligoelementos` (Catalizadores).
        - `topicos` (Uso externo).

---

### 📝 NOTAS DE REVISIÓN PENDIENTE
- [ ] **Ajuste de Layout:** Revisar el padding entre el Header y el Contenido Principal.
- [ ] **Filtros Protocolos:** Definir si se agruparán por Sistemas Corporales o Alfabéticamente.
- [ ] **GAS Connection:** Implementar el fetcher configurando el `X-Secret-Key`.
