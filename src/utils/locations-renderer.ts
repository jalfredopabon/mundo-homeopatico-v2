/**
 * Locations Renderer: Genera el HTML para la sede principal y distribuidores.
 */
import type { DistributorData } from '../data/api';

export function renderDistributorGrid(distributors: DistributorData[]): string {
    if (!distributors || distributors.length === 0) return '<p class="text-center text-slate-500 py-8">No se encontraron distribuidores autorizados.</p>';

    return distributors.map(distributor => `
        <div class="bg-surface-white rounded-2xl p-6 border border-subtle hover:border-brand transition-all group flex flex-col">
            <div class="flex items-center gap-3.5 mb-5">
                <div class="h-10 w-10 rounded-xl bg-surface-muted border border-subtle flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-surface-white transition-colors duration-300">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="9" y1="3" x2="9" y2="21"></line>
                    </svg>
                </div>
                <div class="flex flex-col gap-0.5">
                    <h4 class="text-[16px] font-bold text-secondary leading-snug">${distributor.nombre}</h4>
                    <p class="text-slate-700 text-[12px] font-bold">${distributor.ciudad}</p>
                </div>
            </div>
            <div class="mb-5 space-y-1.5">
                <div class="flex items-center gap-2.5 text-brand">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span class="text-[11px] font-bold text-slate-700">Dirección</span>
                </div>
                <p class="text-slate-500 text-[13px] font-medium leading-relaxed">${distributor.direccion}</p>
            </div>
            <div class="mt-auto space-y-2.5">
                ${distributor.whatsapp ? `
                    <a href="https://wa.me/${distributor.whatsapp.replace(/\s+/g, '')}" target="_blank" class="flex items-center justify-center gap-2 w-full py-2.5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-brand-dark transition-all">
                        <span>WhatsApp: ${distributor.whatsapp}</span>
                    </a>
                ` : ''}
                ${distributor.telefono ? `
                    <a href="tel:${distributor.telefono.replace(/\s+/g, '')}" class="flex items-center justify-center gap-2 w-full py-2.5 border border-subtle text-secondary rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                        <span>Tel: ${distributor.telefono}</span>
                    </a>
                ` : ''}
            </div>
        </div>
    `).join('');
}

export function updateMainBranchUI(config: Record<string, string>, distributors: DistributorData[] = []) {
    const addressEl = document.getElementById('main-branch-address');
    const hoursEl = document.getElementById('main-branch-hours');
    const whatsappBtn = document.getElementById('main-branch-whatsapp');
    const phoneBtn = document.getElementById('main-branch-phone');

    // Buscamos la sede principal en la lista de distribuidores (fila 1 generalmente)
    const mainBranch = distributors.find(d => d.nombre.toLowerCase().includes('sede principal')) || distributors[0];

    if (addressEl) {
        addressEl.innerHTML = mainBranch?.direccion || config['sede_direccion']?.replace(/\^/g, '<br>') || 'Dirección no disponible';
    }
    
    if (hoursEl) {
        const hours = mainBranch?.horarios || config['sede_horarios'];
        hoursEl.innerHTML = hours ? hours.replace(/\^/g, '<br>').replace(/\|/g, '<br>') : 'Horario no disponible';
    }
    
    if (whatsappBtn) {
        const whatsapp = String(mainBranch?.whatsapp || config['contacto_whatsapp'] || '').trim();
        const label = whatsappBtn.querySelector('.btn-elite-label');
        if (label && whatsapp) label.textContent = whatsapp;
        if (whatsapp) (whatsappBtn as HTMLAnchorElement).href = `https://wa.me/${whatsapp.replace(/\D/g, '')}`;
    }

    if (phoneBtn) {
        const phone = String(mainBranch?.telefono || config['contacto_telefono'] || '').trim();
        const label = phoneBtn.querySelector('.btn-elite-label');
        if (label && phone) label.textContent = phone;
        if (phone) (phoneBtn as HTMLAnchorElement).href = `tel:${phone.replace(/\D/g, '')}`;
    }
}
