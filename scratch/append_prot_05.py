import os

csv_content = """prot_041,BLEFARITIS,Euphrasia,,Sthapysagria; Echinacea,Iodo k7 MH,,activo
prot_042,BRONQUITIS,Ipeca; Elíxir de Ipeca,Kalium Bich,Bryonia; Galium,Iodo k7 MH,,activo
prot_043,CALAMBRES,Magnesia Phos,Colchicum,Cicuta,Cobre k7 MH,,activo
prot_044,CÁNCER,Conium; Stanum cápsulas o spray; Cúrcuma elíxir,Juglans,,Magnesio k7 MH,Hydrocotile crema,activo
prot_045,CANDIDIASIS,Pulsatilla; Lilium Óvulos,Cinnamomum,Viburnum,Iodo k7 MH,,activo
prot_046,CASPA,Rosmarinus Loción capilar,,,,,activo
prot_047,CATARATAS,Euphrasia,,Scrophularia; Viscum,Silicea k7 MH,,activo
prot_048,CEFALEA,Iris,,Apis,Silicea K7,,activo
prot_049,CELOS,Lachesis 200CH; Nux vómica 200CH; Staphysagria 200CH; Apis 200CH; Sepia 200CH,,,,,,activo
prot_050,CELULITIS,Centella asiática,Juglans,tratamiento Detox,Zinc k7 MH,Fucus Gel,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 05 de Protocolos (041-050) anexado correctamente.')
