/**
 * Locations Renderer: Genera el HTML para la sede principal y distribuidores.
 */
import type { DistributorData } from '../data/api';

// Trazados oficiales de Icons.astro para uso en strings HTML (estilo Elite 2.5)
const ELITE_SVG = {
    mapPin: `<svg class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z"></path><path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z"></path></svg>`,
    userStroke: `<svg class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"></path><path d="M14 14H10C7.23858 14 5 16.2386 5 19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19C19 16.2386 16.7614 14 14 14Z"></path></svg>`,
    phone: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.1585 5.71217L8.75584 4.80619C8.49256 4.21382 8.36092 3.91762 8.16405 3.69095C7.91732 3.40688 7.59571 3.19788 7.23592 3.08779C6.94883 2.99994 6.62244 2.99994 5.97645 2.99994C5.02815 2.99994 4.554 2.99994 4.15597 3.18223C3.68711 3.39696 3.26368 3.86322 3.09497 4.35054C2.95175 4.76423 2.99278 5.18937 3.07482 6.03964C3.94815 15.0901 8.91006 20.052 17.9605 20.9254C18.8108 21.0074 19.236 21.0484 19.6496 20.9052C20.137 20.7365 20.6032 20.3131 20.818 19.8442C21.0002 19.4462 21.0002 18.866 21.0002 18.0237C21.0002 17.3755 21.0002 17.0514 20.9124 16.7643C20.8023 16.4045 20.5933 16.0829 20.3092 15.8361C20.0826 15.6393 19.7864 15.5076 19.194 15.2443L18.288 14.8417C17.6465 14.5566 17.3257 14.414 16.9998 14.383C16.6878 14.3533 16.3733 14.3971 16.0813 14.5108C15.7762 14.6296 15.5066 14.8543 14.9672 15.3038C14.4304 15.7511 14.162 15.9748 13.834 16.0946C13.5432 16.2009 13.1588 16.2402 12.8526 16.1951C12.5071 16.1442 12.2426 16.0028 11.7135 15.7201C10.0675 14.8404 9.15977 13.9327 8.28011 12.2867C7.99738 11.7576 7.85602 11.4931 7.80511 11.1476C7.75998 10.8414 7.79932 10.457 7.90554 10.1662C8.02536 9.83822 8.24905 9.5698 8.69643 9.03294C9.14586 8.49362 9.37058 8.22396 9.48939 7.91885C9.60309 7.62688 9.64686 7.31234 9.61719 7.00042C9.58618 6.67446 9.44362 6.3537 9.1585 5.71217Z"></path></svg>`,
    whatsapp: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z"></path><path d="M8.58815 12.3773L9.45909 11.2956C9.82616 10.8397 10.2799 10.4153 10.3155 9.80826C10.3244 9.65494 10.2166 8.96657 10.0008 7.58986C9.91601 7.04881 9.41086 7 8.97332 7C8.40314 7 8.11805 7 7.83495 7.12931C7.47714 7.29275 7.10979 7.75231 7.02917 8.13733C6.96539 8.44196 7.01279 8.65187 7.10759 9.07169C7.51023 10.8548 8.45481 12.6158 9.91948 14.0805C11.3842 15.5452 13.1452 16.4898 14.9283 16.8924C15.3481 16.9872 15.558 17.0346 15.8627 16.9708C16.2477 16.8902 16.7072 16.5229 16.8707 16.165C17 15.8819 17 15.5969 17 15.0267C17 14.5891 16.9512 14.084 16.4101 13.9992C15.0334 13.7834 14.3451 13.6756 14.1917 13.6845C13.5847 13.7201 13.1603 14.1738 12.7044 14.5409L11.6227 15.4118"></path></svg>`
};

export function renderDistributorGrid(distributors: DistributorData[]): string {
    if (!distributors || distributors.length === 0) return '<p class="text-center text-slate-500 py-8">No se encontraron distribuidores autorizados.</p>';

    return distributors.map(distributor => {
        const whatsapps = [distributor.whatsapp, distributor.whatsapp_2, distributor.whatsapp_3, distributor.whatsapp_4]
            .filter(w => w && String(w).trim().length > 0);
        
        const fijos = [distributor.telefono_fijo_1, distributor.telefono_fijo_2]
            .filter(p => p && String(p).trim().length > 0);

        const moviles = [distributor.telefono, distributor.movil_1, distributor.movil_2]
            .filter(p => p && String(p).trim().length > 0);

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
                            ${ELITE_SVG.mapPin}
                            <p class="text-slate-600 text-[13px] leading-snug font-medium">${distributor.direccion}</p>
                        </div>
                    ` : ''}

                    ${distributor.nombre_persona ? `
                        <div class="flex gap-3">
                            ${ELITE_SVG.userStroke}
                            <p class="text-slate-500 text-[12px] font-medium">${distributor.nombre_persona}</p>
                        </div>
                    ` : ''}
                </div>

                <div class="flex flex-wrap gap-2">
                    ${fijos.map(tel => `
                        <a href="tel:${String(tel).replace(/\D/g, '')}" class="flex items-center gap-2 px-3 py-2 border border-subtle text-secondary rounded-xl text-[11px] font-bold hover:bg-slate-50 transition-all shadow-sm">
                            ${ELITE_SVG.phone}
                            <span>${tel}</span>
                        </a>
                    `).join('')}

                    ${moviles.map(tel => `
                        <a href="tel:${String(tel).replace(/\D/g, '')}" class="flex items-center gap-2 px-3 py-2 border border-subtle text-secondary rounded-xl text-[11px] font-bold hover:bg-slate-50 transition-all shadow-sm">
                            ${ELITE_SVG.phone}
                            <span>${tel}</span>
                        </a>
                    `).join('')}

                    ${whatsapps.map(wa => `
                        <a href="https://wa.me/${String(wa).replace(/\D/g, '')}" target="_blank" class="flex items-center gap-2 px-3 py-2 bg-brand text-white rounded-xl text-[11px] font-bold hover:bg-brand-dark transition-all shadow-sm">
                            ${ELITE_SVG.whatsapp}
                            <span>${wa}</span>
                        </a>
                    `).join('')}
                </div>

                ${distributor.mapa ? `
                    <a href="${distributor.mapa}" target="_blank" class="flex items-center gap-2 text-brand text-[11px] font-bold hover:underline pt-2">
                        ${ELITE_SVG.mapPin}
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
    
    if (contactsContainer) {
        let buttonsHtml = '';
        const fijos = [mainBranch.telefono_fijo_1, mainBranch.telefono_fijo_2].filter(v => v && String(v).trim().length > 0);
        const moviles = [mainBranch.telefono, mainBranch.movil_1, mainBranch.movil_2].filter(v => v && String(v).trim().length > 0);
        const whatsapps = [mainBranch.whatsapp, mainBranch.whatsapp_2, mainBranch.whatsapp_3, mainBranch.whatsapp_4].filter(v => v && String(v).trim().length > 0);

        fijos.forEach(tel => {
            buttonsHtml += `
                <a href="tel:${String(tel).replace(/\D/g, '')}" class="flex items-center gap-3 px-6 py-3 border-2 border-subtle text-secondary rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                    ${ELITE_SVG.phone}
                    <span>${tel}</span>
                </a>`;
        });
        moviles.forEach(tel => {
            buttonsHtml += `
                <a href="tel:${String(tel).replace(/\D/g, '')}" class="flex items-center gap-3 px-6 py-3 border-2 border-subtle text-secondary rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                    ${ELITE_SVG.phone}
                    <span>${tel}</span>
                </a>`;
        });
        whatsapps.forEach(wa => {
            buttonsHtml += `
                <a href="https://wa.me/${String(wa).replace(/\D/g, '')}" target="_blank" class="flex items-center gap-3 px-8 py-3 bg-brand text-white rounded-xl text-sm font-bold hover:bg-brand-dark transition-all shadow-md">
                    ${ELITE_SVG.whatsapp}
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
            const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(address)}&zoom=16&size=640x400&markers=color:green%7C${encodeURIComponent(address)}&key=${apiKey}&style=feature:poi|visibility:off`;
            mapStaticEl.src = staticMapUrl;
            mapStaticEl.onload = () => mapStaticEl.classList.remove('opacity-30');
        }
    }
}
