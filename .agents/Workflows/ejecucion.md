---
description: Flujo único de ejecución adaptable a cualquier tarea
---

# Ejecución — Workflow Universal

## Tarea pequeña (< 3 archivos, ajustes puntuales)
1. **Diagnóstico**: Leer los archivos involucrados. Identificar el problema.
2. **Propuesta**: Decir qué se va a cambiar y en qué líneas. Máximo 3-5 líneas de texto.
3. **Ejecución**: Tras aprobación del usuario, editar el código inmediatamente en esa misma respuesta.
4. **Verificación**: Informar qué cambió. El usuario valida en su entorno.

## Tarea grande (> 3 archivos, funcionalidad nueva, refactorización mayor)
1. **Diagnóstico**: Leer todos los archivos implicados. Reportar estado actual.
2. **Plan particionado**: Dividir en bloques de máximo 3 archivos o 100 líneas. Presentar checklist.
3. **Ejecución por bloques**: Ejecutar un bloque a la vez. Tras cada bloque, informar y esperar validación.
4. **Checkpoint**: Al completar todos los bloques, hacer commit de Git.

## Reglas de ejecución
- "Procede" = código en esa misma respuesta. Sin fases intermedias.
- Un solo permiso basta. No pedir confirmación dos veces para el mismo cambio.
- Si algo sale mal, informar inmediatamente y proponer rollback.
