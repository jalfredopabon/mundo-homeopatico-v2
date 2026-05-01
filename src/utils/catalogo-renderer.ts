// src/utils/catalogo-renderer.ts
import { sanitizeInput } from "./security";

/**
 * RENDERIZADOR ÉLITE DE CATÁLOGO
 * Recrea el markup de CatalogTable y ProductRowElite para hidratación dinámica.
 */

const ICONS = {
    'chevron-right': `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
    'clock': `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    'plus': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    'cart': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`
};

export function createProductRow(product: any): string {
    const safeId = product.id.replace(/[^a-z0-9]/gi, '-');
    const extraId = `badges-${safeId}`;
    
    const visibleBadges = product.badges.slice(0, 10);
    const hiddenBadges = product.badges.slice(10);
    const extraCount = hiddenBadges.length;

    return `
        <div class="catalog-row group/row">
            <div class="flex flex-col w-full min-w-0 pl-0 transition-transform duration-500 group-hover/row:translate-x-1">
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h3 class="text-slate-900 font-bold leading-tight text-dynamic-content">
                        ${product.name}
                        <span style="display: none !important;" aria-hidden="true">
                            ${product.badges.map((b: any) => b.label).join(' ')}
                        </span>
                    </h3>
                    
                    ${product.requiresPreparation ? `
                        <div class="badge-status-alert">
                            ${ICONS.clock}
                            <span>Requiere elaboración</span>
                        </div>
                    ` : ''}
                </div>

                ${product.description ? `
                    <p class="catalog-description text-slate-700 mt-1">
                        ${product.description}
                    </p>
                ` : ''}

                ${product.badges.length > 0 ? `
                    <div class="flex flex-wrap items-center gap-2 mt-2">
                        ${visibleBadges.map((badge: any) => `
                            <span class="badge-elite badge-elite--outline text-[10px] px-2 py-0.5">${badge.label}</span>
                        `).join('')}

                        ${extraCount > 0 ? `
                            <span id="${extraId}" style="display: none;">
                                ${hiddenBadges.map((badge: any) => `
                                    <span class="inline-flex m-1">
                                        <span class="badge-elite badge-elite--outline text-[10px] px-2 py-0.5">${badge.label}</span>
                                    </span>
                                `).join('')}
                            </span>

                            <button 
                                id="${extraId}-btn"
                                data-expanded="false"
                                data-extra-toggle="${extraId}"
                                data-extra-count="${extraCount}"
                                class="badge-elite badge-elite--emerald px-2 py-0.5 text-[9px] font-bold flex items-center gap-1 cursor-pointer hover:bg-emerald-100 transition-all group/extra ml-0.5 js-badge-toggle"
                            >
                                <span class="js-label">+${extraCount} más</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-data-[expanded=true]/extra:rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                        ` : ''}
                    </div>
                ` : ''}
            </div>

            <div class="catalog-price-hub">
                <div class="flex flex-row flex-wrap items-center gap-x-4 gap-y-1.5 sm:contents">
                    <div class="flex items-center gap-1.5 sm:block text-left sm:text-right">
                        <span class="sm:hidden text-[10px] text-slate-400 font-medium">Farmacia:</span>
                        <span class="catalog-cell-price">${product.farmaciaPrice || '$0.00'}</span>
                    </div>
                    <div class="flex items-center gap-1.5 sm:block text-left sm:text-right">
                        <span class="sm:hidden text-[10px] text-slate-400">Público:</span>
                        <span class="catalog-cell-price">${product.publicoPrice || '$0.00'}</span>
                    </div>
                </div>

                <div class="flex justify-end sm:justify-center">
                    <button 
                        class="catalog-btn-add btn-add-cart !w-10 sm:!w-10" 
                        data-name="${product.cartData?.name || product.name}" 
                        data-price="${product.cartData?.price || '0'}"
                    >
                        <div class="flex items-center justify-center">${ICONS.plus}</div>
                    </button>
                </div>
            </div>
        </div>
    `;
}

export function createCatalogTable(section: any): string {
    return `
        <section id="${section.id}" class="scroll-mt-8 reveal active">
            <header class="catalog-section-header">
                <nav aria-label="Breadcrumb" class="catalog-breadcrumb">
                    ${section.breadcrumb.map((item: string, index: number) => `
                        <span class="hover:text-slate-800 transition-colors cursor-pointer">${item}</span>
                        ${index < section.breadcrumb.length - 1 ? ICONS['chevron-right'] : ''}
                    `).join('')}
                </nav>
                <h2 class="catalog-title">${section.title}</h2>
                ${section.description ? `
                    <p class="catalog-description text-dynamic-content">${section.description}</p>
                ` : ''}
            </header>

            <div class="catalog-table-shell">
                <div class="catalog-table-header">
                    <div>${section.presentacionLabel || 'Presentación'}</div>
                    <div class="text-right">${section.farmaciaLabel || 'Precio farmacia'}</div>
                    <div class="text-right">${section.publicoLabel || 'Precio público'}</div>
                    <div class="flex justify-center">${ICONS.cart}</div>
                </div>
                
                <div class="catalog-rows-container">
                    ${section.products.map((p: any) => createProductRow(p)).join('')}
                </div>
            </div>
        </section>
    `;
}
