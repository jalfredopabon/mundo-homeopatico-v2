import os

csv_content = """prot_051,CIÁTICA,Magnesia phos,Colchicum,Rhododendron; Árnica,Cobre k7 MH,Cannabis crema,activo
prot_052,CICATRICES,,,,,,Caléndula Crema o Gel; Hydrocotyle crema,activo
prot_053,CIRCULACIÓN PERIFÉRICA,Glonoinum,Cactus,Cúrcuma elíxir; Baryta,Hierro k7 MH,,activo
prot_054,CIRCULACIÓN VENOSA,Hamamelis; Cúrcuma elíxir,Cactus,Ginkgo biloba,Hierro k7 MH,Aesculus Gel; Hamamelis crema o gel,activo
prot_055,CIRROSIS HEPÁTICA,Chelidonium; Conium,Alumina,Cúrcuma elíxir,Cuprum k7 MH,,activo
prot_056,CISTITIS,Hydrangea,Equisetum,Echinacea; Berberis,Iodo k7 MH,,activo
prot_057,CLAUSTROFOBIA,Argentum nitricum 200CH; Gelsemium,Aurum met,Ignatia,Magnesio k7 MH,,activo
prot_058,COLÁGENO ESTIMULACIÓN,Silícea cápsulas,,Zingiber,Zinc k7 MH,,activo
prot_059,COLELITIASIS,Chelidonium; Cúrcuma elíxir,,Baptisia; Echinacea,Cuprum k7 MH,,activo
prot_060,CÓLICO,Colocynthis; Fibaloe,Alumina,Senna,Cuprum k7 MH,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 06 de Protocolos (051-060) anexado correctamente.')
