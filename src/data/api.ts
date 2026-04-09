// src/data/api.ts
/**
 * SERVICIO DE API - MUNDO HOMEOPÁTICO V2
 * Centraliza las peticiones a Google Apps Script (GAS) para el Vademécum.
 */

import type { Medicine } from './medicines';

// URL del WebApp de Google Apps Script (Placeholder - Reemplazar con la URL real)
const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbz_XXXXXXXXX/exec';

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
        id: item.id_producto || `prod-${Math.random().toString(36).substr(2, 9)}`,
        name: item.nombre,
        potency: '', // El maestro no parece tener columna de potencia separada
        scientificName: item.principios_activos,
        origin: 'Origen Natural',
        shortDesc: item.indicaciones,
        tags: {
            terapia: item.linea,
            sistema: [], // Pendiente mapeo dinámico o manual
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
                items: item.principios_activos.split(';').map(i => i.trim())
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
 * Obtiene el Vademécum Maestro desde Google Sheets
 */
export async function getVademecumMaestro(): Promise<Medicine[]> {
    try {
        const response = await fetch(`${GAS_WEBAPP_URL}?sheet=maestro`);
        if (!response.ok) throw new Error('Error al conectar con la API de Vademécum');
        
        const data: VademecumMaestro[] = await response.json();
        return data
            .filter(item => item.estado === 'activo')
            .map(mapMaestroToMedicine);
    } catch (error) {
        console.error('API Error:', error);
        return []; // Fallback a lista vacía
    }
}

/**
 * Obtiene los Protocolos desde Google Sheets
 */
export async function getVademecumProtocolos(): Promise<VademecumProtocolo[]> {
    try {
        const response = await fetch(`${GAS_WEBAPP_URL}?sheet=protocolos`);
        if (!response.ok) throw new Error('Error al conectar con la API de Protocolos');
        
        const data: VademecumProtocolo[] = await response.json();
        return data.filter(item => item.estado === 'activo');
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
}
