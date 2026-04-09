import os

csv_content = """prot_161,NEFRITIS,Hydrangea,Equisetum,Árnica,Iodo k7 MH,,activo
prot_162,NEOPLASIAS,Elíxir de Cúrcuma; Scrophularia,Juglans,,Magnesio k7 MH,,activo
prot_163,NERVIOSISMO - ESTRES,Ignatia; Conium; Tratamiento sistema nervioso,Aurum met,Passiflora; Hypericum,Magnesio k7 MH,,activo
prot_164,NEUMONÍA,Ipeca; Vincetoxicum; Vaccinium,Kalium bich,Ipeca elíxir,Iodo k7 MH,,activo
prot_165,NEURALGIA,Magnesia,Colchicum,Árnica; Rhododendron,Cobre k7 MH,Cannabis crema,activo
prot_166,OBESIDAD,Fucus; tratamiento Sobrepeso,,Juglans; Taraxacum,Zinc k7 MH,Fucus Gel,activo
prot_167,ORZUELOS,Staphysagria,Juglans,Euphrasia,Iodo k7 MH,Plata coloidal spray (puede aplicarse sobre el orzuelo),activo
prot_168,OSTEOPOROSIS,Calcium phosphoricum; Calcium phosphoricum triturado; Silícea Cápsulas,,Sales de schussler,Phosphorus k7 MH,,activo
prot_169,OTITIS,Allium cepa ótico; Baptisia,,Árnica; Echinacea,Iodo k7 MH,,activo
prot_170,OVARIOS - DISFUNCIONES,Lilium,Cinnamomum,Viburnum; Crocus,Zinc k7 MH,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 17 de Protocolos (161-170) anexado correctamente.')
