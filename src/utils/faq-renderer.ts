/**
 * FAQ Renderer: Genera el HTML para los acordeones de FAQ de forma dinámica.
 */
import { FAQData } from '../data/api';

const FAQ_ICONS = {
    chevron: `<svg class="icon-closed w-5 h-5 text-secondary transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 9l-7 7-7-7" /></svg>`,
    check: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
};

export function renderFAQList(faqs: FAQData[]): string {
    if (!faqs || faqs.length === 0) return '<p class="text-center text-slate-500 py-8">No se encontraron preguntas frecuentes.</p>';

    return faqs.map((faq, index) => {
        const paragraphs = faq.respuesta.split('^').map(p => p.trim()).filter(p => p);
        
        return `
            <div class="faq-item" id="faq-item-${index}">
                <button class="faq-header">
                    <span class="faq-title">${faq.pregunta}</span>
                    <div class="faq-icon-box">
                        ${FAQ_ICONS.chevron}
                    </div>
                </button>
                <div class="faq-content-wrapper h-0 overflow-hidden transition-all duration-300">
                    <div class="faq-content-inner p-6 pt-0 text-slate-600 leading-relaxed">
                        ${paragraphs.map((p, pIdx) => {
                            if (p.includes('|')) {
                                const items = p.split('|').map(i => i.trim()).filter(i => i);
                                return `
                                    <ul class="faq-list mt-4 space-y-3">
                                        ${items.map(item => `
                                            <li class="faq-list-item flex items-start gap-3">
                                                <div class="faq-check-box mt-1 flex-shrink-0 w-5 h-5 rounded-md bg-brand/10 text-brand flex items-center justify-center">
                                                    ${FAQ_ICONS.check}
                                                </div>
                                                <span class="faq-list-text text-sm">${item}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                `;
                            }
                            return `<p class="${pIdx < paragraphs.length - 1 ? 'mb-4' : ''}">${p}</p>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}
