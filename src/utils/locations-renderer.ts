/**
 * Locations Renderer: Genera el HTML para la sede principal y distribuidores.
 */
import type { DistributorData } from '../data/api';

export function renderDistributorGrid(distributors: DistributorData[]): string {
    if (!distributors || distributors.length === 0) return '<p class="text-center text-slate-500 py-8">No se encontraron distribuidores autorizados.</p>';

    return distributors.map(distributor => {
        // Recolectar todos los contactos disponibles
        const whatsapps = [distributor.whatsapp, distributor.whatsapp_2, distributor.whatsapp_3, distributor.whatsapp_4]
            .filter(w => w && String(w).trim().length > 0);
        
        const fijos = [distributor.telefono_fijo_1, distributor.telefono_fijo_2]
            .filter(p => p && String(p).trim().length > 0);

        const moviles = [distributor.telefono, distributor.movil_1, distributor.movil_2]
            .filter(p => p && String(p).trim().length > 0);

        // Determinar el logo a mostrar
        const logoName = distributor.logo || 'logo-mundo-homeopatico';
        const logoPath = `/img/${logoName}.webp`;

        return `
        <div class="bg-surface-white rounded-2xl border border-subtle hover:border-brand transition-all group flex flex-col shadow-sm hover:shadow-md overflow-hidden">
            <div class="p-6 pb-2 flex items-center gap-4 bg-slate-50/30">
                <div class="h-12 w-12 flex items-center justify-center shrink-0">
                    <img src="${logoPath}" alt="${distributor.nombre}" class="w-full h-full object-contain" onerror="this.src='/img/logo-mundo-homeopatico.webp'" />
                </div>
                <div class="flex flex-col gap-0.5 overflow-hidden">
                    <h4 class="text-[15px] font-bold text-secondary leading-tight truncate">${distributor.nombre}</h4>
                    <p class="text-brand text-[10px] font-bold truncate">${distributor.ciudad}</p>
                </div>
            </div>

            <div class="p-6 space-y-4">
                <div class="space-y-3">
                    ${distributor.direccion ? `
                        <div class="flex gap-3">
                            <svg class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            <p class="text-slate-600 text-[13px] leading-snug font-medium">${distributor.direccion}</p>
                        </div>
                    ` : ''}

                    ${distributor.nombre_persona ? `
                        <div class="flex gap-3">
                            <svg class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <p class="text-slate-500 text-[12px] font-medium">${distributor.nombre_persona}</p>
                        </div>
                    ` : ''}
                </div>

                <div class="flex flex-wrap gap-2">
                    ${fijos.map(tel => `
                        <a href="tel:${String(tel).replace(/\D/g, '')}" class="flex items-center gap-2 px-3 py-2 border border-subtle text-secondary rounded-full text-[11px] font-bold hover:bg-slate-50 transition-all shadow-sm">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <span>${tel}</span>
                        </a>
                    `).join('')}

                    ${moviles.map(tel => `
                        <a href="tel:${String(tel).replace(/\D/g, '')}" class="flex items-center gap-2 px-3 py-2 border border-subtle text-secondary rounded-full text-[11px] font-bold hover:bg-slate-50 transition-all shadow-sm">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                            <span>${tel}</span>
                        </a>
                    `).join('')}

                    ${whatsapps.map(wa => `
                        <a href="https://wa.me/${String(wa).replace(/\D/g, '')}" target="_blank" class="flex items-center gap-2 px-3 py-2 bg-brand text-white rounded-full text-[11px] font-bold hover:bg-brand-dark transition-all shadow-sm">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            <span>${wa}</span>
                        </a>
                    `).join('')}
                </div>

                ${distributor.mapa ? `
                    <a href="${distributor.mapa}" target="_blank" class="flex items-center gap-2 text-brand text-[11px] font-bold hover:underline pt-2">
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        Ver en Google Maps
                    </a>
                ` : ''}
            </div>
        </div>
        `;
    }).join('');
}

export function updateMainBranchUI(config: Record<string, string>, distributors: DistributorData[] = []) {
    const addressEl = document.getElementById('main-branch-address');
    const hoursEl = document.getElementById('main-branch-hours');
    const cityEl = document.getElementById('main-branch-city');
    const logoEl = document.getElementById('main-branch-logo') as HTMLImageElement;
    const mapImageLink = document.getElementById('main-branch-map-image-link');
    const mapStaticEl = document.getElementById('main-branch-map-static') as HTMLImageElement;
    const contactsContainer = document.getElementById('main-branch-contacts');

    // Buscamos la sede principal en la lista de distribuidores (fila 1 generalmente)
    const mainBranch = distributors.find(d => (d.nombre || '').toLowerCase().includes('sede principal')) || distributors[0];

    if (!mainBranch) return;

    if (cityEl) cityEl.textContent = mainBranch.ciudad;

    if (logoEl && mainBranch.logo) {
        logoEl.src = `/img/${mainBranch.logo}.webp`;
        logoEl.alt = mainBranch.nombre;
    }

    if (addressEl) {
        addressEl.innerHTML = mainBranch.direccion || config['sede_direccion']?.replace(/\^/g, '<br>') || 'Dirección no disponible';
    }
    
    if (hoursEl) {
        const hours = mainBranch.horarios || config['sede_horarios'];
        hoursEl.innerHTML = hours ? hours.replace(/\^/g, '<br>').replace(/\|/g, '<br>') : 'Horario no disponible';
    }
    
    // --- LÓGICA DE BOTONES DINÁMICOS (Orden: Fijo | Móvil | WhatsApp) ---
    if (contactsContainer) {
        let buttonsHtml = '';

        // 1. Teléfonos Fijos (Icono: phone)
        [mainBranch.telefono_fijo_2].forEach(tel => { // Fijo_1 suele ser 'telefono' o 'movil_1' en este esquema, ajustamos
             // Nota: En el esquema actual 'telefono' es el principal. 
             // Si el usuario dice que hay fijos, los buscamos.
        });

        // RECOLECCIÓN JERÁRQUICA
        const fijos = [mainBranch.telefono_fijo_1, mainBranch.telefono_fijo_2].filter(v => v && String(v).trim().length > 0);
        const moviles = [mainBranch.telefono, mainBranch.movil_1, mainBranch.movil_2].filter(v => v && String(v).trim().length > 0);
        const whatsapps = [mainBranch.whatsapp, mainBranch.whatsapp_2, mainBranch.whatsapp_3, mainBranch.whatsapp_4].filter(v => v && String(v).trim().length > 0);

        // Renderizar Fijos
        fijos.forEach(tel => {
            buttonsHtml += `
                <a href="tel:${String(tel).replace(/\D/g, '')}" class="flex items-center gap-3 px-6 py-3 border-2 border-subtle text-secondary rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span>${tel}</span>
                </a>`;
        });

        // Renderizar Móviles
        moviles.forEach(tel => {
            buttonsHtml += `
                <a href="tel:${String(tel).replace(/\D/g, '')}" class="flex items-center gap-3 px-6 py-3 border-2 border-subtle text-secondary rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    <span>${tel}</span>
                </a>`;
        });

        // Renderizar WhatsApps
        whatsapps.forEach(wa => {
            buttonsHtml += `
                <a href="https://wa.me/${String(wa).replace(/\D/g, '')}" target="_blank" class="flex items-center gap-3 px-8 py-3 bg-brand text-white rounded-xl text-sm font-bold hover:bg-brand-dark transition-all shadow-md">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    <span>${wa}</span>
                </a>`;
        });

        contactsContainer.innerHTML = buttonsHtml;
    }

    if (mainBranch.mapa) {
        if (mapImageLink) (mapImageLink as HTMLAnchorElement).href = mainBranch.mapa;

        if (mapStaticEl) {
            const address = mainBranch.direccion || 'Medellín, Antioquia';
            const apiKey = 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'; 
            // Fix URL: Cambiamos a 640x400 y aseguramos protocolo https y parámetros limpios
            const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(address)}&zoom=16&size=640x400&markers=color:green%7C${encodeURIComponent(address)}&key=${apiKey}&style=feature:poi|visibility:off`;
            mapStaticEl.src = staticMapUrl;
            mapStaticEl.onload = () => mapStaticEl.classList.remove('opacity-30');
        }
    }
}
