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
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'Disolver 5 glóbulos alejado de las comidas principales.',
                    'Dosis de mantenimiento: 3 veces al día o según criterio médico.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo principal:</span> Sistema Cardiovascular y Nervioso.',
                    '<span class="font-bold text-body">Mecanismo:</span> Modulación de la respuesta inflamatoria aguda.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'En fase aguda, 5 unidades cada 15-30 minutos durante la primera hora.',
                    'Luego espaciar las aplicaciones según mejoría.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo principal:</span> Sistema Respiratorio y Mucosas.',
                    '<span class="font-bold text-body">Acción:</span> Antiinflamatorio y antiespasmódico agudo.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'Administrar 5 unidades cada 2 horas en fase activa de inflamación.',
                    'Consultar dosis pediátrica con su especialista médico.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo principal:</span> Sistema Nervioso y Motor.',
                    '<span class="font-bold text-body">Acción:</span> Sedante suave y regulador de la fatiga gripal.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'Disolver 5 unidades bajo la lengua en situaciones de estrés.',
                    'Fase gripal: 3-4 tomas diarias según intensidad de la postración.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Composición:</span> Combinado de 5 esencias florales de Bach.',
                    '<span class="font-bold text-body">Efecto:</span> Restablecimiento del equilibrio somático post-shock.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    '4 gotas directas en la lengua o disueltas en un poco de agua.',
                    'Repetir según necesidad hasta sentir alivio emocional.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Componentes:</span> Zn, Ni, Co en dilución biofisiológica.',
                    '<span class="font-bold text-body">Función:</span> Catalizador enzimático del eje suprarrenal.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    '1-2 ampollas o dosis equivalentes en ayunas.',
                    'Mantener en boca 1 minuto antes de ingerir para absorción mucosa.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Propiedades:</span> Armonizador de la identidad solar-plexo.',
                    '<span class="font-bold text-body">Acción:</span> Equilibrio del eje emocional-entérico.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    '2 tabletas o 4 gotas antes de las situaciones de estrés.',
                    'Uso prolongado según necesidades evolutivas del paciente.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Formato:</span> Solución hidroalcohólica de Arnica montana.',
                    '<span class="font-bold text-body">Efecto:</span> Altamente anti-equimótico y analgésico tópico.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'Aplicar 2-3 atomizaciones sobre la zona afectada.',
                    'No aplicar sobre heridas abiertas o mucosas.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Activo:</span> Tintura madre de Calendula officinalis.',
                    '<span class="font-bold text-body">Labor:</span> Regenerador epitelial y antiséptico natural.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'Extender una capa fina sobre la piel limpia.',
                    'Repetir la aplicación 2 a 3 veces al día según evolución.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo:</span> Terminaciones nerviosas periféricas.',
                    '<span class="font-bold text-body">Acción:</span> Reparador del tejido nervioso traumatizado.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    '5 gotas cada hora en situaciones de dolor agudo neurálgico.',
                    'Reducir frecuencia tras la remisión de los síntomas.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo:</span> Tejidos fibrosos y tendinosos.',
                    '<span class="font-bold text-body">Mejoría:</span> Con el movimiento continuo y calor.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    '5 gotas, 3 veces al día para procesos crónicos.',
                    'En crisis reumáticas, aumentar gradualmente la frecuencia.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo principal:</span> Serosas y Membranas sinoviales.',
                    '<span class="font-bold text-body">Acción:</span> Reducción de la sequedad y el dolor punzante.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'Administrar 5 unidades cada 4 horas.',
                    'Imprenscindible reposo absoluto del órgano afectado.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo:</span> Tejido celular subcutáneo y riñones.',
                    '<span class="font-bold text-body">Efecto:</span> Desinflamatorio rápido del edema rosáceo.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    '5 glóbulos cada 15 minutos en reacciones alérgicas leves.',
                    'Reducir a 3 veces al día al disminuir la hinchazón.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo:</span> Sistema linfático y mucosas respiratorias.',
                    '<span class="font-bold text-body">Mecanismo:</span> Control de la supuración aguda.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'Consultar potencia (D6/D12) para favorecer o detener supuración.',
                    'Dosis habitual: 5 unidades, 3 veces al día.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo:</span> Sistema Nervioso Periférico.',
                    '<span class="font-bold text-body">Efecto:</span> Analgésico y tranquilizante pediátrico.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    '5 glóbulos disueltos en un poco de agua o directos.',
                    'Administrar ante crisis de llanto o dolor agudo.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo:</span> Sistema Digestivo y Centro del sueño.',
                    '<span class="font-bold text-body">Mecanismo:</span> Estimulante de las secreciones mucosas.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    '5 unidades, 2 veces al día antes de las comidas.',
                    'Evitar dosis nocturnas si hay hipersensibilidad.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Acción:</span> Antiséptica profunda y anti-proliferativa.',
                    '<span class="font-bold text-body">Labor:</span> Modificador del terreno crónico profundo.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    '5 glóbulos, 1 vez al día (preferiblemente mañana).',
                    'Tratamiento a largo plazo (mínimo 3 meses).'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo:</span> Tracto urinario y conductos biliares.',
                    '<span class="font-bold text-body">Acción:</span> Drenador y antiespasmódico de vías excretoras.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    '10 gotas en medio vaso de agua, 3 veces al día.',
                    'Aumentar ingesta de líquidos durante el tratamiento.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Presentación:</span> Crema base de alta absorción.',
                    '<span class="font-bold text-body">Efecto:</span> Calmante dérmico inmediato.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'Aplicar tópicamente sobre el área irritada.',
                    'Uso seguro en lactantes y pieles sensibles.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo:</span> Mucosa ocular y lagrimal.',
                    '<span class="font-bold text-body">Acción:</span> Antiinflamatorio ocular específico.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    'Administrar 5 unidades vía oral o según prescripción.',
                    'No instilar directamente en el ojo si es dilución oral.'
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
            },
            {
                title: 'Perfil farmacológico',
                icon: 'gotas',
                items: [
                    '<span class="font-bold text-body">Tropismo:</span> Mucosa nasal y conjuntival.',
                    '<span class="font-bold text-body">Acción:</span> Reducción de la rinorrea acuosa irritante.'
                ]
            },
            {
                title: 'Protocolo de posología',
                icon: 'edit',
                items: [
                    '5 glóbulos ante los primeros ataques de estornudos.',
                    'Repetir 3-5 veces al día durante el periodo alérgico.'
                ]
            }
        ]
    }
];
