# Auditoría Técnica: Migración de Página de Catálogo

## 1. Localización del Código y Estructura
La página de catálogo se compone de los siguientes elementos clave:
- **Ruta:** `src/pages/index.astro` (Contenedor principal y motor de búsqueda).
- **Sidebar:** `src/components/catalogo/SidebarCatalogo.astro` (Navegación por categorías).
- **Tablas:** `src/components/catalogo/CatalogTable.astro` (Shell de renderizado).
- **Filas:** `src/components/catalogo/ProductRowElite.astro` (Ficha individual de producto).

## 2. Hallazgos de Código Inline y Deuda Técnica
Se han identificado los siguientes puntos que deben limpiarse para cumplir con los estándares de seguridad (CSP) y rendimiento del proyecto:

### A. Atributos `onclick` Inline
- **Archivo:** `src/components/catalogo/ProductRowElite.astro` (Línea 105).
- **Problema:** El botón de "+X más" utiliza un atributo `onclick` con lógica incrustada.
- **Acción:** Mover esta lógica a un script externo en el mismo componente o a un módulo de utilidades, utilizando delegación de eventos.

### B. Datos Hardcoded
- **Archivo:** `index.astro` (Líneas 17-252) y `SidebarCatalogo.astro` (Líneas 10-68).
- **Problema:** Más de 300 líneas de código son solo datos estáticos que dificultan el mantenimiento.
- **Acción:** Reemplazar por llamadas asíncronas a la API y esquemas Zod.

### C. Generación de IDs
- **Archivo:** `ProductRowElite.astro` (Línea 41).
- **Problema:** Uso de `Math.random()` para IDs de badges.
- **Acción:** Utilizar el `id_producto` real (o `tabla_id` + index) proveniente de la API para garantizar unicidad y trazabilidad.

## 3. Análisis de Datos y Jerarquías (Google Sheets)
Se confirma la existencia de una estructura relacional entre dos tablas principales y una jerarquía de navegación de 4 niveles.

### A. Estructura de Tablas (Encabezados)
1.  **`navegacion` (Mapa del Sidebar):**
    `nivel_1 | nivel_2 | nivel_3 | nivel_4 | titulo_mostrar | descripcion | tabla_id`
2.  **`lista_precios` (Datos de Productos):**
    `tabla_id | producto | requiere_elaboracion | descripcion_producto | badges | precio_farmacia | precio_publico`

### B. Jerarquía del Sidebar (Niveles)
Basado en `sidebar_niveles.md`, la navegación sigue este patrón:
- **Nivel 1:** Categoría Global (ej: "De nuestra farmacia").
- **Nivel 2:** Subcategoría (ej: "Según prescripción").
- **Nivel 3:** Agrupador o Link (ej: "Homeopáticos" [Agrupador] o "Esencias florales" [Link]).
- **Nivel 4:** Detalle Final (ej: "Oficinales").
- **Vínculo:** Solo los nodos que contienen un `tabla_id` disparan el renderizado de una tabla de productos.

### C. Confirmación de Precios
Contrario a la auditoría inicial, se confirma que la tabla `lista_precios` **SÍ contiene los precios**:
- `precio_farmacia`: Precio para profesionales/farmacias.
- `precio_publico`: Precio sugerido al público.

## 4. Estrategia de Procesamiento JSON
El sistema transformará la data plana del CSV/API en un objeto estructurado:

```json
{
  "navigation": [
    {
      "label": "De nuestra farmacia",
      "children": [
        {
          "label": "Según prescripción",
          "items": [
            {
              "type": "accordion",
              "label": "Homeopáticos",
              "children": [
                { "label": "Oficinales", "id": "oficinales" }
              ]
            }
          ]
        }
      ]
    }
  ],
  "products": {
    "oficinales": [
      {
        "name": "3 a 99 (D X CH K)",
        "description": "Dilución y escala...",
        "farmaciaPrice": "23000",
        "publicoPrice": "43000"
      }
    ]
  }
}
```

## 6. Hallazgos de Resiliencia (Auditoría Proyecto Anterior)
Basado en el análisis de `DataService` del proyecto legacy, se deben integrar las siguientes mejores prácticas para asegurar que el catálogo siempre se pinte:

### A. Mecanismo de Retry (Reintentos)
- **Problema:** Google Apps Script puede tener latencia o fallos temporales (Cold Start).
- **Acción:** Implementar un loop de reintento en `api.ts` que realice hasta 3 intentos antes de fallar definitivamente.

### B. Cache Busting Dinámico
- **Problema:** El navegador puede cachear respuestas vacías o antiguas de la API.
- **Acción:** Añadir un parámetro `_cb=${Date.now()}` a las peticiones fetch para forzar la obtención de datos frescos cuando el SWR lo requiera.

### C. Normalización de Cabeceras (Alias)
- **Problema:** Discrepancias históricas en los nombres de columnas (ej: `tablas_id` vs `tabla_id`).
- **Acción:** Reforzar `normalizeKeys` en `api.ts` para que mapee automáticamente alias comunes detectados en el proyecto legacy.

### E. Renderizado Híbrido (Server + Client Fallback)
- **Problema:** Si el fetch en el servidor falla, el usuario recibe una página vacía que no intenta recuperarse.
- **Acción:** Implementar un componente `<CatalogRehydrator />` que, si detecta el catálogo vacío al cargar la página en el navegador, realice un fetch forzado en el cliente para pintar los datos.

### F. Telemetría de Depuración en Cliente
- **Problema:** Los logs actuales solo son visibles en la terminal del desarrollador.
- **Acción:** Exponer una función `window.__DEBUG_CATALOG__()` que permita auditar el estado del SWR y la respuesta de la API directamente desde la consola del navegador del usuario.

## 7. Hoja de Ruta de Implementación Actualizada
1.  **Refactorización de API:** Implementar `robustFetch` con 3 reintentos y cache-busting.
2.  **Mapeo de Alias:** Asegurar compatibilidad con `tablas_id` y `productos` mediante `normalizeKeys`.
3.  **Fallback de UI:** Crear un estado de carga/error visualmente coherente en `index.astro`.
4.  **Hidratación de Emergencia:** Añadir script de cliente para recuperación de datos si el renderizado SSR falla.
