# Bitácora de Refactorización Atómica - Mundo Homeopático v2

## 🛡️ Hitos de Arquitectura Atómica (Lego-Architecture)

### Hito 21: Footer Atómico y Centralización (02/04/2026)
- **Átomos Globales:** Creación de `.footer-main`, `.footer-logo-box`, `.footer-title`, `.footer-text`, `.footer-social-link` y `.btn-back-to-top`.
- **Limpieza de Código:** Eliminación de ~65 clases inline en `Footer.astro`.
- **Cirugía de Duplicación:** Erradicación del botón `back-to-top` redundante en `index.astro`, centralizando el control en el Footer.
- **PostCSS Compliance:** Respeto estricto a las reglas de `@apply` evitando modificadores de opacidad y `group`.

### Hito 22: Cart Drawer Atómico y Animaciones "Elite" (03/04/2026)
- **Átomos de Panel:** Creación de `.drawer-panel`, `.drawer-header`, `.drawer-overlay`, `.cart-label`, `.cart-input`.
- **Átomos de Ítems:** Creación de `.cart-item-card` y `.cart-qty-btn`.
- **Globalización de Animaciones:** Migración de `@keyframes elite-shake`, `elite-fadeIn` y `elite-slideDown` a `global.css`.
- **Limpieza Estructural:** 
    - Remoción de toda la lógica `<style>` local de `CartDrawer.astro`.
    - Unificación de feedback visual (sustitución de `emerald` por tokens `brand`).
    - Reducción drástica de deuda técnica en `renderCart()`.

### Hito 23: Header Atómico y Navegación Dinámica (03/04/2026)
- **Átomos de Header:** Implementación de 7 nuevos átomos globales (`.header-main`, `.header-container`, `.header-nav-link`, `.header-cta-btn`, `.header-tool-btn`, `.header-icon-wrap`, `.header-progress-bar`).
- **Limpieza Técnica:** Eliminación de ~70 clases inline.
- **UX Premium:** Unificación de tooltips "Elite" y barra de progreso global.

### Hito 24: Página Principal Atómica (04/04/2026)
- **Refactorización de `index.astro`:** Implementación de átomos para contenedores de scroll (`.main-content-scroll`), banners de información (`.banner-info`) y feedback de compra (`.is-success`).

## 🚀 Próximos Pasos (Deuda Técnica)
- [ ] **Hito 25 (Vademécum Atoms)**: Refactorización de `MedicalCard.astro` para usar átomos globales.
