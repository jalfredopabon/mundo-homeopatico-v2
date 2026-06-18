/**
 * MUNDO HOMEOPÁTICO V2 - BACKEND UNIVERSAL ELITE v2.3 (Optimizado)
 * Soporte: vademécum, protocolos, navegación, precios, FAQ, video, sedes,
 *          configuracion, descuentos, pedidos y validación segura de accesos.
 *
 * Instrucciones:
 * 1. Copia todo este código en tu Google Apps Script de la hoja de cálculo.
 * 2. Asegúrate de configurar correctamente el SPREADSHEET_ID.
 * 3. Ejecuta una Nueva Implementación (New Deployment) como Aplicación Web
 *    con acceso para "Cualquiera" (Anyone).
 */

const SPREADSHEET_ID = '1W6av7tfPW5k_FK-CV0Bfp4BkSgZfyhJbJbdiVv7O5LQ';
const SECRET_KEY = 'MH_SECRET_2026_ELITE';

function doGet(e) {
  const action = (e.parameter.action || '').toLowerCase();
  const key = e.parameter.key;

  // Validación de seguridad global
  if (key !== SECRET_KEY) return buildResponse({ error: 'No autorizado' });

  // --- Acciones con tratamiento especial ---

  // Config: retorna objeto plano {clave: valor}
  if (action === 'config') {
    try { return serveConfig(); }
    catch (err) { return buildResponse({ error: err.message }); }
  }

  // Accesos: validación segura (nunca devuelve la tabla completa)
  if (action === 'validar_acceso') {
    try { return validateAccess(e.parameter.usuario, e.parameter.contrasena); }
    catch (err) { return buildResponse({ error: err.message }); }
  }

  // --- Acciones genéricas (array de objetos) ---
  let sheetName = '';
  switch (action) {
    case 'maestro':        sheetName = 'vademecum_medicamentos';    break;
    case 'protocolos':     sheetName = 'vademecum_protocolos'; break;
    case 'navegacion':     sheetName = 'navegacion';           break;
    case 'lista_precios':  sheetName = 'lista_precios';        break;
    case 'faq':            sheetName = 'faq';                  break;
    case 'video':          sheetName = 'video';                break;
    case 'distribuidores': sheetName = 'distribuidores';       break;
    case 'descuentos':     sheetName = 'descuentos';           break;
    default: return buildResponse({ error: 'Acción no válida: ' + action });
  }

  try {
    return serveData(sheetName);
  } catch (err) {
    return buildResponse({ error: err.message });
  }
}

/**
 * Recibe y registra pedidos en la hoja "Pedidos" con un consecutivo automático.
 */
function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName("Pedidos");
    if (!sheet) throw new Error("Hoja 'Pedidos' no encontrada.");

    const data = JSON.parse(e.postData.contents);
    const fechaNum = Utilities.formatDate(new Date(), "GMT-5", "ddMM");
    
    // Obtener el último ID para calcular el siguiente
    const lastRow = sheet.getLastRow();
    let consecutivo = 1;
    
    if (lastRow > 1) {
      const lastId = sheet.getRange(lastRow, 1).getValue(); // Ejemplo: "1902-004"
      const parts = String(lastId).split("-");
      const lastFecha = parts[0];
      const lastNum = parseInt(parts[1], 10);
      
      if (lastFecha === fechaNum && !isNaN(lastNum)) {
        consecutivo = lastNum + 1;
      }
    }
    
    // Formatear el ID de pedido (ejemplo: 1902-005)
    const orderId = fechaNum + "-" + ("000" + consecutivo).slice(-3);
    
    sheet.appendRow([
      orderId,
      new Date(),
      data.nombre || '',
      data.whatsapp || '',
      data.detalle || '',
      data.total || 0,
      data.tipo || ''
    ]);
    
    return buildResponse({ ok: true, orderId: orderId });
  } catch (err) {
    return buildResponse({ ok: false, error: err.message });
  }
}

/**
 * Función genérica: lee una hoja y retorna array de objetos.
 * Cabecera en fila 1. Filtra filas vacías y normaliza nombres de columnas.
 */
function serveData(sheetName) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error("Hoja '" + sheetName + "' no encontrada. Verifica el nombre exacto en el Spreadsheet.");

  // getDisplayValues() asegura traer los datos visuales limpios en formato String.
  const data = sheet.getDataRange().getDisplayValues();
  if (data.length === 0) return buildResponse([]);

  // Normalizamos las cabeceras eliminando espacios, tildes y pasando a minúscula para evitar desajustes en el frontend
  const headers = data[0].map(h => normalizeKey(h));
  const rows = data.slice(1);

  const result = rows
    .filter(row => {
      // Filtrar filas completamente vacías o donde la primera columna sea vacía
      return row.some(cell => cell.toString().trim() !== '');
    })
    .map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        if (header) {
          obj[header] = row[i] !== undefined ? row[i].toString().trim() : '';
        }
      });
      return obj;
    });

  return buildResponse(result);
}

/**
 * CONFIG: retorna objeto plano {clave: valor}.
 * Hoja: "configuracion" | Columna A = clave | Columna B = valor
 */
function serveConfig() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('configuracion');
  if (!sheet) throw new Error("Hoja 'configuracion' no encontrada.");

  const data = sheet.getDataRange().getDisplayValues();
  const result = {};
  
  data.slice(1).forEach(row => {
    const key = normalizeKey(row[0]);
    if (key) {
      result[key] = row[1] !== undefined ? row[1].toString().trim() : '';
    }
  });

  return buildResponse(result);
}

/**
 * ACCESOS: valida credenciales de forma segura.
 * NUNCA devuelve la tabla completa.
 */
function validateAccess(usuario, contrasena) {
  if (!usuario || !contrasena) {
    return buildResponse({ ok: false, error: 'Credenciales incompletas' });
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('accesos');
  if (!sheet) throw new Error("Hoja 'accesos' no encontrada.");

  const data = sheet.getDataRange().getDisplayValues();
  const headers = data[0].map(h => normalizeKey(h));

  const colUsuario    = headers.indexOf('usuario');
  const colContrasena = headers.indexOf('contrasena');
  const colNombre     = headers.indexOf('nombre_usuario');

  if (colUsuario === -1 || colContrasena === -1) {
    throw new Error("Columnas 'usuario' o 'contrasena' no encontradas en la hoja 'accesos'.");
  }

  const rows = data.slice(1);
  const match = rows.find(row =>
    row[colUsuario].toString().trim().toLowerCase() === usuario.trim().toLowerCase() &&
    row[colContrasena].toString().trim() === contrasena.trim()
  );

  if (match) {
    return buildResponse({
      ok: true,
      nombre_usuario: colNombre !== -1 ? match[colNombre].toString().trim() : usuario
    });
  }

  return buildResponse({ ok: false });
}

/**
 * Normaliza las claves eliminando acentos, tildes, caracteres especiales y espacios.
 */
function normalizeKey(str) {
  if (!str) return '';
  return str.toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remueve tildes y diacríticos
    .replace(/[^a-z0-9_]/g, '_')     // Reemplaza caracteres no alfanuméricos por guion bajo
    .replace(/__+/g, '_')            // Evita guiones bajos consecutivos
    .replace(/^_+|_+$/g, '');        // Limpia guiones bajos al inicio/final
}

function buildResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
