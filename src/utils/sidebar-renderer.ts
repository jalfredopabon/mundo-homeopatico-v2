// src/utils/sidebar-renderer.ts

/**
 * RENDERIZADOR DINÁMICO DE SIDEBAR
 * Recrea la jerarquía de 4 niveles en el cliente.
 */

const getIcon = (label: string) => {
    const lower = (label || "").toLowerCase();
    if (lower.includes("floral")) return "flower";
    if (lower.includes("oligo")) return "molecules";
    if (lower.includes("aceite")) return "droplet";
    if (lower.includes("alimento") || lower.includes("cbd")) return "leaf";
    if (lower.includes("capilar")) return "sparkles";
    if (lower.includes("crema") || lower.includes("gel") || lower.includes("ungüento")) return "droplet";
    return "test-tube";
};

// Mapeo de iconos a SVG strings (simplificado para el PoC, idealmente usar Icons.astro logic)
const SIDEBAR_ICONS: Record<string, string> = {
    'flower': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5 4.5 4.5 0 1 1 16.5 12 4.5 4.5 0 1 1 12 16.5"></path><path d="M12 7.5V2"></path><path d="M12 22v-5.5"></path><path d="M16.5 12H22"></path><path d="M2 12h5.5"></path></svg>`,
    'molecules': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="19" r="3"></circle><line x1="9" y1="19" x2="15" y2="5"></line><circle cx="18" cy="19" r="3"></circle><line x1="9" y1="5" x2="15" y2="19"></line><circle cx="6" cy="5" r="3"></circle></svg>`,
    'droplet': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`,
    'leaf': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C10.5 14.5 12 14.24 14 12"></path></svg>`,
    'sparkles': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>`,
    'test-tube': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"></path><path d="M21 7v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7"></path><path d="M12 3v18"></path><path d="M3 12h18"></path></svg>`,
    'chevron-down': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="ml-auto transition-all duration-300 accordion-icon shrink-0"><polyline points="6 9 12 15 18 9"></polyline></svg>`
};

export function renderSidebar(navs: any[]): string {
    const root: any[] = [];
    const dataRows = navs.filter(n => n.tabla_id && n.tabla_id.trim() !== "");

    dataRows.forEach(nav => {
        if (!nav.nivel_1) return;
        let cat = root.find(c => c.category === nav.nivel_1);
        if (!cat) {
            cat = { category: nav.nivel_1, subcategories: [] };
            root.push(cat);
        }

        if (!nav.nivel_2) return;
        let sub = cat.subcategories.find(s => s.label === nav.nivel_2);
        if (!sub) {
            sub = { label: nav.nivel_2, items: [] };
            cat.subcategories.push(sub);
        }

        if (nav.nivel_4) {
            let accordion = sub.items.find((i: any) => i.label === nav.nivel_3 && i.type === "accordion");
            if (!accordion) {
                accordion = { 
                    type: "accordion", 
                    label: nav.nivel_3, 
                    icon: getIcon(nav.nivel_3 || ""), 
                    children: [] 
                };
                sub.items.push(accordion);
            }
            if (!accordion.children.find((c: any) => c.label === nav.titulo_mostrar)) {
                accordion.children.push({ 
                    label: nav.titulo_mostrar || nav.nivel_4, 
                    href: `#${nav.tabla_id}` 
                });
            }
        } else if (nav.nivel_3) {
            if (!sub.items.find((i: any) => i.label === nav.nivel_3)) {
                sub.items.push({ 
                    type: "link", 
                    label: nav.titulo_mostrar || nav.nivel_3, 
                    href: `#${nav.tabla_id}`, 
                    icon: getIcon(nav.nivel_3)
                });
            }
        } else if (nav.tabla_id) {
            sub.items.push({
                type: "link",
                label: nav.titulo_mostrar || nav.nivel_2,
                href: `#${nav.tabla_id}`,
                icon: getIcon(nav.titulo_mostrar || nav.nivel_2)
            });
        }
    });

    return root.map(category => `
        <div class="space-y-2">
            <span class="block text-[12px] font-semibold text-slate-900 pl-[23px] pr-4 tracking-tight">
                ${category.category}
            </span>
            <div class="flex flex-col gap-4">
                ${category.subcategories.map((sub: any) => {
                    const isRedundant = sub.items.length === 1 && 
                        (sub.items[0].label.toLowerCase().trim() === sub.label.toLowerCase().trim() || 
                        ["alimentos funcionales", "cbd", "aceites esenciales"].includes(sub.label.toLowerCase().trim()));
                    
                    return `
                        <div class="flex flex-col gap-0">
                            ${!isRedundant ? `
                                <span class="block text-[10px] uppercase tracking-wider font-bold text-slate-400 pr-4 mb-1" style="padding-left: 23px;">
                                    ${sub.label}
                                </span>
                            ` : ''}
                            <div class="flex flex-col gap-0.5">
                                ${sub.items.map((item: any) => `
                                    <div class="flex flex-col">
                                        ${item.type === "accordion" ? `
                                            <button class="accordion-trigger sidebar-capsule group w-[calc(100%-2rem)] ml-4 mr-0 pr-4 mt-1 hover:bg-surface-muted" data-target="${item.label.toLowerCase()}">
                                                <div class="sidebar-icon-slot">
                                                    <div>${SIDEBAR_ICONS[item.icon] || ''}</div>
                                                </div>
                                                <span class="sidebar-label">${item.label}</span>
                                                ${SIDEBAR_ICONS['chevron-down']}
                                            </button>
                                            <div class="accordion-content overflow-hidden transition-all duration-300 ease-in-out" style="max-height: 0;">
                                                ${item.children.map((child: any) => `
                                                    <a href="${child.href}" class="sidebar-link sidebar-capsule group ml-[38px] w-[calc(100%-38px-1rem)] pl-[10px]">
                                                        <span class="sidebar-label--sub group-[.is-active]:font-bold">${child.label}</span>
                                                    </a>
                                                `).join('')}
                                            </div>
                                        ` : `
                                            <a href="${item.href}" class="sidebar-link sidebar-capsule group">
                                                <div class="sidebar-icon-slot">
                                                    <div>${SIDEBAR_ICONS[item.icon] || ''}</div>
                                                </div>
                                                <span class="sidebar-label group-[.is-active]:font-bold">${item.label}</span>
                                            </a>
                                        `}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('') + `
        <!-- FIRMA DE AUTOR (Paridad 1:1) -->
        <div class="mt-auto px-4 py-4 border-t border-subtle bg-surface-white">
            <a href="https://www.linkedin.com/in/jalfredopabon/" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-surface-muted/50 hover:shadow-sm ring-1 ring-transparent hover:ring-slate-200">
                <div class="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white transition-transform group-hover:scale-110">
                    AP
                </div>
                <div class="flex flex-col">
                    <span class="text-[10px] text-slate-500 font-bold leading-none mb-1">Creado por</span>
                    <span class="text-[12px] font-bold text-slate-900 leading-none group-hover:text-brand transition-colors">Alfredo Pabón</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="ml-auto text-slate-300 group-hover:text-brand transition-colors opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
        </div>
    `;
}
