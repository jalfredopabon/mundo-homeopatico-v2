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
    sistema_corporal: string; // Campo enriquecido
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
 * Obtiene el Vademécum Maestro desde Google Sheets
 */
export async function getVademecumMaestro(): Promise<Medicine[]> {
    // MOCK DATA para desarrollo local si la URL es un placeholder
    if (GAS_WEBAPP_URL.includes('XXXXXXXXX')) {
        console.warn('Vademecum: Usando Mock Data para Maestro (URL no configurada)');
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
            },
            {
                id_producto: 'mock_002',
                linea: 'Productos mh',
                nombre: 'Arnica D4 MH',
                principios_activos: 'Arnica montana D4; Bellis perennis D4',
                indicaciones: 'Traumatismos; inflamación; dolor muscular^Contusiones y esguinces',
                posologia: '5 glóbulos cada 2 horas',
                presentaciones: 'Gotas x 30 ml; Glóbulos',
                estado: 'activo'
            },
            {
                id_producto: 'mock_003',
                linea: 'Esencias florales',
                nombre: 'Rescue Remedy',
                principios_activos: 'Rock Rose; Impatiens; Clematis; Star of Bethlehem; Cherry Plum',
                indicaciones: 'Estrés agudo; shock emocional; pánico^Situaciones de emergencia',
                posologia: '4 gotas directas en lengua',
                presentaciones: 'Gotas x 20 ml; Spray',
                estado: 'activo'
            },
            {
                id_producto: 'mock_004',
                linea: 'Oligoelementos',
                nombre: 'Zn-Ni-Co',
                principios_activos: 'Zinc; Niquel; Cobalto',
                indicaciones: 'Disfunciones hepato-biliares; regulación pancreática^Fatiga metabólica',
                posologia: '1 ampolla en ayunas',
                presentaciones: 'Ampollas bebibles x 28',
                estado: 'activo'
            }
        ];
        return mockData.map(mapMaestroToMedicine);
    }

    try {
        const response = await fetch(`${GAS_WEBAPP_URL}?sheet=maestro`);
        if (!response.ok) throw new Error('Error al conectar con la API de Vademécum');
        
        const data: VademecumMaestro[] = await response.json();
        return data
            .filter(item => item.estado === 'activo')
            .map(mapMaestroToMedicine);
    } catch (error) {
        console.error('API Error:', error);
        return []; 
    }
}

/**
 * Obtiene los Protocolos desde Google Sheets
 */
export async function getVademecumProtocolos(): Promise<VademecumProtocolo[]> {
    if (GAS_WEBAPP_URL.includes('XXXXXXXXX')) {
        console.warn('Vademecum: Usando Mock Data para Protocolos');
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
            },
            {
                id_protocolo: 'prot_mock_002',
                patologia: 'Traumatismo Muscular',
                principales: 'Arnica D4 MH',
                sistema: 'Locomotor',
                complementarios: 'Rhus tox',
                oligoelementos: 'Mg',
                topicos: 'Arnica Crema',
                estado: 'activo',
                sistema_corporal: 'Sistema Locomotor'
            },
            {
                id_protocolo: 'prot_mock_003',
                patologia: 'Ansiedad Anticipatoria',
                principales: 'Rescue Remedy',
                sistema: 'Nervioso',
                complementarios: 'Ignatia',
                oligoelementos: 'Li',
                topicos: 'Ninguno',
                estado: 'activo',
                sistema_corporal: 'Sistema Nervioso'
            }
        ];
    }

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
