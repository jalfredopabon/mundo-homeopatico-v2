# Plan de Armonía: Refactorización Sidebar Catálogo

Inspirado en la jerarquía y el ritmo visual del Vademécum, este plan busca transformar el Sidebar de Catálogo en una interfaz de "Lujo Minimalista" basada en la arquitectura de **Islas de Información**.

## Fase 1: El Respiro y el Ritmo (Espacios y Alineación)
*Objetivo: Eliminar la sensación de amontonamiento y establecer el "aire" como elemento narrativo.*

1.  **Aislamiento del Buscador:**
    *   Aumentar el padding inferior del bloque de búsqueda (de `pb-4` a `pb-10`).
    *   Añadir el indicador de conteo (`14 categorías disponibles`) con tipografía sutil (`text-[11px] opacity-70`) para dar una pausa visual antes de la lista.
2.  **Construcción de Islas:**
    *   Sustituir la separación genérica por un `gap-12` entre las subsecciones principales (ej. Según prescripción vs Línea MH).
    *   Asegurar que cada bloque sea una unidad aislada que el ojo pueda procesar independientemente.
3.  **Proximidad Selectiva:**
    *   Reducir a `0` el espacio entre el Título Nivel 2 y su primer hijo. El título debe "tocar" al grupo para ser percibido como su encabezado.
4.  **Alineación Matemática Lupa-Icono:**
    *   Ajustar el margen del contenedor de iconos a `ml-[2px]` para que el centro de todos los iconos y bullets coincida exactamente con el centro óptico de la nueva lupa.

## Fase 2: La Escalera (Jerarquía Visual)
*Objetivo: Replicar el escalonamiento del Vademécum para explicar la pertenencia.*

1.  **Sangría Técnica de Nivel 4:**
    *   Desplazar los sub-items (Nivel 4) hacia la derecha de modo que su **bullet** se alinee perfectamente con el inicio del **texto** del Nivel 3 (Padre).
2.  **Higiene Tipográfica Unificada:**
    *   Unificar todos los textos al color base del Header (`text-slate-800`).
    *   Eliminar mayúsculas sostenidas de los Títulos Nivel 1 para suavizar el ritmo de lectura.
    *   Mantener negrilla (`font-bold`) **exclusivamente** en los títulos Nivel 1/2 y el elemento activo. El resto en `font-normal`.

## Fase 3: Pulido Interactivo (Feedback Premium)
*Objetivo: Refinar el comportamiento de los elementos clickeables.*

1.  **La Cápsula de Navegación:**
    *   Oscurecer el tono de la cápsula activa (`bg-slate-200`) para que tenga más autoridad visual frente al fondo blanco.
2.  **Estabilidad Absoluta:**
    *   Eliminar cualquier rastro de `translateX` o escalado en los iconos al seleccionar. El cambio de estado debe ser de color y peso, nunca de posición, para no romper la "plomada" vertical.