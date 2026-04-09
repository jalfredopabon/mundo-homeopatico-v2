import os

csv_content = """prot_101,ESCROFULOSIS,Juglans,,Scrophularia,Cobre k7 MH,,activo
prot_102,ESGUINCE,Árnica,,Rhododendron,,Árnica Crema o Gel; Cannabis crema; Cápsicum ungüento,activo
prot_103,ESTREÑIMIENTO,Rhamnus Purshiana; Fibaloe,Alumina,Senna; Taraxacum,Cuprum k7 MH,,activo
prot_104,ESTRÉS,Ignatia; Conium,Aurum met,,Cobre k7 MH,,activo
prot_105,FARINGITIS,Borax; Euphatorium,,Echinacea; Baptisia,Iodo k7 MH,Plata Coloidal spray (Gárgaras),activo
prot_106,FIBROMA DE SENO,,,Scrophularia,Magnesio k7 MH,,activo
prot_107,FIEBRE,Baptisia; Belladona,,Echinacea; Borax,Iodo k7 MH,,activo
prot_108,FISURA ANAL,Aesculus,,Graphites; Passiflora,,Aesculus óvulos o Gel,activo
prot_109,FLATULENCIA,Carbo Vegetabilis,Alumina,Nux vómica,Cuprum k7 MH,,activo
prot_110,FRIGIDEZ,Origanum,,Caladium,Aurum k7 MH,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 11 de Protocolos (101-110) anexado correctamente.')
