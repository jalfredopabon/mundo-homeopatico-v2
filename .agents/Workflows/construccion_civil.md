---
description: Metodología de construcción progresiva para implementar funcionalidades completas
---

# Construcción Civil — Workflow de Desarrollo

Este workflow define el proceso secuencial obligatorio para implementar cualquier funcionalidad nueva o refactorización mayor en el proyecto Mundo Homeopático v2.

## Cuándo usar este workflow

- Al crear un nuevo componente o página desde cero.
- Al integrar una fuente de datos (Google Sheets, GAS).
- Al implementar una funcionalidad completa (carrito, buscador, autenticación).
- Al refactorizar o refinar UI/UX de componentes o páginas existentes.
- En cualquier cambio que toque más de un archivo o más de 20 líneas.

## Pasos

1. **Análisis.** Leer la solicitud del usuario. Verificar que no contradiga las reglas operativas ni la arquitectura existente. Si hay conflicto, advertir antes de proceder.

2. **Cimientos (Estructura).** Crear los archivos base: componentes `.astro`, layouts, rutas de página. Sin estilos, sin lógica. Solo el esqueleto HTML semántico con contenedores vacíos. Validar que el servidor de desarrollo no arroje errores.

3. **Paredes (Maquetación).** Aplicar las clases estructurales de Tailwind: grids, flexbox, espaciados, responsive breakpoints, y los Design Tokens de color base (bg-brand, text-brand, border-brand, etc.). El componente debe verse correctamente posicionado y con su identidad cromática aunque no tenga datos reales. Validar visualmente.

4. **Cableado (Lógica).** Conectar la lógica de negocio: módulos TypeScript/JavaScript, fetch de datos, event listeners, manejo de estado. Validar que el flujo de datos funcione correctamente con datos reales o de prueba.

5. **Pintura (Pulido Visual).** Aplicar refinamientos finales: micro-animaciones, transiciones, hover effects, focus rings, estados interactivos (loading, empty, error), y accesibilidad (aria-labels, contraste). Validar UI/UX contra el estándar premium del proyecto.

6. **Verificación e Higiene.** Comprobar que todo funciona correctamente en conjunto. Revisar responsive, interacciones y edge cases. Ejecutar checklist de higiene obligatorio:
   - ¿Quedan hex crudos fuera de global.css? Migrar a tokens.
   - ¿Hay bloques comentados, console.log de debug o código muerto? Eliminar.
   - ¿Hay clases Tailwind contradictorias en un mismo elemento? Corregir.
   - ¿Los IDs y clases custom son semánticos? Renombrar si son genéricos.
   - ¿Hay valores hardcodeados que vendrán de datos? Marcar con TODO.

7. **Registro.** Actualizar la sección "Bitácora de Avance" en `refactorizacion_mundo_homeopatico.md` documentando el hito completado.

## Reglas durante la ejecución

- Nunca saltar fases. No aplicar pintura sin tener cableado.
- Completar y validar cada paso antes de avanzar al siguiente.
- Si hay duda en cualquier paso, preguntar al usuario antes de asumir.
