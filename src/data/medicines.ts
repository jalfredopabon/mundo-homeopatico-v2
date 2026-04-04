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
    },
    {
        id: 'hypericum',
        name: 'Hypericum',
        potency: 'D12',
        scientificName: 'Hypericum perforatum',
        origin: 'Origen vegetal',
        shortDesc: 'Específico para dolores en terminaciones nerviosas y traumatismos en zonas ricamente inervadas.',
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
                    'Dolores por aplastamiento de dedos o lesiones en columna.',
                    'Coadyuvante en neuralgias post-herpéticas.'
                ]
            }
        ]
    },
    {
        id: 'rhus-tox',
        name: 'Rhus tox',
        potency: 'D6',
        scientificName: 'Rhus toxicodendron',
        origin: 'Origen vegetal',
        shortDesc: 'Tratamiento para Dolores que mejoran con el movimiento continuo y empeoran con el reposo.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Locomotor'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Reumatismo articular y dolores musculares por humedad.',
                    'Esguinces y distensiones ligamentosas.'
                ]
            }
        ]
    },
    {
        id: 'bryonia',
        name: 'Bryonia',
        potency: 'D6',
        scientificName: 'Bryonia alba',
        origin: 'Origen vegetal',
        shortDesc: 'Indicada en dolores punzantes que empeoran con el más mínimo movimiento y mejoran con la presión fuerte.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Locomotor', 'Respiratorio'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Pleuresía y tos seca dolorosa.',
                    'Inflamación articular con derrame.'
                ]
            }
        ]
    },
    {
        id: 'apis',
        name: 'Apis mellifica',
        potency: 'D8',
        scientificName: 'Apis mellifica',
        origin: 'Animal',
        shortDesc: 'Acción rápida en edemas rosáceos, picaduras de insectos y dolores ardientes que mejoran con frío.',
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
                    'Edemas repentinos en párpados o garganta.',
                    'Reacciones alérgicas agudas con hinchazón.'
                ]
            }
        ]
    },
    {
        id: 'hepar-sulphur',
        name: 'Hepar sulphur',
        potency: 'D12',
        scientificName: 'Hepar sulphuris calcareum',
        origin: 'Mineral',
        shortDesc: 'Regulador de procesos supurativos y sensibilidad extrema al frío y al contacto.',
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
                    'Infecciones agudas de garganta con sensación de espina.',
                    'Abscesos y procesos purulentos incipientes.'
                ]
            }
        ]
    },
    {
        id: 'chamomilla',
        name: 'Chamomilla',
        potency: 'D6',
        scientificName: 'Matricaria chamomilla',
        origin: 'Origen vegetal',
        shortDesc: 'Medicamento pediátrico por excelencia para la irritabilidad y el dolor durante la dentición.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Nervioso', 'Digestivo'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Dolores de muelas infantiles e irritabilidad extrema.',
                    'Cólicos flatulentos en bebés.'
                ]
            }
        ]
    },
    {
        id: 'nux-moschata',
        name: 'Nux moschata',
        potency: 'D6',
        scientificName: 'Myristica fragrans',
        origin: 'Origen vegetal',
        shortDesc: 'Tratamiento para la somnolencia excesiva, sequedad de mucosas y distensión abdominal.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Nervioso', 'Digestivo'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Somnolencia irresistible en periodos digestivos.',
                    'Sequedad extrema de boca sin sed.'
                ]
            }
        ]
    },
    {
        id: 'thuja',
        name: 'Thuja occidentalis',
        potency: 'D12',
        scientificName: 'Thuja occidentalis L.',
        origin: 'Origen vegetal',
        shortDesc: 'Medicamento de terreno para afecciones cutáneas proliferativas (verrugas) y detoxificación post-vacunal.',
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
                    'Tratamiento de verrugas y papilomas.',
                    'Limpieza del terreno sicótico orgánico.'
                ]
            }
        ]
    },
    {
        id: 'berberis',
        name: 'Berberis vulgaris',
        potency: 'D4',
        scientificName: 'Berberis vulgaris',
        origin: 'Origen vegetal',
        shortDesc: 'Drenador renal y hepático, eficaz en dolores punzantes que irradian desde la zona lumbar.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Digestivo'],
            forma: 'Gotas'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Coadyuvante en litiasis renal y biliar.',
                    'Dolores lumbares de origen urinario.'
                ]
            }
        ]
    },
    {
        id: 'chamomilla-crema',
        name: 'Chamomilla Crema',
        potency: 'MT',
        scientificName: 'Matricaria chamomilla',
        origin: 'Origen vegetal',
        shortDesc: 'Calmante tópico para pieles sensibles, irritaciones infantiles y rozaduras.',
        tags: {
            terapia: 'Homeopatía compleja',
            sistema: ['Digestivo'],
            forma: 'Crema'
        },
        sections: [
            {
                title: 'Indicaciones clínicas',
                icon: 'task-list',
                items: [
                    'Alivio de prurito y enrojecimiento cutáneo.',
                    'Cuidado de la piel del bebé.'
                ]
            }
        ]
    },
    {
        id: 'euphrasia',
        name: 'Euphrasia',
        potency: 'D4',
        scientificName: 'Euphrasia officinalis',
        origin: 'Origen vegetal',
        shortDesc: 'Acción específica sobre la mucosa ocular, aliviando el lagrimeo irritante y la fotofobia.',
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
                    'Conjuntivitis alérgica e infecciosa incipiente.',
                    'Fatiga ocular por pantallas.'
                ]
            }
        ]
    },
    {
        id: 'allium-cepa',
        name: 'Allium cepa',
        potency: 'D6',
        scientificName: 'Allium cepa L.',
        origin: 'Origen vegetal',
        shortDesc: 'Tratamiento para el resfriado común con lagrimeo suave y secreción nasal acuosa irritante.',
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
                    'Rinitis alérgica estacional.',
                    'Resfriados con estornudos frecuentes.'
                ]
            }
        ]
    }
];
