import os

csv_content = """prot_171,OXIGENACIÓN CEREBRAL,Ginkgo biloba; Ruta Elíxir; Elíxir de Cúrcuma,,Ruta,Magnesio k7 MH,,activo
prot_172,OXIURIASIS,Teucrium,Alumina,Rhamnus Purshiana; Nux vómica; Elíxir de Cúrcuma,Cuprum k7 MH,,activo
prot_173,PANCREATITIS,Leptandra; Elíxir de Cúrcuma,Alumina,Chelidonium,Cuprum k7 MH,,activo
prot_174,PÁNICO,Gelsemium,Aurum met,Hypericum; Ignatia,Magnesio k7 MH,,activo
prot_175,PARÁLISIS,Plumbum,Aurum met,Cicuta; Magnesia; Stanum cápsulas o spray,Magnesio k7 MH,,activo
prot_176,PÁRKINSON,Marrubium; Elíxir de Cúrcuma,Aurum met,Plumbum; Viscum; Stanum,Cobre k7 MH,,activo
prot_177,PATOLOGÍAS CRÓNICO DEGENERATIVAS,Marrubium; Elíxir de Cúrcuma,,Stanum,Magnesio k7 MH,,activo
prot_178,PICADURAS,Apis D4 D6 D12,,,Manganeso k7 MH,Caléndula Crema o Gel; Plata coloidal spray,activo
prot_179,PIE DE ATLETA,Pulsatilla,,Graphites,Manganeso k7 MH,Propolis spray; Plata Coloidal,activo
prot_180,PIEL - ENFERMEDADES,Mezereum; Graphites; Sulphur; Kalium Bromatum,Thallium,,Manganeso k7 MH,Árnica Crema o Gel; Caléndula Crema o Gel; Carica papaya Crema o Gel; Salvia Crema o Gel; Aesculus gel; Graphites crema o gel; Thallium vial tópico,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 18 de Protocolos (171-180) anexado correctamente.')
