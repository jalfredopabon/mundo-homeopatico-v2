import os

csv_content = """prot_201,TAQUICARDIA,Baryta; Elíxir de Cúrcuma,Cactus,Passiflora,Hierro k7 MH,,activo
prot_202,TEMORES,Gelsemium,Aurum met,Hypericum; Conium,Magnesio k7 MH,,activo
prot_203,TENDINITIS,Magnesia,Colchicum,Árnica; Rhododendron,Cobre k7 MH,Aesculus Gel; Árnica Crema o Gel; Cannabis crema; Cápsicum ungüento,activo
prot_204,TIÑA,Pulsatilla,,Graphites,Manganeso k7 MH,Propolis spray; Echinacea crema o gel; Plata Coloidal spray,activo
prot_205,TIROIDES (REGULADORES),Badiaga; Iodum,,,Cobre k7 MH,,activo
prot_206,TOS,Ipeca,Kalium Bich,Sambucus Elíxir; Ipeca Elíxir,Iodo k7 MH,,activo
prot_207,TUMORES,Thuja; Scrophularia; Tratamiento Oncológico,,Juglans,Magnesio k7 MH,,activo
prot_208,ÚLCERA GÁSTRICA,Abies; Fibaloe,Alumina,Nux vómica; Plata Coloidal spray oral,Cuprum k7 MH,,activo
prot_209,ÚLCERA VARICOSA ÚLCERA DE PIÉ DIABÉTICO,Hamamelis,Cactus,,Hierro k7 MH,Graphites crema o gel,activo
prot_210,URETRITIS,Hydrangea,Equisetum,Berberis; Baptisia,Iodo k7 MH,,activo
prot_211,URICEMIA,Benzoicum acidum,,Cholesterolum,Magnesio k7 MH,,activo
prot_212,URTICARIA,Mezereum,,Graphites; Sulphur,Manganeso k7 MH,Urtica Gel o Crema; Caléndula Crema o Gel; Plata Coloidal spray,activo
prot_213,VAGINITIS,Lilium óvulos vaginales; Viburnum,Cinnamomum,Crocus,Iodo k7 MH,,activo
prot_214,VÁRICES,Hamamelis,Cactus,Árnica; Vipera,Hierro k7 MH,Aesculus Gel,activo
prot_215,VERRUGAS,Thuja,Juglans,Scrophularia,Manganeso k7 MH,Crema de Thuja,activo
prot_216,VÉRTIGO,Petroleum,,Crataegus,Zinc k7 MH,,activo
prot_217,VIROSIS,Vincetoxicum; Elíxir de Cúrcuma,,Baptisia,Iodo k7 MH,,activo
prot_218,VITILIGO,Argentum nitricum D4; Mica D6; Saponaria D6; Sepia D6 (Magistral),,,,,,activo
prot_219,VITAMINA D (DEFICIENCIA DE),Vitex D4 MH,,,,,,activo
prot_220,VITAMINAS (DEFICIENCIA DE),MHPHOR; Elíxir de Cúrcuma,,Ruta Elíxir; Conium; NUTRIVIT4,,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque Final de Protocolos (201-220) anexado correctamente.')
print('Fase 2 de Migración (Protocolos) COMPETADA TOTALMENTE.')
