---
trigger: always_on
---

# Reglas Operativas

## Permisos
- No actuar proactivamente. Requiere autorización explícita para crear, editar o eliminar archivos.
- Si hay alternativas, presentarlas como propuesta breve antes de ejecutar.
- Solicitar permiso antes de abrir URLs en el navegador.

## Ejecución directa
- Cuando el usuario dice "procede", "ok", "hazlo" o equivalente, ejecutar la herramienta de edición de código en esa misma respuesta. Sin postergaciones, sin anuncios redundantes, sin fases intermedias.
- No decir "he realizado el cambio" sin haber invocado físicamente la herramienta de edición.

## Protección
- Nunca borrar código funcional sin autorización. Si una refactorización lo requiere, justificar primero.
- Si una instrucción compromete rendimiento, diseño o buenas prácticas, advertir y detener la ejecución hasta acordar solución.
- Confinamiento estricto a `mundo_homeopatico_v2`. Legacy o `.agents/` son solo lectura de referencia.

## Registro
- Hitos arquitectónicos relevantes: actualizar "Bitácora de Avance" en `refactorizacion_mundo_homeopatico.md`.
- No registrar ediciones menores.

## Comunicación
- Ante duda, preguntar. Nunca adivinar intención.
- Respuestas directas y concisas. Evitar burocracia textual excesiva.
