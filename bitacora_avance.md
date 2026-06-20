

## Hito 67: Diagnóstico de Error en Endpoint "Principios" y Gestión de Despliegue de Google Apps Script
**Fecha:** 19 de Junio, 2026
**Estado:** Completado ℹ️
**Descripción:** Diagnóstico del error de acción no válida para el endpoint "principios" en el script de Google Sheets y registro del hallazgo técnico clave sobre el manejo de versiones y caché en Google Apps Script (GAS) para prevenir errores similares en producción y desarrollo local.

**Acciones:**
- **Identificación de la Causa Raíz:** Se descubrió que la acción "principios" fallaba debido a que la URL del Web App de Google Apps Script estaba apuntando a una versión antigua o a un ID de despliegue que no tenía el código actualizado, o por el comportamiento de la redirección del endpoint `/exec` al almacenar en caché la versión del script.
- **Hallazgo Clave (Despliegue de GAS):** Al modificar el script de Google Sheets (`google_sheets_script.js`), se debe generar una *Nueva Versión* en la configuración de Google Apps Script y re-publicar el Web App seleccionando esa nueva versión para que los cambios en las acciones y hojas estén disponibles públicamente. La URL `/exec` no se actualiza automáticamente con cambios locales guardados a menos que se realice un nuevo despliegue.
- **Mitigación / Solución:** Actualizar la variable `PUBLIC_GAS_URL` con la nueva URL de la aplicación web de Google Apps Script recién desplegada, o asegurarse de que el script en producción sea el que contiene la lógica correspondiente para todas las acciones (como "principios").

**Resultado:** Documentación clara en la bitácora de avance para guiar futuros despliegues de Google Apps Script y evitar problemas de discrepancia de versión entre el frontend y el backend de Sheets.
