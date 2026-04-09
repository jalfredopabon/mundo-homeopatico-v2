import os

csv_content = """prot_071,DEFENSAS,Manganum; Elíxir de Cúrcuma; Conium; Echinacea; Galium; Ascorbicum acidum,,,,,,activo
prot_072,DEFORMACIONES ÓSEAS,Calcium phosphoricum,Colchicum,Silícea cápsulas,Phosphorus k7 MH,,activo
prot_073,DEPRESIÓN,Zincum met,Aurum met,Hypericum; Conium,Aurum k7 MH,,activo
prot_074,DEPURATIVO RENAL,Hydrangea,Equisetum,Berberis; Solidago,Zinc k7 MH,,activo
prot_075,DEPURATIVO SANGUÍNEO,Juglans,,Scrophularia,Hierro k7 MH,,activo
prot_076,DERMATITIS SEBORREICA,Rosmarinus Loción capilar,,,,Plata Coloidal spray; Hydrocotile crema,activo
prot_077,DERMATITIS,Mezereum,,Graphites; Sulphur,Manganeso k7 MH,Urtica Gel o Crema; Hydrocotile crema,activo
prot_078,DESCALCIFICACIÓN,Calcium phosphoricum; Ascorbicum acidum,,Silícea cápsulas,Phosphorus k7 MH,,activo
prot_079,DIABETES,Uranium; Syzygium; Leptandra,Thallium,Viscum,Cuprum k7 MH,,activo
prot_080,DIARREA,Chininum,Alumina,Carbo veg,,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 08 de Protocolos (071-080) anexado correctamente.')
