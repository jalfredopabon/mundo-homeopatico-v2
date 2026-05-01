/**
 * FAQ Renderer: Genera el HTML para los acordeones de FAQ de forma dinámica.
 */
import { FAQData } from '../data/api';

export function renderFAQList(faqs: FAQData[]): string {
    if (!faqs || faqs.length === 0) return '<p class="text-center text-slate-500 py-8">No se encontraron preguntas frecuentes.</p>';

    return faqs.map((faq, index) => {
        // Parsear párrafos (^) y listas (|)
        const paragraphs = faq.respuesta.split('^').map(p => p.trim()).filter(p => p);
        
        // El último párrafo podría contener una lista si tiene pipes
        let lastParagraph = paragraphs[paragraphs.length - 1] || '';
        let listItems: string[] = [];
        
        if (lastParagraph.includes('|')) {
            listItems = lastParagraph.split('|').map(i => i.trim()).filter(i => i);
            // El primer elemento del split de la lista podría ser el texto previo
            // Pero según la lógica de "respuesta", suele ser todo el bloque de lista o precedido por texto.
            // Para simplificar, si hay pipes, tratamos todo el último bloque como lista si es necesario.
            // O mejor: si un párrafo contiene pipes, lo convertimos en lista.
        }

        return `
            <div class="faq-item" id="faq-item-${index}">
                <button class="faq-header">
                    <span class="faq-title">${faq.pregunta}</span>
                    <div class="faq-icon-box">
                        <svg class="icon-closed w-5 h-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        <svg class="icon-opened w-5 h-5 text-secondary hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
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
                                                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
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
