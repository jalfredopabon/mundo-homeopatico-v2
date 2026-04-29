// src/data/api.ts
/**
 * SERVICIO DE API - MUNDO HOMEOPÁTICO V2
 * Centraliza las peticiones a Google Apps Script (GAS) para el Vademécum.
 */

import type { Medicine } from './medicines';
import { z } from 'zod';

/**
 * Metadatos para filtros dinámicos extraídos de los datos reales
 */
export interface FilterMetadata {
    terapias: string[];
    formas: string[];
}

// URL del WebApp de Google Apps Script (Placeholder - Reemplazar con la URL real)
/**
 * CONFIGURACIÓN DE ORIGEN DE DATOS (HIDRATACIÓN ÉLITE)
 */
const GAS_WEBAPP_URL = import.meta.env.PUBLIC_GAS_URL || 'https://script.google.com/macros/s/AKfycbxtc14Vbzm5ZAcF2hhQsLsEuGyEyJxzAgfnxWZIgTxv_iGHWzf4xrn9IQYtXkRIcZ59/exec';

/**
 * TOKEN DE SEGURIDAD (Protocolo Fort Knox)
 */
const SECRET_KEY = import.meta.env.PUBLIC_GAS_SECRET || 'MH_SECRET_2026_ELITE'; 

// Esquema de validación para el Vademécum Maestro
export const VademecumMaestroSchema = z.object({
    id_producto: z.string(),
    linea: z.string(),
    nombre: z.string(),
    principios_activos: z.string(),
    indicaciones: z.string(),
    posologia: z.string(),
    presentaciones: z.string(),
    estado: z.string(),
});

// Esquema de validación para los Protocolos
export const VademecumProtocoloSchema = z.object({
    id_protocolo: z.string(),
    patologia: z.string(),
    principales: z.string(),
    sistema: z.string(),
    complementarios: z.string(),
    oligoelementos: z.string(),
    topicos: z.string(),
    estado: z.string(),
    sistema_corporal: z.string().optional().default(''),
});

export type VademecumMaestro = z.infer<typeof VademecumMaestroSchema>;
export type VademecumProtocolo = z.infer<typeof VademecumProtocoloSchema>;

// --- ESQUEMAS PARA CATÁLOGO (HIERARCHY & PRICES) ---

// Esquema para la estructura de navegación (navegacion)
export const CatalogNavigationSchema = z.object({
    nivel_1: z.string(),
    nivel_2: z.string().optional().default(''),
    nivel_3: z.string().optional().default(''),
    nivel_4: z.string().optional().default(''),
    titulo_mostrar: z.string(),
    descripcion: z.string().optional().default(''),
    titulo_presentacion: z.union([z.string(), z.number()]).optional().default('Presentación').transform(val => String(val)),
    titulo_precio_farmacia: z.union([z.string(), z.number()]).optional().default('Precio farmacia').transform(val => String(val)),
    titulo_precio_publico: z.union([z.string(), z.number()]).optional().default('Precio público').transform(val => String(val)),
    tabla_id: z.string().optional().default(''),
});

// Esquema para los productos del catálogo (lista_precios)
export const CatalogProductSchema = z.object({
    tabla_id: z.string(),
    producto: z.string(),
    requiere_elaboracion: z.string().optional().default(''),
    descripcion_producto: z.string().optional().default(''),
    badges: z.string().optional().default(''),
    precio_farmacia: z.union([z.string(), z.number()]).transform(val => String(val)),
    precio_publico: z.union([z.string(), z.number()]).transform(val => String(val)),
    estado: z.string().optional().default('activo'),
});

export type CatalogNavigation = z.infer<typeof CatalogNavigationSchema>;
export type CatalogProduct = z.infer<typeof CatalogProductSchema>;

/**
 * Helper para manejo de caché SWR (Stale-While-Revalidate)
 * Proporciona carga instantánea desde localStorage y refresca en background.
 */
async function fetchWithSWR<T>(
    cacheKey: string,
    fetcher: () => Promise<T>
): Promise<T> {
    // Modo Servidor (Astro Build): Fetch directo
    if (typeof window === 'undefined') return await fetcher();

    const cached = localStorage.getItem(cacheKey);
    
    // Si existe caché, la devolvemos inmediatamente
    if (cached) {
        try {
            const parsedData = JSON.parse(cached);
            
            // Revalidación asíncrona (Background)
            fetcher().then(freshData => {
                localStorage.setItem(cacheKey, JSON.stringify(freshData));
            }).catch(err => console.error(`SWR Refresh Error [${cacheKey}]:`, err));

            return parsedData;
        } catch (e) {
            console.error(`SWR Cache Error [${cacheKey}]:`, e);
        }
    }

    // Si no hay caché, esperamos el fetch inicial
    const fresh = await fetcher();
    localStorage.setItem(cacheKey, JSON.stringify(fresh));
    return fresh;
}


/**
 * Transforma los datos del Maestro de CSV/JSON a la interfaz Medicine del proyecto
 */
export function mapMaestroToMedicine(item: VademecumMaestro): Medicine {
    const indicationsList = item.indicaciones ? item.indicaciones.split('^').map(i => i.trim()) : [item.indicaciones];
    
    return {
        id: item.id_producto || `prod-${Math.random().toString(36).substr(2, 9)}`,
        name: item.nombre,
        linea: item.linea,
        category: item.linea, // Necesario para el filtro de vademecum.astro
        type: item.presentaciones.split(';')[0]?.split('x')[0]?.trim() || 'No especificada', // Necesario para el filtro de vademecum.astro
        shortDesc: indicationsList[0] ? `${indicationsList[0].substring(0, 120)}...` : 'Descripción no disponible',
        activeIngredients: item.principios_activos,
        indications: item.indicaciones,
        dosage: item.posologia,
        presentations: item.presentaciones,
        tags: {
            terapia: item.linea,
            sistema: [], // Los productos no tienen sistema asignado en el CSV
            forma: item.presentaciones.split(';')[0]?.split('x')[0]?.trim() || 'No especificada' 
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: indicationsList
            },
            {
                title: 'Principios Activos',
                icon: 'gotas',
                items: item.principios_activos ? item.principios_activos.split(';').map(i => i.trim()) : []
            },
            {
                title: 'Dosificación y Posología',
                icon: 'edit',
                items: item.posologia ? [item.posologia] : ['Consulte a su médico.']
            },
            {
                title: 'Presentaciones disponibles',
                icon: 'package',
                items: item.presentaciones ? item.presentaciones.split(';').map(i => i.trim()) : []
            }
        ]
    };
}

/**
 * Normaliza las llaves de un objeto para que sean resilientes a mayúsculas/minúsculas y espacios.
 * Incluye mapeo de alias históricos detectados en auditoría.
 */
function normalizeKeys(obj: any): any {
    if (Array.isArray(obj)) return obj.map(normalizeKeys);
    if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            let normalizedKey = key.toLowerCase().trim().replace(/\s+/g, '_');
            
            // 🛡️ Mapeo de Alias de Auditoría (Proyecto Anterior)
            if (normalizedKey === 'tablas_id') normalizedKey = 'tabla_id';
            if (normalizedKey === 'productos') normalizedKey = 'producto';
            
            acc[normalizedKey] = obj[key];
            return acc;
        }, {} as any);
    }
    return obj;
}

/**
 * Fetch con Resiliencia Elite (Retries + Cache Busting)
 */
async function robustFetch(url: string, retries = 3): Promise<Response> {
    const separator = url.includes('?') ? '&' : '?';
    const finalUrl = `${url}${separator}_cb=${Date.now()}`;
    
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(finalUrl);
            if (response.ok) return response;
            throw new Error("HTTP " + response.status);
        } catch (err: any) {
            const errorMsg = err?.message || String(err);
            console.warn("⚠️ Intento " + (i + 1) + " falló: " + errorMsg);
            
            if (i === retries - 1) throw err;
            // Espera exponencial: 1s, 2s, 3s...
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
    }
    throw new Error("Fetch failed after " + retries + " retries");
}

/**
 * Obtiene el Vademécum Maestro desde Google Sheets con soporte SWR
 */
export async function getVademecumMaestro(): Promise<{ medicines: Medicine[], metadata: FilterMetadata }> {
    return fetchWithSWR('vd_maestro', async () => {
        try {
            const response = await robustFetch(`${GAS_WEBAPP_URL}?action=maestro&key=${SECRET_KEY}`);
            const rawData = await response.json();
            const cleanData = normalizeKeys(rawData);
            const data = z.array(VademecumMaestroSchema.passthrough()).parse(cleanData);
            
            const medicines = data
                .filter(item => (item.estado || '').toLowerCase() === 'activo')
                .map(mapMaestroToMedicine);

            const metadata: FilterMetadata = {
                terapias: [...new Set(medicines.map(m => m.linea))].sort(),
                formas: [...new Set(medicines.map(m => m.type))].sort()
            };
            
            return { medicines, metadata };
        } catch (error) {
            console.error('API Error (Maestro):', error);
            return { medicines: [], metadata: { terapias: [], formas: [] } }; 
        }
    });
}

/**
 * Obtiene los Protocolos desde Google Sheets con soporte SWR
 */
export async function getVademecumProtocolos(): Promise<VademecumProtocolo[]> {
    return fetchWithSWR('vd_protocolos', async () => {
        try {
            const response = await robustFetch(`${GAS_WEBAPP_URL}?action=protocolos&key=${SECRET_KEY}`);
            const rawData = await response.json();
            const cleanData = normalizeKeys(rawData);
            const data = z.array(VademecumProtocoloSchema.passthrough()).parse(cleanData);
            
            return data
                .filter(item => (item.estado || '').toLowerCase() === 'activo')
                .map(item => ({
                    ...item,
                    id: item.id_protocolo,
                    name: item.patologia,
                    system: item.sistema_corporal || item.sistema,
                    description: item.principales,
                    complementary: item.complementarios,
                    oligoelementos: item.oligoelementos,
                    topicos: item.topicos
                }));
        } catch (error) {
            console.error('API Error (Protocolos):', error);
            return [];
        }
    });
}


/**
 * Obtiene la estructura de navegación del catálogo (navegacion)
 */
export async function getCatalogNavigation(): Promise<CatalogNavigation[]> {
    return fetchWithSWR('cat_nav', async () => {
        try {
            const response = await robustFetch(`${GAS_WEBAPP_URL}?action=navegacion&key=${SECRET_KEY}`);
            const rawData = await response.json();
            const cleanData = normalizeKeys(rawData);
            
            if (!Array.isArray(cleanData)) {
                console.error("API Error: La respuesta de navegación no es un array", cleanData);
                return [];
            }

            return z.array(CatalogNavigationSchema.passthrough()).parse(cleanData);
        } catch (error: any) {
            console.warn('API Error (Navegacion):', error?.message || String(error));
            return [];
        }
    });
}

/**
 * Obtiene la lista completa de precios/productos del catálogo (lista_precios)
 */
export async function getCatalogProducts(): Promise<CatalogProduct[]> {
    return fetchWithSWR('cat_products', async () => {
        try {
            const response = await robustFetch(`${GAS_WEBAPP_URL}?action=lista_precios&key=${SECRET_KEY}`);
            const rawData = await response.json();
            const cleanData = normalizeKeys(rawData);

            if (!Array.isArray(cleanData)) {
                console.error("API Error: La respuesta de productos no es un array", cleanData);
                return [];
            }

            return z.array(CatalogProductSchema.passthrough()).parse(cleanData);
        } catch (error: any) {
            console.warn('API Error (Lista de Precios):', error?.message || String(error));
            return [];
        }
    });
}


