import os

csv_content = """prot_011,ADIPOSIS,Centella,,Juglans; Fucus,Zinc k7 MH,Fucus gel; Hedera gel,activo
prot_012,AGORAFOBIA,Borax; Gelsemium,Aurum met,Ignatia,Magnesio k7 MH,,activo
prot_013,AGOTAMIENTO,Phosphoricum; Conium,,Curcuma elíxir; Ruta elíxir,Aurum k7 MH,,activo
prot_014,ALBUMINURIA,Berberis,Equisetum,Hydrangea,Magnesio k7 MH,,activo
prot_015,ALCOHOLISMO,Nux Vómica 1000CH (una dosis cada 8 o 15 dias),,Chelidonium; Selenium,,,activo
prot_016,ALERGIAS DE PIEL,Sulphur,Thallium,Graphites,Manganeso k7 MH,Urtica Gel o Crema; Caléndula Crema o Gel,activo
prot_017,ALGIAS,Apis,,Árnica; Magnesia,Silicea K7; Iodo k7 MH,Árnica; Cannabis; Cápsicum,activo
prot_018,ALOPECIA,Thallium viales tópicos; Rosmarinus loción,,Psorinum; Calcium phosphoricum,Iodo k7 MH,,activo
prot_019,ALZHEIMER,Conium,Aurum met,Elíxir de Cúrcuma; Elíxir de Ruta,Aurum k7 MH,,activo
prot_020,AMEBIASIS,Teucrium; Rhamnus purshiana,Alumina,,Cuprum k7 MH,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 02 de Protocolos (011-020) anexado correctamente.')
