# Información de Implementación Google Apps Script

- **ID de Implementación:** `AKfycbyV2Z-MMkce9WLPn54Ik1Lmlj-60hD-3DOoeROTEfG_ZO1HWqitOQIRPIsY3BD5Z_qn`
- **URL de Aplicación Web:** `https://script.google.com/macros/s/AKfycbyV2Z-MMkce9WLPn54Ik1Lmlj-60hD-3DOoeROTEfG_ZO1HWqitOQIRPIsY3BD5Z_qn/exec`

---

_Nota: Esta es la nueva versión del middleware para la conexión de FAQ, Video y Sedes._

## 📄 Código Fuente (Google Apps Script)

```javascript
/**
 * MUNDO HOMEOPÁTICO V2 - BACKEND UNIVERSAL ELITE v2.1
 * Soporte: vademécum, protocolos, navegación, precios, FAQ, video, sedes y config.
 */
const SPREADSHEET_ID = "1W6av7tfPW5k_FK-CV0Bfp4BkSgZfyhJbJbdiVv7O5LQ";
const SECRET_KEY = "MH_SECRET_2026_ELITE";

function doGet(e) {
  const action = (e.parameter.action || "").toLowerCase();
  const key = e.parameter.key;

  // Validación de seguridad
  if (key !== SECRET_KEY) return buildResponse({ error: "No autorizado" });

  // Config tiene tratamiento especial: retorna objeto plano {clave: valor}
  if (action === "config") {
    try {
      return serveConfig();
    } catch (err) {
      return buildResponse({ error: err.message });
    }
  }

  let sheetName = "";
  switch (action) {
    case "maestro":
      sheetName = "vademecum_maestro";
      break;
    case "protocolos":
      sheetName = "vademecum_protocolos";
      break;
    case "navegacion":
      sheetName = "navegacion";
      break;
    case "lista_precios":
      sheetName = "lista_precios";
      break;
    case "faq":
      sheetName = "faq";
      break;
    case "video":
      sheetName = "video";
      break;
    case "distribuidores":
      sheetName = "distribuidores";
      break;
    default:
      return buildResponse({ error: "Acción no válida: " + action });
  }

  try {
    return serveData(sheetName);
  } catch (err) {
    return buildResponse({ error: err.message });
  }
}

/**
 * Función genérica: lee una hoja y retorna array de objetos.
 * Cabecera en fila 1. Filtra filas completamente vacías.
 */
function serveData(sheetName) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet)
    throw new Error(
      "Hoja '" +
        sheetName +
        "' no encontrada. Verifica el nombre exacto en el Spreadsheet.",
    );

  const data = sheet.getDataRange().getValues();
  const headers = data[0].map((h) => String(h).trim());
  const rows = data.slice(1);

  const result = rows
    .filter((row) => row[0] !== "" && row[0] !== null)
    .map((row) => {
      const obj = {};
      headers.forEach((header, i) => {
        if (header) obj[header] = row[i] !== undefined ? row[i] : "";
      });
      return obj;
    });

  return buildResponse(result);
}

/**
 * Función especial para CONFIG: retorna objeto plano {clave: valor}
 * en lugar de un array, para facilitar el consumo en el frontend.
 * Estructura esperada: Columna A = clave | Columna B = valor
 */
function serveConfig() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("config");
  if (!sheet) throw new Error("Hoja 'config' no encontrada.");

  const data = sheet.getDataRange().getValues();
  const result = {};
  data.forEach((row) => {
    const key = String(row[0]).trim();
    if (key) result[key] = row[1] !== undefined ? row[1] : "";
  });

  return buildResponse(result);
}

function buildResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```
