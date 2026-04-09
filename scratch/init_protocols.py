import os

header = "id_protocolo,patologia,principales,sistema,complementarios,oligoelementos,topicos,estado"

csv_content = """prot_001,ABSCESOS,Baptisia; Borax,Juglans,Echinacea,Iodo k7 MH,Árnica Crema o Gel,activo
prot_002,ACIDEZ GÁSTRICA,,Alumina,Abies; Nux vómica,,,activo
prot_003,ÁCIDO ÚRICO,Benzoicum acidum,,Berberis,Magnesio k7 MH,,activo
prot_004,ACNÉ ROSÁCEA,Kalium bromatum,Cinnamomum o Chimaphila,Graphites; Chelidonium,Zinc k7 MH,Salvia Crema o Gel; Echinacea gel,activo
prot_005,ACNÉ VULGAR,Kalium bromatum,Cinnamomum o Chimaphila,Graphites; Árnica,Iodo k7 MH,Salvia Crema o Gel; Echinacea gel; Plata coloidal,activo
prot_006,ACROCIANOSIS,Vipera,Juglans,Hamamelis,Manganeso k7 MH,Aesculus gel,activo
prot_007,ADELGAZAMIENTO,Gentiana,,Medicago; Conium; MHPHOR,Magnesio k7 MH,,activo
prot_008,ADENITIS,Juglans,,Scrophularia,Zinc k7 MH,Árnica Crema o Gel; Cannabis crema,activo
prot_009,ADENOMA PROSTÁTICO,Sabal,Chimaphila,Árnica,Zinc k7 MH,Árnica Crema o Gel,activo
prot_010,ADENOPATÍAS,Juglans,,Baptisia,Iodo k7 MH,,activo"""

target_file = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_file, 'w', encoding='utf-8', newline='') as f:
    f.write(header + '\n' + csv_content.strip())

print('Archivo vademecum_protocolos.csv creado con los primeros 10 protocolos.')
