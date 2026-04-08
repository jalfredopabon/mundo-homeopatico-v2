/**
 * Mundo Homeopático Security Utils (Elite Fort Knox)
 * Utilidades para sanitización de entradas y prevención de ataques XSS.
 */

/**
 * Sanitiza una cadena de texto eliminando o escapando caracteres peligrosos.
 * Útil para inputs de búsqueda y formularios.
 */
export function sanitizeInput(input: string): string {
    if (!input) return '';
    
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

/**
 * Limpia una cadena para búsquedas seguras (remueve HTML por completo)
 */
export function clearSearchString(input: string): string {
    const sanitized = sanitizeInput(input);
    // Elimina cualquier indicio de etiquetas HTML remanentes
    return sanitized.replace(/<[^>]*>?/gm, '');
}

/**
 * Ofusca datos mediante Base64 (Capa de privacidad básica Elite)
 */
export function encryptData(data: any): string {
    const jsonString = JSON.stringify(data);
    return btoa(unescape(encodeURIComponent(jsonString)));
}

/**
 * Desofusca datos desde Base64
 */
export function decryptData(encodedData: string): any {
    try {
        if (!encodedData) return null;
        const jsonString = decodeURIComponent(escape(atob(encodedData)));
        return JSON.parse(jsonString);
    } catch (e) {
        console.error('[Elite Security] Error al decodificar datos ofuscados.');
        return null;
    }
}
