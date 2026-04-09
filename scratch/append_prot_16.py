import os

csv_content = """prot_151,MASTITIS,Baptisia,Juglans,Árnica; Echinacea; Belladona,Iodo k7 MH,,activo
prot_152,MENINGITIS,Vaccinium,Juglans,Echinacea; Galium,Iodo k7 MH,,activo
prot_153,MENOPAUSIA,Angélica,Cinnamomum,Ignatia,Zinc k7 MH,,activo
prot_154,MENORRAGIA METRORAGIA,,Cinnamomum,Lilium; Crocus,Hierro k7 MH,,activo
prot_155,MIALGIAS,Magnesia,Colchicum,Thuja; Rhododendron,Manganeso k7 MH,Árnica Crema o Gel; Cannabis crema,activo
prot_156,MICOSIS,Mezereum; Sepia spray,,Echinacea,Manganeso k7 MH,Urtica Gel o Crema; Plata Coloidal,activo
prot_157,MIEDOS,Gelsemium,Aurum met; Conium,Hypericum,Magnesio k7 MH,,activo
prot_158,MIGRAÑA,Iris,,Ignatia; Apis,Cobre k7 MH,,activo
prot_159,MIOMA UTERINO,Viburnum; Lilium; Lilium óvulos vaginales,Cinnamomum,,Magnesio k7 MH,,activo
prot_160,MONONUCLEOSIS,Vincetoxicum,Juglans,,Iodo k7 MH,Plata Coloidal,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 16 de Protocolos (151-160) anexado correctamente.')
