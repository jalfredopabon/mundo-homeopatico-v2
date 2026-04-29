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
  'task-list': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M11 6L21 6" /><path d="M11 12L21 12" /><path d="M11 18L21 18" /><path d="M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4" /><path d="M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15" /></svg>`,
  droplet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
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
        enriched = enriched.replace(regex, `<span class="master-jump-link text-brand-dark font-bold underline decoration-brand/30 hover:decoration-brand cursor-pointer transition-all" data-jump-to="${id}">$1</span>`);
    });
    return enriched;
}

/**
 * GENERADOR DE BADGES ELITE (ADN ONLINE)
 */
function renderEliteBadge(text: string, type: 'terapia' | 'sistema' | 'forma' | 'default' = 'default') {
    let colorClass = "badge-elite--brand"; // MH Verde por defecto
    if (type === 'terapia') colorClass = "badge-elite--violet"; // Violeta Eléctrico
    else if (type === 'sistema') colorClass = "badge-elite--violet"; // Violeta Eléctrico (Sincronizado)
    else if (type === 'forma') colorClass = "badge-elite--orange"; // Naranja Vivo
    
    return `<span class="badge-elite ${colorClass}">${text}</span>`;
}

export function createMedicalCard(medicine: any): string {
  // Extraer sistemas si vienen en el objeto tags
  const sistemas = medicine.tags?.sistema || [];

  return `
    <div class="med-item reveal active" data-medicine-id="${medicine.id}">
      <div class="medical-card medical-item-btn">
        <div class="mb-2">
          <h3 class="font-bold text-slate-900 leading-tight text-dynamic-content">
            ${medicine.name}
          </h3>
        </div>
        <p class="text-slate-700 leading-relaxed mb-4 text-dynamic-content">
          ${(medicine.indications || '').replace(/;/g, ', ')}
        </p>
        <div class="flex items-center gap-2 flex-wrap">
          ${renderEliteBadge(medicine.category, 'terapia')}
          ${sistemas.map((s: string) => renderEliteBadge(s, 'sistema')).join('')}
          ${medicine.type ? renderEliteBadge(medicine.type, 'forma') : ""}
        </div>
      </div>
    </div>
  `;
}

export function createProtocolCard(protocol: any): string {
  return `
    <div class="med-item reveal active" data-protocol-id="${protocol.id}">
      <div class="medical-card medical-item-btn">
          <h3 class="font-bold text-slate-900 leading-tight text-dynamic-content mb-2">
            ${protocol.name}
          </h3>
        <p class="text-slate-700 leading-relaxed mb-4 text-dynamic-content line-clamp-2">
          ${(protocol.description || protocol.principales || '').replace(/;/g, ', ')}
        </p>
        <div class="flex items-center gap-2 flex-wrap">
           ${renderEliteBadge(protocol.system || 'Medicina General', 'sistema')}
        </div>
      </div>
    </div>
  `;
}

/**
 * RENDERIZADOR DE FICHA TÉCNICA (ADN ONLINE)
 */
export function createMedicineDetails(medicine: any): string {
  // Procesar listas (convertir strings con saltos de línea o comas en arrays)
  const formatList = (content: string) => {
    if (!content) return [];
    return content.split(/[;\n]/).filter(item => item.trim().length > 0);
  };

  const indicaciones = formatList(medicine.indications);
  const perfil = [
    { label: 'Tropismo principal', value: medicine.scientificName || 'Sistemas varios' },
    { label: 'Mecanismo', value: medicine.category || 'Homeopatía compleja' }
  ];
  const posologia = formatList(medicine.posologia || 'Consultar con su especialista médico.');

  return `
    <div class="animate-content-in" data-sheet-id="${medicine.id}">
      <!-- Encabezado de la Ficha -->
      <div class="mb-8 relative">
        <button class="close-ficha-btn lg:hidden absolute top-0 right-0 p-2 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-full border border-slate-100 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
        </button>
        <div class="flex items-center gap-3 text-[10px] font-bold text-slate-500 mb-2 tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
          Ficha técnica del producto
        </div>
        <h2 class="medical-title">${medicine.name}</h2>
        <div class="flex flex-wrap gap-2.5 mb-6 pb-6 border-b border-subtle">
          ${medicine.scientificName && medicine.scientificName !== medicine.name 
            ? `<span class="badge-elite badge-elite--slate px-2 py-0.5 text-[10px] font-medium tracking-normal">${medicine.scientificName}</span>` 
            : ''
          }
          ${renderEliteBadge(medicine.category, 'terapia')}
          ${renderEliteBadge(medicine.type || 'Gotas', 'forma')}
        </div>
      </div>

      <!-- Secciones de la Ficha -->
      <div class="flex flex-col">
        <!-- Indicaciones -->
        <div class="medical-section-container">
          <h4 class="medical-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M11 6L21 6"></path><path d="M11 12L21 12"></path><path d="M11 18L21 18"></path><path d="M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4"></path><path d="M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15"></path></svg>
            Indicaciones clínicas
          </h4>
          <ul class="space-y-4">
            ${indicaciones.map(text => `
              <li class="medical-list-item">
                <span class="vademecum-bullet-dot"></span>
                <div class="flex-1">${text}</div>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Perfil -->
        <div class="medical-section-container">
          <h4 class="medical-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M17.5 21C15.567 21 14 19.433 14 17.5L14 3L21 3L21 17.5C21 19.433 19.433 21 17.5 21Z"></path><path d="M22 3L13 3"></path><path d="M17 7H14"></path><path d="M10 16.875C10 19.9126 8 21 6 21C4 21 2 19.9126 2 16.875C2 13.8374 6 10 6 10C6 10 10 13.8374 10 16.875Z"></path><path d="M14 12C15.083 11.1336 16.2974 9.87843 17.771 10.7626C19.0014 11.5009 20.0342 10.7244 21 10"></path></svg>
            Perfil farmacológico
          </h4>
          <ul class="space-y-4">
            ${perfil.map(item => `
              <li class="medical-list-item">
                <span class="vademecum-bullet-dot"></span>
                <div class="flex-1"><span class="font-bold text-slate-900">${item.label}:</span> ${item.value}</div>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Posología -->
        <div class="medical-section-container">
          <h4 class="medical-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591"></path><path d="M11 20H17"></path></svg>
            Protocolo de posología
          </h4>
          <ul class="space-y-4">
            ${posologia.map(text => `
              <li class="medical-list-item">
                <span class="vademecum-bullet-dot"></span>
                <div class="flex-1">${text}</div>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}


export function createProtocolDetails(protocol: any): string {
  const formatList = (content: string) => {
    if (!content) return [];
    return content.split(/[;\n]/).filter(item => item.trim().length > 0);
  };

  const sections = [
    { title: 'Medicamentos Principales', content: protocol.description || protocol.principales, icon: 'mortero' },
    { title: 'Soporte Complementario', content: protocol.complementary, icon: 'plus' },
    { title: 'Oligoelementos', content: protocol.oligoelementos, icon: 'pill' },
    { title: 'Tratamientos Tópicos', content: protocol.topicos, icon: 'droplet' }
  ].filter(s => s.content);

  return `
    <div class="animate-content-in" data-sheet-id="${protocol.id}">
      <div class="mb-8 relative">
        <button class="close-ficha-btn lg:hidden absolute top-0 right-0 p-2 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-full border border-slate-100 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
        </button>
        <div class="flex items-center gap-3 text-[10px] font-bold text-slate-500 mb-2 tracking-widest">
          ${ICONS['task-list']}
          Guía de protocolo clínico
        </div>
        <h2 class="medical-title">${protocol.name}</h2>
        <div class="flex flex-wrap gap-2.5 mb-6 pb-6 border-b border-subtle">
           ${renderEliteBadge(protocol.system || 'Medicina General', 'sistema')}
        </div>
      </div>

      <div class="flex flex-col">
        ${sections.map(section => `
          <div class="medical-section-container">
            <h4 class="medical-section-title">
               ${ICONS[section.icon] || ''}
               ${section.title}
            </h4>
            <ul class="space-y-4">
               ${formatList(section.content).map(item => `
                 <li class="medical-list-item">
                   <span class="vademecum-bullet-dot"></span>
                   <div class="flex-1 text-slate-700">${section.title === 'Oligoelementos' ? item : enrichText(item)}</div>
                 </li>
               `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
