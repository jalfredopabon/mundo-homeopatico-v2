import os

csv_content = """prot_141,INFECCIONES BACTERIANAS,Vaccinium; Echinacea,Juglans,Plata Coloidal,Iodo k7 MH,,activo
prot_142,INFLAMACIONES LOCALIZADAS,Árnica; Apis,,,Silicea K7,Crema o Gel de Árnica; Cannabis crema; Cápsicum ungüento,activo
prot_143,INSOMNIO,Melissa,Aurum met,,Magnesio k7 MH,,activo
prot_144,INSUFICIENCIA CARDÍACA,Cactus; Carduus; Elíxir de Cúrcuma,,Ignatia,Hierro k7 MH,,activo
prot_145,INTERTRIGO,Mezereum,,Graphites,Manganeso k7 MH,Sepia spray; Plata Coloidal,activo
prot_146,INTOXICACIÓN,Nux vómica,,Carbón vegetal,Cuprum k7 MH,,activo
prot_147,IRRITABILIDAD NERVIOSA,Ignatia,Aurum met,Hypericum; Conium,Magnesio k7 MH,,activo
prot_148,LARINGITIS,Borax; Euphatorium,Juglans,Vincetoxicum; Baptisia,Iodo k7 MH,Plata Coloidal spray (Gárgaras),activo
prot_149,LEUCORREA,Lilium óvulos vaginales,Cinnamomum,Crocus,Iodo k7 MH,,activo
prot_150,MAREOS,Petroleum,,Crataegus,Zinc k7 MH,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 15 de Protocolos (141-150) anexado correctamente.')
