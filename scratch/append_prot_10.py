import os

csv_content = """prot_091,EDEMA,Hydrangea,Juglans,Sulphur,Manganeso k7 MH,Árnica Crema o Gel,activo
prot_092,ENDOCARDITIS,Cactus,,Árnica,Hierro k7 MH,,activo
prot_093,ENDOMETRITIS,Caléndula óvulos vaginales; Mercurius; Árnica,,Viburnum; Lilium,Iodo k7 MH,,activo
prot_094,ENFERMEDAD CRÓNICO DEGENERATIVA,Elíxir de Cúrcuma; Stanum cápsulas o spray,,Viscum; Phosporicum Acidum,Magnesio k7 MH,,activo
prot_095,ENFISEMA PULMONAR,Ipeca,Kalium bich,Árnica; Echinacea,Manganeso k7 MH,,activo
prot_096,ENTERITIS,Vincetoxicum; Elíxir de Cúrcuma,Alumina,Colocynthis; Chininum,Cuprum k7 MH,,activo
prot_097,EPILEPSIA,Cicuta,,Ginkgo biloba,Cobre k7 MH,,activo
prot_098,ERISIPELA,Vaccinium,,Baptisia,Iodo k7 MH,Urtica Gel o Crema; Plata Coloidal spray; Hydrocotile,activo
prot_099,ESCARLATINA,Vaccinium; Plata Coloidal tópica y oral,,Baptisia,Iodo k7 MH,,activo
prot_100,ESCLEROSIS,Conium; Elíxir de Cúrcuma,,Viscum; Phosporicum acidum,Iodo k7 MH,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 10 de Protocolos (091-100) anexado correctamente.')
