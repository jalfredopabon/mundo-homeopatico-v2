import os

csv_content = """prot_021,AMENORREA,Cinnamomum,,Angélica,Zinc k7 MH,,activo
prot_022,AMIGDALITIS,Borax; Baptisia; Belladona,Juglans,Echinacea; Galium,Iodo k7 MH,,activo
prot_023,ANDROPAUSIA,Damiana,Chimaphila,Agnus,Zinc k7 MH,,activo
prot_024,ANEMIA,Medicago sativum; Conium,,Sales de Schussler; Calcium phosphoricum,Hierro k7 MH,,activo
prot_025,ANEXITIS,Baptisia; Árnica; Lilium Óvulos vaginales; Caléndula Óvulos vaginales,Cinnamomum,Echinacea,Iodo k7 MH,,activo
prot_026,ANGINA DE PECHO,Cactus; Cúrcuma elíxir,,Baryta; Ignatia,Hierro k7 MH,,activo
prot_027,ANOREXIA,Gentiana,,Selenium; Medicago,Magnesio k7 MH,,activo
prot_028,ANSIEDAD,Selenium; Tratamiento Sist. nerviso,Aurum met,Ignatia,Magnesio k7 MH,,activo
prot_029,ANTIBIÓTICO,Echinacea; Baptisia,Juglans,Galium; Plata Coloidal,Iodo k7 MH,Echinacea crema o gel,activo
prot_030,APOPLEJÍA,Conium; Curcuma elíxir; Stanum cápsulas o spray,Aurum met,Ruta elixir; Zingiber; Phosphoricum acidum,Magnesio k7 MH,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 03 de Protocolos (021-030) anexado correctamente.')
