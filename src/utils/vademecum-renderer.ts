// src/utils/vademecum-renderer.ts
import type { Medicine, Protocol } from "../data/medicines";

/**
 * UTILIDADES DE ICONOGRAFÍA (SVG STRINGS)
 * Extraídos de Icons.astro para garantizar paridad visual
 */
const ICONS = {
  mortero: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M9.06845 2H14.9316C15.8529 2 16.3135 2 16.5997 2.29289C17.1334 2.83907 17.1334 5.16093 16.5997 5.70711C16.3135 6 15.8529 6 14.9316 6H9.06845C8.14715 6 7.6865 6 7.40029 5.70711C6.86657 5.16093 6.86657 2.83907 7.40029 2.29289C7.6865 2 8.14715 2 9.06845 2Z" /><path d="M8 6C8.16493 6.32986 8.24741 6.49481 8.30606 6.6557C8.61211 7.49515 8.52805 8.42732 8.07678 9.19848C7.99029 9.34628 7.87965 9.49381 7.65836 9.78885L7.25493 10.3268C6.80486 10.9269 6.57983 11.2269 6.41674 11.5556C6.252 11.8877 6.13421 12.241 6.06677 12.6055C6 12.9664 6 13.3414 6 14.0915V16C6 18.8284 6 20.2426 6.87868 21.1213C7.75736 22 9.17157 22 12 22C14.8284 22 16.2426 22 17.1213 21.1213C18 20.2426 18 18.8284 18 16V14.0915C18 13.3414 18 12.9664 17.9332 12.6055C17.8658 12.241 17.748 11.8877 17.5833 11.5556C17.4202 11.2269 17.1951 10.9269 16.7451 10.3268L16.3416 9.78885C16.1204 9.49381 16.0097 9.34628 15.9232 9.19848C15.4719 8.42732 15.3879 7.49515 15.6939 6.6557C15.7526 6.49481 15.8351 6.32987 15.6939 6.6557C15.7526 6.49481 15.8351 6.32987 15.6939 6.6557Z" /><path d="M12 13V18M9.5 15.5L14.5 15.5" /></svg>`,
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M12.8,5.334 C13.684,4.728 14.782,4.25 16,4.25 C17.667,4.25 19.115,5.158 20.121,6.415 C21.128,7.673 21.75,9.344 21.75,11.028 C21.75,14.648 21.228,17.316 19.125,20.484 C19.117,20.496 19.109,20.507 19.101,20.518 C18.266,21.637 17.235,22.411 16.039,22.663 C14.833,22.917 13.583,22.614 12.373,21.816 C12.162,21.677 11.838,21.677 11.627,21.816 C10.417,22.614 9.167,22.917 7.961,22.663 C6.765,22.411 5.734,21.637 4.899,20.518 C4.891,20.507 4.883,20.496 4.875,20.484 C2.773,17.316 2.25,14.648 2.25,11.028 C2.25,9.344 2.872,7.673 3.879,6.415 C4.885,5.158 6.333,4.25 8,4.25 C9.256,4.25 10.384,4.758 11.282,5.391 C11.352,4.707 11.542,3.88 11.94,3.144 C12.483,2.138 13.453,1.25 15,1.25 C15.414,1.25 15.75,1.586 15.75,2 C15.75,2.414 15.414,2.75 15,2.75 C14.147,2.75 13.617,3.196 13.26,3.856 C13.011,4.317 12.868,4.854 12.8,5.334 Z" /></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-brand-600"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  pill: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M11.4497 19.5503L19.5503 11.4497C20.4785 10.5215 21 9.2625 21 7.94975C21 5.21608 18.7839 3 16.0503 3C14.7375 3 13.4785 3.52149 12.5503 4.44975L4.44975 12.5503C3.52149 13.4785 3 14.7375 3 16.0503C3 18.7839 5.21608 21 7.94975 21C9.2625 21 10.5215 20.4785 11.4497 19.5503Z" /><path d="M8.5 8.5L15.5 15.5" /></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  gotas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
};

// Mapa global para el Salto Maestro
let PRODUCT_JUMP_MAP: Map<string, string> = new Map();

export function setProductJumpMap(meds: any[]) {
    PRODUCT_JUMP_MAP = new Map(meds.map(m => [m.name.toLowerCase(), m.id]));
}

function enrichText(text: string) {
    if (!text || text === '-' || PRODUCT_JUMP_MAP.size === 0) return text;
    let enriched = text;
    const names = Array.from(PRODUCT_JUMP_MAP.keys()).sort((a, b) => b.length - a.length);
    names.forEach(name => {
        const id = PRODUCT_JUMP_MAP.get(name);
        const regex = new RegExp(`\\b(${name})\\b`, 'gi');
        enriched = enriched.replace(regex, `<span class="master-jump-link text-brand-600 font-bold underline decoration-brand-200 hover:decoration-brand-500 cursor-pointer transition-all" data-jump-to="${id}">$1</span>`);
    });
    return enriched;
}

/**
 * GENERADOR DE BADGES "ELITE"
 */
function renderBadge(text: string) {
  const normalized = text.toLowerCase();
  let colorClass = "bg-surface-100 text-strong ring-surface-200";

  if (normalized === "maestro" || normalized === "antihomotóxica" || normalized === "premium") {
    colorClass = "bg-brand-50 text-brand-700 ring-brand-100/50";
  } else if (normalized.includes("import") || normalized.includes("alem") || normalized.includes("fran")) {
    colorClass = "bg-indigo-50 text-indigo-700 ring-indigo-100/50";
  } else if (normalized.includes("comp") || normalized.includes("prep") || normalized.includes("fitoterapéutica")) {
    colorClass = "bg-amber-50 text-amber-700 ring-amber-100/50";
  } else if (normalized.includes("suplemento")) {
    colorClass = "bg-emerald-50 text-emerald-700 ring-emerald-100/50";
  }

  return `
    <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase ${colorClass} ring-1 ring-inset transition-all duration-300">
       ${text}
    </span>
  `;
}

export function createMedicalCard(medicine: any): string {
  return `
    <div 
      class="product-card group relative bg-white border border-surface-200 rounded-2xl p-5 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-500 cursor-pointer overflow-hidden animate-fade-in"
      data-medicine-id="${medicine.id}"
    >
      <div class="absolute -right-4 -top-4 w-24 h-24 bg-brand-50/30 rounded-full blur-2xl group-hover:bg-brand-100/40 transition-colors duration-500"></div>
      <div class="relative flex flex-col h-full gap-4">
        <div class="flex justify-between items-start gap-4">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold text-strong group-hover:text-brand-700 transition-colors duration-300 leading-tight">
              ${medicine.name}
            </h3>
            <p class="text-sm font-medium text-subtle italic truncate max-w-[180px]">
              ${medicine.scientificName || ''}
            </p>
          </div>
          <div class="flex-shrink-0 p-2 bg-surface-50 rounded-xl group-hover:bg-brand-50 transition-colors duration-300">
            ${ICONS.mortero}
          </div>
        </div>
        <div class="flex flex-wrap gap-2 pt-1 border-t border-surface-100/60 mt-auto">
          ${renderBadge(medicine.category)}
          ${medicine.type ? renderBadge(medicine.type) : ""}
        </div>
        <div class="flex items-center gap-2 text-xs font-bold text-brand-600 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 mt-2">
          ${ICONS.eye} VER FICHA TÉCNICA
        </div>
      </div>
    </div>
  `;
}

export function createProtocolCard(protocol: any): string {
  return `
    <div 
      class="protocol-card group relative bg-white border border-surface-200 rounded-2xl p-5 hover:border-brand-300 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden animate-fade-in"
      data-protocol-id="${protocol.id}"
    >
      <div class="relative space-y-4">
        <div class="flex justify-between items-start gap-3">
          <div class="p-2.5 bg-brand-50 rounded-xl text-brand-600 group-hover:scale-110 transition-transform duration-500">
            ${ICONS.leaf}
          </div>
          <div class="px-2 py-0.5 bg-surface-50 rounded-full text-[10px] font-bold text-subtle tracking-tighter uppercase transition-colors group-hover:bg-brand-100 group-hover:text-brand-700">
            PROTOCOLO
          </div>
        </div>
        <div class="space-y-1.5">
          <h3 class="text-base font-bold text-strong group-hover:text-brand-700 transition-colors duration-300 line-clamp-2 leading-snug">
            ${protocol.name}
          </h3>
          <p class="text-xs text-subtle line-clamp-2 leading-relaxed">
            ${protocol.description || protocol.indicaciones || ''}
          </p>
        </div>
        <div class="flex items-center gap-2 pt-2 border-t border-surface-100 text-[10px] font-black text-brand-600 tracking-widest uppercase opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
           Explorar Guía ${ICONS.plus}
        </div>
      </div>
    </div>
  `;
}

export function createMedicineDetails(medicine: any): string {
  const sections = medicine.sections || [];
  return `
    <div class="animate-content-in">
      <div class="mb-8 p-6 bg-gradient-to-br from-brand-50/50 to-white rounded-2xl border border-brand-100/50">
        <div class="flex items-center gap-4 mb-4">
           ${renderBadge(medicine.category)}
           ${medicine.type ? renderBadge(medicine.type) : ""}
        </div>
        <h2 class="text-3xl font-bold text-strong mb-2 leading-tight">${medicine.name}</h2>
        <p class="text-lg text-brand-600 italic font-medium">${medicine.scientificName || ''}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <section>
            <h4 class="flex items-center gap-2 text-sm font-black text-strong tracking-widest uppercase mb-3 px-1 border-l-4 border-brand-500">
              Acción Clínica
            </h4>
            <div class="bg-surface-50 p-4 rounded-xl text-subtle leading-relaxed shadow-sm">
              ${medicine.indications || ''}
            </div>
          </section>
          ${medicine.presentation ? `
          <section>
            <h4 class="flex items-center gap-2 text-sm font-black text-strong tracking-widest uppercase mb-3 px-1 border-l-4 border-brand-500">
              Presentación
            </h4>
            <div class="flex items-center gap-3 bg-white border border-surface-200 p-4 rounded-xl">
              <div class="p-2 bg-brand-50 rounded-lg text-brand-600">
                ${ICONS.pill}
              </div>
              <span class="font-medium text-strong italic">${medicine.presentation}</span>
            </div>
          </section>
          ` : ""}
        </div>

        <div class="space-y-6">
          <section>
            <h4 class="flex items-center gap-2 text-sm font-black text-strong tracking-widest uppercase mb-3 px-1 border-l-4 border-amber-500">
              Uso Sugerido
            </h4>
            <div class="bg-amber-50/50 border border-amber-100 p-4 rounded-xl text-amber-900 leading-relaxed italic text-sm">
              ${medicine.dosage || "Consultar guía de protocolos para dosificación específica."}
            </div>
          </section>
          ${medicine.keySymptoms ? `
          <section>
            <h4 class="flex items-center gap-2 text-sm font-black text-strong tracking-widest uppercase mb-3 px-1 border-l-4 border-brand-500">
              Síntomas Clave
            </h4>
            <div class="bg-white border border-surface-200 p-4 rounded-xl">
              <ul class="space-y-2">
                ${(medicine.keySymptoms || []).map((s: string) => `<li class="flex items-start gap-2 text-sm text-subtle"><span class="text-brand-500 mt-1">•</span> ${s}</li>`).join('')}
              </ul>
            </div>
          </section>
          ` : ""}
        </div>
      </div>
      
      <!-- Secciones dinámicas adicionales -->
      ${sections.length > 0 ? `
      <div class="mt-8 pt-8 border-t border-surface-100 space-y-8">
        ${sections.map((s: any) => `
          <section>
            <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">${s.title}</h4>
            <div class="bg-surface-25 p-5 rounded-2xl border border-surface-100 text-slate-600 text-sm leading-relaxed">
                ${s.content || (s.items ? `<ul class="list-disc pl-5 space-y-2">${s.items.map((it: string) => `<li>${it}</li>`).join('')}</ul>` : '')}
            </div>
          </section>
        `).join('')}
      </div>
      ` : ""}
    </div>
  `;
}

export function createProtocolDetails(protocol: any): string {
    return `
        <div class="animate-content-in">
            <header class="mb-10 p-8 bg-slate-900 rounded-2xl text-white shadow-xl relative overflow-hidden">
                <div class="absolute top-0 right-0 p-8 opacity-10 scale-150">${ICONS.leaf}</div>
                <div class="relative z-10">
                    <div class="flex items-center gap-3 text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">
                         Guía de Protocolo Clínico
                    </div>
                    <h2 class="text-3xl font-black mb-4">${protocol.name}</h2>
                    <span class="px-3 py-1 bg-brand-500 text-white text-[11px] font-bold rounded-full uppercase border border-brand-400">
                        ${protocol.system || 'Medicina General'}
                    </span>
                </div>
            </header>

            <div class="space-y-12">
                ${renderProtocolSection('Medicamentos Principales', protocol.description || protocol.indications || protocol.principales, 'gotas')}
                ${protocol.complementary ? renderProtocolSection('Soporte Complementario', protocol.complementary, 'plus') : ''}
                ${protocol.observaciones ? renderProtocolSection('Observaciones Terapéuticas', protocol.observaciones, 'search') : ''}
            </div>
        </div>
    `;
}

function renderProtocolSection(title: string, content: string, iconKey: string) {
    return `
        <section class="medical-section">
            <h4 class="text-xs font-black text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
               <span class="w-1.5 h-4 bg-brand-500 rounded-full"></span> ${title}
            </h4>
            <div class="bg-white border border-slate-100 p-6 rounded-2xl text-slate-700 leading-relaxed shadow-sm italic text-[14px]">
                ${enrichText(content)}
            </div>
        </section>
    `;
}
