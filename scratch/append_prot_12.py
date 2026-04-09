import os

csv_content = """prot_111,FRACTURAS,Árnica,,Calcium phosphoricum,Phosphorus k7 MH,Árnica Crema o Gel,activo
prot_112,FURUNCULOSIS,Vaccinium,Juglans,Árnica,Iodo k7 MH,Caléndula Crema o Gel; Echinacea crema; Plata Coloidal spray,activo
prot_113,GANGRENA,Vipera,Juglans,Mezereum,Iodo k7 MH,Echinacea crema; Plata Coloidal spray,activo
prot_114,GASTRITIS,Abies; Fibaloe; Plata Coloidal oral,,Nux vómica,Cuprum k7 MH,,activo
prot_115,GASTROENTERITIS,Chininum; Baptisia; Plata Coloidal oral,,Elíxir de Cúrcuma,Cuprum k7 MH,,activo
prot_116,GINGIVITIS,Árnica; Echinacea,,,Iodo k7 MH,Plata Coloidal oral,activo
prot_117,GOTA,Benzoicum acidum,Juglans,Berberis,Magnesio k7 MH,Árnica Crema o Gel,activo
prot_118,HALITOSIS,Chelidonium,Alumina,Carbo vegetabilis; Plata Coloidal,Cuprum k7 MH,,activo
prot_119,GRIPE,Allium cepa ótico; Bryonia,Juglans,Aconitum,,,activo
prot_120,HELMINTIASIS,Teucrium,Alumina,Elíxir de Cúrcuma; Rhamnus Purshiana,Cuprum k7 MH,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 12 de Protocolos (111-120) anexado correctamente.')
