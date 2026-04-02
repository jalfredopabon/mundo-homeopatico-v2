...
gemini me dice esto:
"El problema visual ocurre por la forma en que el modelo de caja (Box Model) está estructurado en tu código actual.

**Diagnóstico del problema:**
Actualmente, los ítems anidados (ej. "Oficinales") comparten el mismo margen izquierdo (`mx-4` equivalente a 16px) que los ítems raíz (ej. "Esencias florales"). Para alinear el texto de los ítems anidados, estás utilizando un bloque `div` vacío (`<div class="w-8 flex-shrink-0"></div>`) como espaciador. Esto provoca que el fondo de la cápsula en estado `:hover` o `.is-active` comience a renderizarse desde el píxel 16, intersectando visualmente la línea vertical que está posicionada en el píxel 31 (`left: 31px`).

**Solución aplicada (Modelo Cloudflare):**
Para replicar el diseño de Cloudflare donde la línea es adyacente a la cápsula sin atravesarla, se debe desplazar el punto de origen geométrico del elemento anidado.

1.  **Eliminación del nodo vacío:** Se elimina el `<div class="w-8">` interno.
2.  **Desplazamiento del margen:** Se reemplaza `mx-4` por `ml-10 mr-4`. Esto fuerza a que el fondo de la cápsula inicie en el píxel 40, quedando 9 píxeles a la derecha de la línea vertical (ubicada en el 31).
3.  **Compensación de alineación:** Para mantener la alineación tipográfica exacta con el ítem superior, se añade un padding interno `pl-2` (8px). Matemáticamente: margen izquierdo de la cápsula (40px) + padding interno (8px) = 48px, coincidiendo exactamente con el inicio del texto en el elemento padre (margen 16px + ancho de ícono 32px = 48px).

A continuación, el archivo corregido con esta lógica implementada de manera sistemática.

http://googleusercontent.com/immersive_entry_chip/0"

y me da este código "---
// src/components/catalogo/SidebarCatalogo.astro
/\*\*

- Sidebar de Catálogo: Clonación Estricta 1:1 con la versión online.
- Prioriza la fidelidad visual absoluta eliminando sobre-ingeniaría.
- Mantiene la funcionalidad de buscador, acordeones y scrollspy.
  \*/
  import Icons from "../shared/Icons.astro";

---

<aside class="hidden md:flex flex-col w-64 border-r border-subtle bg-surface-white h-[calc(100vh-64px)] sticky top-[64px] overflow-y-auto scrollbar-premium">
  
  <!-- BUSCADOR STICKY -->
  <div class="sticky top-0 z-30 bg-surface-white px-4 py-4">
    <div class="relative group">
      <div class="absolute left-[7px] top-0 h-full w-4 flex items-center justify-center text-slate-700 group-focus-within:text-brand transition-colors">
        <div class="relative w-4 h-4 flex items-center justify-center">
          <Icons type="search" class="w-full h-full" />
        </div>
      </div>
      <input type="search" id="catalogo-search" placeholder="Buscar productos..." class="w-full h-10 pl-8 pr-4 bg-slate-50/70 border border-subtle rounded-lg text-[14px] text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand focus:border-brand transition-all placeholder:text-slate-700 mt-[-2.5px]">
    </div>
  </div>

  <nav class="pb-6 mt-0 space-y-6" id="catalogo-scrollspy">
    <!-- DE NUESTRA FARMACIA -->
    <div class="space-y-2">
      <span class="block text-[12px] font-semibold text-slate-900 px-4 tracking-tight">De nuestra farmacia</span>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-0">
          <span class="block text-[12px] font-medium text-slate-600 px-4">Según prescripción</span>
          <div class="flex flex-col gap-0.5">
            <!-- Acordeón: Homeopáticos -->
            <div class="flex flex-col">
              <button class="accordion-trigger group relative flex items-center w-[calc(100%-2rem)] ml-4 pr-4 h-11 mt-1 text-slate-700 transition-colors rounded-lg hover:bg-surface-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30" data-target="homeopáticos">
                <div class="w-8 flex-shrink-0 flex items-center justify-start pl-[6px] transition-colors">
                  <div class="w-[18px] h-[18px] flex items-center justify-center">
                    <Icons type="test-tube" class="w-full h-full" strokeWidth={1.5} />
                  </div>
                </div>
                <span class="text-[14px] font-normal leading-none mt-[-1px] transition-transform">Homeopáticos</span>
                <Icons type="chevron-down" class="ml-auto w-3.5 h-3.5 transition-all duration-300 accordion-icon shrink-0" strokeWidth={2.5} />
              </button>
              <div class="accordion-content overflow-hidden transition-all duration-300 ease-in-out" style="max-height: 0;">
                <a href="#oficinales" class="sidebar-link group relative flex items-center h-[38px] rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 ml-10 mr-4 pl-2 my-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                  <span class="text-[13px] font-normal group-[.is-active]:font-bold leading-none mt-[-0.5px] transition-transform">Oficinales</span>
                </a>
                <a href="#multipotencias" class="sidebar-link group relative flex items-center h-[38px] rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 ml-10 mr-4 pl-2 my-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                  <span class="text-[13px] font-normal group-[.is-active]:font-bold leading-none mt-[-0.5px] transition-transform">Multipotencias</span>
                </a>
                <a href="#magistrales" class="sidebar-link group relative flex items-center h-[38px] rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 ml-10 mr-4 pl-2 my-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                  <span class="text-[13px] font-normal group-[.is-active]:font-bold leading-none mt-[-0.5px] transition-transform">Magistrales</span>
                </a>
              </div>
            </div>

            <!-- Item: Esencias florales -->
            <div class="flex flex-col">
              <a href="#esencias-florales" class="sidebar-link group relative flex items-center h-11 rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 mx-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                <div class="w-8 flex-shrink-0 flex items-center justify-start pl-[6px] transition-colors">
                  <div class="w-[18px] h-[18px] flex items-center justify-center">
                    <Icons type="flower" class="w-full h-full" strokeWidth={1.5} />
                  </div>
                </div>
                <span class="text-[14px] font-normal group-[.is-active]:font-bold leading-none mt-[-1px] transition-transform">Esencias florales</span>
              </a>
            </div>

            <!-- Item: Oligoelementos -->
            <div class="flex flex-col">
              <a href="#oligoelementos" class="sidebar-link group relative flex items-center h-11 rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 mx-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                <div class="w-8 flex-shrink-0 flex items-center justify-start pl-[6px] transition-colors">
                  <div class="w-[18px] h-[18px] flex items-center justify-center">
                    <Icons type="molecules" class="w-full h-full" strokeWidth={1.5} />
                  </div>
                </div>
                <span class="text-[14px] font-normal group-[.is-active]:font-bold leading-none mt-[-1px] transition-transform">Oligoelementos</span>
              </a>
            </div>
          </div>
        </div>

        <!-- LINEA MH -->
        <div class="flex flex-col gap-0">
          <span class="block text-[12px] font-medium text-slate-600 px-4">Línea MH</span>
          <div class="flex flex-col gap-0.5">
            <!-- Acordeón: Homeopatía -->
            <div class="flex flex-col">
              <button class="accordion-trigger group relative flex items-center w-[calc(100%-2rem)] ml-4 pr-4 h-11 mt-1 text-slate-700 transition-colors rounded-lg hover:bg-surface-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30" data-target="homeopatia">
                <div class="w-8 flex-shrink-0 flex items-center justify-start pl-[6px] transition-colors">
                  <div class="w-[18px] h-[18px] flex items-center justify-center">
                    <Icons type="test-tube" class="w-full h-full" strokeWidth={1.5} />
                  </div>
                </div>
                <span class="text-[14px] font-normal leading-none mt-[-1px] transition-transform">Homeopatía</span>
                <Icons type="chevron-down" class="ml-auto w-3.5 h-3.5 transition-all duration-300 accordion-icon shrink-0" strokeWidth={2.5} />
              </button>
              <div class="accordion-content overflow-hidden transition-all duration-300 ease-in-out" style="max-height: 0;">
                <a href="#homeopaticos-esenciales" class="sidebar-link group relative flex items-center h-[38px] rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 ml-10 mr-4 pl-2 my-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                  <span class="text-[13px] font-normal group-[.is-active]:font-bold leading-none mt-[-0.5px] transition-transform">Homeopáticos esenciales</span>
                </a>
                <a href="#homeopaticos-especiales" class="sidebar-link group relative flex items-center h-[38px] rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 ml-10 mr-4 pl-2 my-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                  <span class="text-[13px] font-normal group-[.is-active]:font-bold leading-none mt-[-0.5px] transition-transform">Homeopáticos especiales</span>
                </a>
                <a href="#cuidado-capilar" class="sidebar-link group relative flex items-center h-[38px] rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 ml-10 mr-4 pl-2 my-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                  <span class="text-[13px] font-normal group-[.is-active]:font-bold leading-none mt-[-0.5px] transition-transform">Cuidado capilar</span>
                </a>
                <a href="#capsulas" class="sidebar-link group relative flex items-center h-[38px] rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 ml-10 mr-4 pl-2 my-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                  <span class="text-[13px] font-normal group-[.is-active]:font-bold leading-none mt-[-0.5px] transition-transform">Cápsulas</span>
                </a>
                <a href="#cremas" class="sidebar-link group relative flex items-center h-[38px] rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 ml-10 mr-4 pl-2 my-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                  <span class="text-[13px] font-normal group-[.is-active]:font-bold leading-none mt-[-0.5px] transition-transform">Cremas</span>
                </a>
                <a href="#geles" class="sidebar-link group relative flex items-center h-[38px] rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 ml-10 mr-4 pl-2 my-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                  <span class="text-[13px] font-normal group-[.is-active]:font-bold leading-none mt-[-0.5px] transition-transform">Geles</span>
                </a>
                <a href="#unguentos" class="sidebar-link group relative flex items-center h-[38px] rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 ml-10 mr-4 pl-2 my-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                  <span class="text-[13px] font-normal group-[.is-active]:font-bold leading-none mt-[-0.5px] transition-transform">Ungüentos</span>
                </a>
                <a href="#elixires" class="sidebar-link group relative flex items-center h-[38px] rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 ml-10 mr-4 pl-2 my-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                  <span class="text-[13px] font-normal group-[.is-active]:font-bold leading-none mt-[-0.5px] transition-transform">Elíxires</span>
                </a>
              </div>
            </div>

            <!-- Item: Esencias florales LMH -->
            <div class="flex flex-col">
              <a href="#esencias-florales-lmh" class="sidebar-link group relative flex items-center h-11 rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 mx-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                <div class="w-8 flex-shrink-0 flex items-center justify-start pl-[6px] transition-colors">
                  <div class="w-[18px] h-[18px] flex items-center justify-center">
                    <Icons type="flower" class="w-full h-full" strokeWidth={1.5} />
                  </div>
                </div>
                <span class="text-[14px] font-normal group-[.is-active]:font-bold leading-none mt-[-1px] transition-transform">Esencias florales</span>
              </a>
            </div>

            <!-- Item: Oligoelementos K7 -->
            <div class="flex flex-col">
              <a href="#oligoelementos-k7" class="sidebar-link group relative flex items-center h-11 rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 mx-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                <div class="w-8 flex-shrink-0 flex items-center justify-start pl-[6px] transition-colors">
                  <div class="w-[18px] h-[18px] flex items-center justify-center">
                    <Icons type="molecules" class="w-full h-full" strokeWidth={1.5} />
                  </div>
                </div>
                <span class="text-[14px] font-normal group-[.is-active]:font-bold leading-none mt-[-1px] transition-transform">Oligoelementos K7</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PRODUCTOS EXCLUSIVOS -->
    <div class="space-y-2">
      <span class="block text-[12px] font-semibold text-slate-900 px-4 tracking-tight">Productos exclusivos</span>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-0">
          <span class="block text-[12px] font-medium text-slate-600 px-4">Complementarios</span>
          <div class="flex flex-col gap-0.5">
            <div class="flex flex-col">
              <a href="#alimentos-funcionales" class="sidebar-link group relative flex items-center h-11 rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 mx-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                <div class="w-8 flex-shrink-0 flex items-center justify-start pl-[6px] transition-colors">
                  <div class="w-[18px] h-[18px] flex items-center justify-center">
                    <Icons type="leaf" class="w-full h-full" strokeWidth={1.5} />
                  </div>
                </div>
                <span class="text-[14px] font-normal group-[.is-active]:font-bold leading-none mt-[-1px] transition-transform">Alimentos funcionales</span>
              </a>
            </div>

            <div class="flex flex-col">
              <a href="#cbd" class="sidebar-link group relative flex items-center h-11 rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 mx-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                <div class="w-8 flex-shrink-0 flex items-center justify-start pl-[6px] transition-colors">
                  <div class="w-[18px] h-[18px] flex items-center justify-center">
                    <Icons type="cannabis" class="w-full h-full" strokeWidth={1.5} />
                  </div>
                </div>
                <span class="text-[14px] font-normal group-[.is-active]:font-bold leading-none mt-[-1px] transition-transform">CBD</span>
              </a>
            </div>

            <div class="flex flex-col">
              <a href="#aceites-esenciales" class="sidebar-link group relative flex items-center h-11 rounded-lg transition-all text-slate-700 hover:bg-surface-muted hover:text-slate-800 mx-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/30">
                <div class="w-8 flex-shrink-0 flex items-center justify-start pl-[6px] transition-colors">
                  <div class="w-[18px] h-[18px] flex items-center justify-center">
                    <Icons type="droplet" class="w-full h-full" strokeWidth={1.5} />
                  </div>
                </div>
                <span class="text-[14px] font-normal group-[.is-active]:font-bold leading-none mt-[-1px] transition-transform">Aceites esenciales</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </nav>

  <!-- FIRMA DE AUTOR (Crédito de Autor persistente) -->
  <div class="mt-auto px-4 py-4 border-t border-subtle bg-surface-white">
    <a href="https://www.linkedin.com/in/jalfredopabon/" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-surface-muted/50 hover:shadow-sm ring-1 ring-transparent hover:ring-slate-200">
      <!-- Avatar / Iniciales AP -->
      <div class="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white transition-transform group-hover:scale-110">
        AP
      </div>
      <div class="flex flex-col">
        <span class="text-[10px] text-slate-500 font-bold leading-none mb-1">Creado por</span>
        <span class="text-[12px] font-bold text-slate-900 leading-none group-hover:text-brand transition-colors">Alfredo Pabón</span>
      </div>
      <!-- Icono de salida externa sutil -->
      <Icons type="external-link" class="w-3 h-3 ml-auto text-slate-300 group-hover:text-brand transition-colors opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all" strokeWidth={2.5} />
    </a>
  </div>
</aside>

<script>
    /**
     * Lógica de Auto-Anclaje y Resaltado Dinámico (ScrollSpy) del Catálogo.
     * Sincronizada con el estándar de Sedes y Contacto.
     */
    const initCatalogoScrollSpy = () => {
        const scrollContainer = document.getElementById('catalogo-main-scroll');
        const sections = document.querySelectorAll('section[id]');
        const sidebarLinks = document.querySelectorAll('#catalogo-scrollspy .sidebar-link');
        
        if (!scrollContainer || !sections.length || !sidebarLinks.length) return;

        const clearActiveStates = () => {
            sidebarLinks.forEach(link => link.classList.remove('is-active'));
        };

        // 1. Manejo de clics para respuesta inmediata y cierre de acordeones ajenos
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                clearActiveStates();
                link.classList.add('is-active');

                // Si selecciono un ítem, cerramos los acordeones que NO sean el padre de este ítem
                const parentAccordion = link.closest('.accordion-content') as HTMLElement;
                closeAllAccordions(parentAccordion);
            });
        });

        // 2. Observer para seguimiento del scroll (Mismos márgenes que Contacto para consistencia)
        const observerOptions = {
            root: scrollContainer,
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`#catalogo-scrollspy a[href="#${currentId}"]`);
                    
                    if (activeLink) {
                        clearActiveStates();
                        activeLink.classList.add('is-active');
                        // Auto-expandir acordeón si es hijo
                        const parentAccordion = activeLink.closest('.accordion-content') as HTMLElement;
                        if (parentAccordion && parentAccordion.style.maxHeight === '0px') {
                            parentAccordion.style.maxHeight = parentAccordion.scrollHeight + 'px';
                            const trigger = parentAccordion.previousElementSibling;
                            if (trigger) trigger.classList.add('is-expanded');
                        }
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        // 3. Lógica de Acordeones
        const triggers = document.querySelectorAll('.accordion-trigger');
        const closeAllAccordions = (except: HTMLElement | null = null) => {
            document.querySelectorAll('.accordion-content').forEach(el => {
                const content = el as HTMLElement;
                if (content !== except) {
                    content.style.maxHeight = '0';
                    const trigger = content.previousElementSibling;
                    if (trigger) trigger.classList.remove('is-expanded');
                }
            });
        };

        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const content = trigger.nextElementSibling as HTMLElement;
                if (!content) return;
                const isExpanded = trigger.classList.contains('is-expanded');
                closeAllAccordions(content);
                if (isExpanded) {
                    content.style.maxHeight = '0';
                    trigger.classList.remove('is-expanded');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    trigger.classList.add('is-expanded');
                }
            });
        });
    };

    document.addEventListener('astro:page-load', initCatalogoScrollSpy);
</script>

<style>
    /* Limpieza de foco global */
    .sidebar-link:focus, .accordion-trigger:focus {
        outline: none !important;
    }

    /* Estado Activo: Identical to Sedes y Contacto (#D9E8E4) */
    .sidebar-link.is-active {
        background-color: var(--bg-muted) !important;
        color: inherit !important;
        font-weight: 700 !important;
        box-shadow: none !important;
        border: none !important;
    }

    /* Hover: Sutil, igual que en Contacto */
    .sidebar-link:hover:not(.is-active) {
        @apply bg-slate-50;
        font-weight: 700;
    }
  
    /* Acordeones */
    .accordion-trigger.is-expanded .accordion-icon {
        @apply rotate-180 text-brand;
    }

    .accordion-trigger.is-expanded {
        @apply bg-slate-50 text-slate-900 font-bold;
    }

    /* Línea Maestra Jerárquica - Ahora actúa sin superposición gracias al desplazamiento del padding */
    .accordion-content {
        position: relative;
    }

    .accordion-content::before {
        content: "";
        position: absolute;
        left: 31px;
        top: 0;
        bottom: 0;
        width: 1px;
        @apply bg-slate-200;
        pointer-events: none;
    }
</style>"

luego le pedi una segunda opinión y me dice esto
"El problema radica en una inconsistencia estructural en las clases de Tailwind aplicadas a los distintos niveles de navegación. En tu código actual, el elemento `<button>` (agrupador) y los elementos `<a>` (enlaces de primer y segundo nivel) tienen alturas, paddings y comportamientos de hover distintos (`h-11`, `w-[calc...]` vs `mx-4`, y cambios de `font-weight` que causan _layout shift_ o saltos visuales).

El diseño de Cloudflare logra su apariencia cohesiva aplicando **exactamente las mismas clases base de "cápsula"** a todos los elementos interactivos, independientemente de su nivel jerárquico. La jerarquía se indica únicamente mediante el espaciado interno (padding/margin) y la línea vertical, no cambiando el tamaño de la cápsula.

A continuación, he reestructurado el componente aplicando un modelo de renderizado estricto:

1. **Unificación de Cápsula:** Todos los ítems (agrupadores y enlaces sueltos) ahora usan `w-[calc(100%-2rem)] mx-4 min-h-[34px] px-2.5 rounded-lg`. Esto garantiza que se alineen perfectamente con la caja de búsqueda.
2. **Eliminación del Layout Shift:** Se eliminó el cambio a `font-bold` en el estado activo. Se utiliza `font-medium` para todo y el estado activo se indica mediante un cambio de fondo sólido, idéntico a Cloudflare.
3. **Precisión Matemática en la Línea:** La línea vertical del acordeón ahora está posicionada exactamente a `34px` de la izquierda, lo que biseca perfectamente el icono superior. Los elementos hijos utilizan un espaciador de `w-7` para que su texto se alinee al milímetro con el texto del padre.

http://googleusercontent.com/immersive_entry_chip/0

y me dio este codiog
"---
// src/components/catalogo/SidebarCatalogo.astro
import Icons from "../shared/Icons.astro";

---

<aside class="hidden md:flex flex-col w-64 border-r border-subtle bg-surface-white h-[calc(100vh-64px)] sticky top-[64px] overflow-y-auto scrollbar-premium">
  
  <!-- BUSCADOR STICKY -->
  <div class="sticky top-0 z-30 bg-surface-white px-4 py-4">
    <div class="relative group">
      <div class="absolute left-3 top-0 h-full w-4 flex items-center justify-center text-slate-400 group-focus-within:text-brand transition-colors">
        <Icons type="search" class="w-3.5 h-3.5" />
      </div>
      <input type="search" id="catalogo-search" placeholder="Buscar productos..." class="w-full h-8 pl-9 pr-3 bg-surface-muted border border-subtle rounded-lg text-[13px] text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand focus:border-brand transition-all placeholder:text-slate-500">
    </div>
  </div>

  <nav class="pb-6 mt-1 space-y-6" id="catalogo-scrollspy">
    
    <!-- DE NUESTRA FARMACIA -->
    <div class="flex flex-col">
      <span class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 mb-2">De nuestra farmacia</span>
      
      <div class="flex flex-col gap-4">
        
        <!-- SUB-SECCIÓN: Según prescripción -->
        <div class="flex flex-col gap-0.5">
          <span class="block text-[12px] font-medium text-slate-500 px-6 mb-1">Según prescripción</span>
          
          <!-- Acordeón: Homeopáticos -->
          <div class="flex flex-col">
            <button class="accordion-trigger group relative flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none" data-target="homeopaticos">
              <div class="flex items-center justify-center w-4 h-4 mr-3 opacity-50 group-hover:opacity-80 transition-opacity">
                <Icons type="test-tube" class="w-full h-full" strokeWidth={1.5} />
              </div>
              <span class="text-[13px] font-medium truncate">Homeopáticos</span>
              <Icons type="chevron-down" class="ml-auto w-3 h-3 opacity-40 transition-transform duration-300 accordion-icon shrink-0" strokeWidth={2.5} />
            </button>
            
            <div class="accordion-content overflow-hidden transition-all duration-300 ease-in-out relative" style="max-height: 0;">
              <div class="absolute left-[34px] top-0 bottom-0 w-px bg-slate-200 z-0"></div>
              <div class="flex flex-col gap-0.5 py-0.5">
                <a href="#oficinales" class="sidebar-link relative z-10 flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
                  <div class="w-7 shrink-0"></div>
                  <span class="text-[13px] font-medium truncate">Oficinales</span>
                </a>
                <a href="#multipotencias" class="sidebar-link relative z-10 flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
                  <div class="w-7 shrink-0"></div>
                  <span class="text-[13px] font-medium truncate">Multipotencias</span>
                </a>
                <a href="#magistrales" class="sidebar-link relative z-10 flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
                  <div class="w-7 shrink-0"></div>
                  <span class="text-[13px] font-medium truncate">Magistrales</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Top-level: Esencias florales -->
          <div class="flex flex-col">
            <a href="#esencias-florales" class="sidebar-link group relative flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
              <div class="flex items-center justify-center w-4 h-4 mr-3 opacity-50 group-hover:opacity-80 transition-opacity">
                <Icons type="flower" class="w-full h-full" strokeWidth={1.5} />
              </div>
              <span class="text-[13px] font-medium truncate">Esencias florales</span>
            </a>
          </div>

          <!-- Top-level: Oligoelementos -->
          <div class="flex flex-col">
            <a href="#oligoelementos" class="sidebar-link group relative flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
              <div class="flex items-center justify-center w-4 h-4 mr-3 opacity-50 group-hover:opacity-80 transition-opacity">
                <Icons type="molecules" class="w-full h-full" strokeWidth={1.5} />
              </div>
              <span class="text-[13px] font-medium truncate">Oligoelementos</span>
            </a>
          </div>
        </div>

        <!-- SUB-SECCIÓN: Línea MH -->
        <div class="flex flex-col gap-0.5 mt-2">
          <span class="block text-[12px] font-medium text-slate-500 px-6 mb-1">Línea MH</span>

          <!-- Acordeón: Homeopatía -->
          <div class="flex flex-col">
            <button class="accordion-trigger group relative flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none" data-target="homeopatia-mh">
              <div class="flex items-center justify-center w-4 h-4 mr-3 opacity-50 group-hover:opacity-80 transition-opacity">
                <Icons type="test-tube" class="w-full h-full" strokeWidth={1.5} />
              </div>
              <span class="text-[13px] font-medium truncate">Homeopatía</span>
              <Icons type="chevron-down" class="ml-auto w-3 h-3 opacity-40 transition-transform duration-300 accordion-icon shrink-0" strokeWidth={2.5} />
            </button>

            <div class="accordion-content overflow-hidden transition-all duration-300 ease-in-out relative" style="max-height: 0;">
              <div class="absolute left-[34px] top-0 bottom-0 w-px bg-slate-200 z-0"></div>
              <div class="flex flex-col gap-0.5 py-0.5">
                <a href="#homeopaticos-esenciales" class="sidebar-link relative z-10 flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
                  <div class="w-7 shrink-0"></div>
                  <span class="text-[13px] font-medium truncate">Esenciales</span>
                </a>
                <a href="#homeopaticos-especiales" class="sidebar-link relative z-10 flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
                  <div class="w-7 shrink-0"></div>
                  <span class="text-[13px] font-medium truncate">Especiales</span>
                </a>
                <a href="#cuidado-capilar" class="sidebar-link relative z-10 flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
                  <div class="w-7 shrink-0"></div>
                  <span class="text-[13px] font-medium truncate">Cuidado capilar</span>
                </a>
                <a href="#capsulas" class="sidebar-link relative z-10 flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
                  <div class="w-7 shrink-0"></div>
                  <span class="text-[13px] font-medium truncate">Cápsulas</span>
                </a>
                <a href="#cremas" class="sidebar-link relative z-10 flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
                  <div class="w-7 shrink-0"></div>
                  <span class="text-[13px] font-medium truncate">Cremas</span>
                </a>
                <a href="#geles" class="sidebar-link relative z-10 flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
                  <div class="w-7 shrink-0"></div>
                  <span class="text-[13px] font-medium truncate">Geles</span>
                </a>
                <a href="#unguentos" class="sidebar-link relative z-10 flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
                  <div class="w-7 shrink-0"></div>
                  <span class="text-[13px] font-medium truncate">Ungüentos</span>
                </a>
                <a href="#elixires" class="sidebar-link relative z-10 flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
                  <div class="w-7 shrink-0"></div>
                  <span class="text-[13px] font-medium truncate">Elíxires</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Top-level: Esencias florales LMH -->
          <div class="flex flex-col">
            <a href="#esencias-florales-lmh" class="sidebar-link group relative flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
              <div class="flex items-center justify-center w-4 h-4 mr-3 opacity-50 group-hover:opacity-80 transition-opacity">
                <Icons type="flower" class="w-full h-full" strokeWidth={1.5} />
              </div>
              <span class="text-[13px] font-medium truncate">Esencias florales</span>
            </a>
          </div>

          <!-- Top-level: Oligoelementos K7 -->
          <div class="flex flex-col">
            <a href="#oligoelementos-k7" class="sidebar-link group relative flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
              <div class="flex items-center justify-center w-4 h-4 mr-3 opacity-50 group-hover:opacity-80 transition-opacity">
                <Icons type="molecules" class="w-full h-full" strokeWidth={1.5} />
              </div>
              <span class="text-[13px] font-medium truncate">Oligoelementos K7</span>
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- PRODUCTOS EXCLUSIVOS -->
    <div class="flex flex-col mt-4">
      <span class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 mb-2">Productos exclusivos</span>

      <div class="flex flex-col gap-0.5">
        <span class="block text-[12px] font-medium text-slate-500 px-6 mb-1">Complementarios</span>

        <div class="flex flex-col">
          <a href="#alimentos-funcionales" class="sidebar-link group relative flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
            <div class="flex items-center justify-center w-4 h-4 mr-3 opacity-50 group-hover:opacity-80 transition-opacity">
              <Icons type="leaf" class="w-full h-full" strokeWidth={1.5} />
            </div>
            <span class="text-[13px] font-medium truncate">Alimentos funcionales</span>
          </a>
        </div>

        <div class="flex flex-col">
          <a href="#cbd" class="sidebar-link group relative flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
            <div class="flex items-center justify-center w-4 h-4 mr-3 opacity-50 group-hover:opacity-80 transition-opacity">
              <Icons type="cannabis" class="w-full h-full" strokeWidth={1.5} />
            </div>
            <span class="text-[13px] font-medium truncate">CBD</span>
          </a>
        </div>

        <div class="flex flex-col">
          <a href="#aceites-esenciales" class="sidebar-link group relative flex items-center w-[calc(100%-2rem)] mx-4 px-2.5 min-h-[34px] rounded-lg transition-colors text-slate-600 hover:bg-surface-muted hover:text-slate-900 focus:outline-none">
            <div class="flex items-center justify-center w-4 h-4 mr-3 opacity-50 group-hover:opacity-80 transition-opacity">
              <Icons type="droplet" class="w-full h-full" strokeWidth={1.5} />
            </div>
            <span class="text-[13px] font-medium truncate">Aceites esenciales</span>
          </a>
        </div>
      </div>
    </div>

  </nav>

  <!-- FIRMA DE AUTOR -->
  <div class="mt-auto px-4 py-4 border-t border-subtle bg-surface-white">
    <a href="https://www.linkedin.com/in/jalfredopabon/" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-surface-muted/50 hover:shadow-sm ring-1 ring-transparent hover:ring-slate-200">
      <div class="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white transition-transform group-hover:scale-110">
        AP
      </div>
      <div class="flex flex-col">
        <span class="text-[10px] text-slate-500 font-bold leading-none mb-1">Creado por</span>
        <span class="text-[12px] font-bold text-slate-900 leading-none group-hover:text-brand transition-colors">Alfredo Pabón</span>
      </div>
      <Icons type="external-link" class="w-3 h-3 ml-auto text-slate-300 group-hover:text-brand opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all" strokeWidth={2.5} />
    </a>
  </div>
</aside>

<script>
    const initCatalogoScrollSpy = () => {
        const scrollContainer = document.getElementById('catalogo-main-scroll');
        const sections = document.querySelectorAll('section[id]');
        const sidebarLinks = document.querySelectorAll('#catalogo-scrollspy .sidebar-link');
        
        if (!scrollContainer || !sections.length || !sidebarLinks.length) return;

        const clearActiveStates = () => {
            sidebarLinks.forEach(link => link.classList.remove('is-active'));
        };

        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                clearActiveStates();
                link.classList.add('is-active');
                const parentAccordion = link.closest('.accordion-content') as HTMLElement;
                closeAllAccordions(parentAccordion);
            });
        });

        const observerOptions = {
            root: scrollContainer,
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`#catalogo-scrollspy a[href="#${currentId}"]`);
                    
                    if (activeLink) {
                        clearActiveStates();
                        activeLink.classList.add('is-active');
                        const parentAccordion = activeLink.closest('.accordion-content') as HTMLElement;
                        if (parentAccordion && parentAccordion.style.maxHeight === '0px') {
                            parentAccordion.style.maxHeight = parentAccordion.scrollHeight + 'px';
                            const trigger = parentAccordion.previousElementSibling;
                            if (trigger) trigger.classList.add('is-expanded');
                        }
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        const triggers = document.querySelectorAll('.accordion-trigger');
        const closeAllAccordions = (except: HTMLElement | null = null) => {
            document.querySelectorAll('.accordion-content').forEach(el => {
                const content = el as HTMLElement;
                if (content !== except) {
                    content.style.maxHeight = '0';
                    const trigger = content.previousElementSibling;
                    if (trigger) trigger.classList.remove('is-expanded');
                }
            });
        };

        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const content = trigger.nextElementSibling as HTMLElement;
                if (!content) return;
                const isExpanded = trigger.classList.contains('is-expanded');
                closeAllAccordions(content);
                if (isExpanded) {
                    content.style.maxHeight = '0';
                    trigger.classList.remove('is-expanded');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    trigger.classList.add('is-expanded');
                }
            });
        });
    };

    document.addEventListener('astro:page-load', initCatalogoScrollSpy);
</script>

<style>
    .sidebar-link:focus, .accordion-trigger:focus {
        outline: none !important;
    }

    /* Estado Activo: Cápsula sólida idéntica a Cloudflare, sin saltos de peso tipográfico */
    .sidebar-link.is-active,
    .accordion-trigger.is-expanded {
        background-color: var(--bg-muted, #f1f5f9) !important;
        color: #0f172a !important; /* Resalta el texto */
    }

    /* Resaltar el icono en estado activo */
    .sidebar-link.is-active svg,
    .accordion-trigger.is-expanded svg {
        opacity: 1 !important;
        color: var(--brand, inherit);
    }

    /* Rotación de Acordeón */
    .accordion-trigger.is-expanded .accordion-icon {
        transform: rotate(180deg);
        opacity: 1 !important;
    }

    /* Evitar que la línea maestra interfiera visualmente con las cápsulas activas */
    .sidebar-link, .accordion-trigger {
        z-index: 10;
    }
</style>"
