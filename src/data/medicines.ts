// src/data/medicines.ts
// TODO: conectar con CMS / API en producción

export interface MedicineSection {
    title: string;
    icon: string;
    items: string[];
}

export interface Medicine {
    id: string;
    name: string;
    potency: string;
    scientificName: string;
    origin: string;
    shortDesc: string;
    tags: {
        terapia: string;
        sistema: string[];
        forma: string;
    };
    sections: MedicineSection[];
}

export const medicines: Medicine[] = [
    {
        id: 'nux-vomica',
        name: 'Nux vomica',
        potency: 'D4',
        scientificName: 'Strychnos nux-vomica',
        origin: 'Origen vegetal',
        shortDesc: 'Tratamiento eficaz para la digestión lenta con sensación de pesadez, migrañas digestivas matutinas y estreñimiento espasmódico.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Digestivo', 'Nervioso'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Coadyuvante en el tratamiento de dispepsias, flatulencia y estreñimiento espasmódico.',
                    'Útil en migrañas digestivas matutinas y periodos de estrés laboral intenso.'
                ]
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo principal:</span> Sistema Digestivo y Sistema Nervioso Central.',
                    '<span class="font-bold text-body">Mecanismo:</span> Regulación de la hipersensibilidad de las transmisiones nerviosas.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'Disolver 5 glóbulos bajo la lengua, 3 veces al día.',
                    'Fase crónica: Mantener la dosis durante 3 semanas.'
                ]
            }
        ]
    },
    {
        id: 'arnica-montana',
        name: 'Arnica montana',
        potency: 'D6',
        scientificName: 'Arnica montana L.',
        origin: 'Origen vegetal',
        shortDesc: 'Alivio inmediato para traumatismos, contusiones y dolores musculares derivados de sobreesfuerzo físico.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Locomotor', 'Cardiovascular'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Tratamiento de traumatismos, contusiones y dolores musculares.',
                    'Coadyuvante en la recuperación post-operatoria.'
                ]
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo principal:</span> Sistema Muscular y Capilares sanguíneos.',
                    '<span class="font-bold text-body">Acción:</span> Hemostático y antiinflamatorio.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'En fase aguda, 5 glóbulos cada 30 minutos durante las primeras 2 horas.',
                    'Luego continuar con 5 glóbulos, 3 veces al día.'
                ]
            }
        ]
    },
    {
        id: 'ignatia-amara',
        name: 'Ignatia amara',
        potency: 'D12',
        scientificName: 'Strychnos ignatii',
        origin: 'Origen vegetal',
        shortDesc: 'Solución para trastornos emocionales agudos, ansiedad con espasmos físicos y labilidad afectiva.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Nervioso'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Trastornos emocionales, ansiedad con espasmos y labilidad afectiva.',
                    'Sensación de nudo en la garganta y suspiros frecuentes.'
                ]
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo principal:</span> Sistema Nervioso (Eje cerebroespinal).',
                    '<span class="font-bold text-body">Mecanismo:</span> Modulador de la respuesta ante el estrés emocional.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'Disolver 5 glóbulos alejado de las comidas principales.',
                    'Preferiblemente administrar al atardecer.'
                ]
            }
        ]
    },
    {
        id: 'pulsatilla',
        name: 'Pulsatilla',
        potency: 'D6',
        scientificName: 'Anemone pulsatilla',
        origin: 'Origen vegetal',
        shortDesc: 'Medicamento para afecciones respiratorias con secreciones blandas y síntomas cambiantes.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Respiratorio', 'Cardiovascular'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Afecciones de mucosas con secreciones blandas.',
                    'Útil en trastornos venosos y congestión pasiva.'
                ]
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo principal:</span> Mucosas y Sistema Venoso.',
                    '<span class="font-bold text-body">Acción:</span> Descongestionante y regulador hormonal.'
                ]
            }
        ]
    },
    {
        id: 'aconitum',
        name: 'Aconitum napellus',
        potency: 'D6',
        scientificName: 'Aconitum napellus',
        origin: 'Origen vegetal',
        shortDesc: 'Intervención de choque ante procesos febriles bruscos tras exposición al frío seco.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Cardiovascular', 'Nervioso'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Procesos febriles de aparición repentina y angustia aguda.',
                    'Primer medicamento ante síntomas de gripe.'
                ]
            }
        ]
    },
    {
        id: 'belladonna',
        name: 'Belladonna',
        potency: 'D4',
        scientificName: 'Atropa belladonna',
        origin: 'Origen vegetal',
        shortDesc: 'Indicada en estados inflamatorios agudos con calor local, rubor y dolor pulsátil.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Respiratorio'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Inflamaciones agudas, rubor y calor.',
                    'Tratamiento de amigdalitis aguda y otitis.'
                ]
            }
        ]
    },
    {
        id: 'gelsemium',
        name: 'Gelsemium',
        potency: 'D12',
        scientificName: 'Gelsemium sempervirens',
        origin: 'Origen vegetal',
        shortDesc: 'Auxiliar en estados gripales con gran postración física y ansiedad anticipatoria.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Nervioso'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Estados gripales con postración y temblores.',
                    'Ansiedad anticipatoria por eventos estresantes.'
                ]
            }
        ]
    },
    {
        id: 'rescue-remedy',
        name: 'Rescue Remedy',
        potency: 'Bach',
        scientificName: 'Combinado Floral',
        origin: 'Esencias florales',
        shortDesc: 'Fórmula de rescate para situaciones de crisis emocional, shock o estrés agudo.',
        tags: {
            terapia: 'Terapia floral',
            sistema: ['Nervioso'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Momentos de pánico, estrés elevado o noticias impactantes.',
                    'Estabilizador emocional inmediato.'
                ]
            }
        ]
    },
    {
        id: 'zinc-oligoelemento',
        name: 'Zinc-Nic-Co',
        potency: 'Oligo',
        scientificName: 'Oligoelemento',
        origin: 'Mineral',
        shortDesc: 'Regulador enzimático para el equilibrio del sistema nervioso y metabólico.',
        tags: {
            terapia: 'Oligoelementos',
            sistema: ['Nervioso'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Disfunciones metabólicas menores.',
                    'Apoyo en fatiga nerviosa y estrés.'
                ]
            }
        ]
    },
    {
        id: 'girasol-esencia',
        name: 'Girasol (Helianthus)',
        potency: 'Esencia',
        scientificName: 'Helianthus annuus',
        origin: 'Origen vegetal',
        shortDesc: 'Esencia floral para el equilibrio de la identidad y la armonía digestiva.',
        tags: {
            terapia: 'Terapia floral',
            sistema: ['Digestivo'],
            forma: 'Tabletas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Problemas de auto-percepción.',
                    'Coadyuvante en molestias digestivas por origen nervioso.'
                ]
            }
        ]
    },
    {
        id: 'arnica-spray',
        name: 'Arnica Spray',
        potency: 'D2',
        scientificName: 'Arnica montana L.',
        origin: 'Origen vegetal',
        shortDesc: 'Formato práctico para aplicación tópica inmediata en golpes y dolores musculares.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Locomotor'],
            forma: 'Spray'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Contusiones deportivas y dolores localizados.',
                    'Rápida absorción sin contacto directo.'
                ]
            }
        ]
    },
    {
        id: 'calendula-crema',
        name: 'Calendula Crema',
        potency: 'MT',
        scientificName: 'Calendula officinalis',
        origin: 'Origen vegetal',
        shortDesc: 'Protección y cicatrización de tejidos blandos con base cremosa hidratante.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Locomotor'],
            forma: 'Crema'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Cicatrización de heridas superficiales.',
                    'Dermatitis y alivio de inflamación externa.'
                ]
            }
        ]
    }
];
