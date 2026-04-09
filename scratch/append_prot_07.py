import os

csv_content = """prot_061,COLITIS,Senna; Fibaloe Líquida,Alumina,Colocynthis; Nux vómica,Cuprum k7 MH,,activo
prot_062,COMEDONES,Kalium bromatum,,Graphites; Sulphur,Manganeso k7 MH,Salvia Crema o Gel; Plata Coloidal spray,activo
prot_063,CONDILOMA,Thuja crema; Thuja,Juglans,Scrophularia,Magnesio k7 MH,,activo
prot_064,CONJUNTIVITIS,Euphrasia,,Baptisia; Echinacea,Iodo k7 MH,,activo
prot_065,CONVALECENCIA,Stanum; Sales de schussler,,Cúrcuma elíxir; Phosphoricum acidum,Aurum k7 MH,,activo
prot_066,CONVULSIONES,Cicuta,Aurum met,,Cobre k7 MH,,activo
prot_067,COSTRA LÁCTEA,Thallium vial tópico,Thallium,Graphites,Manganeso k7 MH,Plata Coloidal spray,activo
prot_068,COXALGIAS,Árnica; Kalmia; Harpagophytum cápsulas,Colchicum,Apis,Manganeso k7 MH,Kalmia gel; Cannabis crema,activo
prot_069,CRECIMIENTO,Calcium phosphoricum; Ruta; Multivitamínico,Cinnamomum o Chimaphila,Conium,,,activo
prot_070,DEBILIDAD,Phosphoricum acidum; Ruta Elíxir,,Zingiber; Ginkgo bil.; Stanum cápsulas,,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 07 de Protocolos (061-070) anexado correctamente.')
