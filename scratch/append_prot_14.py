import os

csv_content = """prot_131,HIPOCONDRIA,Gelsemium,Aurum met,,,activo
prot_132,HIPOTENSIÓN,Crataegus; Elíxir de Cúrcuma,Cactus,Glonoinum,Hierro k7 MH,,activo
prot_133,HISTERIA,Gelsemium,Aurum met,Ignatia,Magnesio k7 MH,,activo
prot_134,HONGOS,Sepia spray,,Pulsatilla; Passiflora; Conium,Manganeso k7 MH,Echinacea Gel o Crema; Plata Coloidal spray,activo
prot_135,ICTERICIA,Chelidonium; Elíxir de Cúrcuma,,Taraxacum,Cuprum k7 MH,,activo
prot_136,IMPACIENCIA,Argentum nitricum 200CH,,,Magnesio k7 MH,,activo
prot_137,IMPOTENCIA,Yohimbinum; Damiana; Agnus; Caladium,,,Aurum k7 MH,,activo
prot_138,INAPETENCIA,Medicago,,Gentiana,Zinc k7 MH,,activo
prot_139,INCONTINENCIA URINARIA,Berberis,Equisetum; Thallium,Echinacea,Zinc k7 MH,,activo
prot_140,INDIGESTIÓN,Carbón vegetal; Elíxir de Cúrcuma,Alumina,Colocynthis,Cuprum k7 MH,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 14 de Protocolos (131-140) anexado correctamente.')
