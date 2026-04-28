// src/data/api.ts
/**
 * SERVICIO DE API - MUNDO HOMEOPÁTICO V2
 * Centraliza las peticiones a Google Apps Script (GAS) para el Vademécum.
 */

import type { Medicine } from './medicines';
import { z } from 'zod';

// URL del WebApp de Google Apps Script (Placeholder - Reemplazar con la URL real)
/**
 * CONFIGURACIÓN DE ORIGEN DE DATOS (HIDRATACIÓN ÉLITE)
 */
const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbxtc14Vbzm5ZAcF2hhQsLsEuGyEyJxzAgfnxWZIgTxv_iGHWzf4xrn9IQYtXkRIcZ59/exec';

/**
 * TOKEN DE SEGURIDAD (Protocolo Fort Knox)
 */
const SECRET_KEY = 'YOUR_SECRET_KEY_HERE'; 

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
    sistema_corporal: z.string(),
});

export type VademecumMaestro = z.infer<typeof VademecumMaestroSchema>;
export type VademecumProtocolo = z.infer<typeof VademecumProtocoloSchema>;

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
 */
function normalizeKeys(obj: any): any {
    if (Array.isArray(obj)) return obj.map(normalizeKeys);
    if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            const normalizedKey = key.toLowerCase().trim().replace(/\s+/g, '_');
            acc[normalizedKey] = obj[key];
            return acc;
        }, {} as any);
    }
    return obj;
}

/**
 * Obtiene el Vademécum Maestro desde Google Sheets con soporte SWR
 */
export async function getVademecumMaestro(): Promise<Medicine[]> {
    return fetchWithSWR('vd_maestro', async () => {
        if (GAS_WEBAPP_URL.includes('XXXXXXXXX')) {
            console.warn('Vademecum: Usando Mock Data para Maestro');
            const mockData: VademecumMaestro[] = [
                {
                    id_producto: 'mock_001',
                    linea: 'Productos mh',
                    nombre: 'Abies D4 MH',
                    principios_activos: 'Abies nigra D6; Anacardium D8',
                    indicaciones: 'Gastritis; acidez; flatulencia^Dispepsias gástricas',
                    posologia: '10 gotas 3 veces al día',
                    presentaciones: 'Gotas x 30 ml; Tabletas x 90',
                    estado: 'activo'
                }
            ];
            return mockData.map(mapMaestroToMedicine);
        }

        try {
            const response = await fetch(`${GAS_WEBAPP_URL}?sheet=maestro`);
            if (!response.ok) throw new Error('Error al conectar con la API de Vademécum');
            
            const rawData = await response.json();
            const cleanData = normalizeKeys(rawData);
            const data = z.array(VademecumMaestroSchema.passthrough()).parse(cleanData);
            
            return data
                .filter(item => (item.estado || '').toLowerCase() === 'activo')
                .map(mapMaestroToMedicine);
        } catch (error) {
            console.error('API Error (Maestro):', error);
            if (error instanceof z.ZodError) console.warn('Zod Mapping Errors:', error.errors);
            return []; 
        }
    });
}

/**
 * Obtiene los Protocolos desde Google Sheets con soporte SWR
 */
export async function getVademecumProtocolos(): Promise<VademecumProtocolo[]> {
    return fetchWithSWR('vd_protocolos', async () => {
        if (GAS_WEBAPP_URL.includes('XXXXXXXXX')) {
            return [
                {
                    id_protocolo: 'prot_mock_001',
                    patologia: 'Gastritis Aguda',
                    principales: 'Abies D4 MH',
                    sistema: 'Digestivo',
                    complementarios: 'Nux vomica',
                    oligoelementos: 'Zn-Ni-Co',
                    topicos: 'Ninguno',
                    estado: 'activo',
                    sistema_corporal: 'Sistema Digestivo'
                }
            ];
        }

        try {
            const response = await fetch(`${GAS_WEBAPP_URL}?sheet=protocolos`);
            if (!response.ok) throw new Error('Error al conectar con la API de Protocolos');
            
            const rawData = await response.json();
            const cleanData = normalizeKeys(rawData);
            const data = z.array(VademecumProtocoloSchema.passthrough()).parse(cleanData);
            
            return data
                .filter(item => (item.estado || '').toLowerCase() === 'activo')
                .map(item => ({
                    ...item,
                    system: item.sistema_corporal || item.sistema // Asegurar compatibilidad con buscador
                }));
        } catch (error) {
            console.error('API Error (Protocolos):', error);
            if (error instanceof z.ZodError) console.warn('Zod Mapping Errors:', error.errors);
            return [];
        }
    });
}
