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
const GAS_WEBAPP_URL = import.meta.env.PUBLIC_GAS_URL || 'https://script.google.com/macros/s/AKfycbyf4h6EDfhx1OIF4EhlnjIOMKfh3vfyQ_F2xpQL-508-uBlWQvj6tN1BilRFrBHEIq9/exec';

/**
 * TOKEN DE SEGURIDAD (Protocolo Fort Knox)
 */
const SECRET_KEY = import.meta.env.PUBLIC_GAS_SECRET || 'MH_SECRET_2026_ELITE'; 

// Esquema de validación para el Vademécum Maestro
export const VademecumMaestroSchema = z.object({
    id_producto: z.string(),
    tipo_terapia: z.string(),
    nombre: z.string(),
    composicion: z.string(),
    indicaciones_terapeuticas: z.string(),
    presentacion_posologia: z.string(),
    forma_farmaceutica: z.string(),
    estado: z.string(),
});

// Esquema de validación para los Protocolos
export const VademecumProtocoloSchema = z.object({
    id_protocolo: z.string(),
    patologia: z.string(),
    medicamentos_principales: z.string().optional().default(''),
    soporte_sistemas: z.string().optional().default(''),
    soporte_complementario: z.string().optional().default(''),
    oligoelementos: z.string().optional().default(''),
    tratamientos_topicos: z.string().optional().default(''),
    estado: z.string().optional().default('activo'),
    sistema_cuerpo: z.string().optional().default(''),
});

export type VademecumMaestro = z.infer<typeof VademecumMaestroSchema>;
export type VademecumProtocolo = z.infer<typeof VademecumProtocoloSchema>;

// --- ESQUEMA PARA VIDEO ---
export const VideoSchema = z.object({
    nombre_del_video: z.string().optional().default(''),
    url: z.string().optional().default(''),
});

export type VideoData = z.infer<typeof VideoSchema>;

// --- ESQUEMA PARA FAQ ---
export const FAQSchema = z.object({
    pregunta: z.string().optional().default(''),
    respuesta: z.string().optional().default(''),
});

export type FAQData = z.infer<typeof FAQSchema>;

// --- ESQUEMA PARA DISTRIBUIDORES ---
export const DistributorSchema = z.object({
    logo: z.string().optional().default('logo-mundo-homeopatico'),
    nombre: z.string().optional().default(''),
    ciudad: z.string().optional().default(''),
    direccion: z.string().optional().default(''),
    horarios: z.string().optional().default(''),
    nombre_distribuidor: z.string().optional().default(''),
    nombre_persona: z.string().optional().default(''),
    whatsapp: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
    whatsapp_2: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
    whatsapp_3: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
    whatsapp_4: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
    movil_1: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
    movil_2: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
    telefono: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
    telefono_fijo_1: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
    telefono_fijo_2: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
    mapa: z.string().optional().default(''),
    estado: z.string().optional().default('activo'),
});

export type DistributorData = z.infer<typeof DistributorSchema>;

// --- ESQUEMA PARA CONFIGURACIÓN (CONFIG) ---
export const ConfigSchema = z.object({
    id: z.string(),
    contenido: z.string().optional().default(''),
});

export type ConfigData = z.infer<typeof ConfigSchema>;

// --- ESQUEMA PARA DESCUENTOS ---
export const DiscountSchema = z.object({
    cedula: z.union([z.string(), z.number()]).transform(val => String(val)),
    nit: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
    nombre: z.string().optional().default(''),
    porcentaje_descuento: z.union([z.string(), z.number()]).transform(val => Number(val)),
    porcentaje_descuento_exclusivos: z.union([z.string(), z.number()]).optional().default(0).transform(val => Number(val)),
});

export type DiscountData = z.infer<typeof DiscountSchema>;

// --- TIPO RESULTADO DE VALIDACIÓN DE ACCESO ---
export interface AccessResult {
    ok: boolean;
    nombre_usuario?: string;
    error?: string;
}

// --- ESQUEMAS PARA CATÁLOGO (HIERARCHY & PRICES) ---

/**
 * Formatea valores que vienen de Excel/Sheets. 
 * Detecta si un número es un decimal (porcentaje) y lo convierte a string legible.
 */
const smartFormat = (val: any) => {
    if (typeof val === 'number') {
        // Si el número está entre 0 y 1 (inclusive), lo tratamos como porcentaje
        // Esto corrige el comportamiento de Google Sheets (20% -> 0.2, 100% -> 1)
        if (val > 0 && val <= 1) {
            return `${Math.round(val * 100)}%`;
        }
    }
    return String(val);
};

// Esquema para la estructura de navegación (navegacion)
export const CatalogNavigationSchema = z.object({
    nivel_1: z.string().optional().default(''),
    nivel_2: z.string().optional().default(''),
    nivel_3: z.string().optional().default(''),
    nivel_4: z.string().optional().default(''),
    titulo_mostrar: z.union([z.string(), z.number()]).optional().default('').transform(smartFormat),
    descripcion: z.string().optional().default(''),
    titulo_presentacion: z.union([z.string(), z.number()]).optional().default('Presentación').transform(smartFormat),
    titulo_precio_farmacia: z.union([z.string(), z.number()]).optional().default('Precio farmacia').transform(smartFormat),
    titulo_precio_publico: z.union([z.string(), z.number()]).optional().default('Precio público').transform(smartFormat),
    tabla_id: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
});

// Esquema para los productos del catálogo (lista_precios)
export const CatalogProductSchema = z.object({
    tabla_id: z.union([z.string(), z.number()]).transform(val => String(val)),
    producto: z.union([z.string(), z.number()]).transform(val => String(val)),
    presentacion: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
    requiere_elaboracion: z.union([z.string(), z.number()]).optional().default('').transform(smartFormat),
    descripcion_producto: z.string().optional().default(''),
    badges: z.union([z.string(), z.number()]).optional().default('').transform(smartFormat),
    precio_farmacia: z.union([z.string(), z.number()]).transform(val => String(val)),
    precio_publico: z.union([z.string(), z.number()]).transform(val => String(val)),
    estado: z.string().optional().default('activo'),
});

export type CatalogNavigation = z.infer<typeof CatalogNavigationSchema>;
export type CatalogProduct = z.infer<typeof CatalogProductSchema>;

// Caché en memoria para el servidor (Node.js) con coalescencia y TTL para desarrollo y build
const serverCache = new Map<string, { promise: Promise<any>; timestamp: number }>();
const SERVER_CACHE_TTL = 60000; // TTL de 1 minuto en servidor

/**
 * Helper para manejo de caché SWR (Stale-While-Revalidate)
 * Proporciona carga instantánea desde localStorage y refresca en background.
 */
async function fetchWithSWR<T>(
    cacheKey: string,
    fetcher: () => Promise<T>
): Promise<T> {
    // Modo Servidor (Astro Build / Dev Server): Coalescencia y caché en memoria
    if (typeof window === 'undefined') {
        const now = Date.now();
        const cached = serverCache.get(cacheKey);
        
        if (cached && (now - cached.timestamp < SERVER_CACHE_TTL)) {
            return cached.promise;
        }
        
        const promise = fetcher().catch(err => {
            serverCache.delete(cacheKey);
            throw err;
        });
        
        serverCache.set(cacheKey, { promise, timestamp: now });
        return promise;
    }

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
    const rawIndicaciones = item.indicaciones_terapeuticas || '';
    const indicationsList = rawIndicaciones.includes('^') 
        ? rawIndicaciones.split('^').map(i => i.trim()) 
        : (rawIndicaciones.includes(';') ? rawIndicaciones.split(';').map(i => i.trim()) : [rawIndicaciones]);
    
    const cleanForm = item.forma_farmaceutica.split(';')[0]?.trim() || 'No especificada';
    
    return {
        id: item.id_producto || `prod-${Math.random().toString(36).substr(2, 9)}`,
        name: item.nombre,
        linea: item.tipo_terapia,
        category: item.tipo_terapia, // Necesario para el filtro de vademecum.astro
        type: cleanForm, // Necesario para el filtro de vademecum.astro
        shortDesc: indicationsList[0] ? `${indicationsList[0].substring(0, 120)}...` : 'Descripción no disponible',
        activeIngredients: item.composicion,
        indications: rawIndicaciones,
        dosage: item.presentacion_posologia,
        presentations: item.forma_farmaceutica,
        tags: {
            terapia: item.tipo_terapia,
            sistema: [], // Los productos no tienen sistema asignado en el CSV
            forma: cleanForm 
        },
        sections: [
            {
                title: 'Indicaciones terapéuticas',
                icon: 'task-list',
                items: indicationsList
            },
            {
                title: 'Composición',
                icon: 'gotas',
                items: item.composicion ? item.composicion.split(';').map(i => i.trim()) : []
            },
            {
                title: 'Presentación y posología',
                icon: 'edit',
                items: item.presentacion_posologia 
                    ? (item.presentacion_posologia.includes('^') ? item.presentacion_posologia.split('^').map(i => i.trim()) : [item.presentacion_posologia]) 
                    : ['Consultar con su especialista médico.']
            },
            {
                title: 'Presentaciones disponibles',
                icon: 'package',
                items: item.forma_farmaceutica ? item.forma_farmaceutica.split(';').map(i => i.trim()) : []
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
            let normalizedKey = key.toLowerCase()
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, '_');
            
            // 🛡️ Mapeo de Alias de Auditoría (Proyecto Anterior)
            if (normalizedKey === 'tablas_id') normalizedKey = 'tabla_id';
            if (normalizedKey === 'productos') normalizedKey = 'producto';
            if (normalizedKey === 'encabezado_1') normalizedKey = 'titulo_presentacion';
            if (normalizedKey === 'encabezado_2') normalizedKey = 'titulo_precio_farmacia';
            if (normalizedKey === 'encabezado_3') normalizedKey = 'titulo_precio_publico';
            if (normalizedKey === 'principios_activos') normalizedKey = 'composicion';
            
            // 🏢 Mapeo para Sedes / Distribuidores
            if (normalizedKey === 'sedes') normalizedKey = 'nombre';
            if (normalizedKey === 'departamento') normalizedKey = 'ciudad';
            if (normalizedKey === 'whatsapp_1') normalizedKey = 'whatsapp';
            if (normalizedKey === 'telefono_fijo_1') normalizedKey = 'telefono';
            
            // 🎬 Mapeo para Video
            if (normalizedKey === 'nombre' && obj.url) normalizedKey = 'nombre_del_video';
            
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

            // Extraer todas las formas individuales de las presentaciones de todos los productos
            const allFormas = medicines.flatMap(m => 
                (m.presentations || '').split(';').map(p => p.trim())
            ).filter(Boolean);

            const metadata: FilterMetadata = {
                terapias: [...new Set(medicines.map(m => m.linea))].sort(),
                formas: [...new Set(allFormas)].sort()
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
                    system: item.sistema_cuerpo || '',
                    description: item.medicamentos_principales,
                    systemSupport: item.soporte_sistemas,
                    complementary: item.soporte_complementario,
                    oligoelementos: item.oligoelementos,
                    topicos: item.tratamientos_topicos
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
    return fetchWithSWR('cat_nav_v4', async () => {
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
    return fetchWithSWR('cat_products_v4', async () => {
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

/**
 * Obtiene la configuración del video institucional (desde config)
 */
export async function getVideoData(): Promise<VideoData | null> {
    try {
        const config = await getConfigData();
        const url = config.link_video || config.video_url || config.video_ural || '';
        if (url) {
            return {
                nombre_del_video: 'Video Institucional',
                url: url
            };
        }
        return null;
    } catch (error: any) {
        console.warn('API Error (Video de Config):', error?.message || String(error));
        return null;
    }
}

/**
 * Obtiene las preguntas frecuentes (faq)
 */
export async function getFAQData(): Promise<FAQData[]> {
    return fetchWithSWR('site_faq_v1', async () => {
        try {
            const response = await robustFetch(`${GAS_WEBAPP_URL}?action=faq&key=${SECRET_KEY}`);
            const rawData = await response.json();
            const cleanData = normalizeKeys(rawData);
            
            if (Array.isArray(cleanData)) {
                return z.array(FAQSchema.passthrough()).parse(cleanData);
            }
            return [];
        } catch (error: any) {
            console.warn('API Error (FAQ):', error?.message || String(error));
        }
    });
}

/**
 * Obtiene la lista de distribuidores (distribuidores)
 */
export async function getDistributors(): Promise<DistributorData[]> {
    return fetchWithSWR('site_distributors_v1', async () => {
        try {
            const response = await robustFetch(`${GAS_WEBAPP_URL}?action=distribuidores&key=${SECRET_KEY}`);
            const rawData = await response.json();
            const cleanData = normalizeKeys(rawData);
            
            if (Array.isArray(cleanData)) {
                return z.array(DistributorSchema.passthrough()).parse(cleanData)
                    .filter(d => (d.estado || '').toLowerCase() === 'activo');
            }
            return [];
        } catch (error: any) {
            console.warn('API Error (Distribuidores):', error?.message || String(error));
            return [];
        }
    });
}

/**
 * Obtiene la configuración global del sitio (config)
 */
export async function getConfigData(): Promise<Record<string, string>> {
    return fetchWithSWR('site_config_v1', async () => {
        try {
            const response = await robustFetch(`${GAS_WEBAPP_URL}?action=config&key=${SECRET_KEY}`);
            const rawData = await response.json();
            // El nuevo GAS v2.1 ya entrega un objeto plano {clave: valor}
            return normalizeKeys(rawData);
        } catch (error: any) {
            console.warn('API Error (Config):', error?.message || String(error));
            return {};
        }
    });
}

/**
 * Obtiene la lista de descuentos por cédula (descuentos)
 */
export async function getDiscounts(): Promise<DiscountData[]> {
    return fetchWithSWR('site_discounts_v1', async () => {
        try {
            const response = await robustFetch(`${GAS_WEBAPP_URL}?action=descuentos&key=${SECRET_KEY}`);
            const rawData = await response.json();
            const cleanData = normalizeKeys(rawData);

            if (Array.isArray(cleanData)) {
                return z.array(DiscountSchema.passthrough()).parse(cleanData);
            }
            return [];
        } catch (error: any) {
            console.warn('API Error (Descuentos):', error?.message || String(error));
            return [];
        }
    });
}

/**
 * Valida credenciales de acceso al Vademécum de forma segura.
 * NUNCA expone la tabla completa. El GAS solo responde ok/no ok.
 */
export async function validateAccess(usuario: string, contrasena: string): Promise<AccessResult> {
    try {
        const url = `${GAS_WEBAPP_URL}?action=validar_acceso&key=${SECRET_KEY}&usuario=${encodeURIComponent(usuario)}&contrasena=${encodeURIComponent(contrasena)}`;
        const response = await robustFetch(url);
        const data = await response.json();
        return data as AccessResult;
    } catch (error: any) {
        console.warn('API Error (ValidarAcceso):', error?.message || String(error));
        return { ok: false, error: 'Error de conexión' };
    }
}
