import os

csv_content = """prot_081,DIGESTIÓN IRREGULAR,Carbo Vegetabilis; Elíxir de Cúrcuma,Alumina,Chininum,Cuprum k7 MH,,activo
prot_082,DISLIPIDEMIA,Cholesterolum; Elíxir de Cúrcuma,,Glonoinum,Hierro k7 MH,,activo
prot_083,DISMENORREA,Cinnamomum,,Crocus,Zinc k7 MH,,activo
prot_084,DISPEPSIA,Alumina; Elíxir de Cúrcuma,Alumina,Carbo Vegetabilis,Cuprum k7 MH,,activo
prot_085,DISURIA,Hydrangea,Equisetum,Echinacea,MH OLI D3,,activo
prot_086,DIVERTICULITIS,Nux vómica,,Viscum,Cuprum k7 MH,,activo
prot_087,DOLOR,Apis; Árnica,,Magnesia,Silicea K7,Árnica Crema o Gel; Cápsicum ungüento,activo
prot_088,DOLOR LUMBAR,Rhododendron,Colchicum,Magnesia; Apis,Cobre k7 MH,Kalmia gel; Cápsicum ungüento,activo
prot_089,DRENAJE LINFÁTICO,Juglans,,Scrophularia,Hierro k7 MH,,activo
prot_090,DRENADOR GENERAL,RUMEX MH; tratamiento Detox,,,,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 09 de Protocolos (081-090) anexado correctamente.')
