# Auditoría de Conexión: Sedes, Contacto y FAQ

Este documento registra el estado técnico de la integración entre el frontend (Astro) y el backend (Google Apps Script / Google Sheets) para las secciones institucionales.

---

## 📊 1. Estado de los Endpoints (Auditados)

Se han realizado pruebas de conectividad hacia el WebApp de producción v2.1:
`https://script.google.com/macros/s/AKfycbyV2Z-MMkce9WLPn54Ik1Lmlj-60hD-3DOoeROTEfG_ZO1HWqitOQIRPIsY3BD5Z_qn/exec`

| Acción (`action`) | Estado Real | Comportamiento Detectado |
| :--- | :--- | :--- |
| `faq` | ✅ Exitoso | Devuelve 5 registros reales. |
| `video` | ✅ Exitoso | Devuelve el video institucional ("Calidad farmacéutica"). |
| `distribuidores` | ✅ Exitoso | Devuelve 5 sedes con datos completos. |
| `config` | ✅ Exitoso | Devuelve objeto plano con textos de marca y contacto. |
| `maestro` | ✅ Exitoso | Devuelve el catálogo completo de productos. |

**Conclusión:** Integración **EXITOSA**. El backend Universal Elite v2.1 está plenamente operativo y sincronizado con el frontend.

---

## 🔍 2. Auditoría de Encabezados (Sincronización Final)

### ✅ FAQ, VIDEO y SEDES
*   **Estado:** **SINCRONIZADO**. 
*   **Mapeo:** Se implementó normalización de llaves en `api.ts` para transformar `sedes` → `nombre` y `departamento` → `ciudad` de forma transparente.
*   **Interfaz:** Renderizadores dinámicos activados y probados.

---

## 🛡️ 3. Protocolo de Resolución (Estado Final)

1.  **Backend (GAS):** ✅ Implementado v2.1 con enrutamiento total.
2.  **Frontend (Astro):** 
    *   ✅ `.env` actualizado.
    *   ✅ Mapeo de alias en `api.ts` refinado.
    *   ✅ Lógica de Sede Principal ajustada para leer de la tabla de distribuidores.
    *   ✅ Skeletons reemplazados por renderizado dinámico real.

---
> **HITO ALCANZADO:** La página institucional de Mundo Homeopático v2 ahora es 100% dinámica y controlable desde Google Sheets.
