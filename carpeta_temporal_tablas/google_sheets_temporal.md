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

---

> [!IMPORTANT]
> **Estado del Diagnóstico:** FAQ, ACCESOS, VIDEO, BANNER, SEO, AUTHOR, DESCUENTOS, PEDIDOS y CONFIG validadas. **Pendiente:** NAVEGACIÓN, LISTA_PRECIOS y DISTRIBUIDORES.
