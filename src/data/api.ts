// src/data/api.ts
/**
 * SERVICIO DE API - MUNDO HOMEOPÁTICO V2
 * Centraliza las peticiones a Google Apps Script (GAS) para el Vademécum.
 */

import type { Medicine } from './medicines';

// Variables de entorno (Fort Knox Security)
const GAS_WEBAPP_URL = import.meta.env.PUBLIC_GAS_URL;
const GAS_SECRET_KEY = import.meta.env.PUBLIC_GAS_SECRET;

// Configuración de Caché SWR (Elite Performance)
const CACHE_KEYS = {
    MAESTRO: 'mh_vademecum_maestro_cache',
    PROTOCOLOS: 'mh_vademecum_protocolos_cache'
};
const CACHE_EXPIRATION = 1000 * 60 * 60; // 1 hora

/**
 * Recupera datos de localStorage con validación de expiración y entorno SSR
 */
function getFromCache<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
        const cached = localStorage.getItem(key);
        if (!cached) return null;
        
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_EXPIRATION) {
            localStorage.removeItem(key);
            return null;
        }
        return data as T;
    } catch (e) {
        return null;
    }
}

/**
 * Guarda datos en localStorage con timestamp
 */
function saveToCache(key: string, data: any) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch (e) {}
}

export interface VademecumMaestro {
    id_producto: string;
    linea: string;
    nombre: string;
    principios_activos: string;
    indicaciones: string;
    posologia: string;
    presentaciones: string;
    estado: string;
}

export interface VademecumProtocolo {
    id_protocolo: string;
    patologia: string;
    principales: string;
    sistema: string;
    complementarios: string;
    oligoelementos: string;
    topicos: string;
    estado: string;
}

/**
 * Transforma los datos del Maestro de CSV/JSON a la interfaz Medicine del proyecto
 */
export function mapMaestroToMedicine(item: VademecumMaestro): Medicine {
    return {
        id: item.id_producto || `prod-legacy-${Date.now()}`,
        name: item.nombre,
        potency: '', // El maestro no tiene columna de potencia separada
        scientificName: item.principios_activos,
        origin: 'Origen Natural',
        shortDesc: item.indicaciones,
        tags: {
            terapia: item.linea,
            sistema: [], // Se mapeará dinámicamente en una fase posterior
            forma: item.presentaciones
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [item.indicaciones]
            },
            {
                title: 'Principios Activos',
                icon: 'gotas',
                items: item.principios_activos ? item.principios_activos.split(';').map(i => i.trim()) : []
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [item.posologia]
            }
        ]
    };
}

/**
 * Obtiene el Vademécum Maestro desde Google Sheets con estrategia SWR
 */
export async function getVademecumMaestro(): Promise<Medicine[]> {
    // 1. Intentar cargar desde Caché (0ms)
    const cached = getFromCache<Medicine[]>(CACHE_KEYS.MAESTRO);
    if (cached) return cached;

    try {
        const url = `${GAS_WEBAPP_URL}?action=maestro&key=${GAS_SECRET_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Error al conectar con la API de Vademécum');
        
        const data: VademecumMaestro[] = await response.json();
        if (data.error) throw new Error(data.error);

        const mappedData = data
            .filter(item => item.estado === 'activo')
            .map(mapMaestroToMedicine);

        // 2. Guardar en caché para la próxima vez
        saveToCache(CACHE_KEYS.MAESTRO, mappedData);

        return mappedData;
    } catch (error) {
        throw error;
    }
}

/**
 * Obtiene los Protocolos desde Google Sheets con estrategia SWR
 */
export async function getVademecumProtocolos(): Promise<VademecumProtocolo[]> {
    const cached = getFromCache<VademecumProtocolo[]>(CACHE_KEYS.PROTOCOLOS);
    if (cached) return cached;

    try {
        const url = `${GAS_WEBAPP_URL}?action=protocolos&key=${GAS_SECRET_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Error al conectar con la API de Protocolos');
        
        const data: VademecumProtocolo[] = await response.json();
        if (data.error) throw new Error(data.error);

        const filtered = data.filter(item => item.estado === 'activo');
        
        saveToCache(CACHE_KEYS.PROTOCOLOS, filtered);

        return filtered;
    } catch (error) {
        throw error;
    }
}
