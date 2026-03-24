# Plan de Refactorización y Blindaje: Mundo Homeopático v2

Este documento detalla el diagnóstico técnico real del proyecto y el mapa de ruta para eliminar la fragilidad visual y la deuda técnica acumulada en los Sidebars.

## 🚨 Diagnóstico de Vulnerabilidades

### 1. Fragilidad Visual (CSS "Mágico")
*   **Problema:** Uso excesivo de valores negativos calculados a mano (`mt-[-2.5px]`, `top-[72px]`).
*   **Impacto:** Cualquier cambio mínimo en el Header global (fuente, borde, interlineado) rompe la alineación de todos los sidebars de forma impredecible.
*   **Riesgo:** Desfases de 1-3 píxeles entre páginas "gemelas" (Vademécum vs. Catálogo).

### 2. Fragmentación de Lógica (Código Espejo)
*   **Problema:** El "Cajón Maestro" del buscador/acción rápida está copiado y pegado en 3 archivos:
    1. `SidebarCatalogo.astro`
    2. `vademecum.astro`
    3. `SidebarContacto.astro`
*   **Impacto:** El mantenimiento es triple. Cada ajuste estético o de accesibilidad requiere 3 ediciones idénticas. La probabilidad de error u olvido en un archivo es alta.

### 3. Ausencia de Verificación de Tipos (Type Safety)
*   **Problema:** No hay validación de las propiedades (`props`) que fluyen entre componentes.
*   **Impacto:** En producción, un valor `undefined` o mal formateado puede causar que el buscador no funcione o que el layout colapse silenciosamente.

---

## 🏗️ Estrategia de Blindaje (Arquitectura de Módulos)

### Fase A: Creación del Componente Atómico
1.  **Extraer `StickyActionBox.astro`:** Crear un único componente maestro que contenga la estructura sticky, el padding `px-4 py-4`, el borde inferior y el contenedor del input.
2.  **Parámetros Dinámicos:** El componente debe aceptar ícono y texto (ej: "Lupa + Buscar" o "Instagram + Síguenos").
3.  **Alineación Flex Nativa:** Reemplazar los márgenes negativos por una estructura flexbox centrada que garantice el mismo "horizonte" visual sin importar el contenido.

### Fase B: Unificación de Sidebars
1.  **Limpiar Vademécum, Catálogo y Contacto:** Eliminar el código repetido de sus cabeceras.
2.  **Inyectar el Componente Maestro:** Llamar a `StickyActionBox` en los tres archivos. 
    *   *Resultado:* Garantía de alineación 100% idéntica por construcción, no por imitación.

### Fase C: Automatización de Calidad (CI/CD)
1.  **`npx astro check`:** Ejecutar validación de tipos antes de cada push.
2.  **ESLint con `eslint-plugin-astro`:** Configurar reglas que prohíban clases Tailwind contradictorias.
3.  **Lighthouse Audit:** Establecer umbrales mínimos de Performance y Accesibilidad para evitar que la deuda técnica degrade la experiencia de usuario.

---

## 🏁 Meta Final: "Robustez Enterprise"
El proyecto debe pasar de ser una colección de páginas similares a un **Sistema de Diseño Blindado**. Un cambio en el motor del buscador en un solo archivo debe verse reflejado con precisión atómica en todo el sitio, sin necesidad de ajustes manuales de píxeles.

---

## 🛠️ Herramientas de Diagnóstico Automático (El "Radar" de Salud)

Para asegurar que el código no se rompa en producción y sea robusto, implementaremos las siguientes herramientas de revisión automática:

### 1. Astro Check (`npx astro check`)
*   **Función:** Validación nativa de tipos y sintaxis.
*   **Objetivo:** Detectar errores "silenciosos" (variables mal escritas, props inexistentes) antes de que el usuario los vea.
*   **Uso:** Escaneo total del proyecto en segundos.

### 2. Análisis Estático (ESLint + Prettier)
*   **Función:** Limpieza y consistencia de código.
*   **Objetivo:** Prohibir patrones de código "sucio", clases Tailwind contradictorias y asegurar que el código sea legible para cualquier desarrollador.
*   **Uso:** Regaña al desarrollador si intenta escribir código frágil.

### 3. Seguridad y Salud de Librerías (NPM Audit)
*   **Función:** Escaneo de vulnerabilidades.
*   **Objetivo:** Detectar si alguna dependencia del proyecto tiene fallos de seguridad conocidos.
*   **Uso:** Ejecución regular de `npm audit`.

### 4. Calidad de Salida (Lighthouse CI)
*   **Función:** Auditoría de Performance, Accesibilidad y SEO.
*   **Objetivo:** Garantizar que el sitio mantenga una puntuación >90/100 en todas las métricas.
*   **Uso:** Informe automático después de cada despliegue.

---

## 📍 Siguientes Pasos Operativos: Habilitar "Radar de Salud"

### Fase A: Blindaje Visual y Unificación (Motor de Búsqueda) ✅
- **Hito 1:** Creación de `StickyActionBox.astro` como componente maestro.
- **Hito 2:** Unificación de buscadores en Catálogo, Vademécum y Contacto.
- **Hito 3:** Eliminación de "márgenes mágicos" en sidebars.
- **Hito 4:** Auditoría de Salud: Reducción de **338 errores** a solo **2 errores** de TypeScript (Limpieza masiva en `CartDrawer.astro`, `index.astro` y `vademecum.astro`).
- **Estado:** COMPLETADO.
1.  **Auditoría Inicial:** Ejecutar `npx astro check` para identificar la deuda técnica actual.
2.  **Configurar Pre-Commit:** Bloquear el `git push` si el código tiene errores críticos de sintaxis.
3.  **Refactorización Maestro:** Priorizar la Fase A (Componente Atómico) para que las herramientas de diagnóstico tengan menos código que vigilar.

---

## 🔒 Fase D: Arquitectura de Datos y Seguridad (Próximo Hito)

Para garantizar la **Protección de Propiedad Intelectual** (fórmulas) y una **Experiencia Premium**, implementaremos un modelo híbrido:

### 1. Modelo Híbrido de Entrega
*   **Contenido Público (Home, Catálogo, Sedes):** 
    *   **Estrategia:** *Build-time Static Generation*.
    *   **Beneficio:** Los precios y datos se "hornean" en el HTML durante la construcción. Cero latencia, cero URLs de API expuestas al público.
*   **Contenido Protegido (Vademécum):**
    *   **Estrategia:** *Runtime Fetching* con validación en servidor (Apps Script).
    *   **Beneficio:** Las fórmulas nunca tocan el HTML público. Solo viajan al navegador tras una identificación exitosa.

### 2. Sistema de Acceso Premium (Vademécum)
*   **Identificación Doble Factor:** Ingreso mediante **Cédula + PIN** (gestionado por la farmacia en Google Sheets).
*   **Personalización:** Saludo dinámico ("Bienvenido, Dr. [Nombre]") para reforzar el sentido de exclusividad.
*   **Gestión No-Code:** El cliente gestiona médicos (altas, bajas, cambios de PIN) directamente desde una nueva hoja `Médicos` en su Google Sheet actual.

### 3. Blindaje de Seguridad en Apps Script
*   **Servidor como Juez:** La lógica de validación vive en Google, no en el navegador. 
*   **Anti-Fuerza Bruta:** Implementación de límites de intentos por IP.
*   **Auditoría Técnica:** Creación de una hoja de `Logs` automática para rastrear quién accede a las fórmulas y cuándo.

