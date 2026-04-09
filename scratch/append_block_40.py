import os

csv_content = """prod_391,OLIGOTERAPIA,HIERRO K7 MH,V; Mn; Co; Cu; Fe; I,Diátesis hematopoyética,,Caja x 5 viales x 10 ml; Gotas 30 ml,activo
prod_392,OLIGOTERAPIA,IODO K7 MH,Ni; Mg; Mn; Co; Cu; Zn; I; Fe; Se,Diátesis inmunológica,,Caja x 5 viales x 10 ml; Gotas 30 ml,activo
prod_393,OLIGOTERAPIA,PHOSPHORUS K7 MH,Ca; Si; Mg; Fl; P; Mn,Diátesis ósea,,Caja x 5 viales x 10 ml; Gotas 30 ml,activo
prod_394,OLIGOTERAPIA,ZINC K7 MH,Zn; Mn; Co; Ni; Br; I,Diátesis endocrina,,Caja x 5 viales x 10 ml; Gotas 30 ml,activo
prod_395,OLIGOTERAPIA,COBRE K7 MH,Ca; Mg; P; Co,Diátesis neuromiovegetativa,,Caja x 5 viales x 10 ml; Gotas 30 ml,activo
prod_396,OLIGOTERAPIA,MANGANESO K7 MH,Co; Mn; S; Cu; P; I,Diátesis dermoartroinfecciosa,,Caja x 5 viales x 10 ml; Gotas 30 ml,activo
prod_397,OLIGOTERAPIA,AURUM K7 MH,Bi; Cu; Au; Ag; P,Diátesis anérgica,,Caja x 5 viales x 10 ml; Gotas 30 ml,activo
prod_398,OLIGOTERAPIA,MAGNESIO K7 MH,Cl Mg + P (Clomag + p),Diátesis inmunoenergética,,Caja x 5 viales x 10 ml; Gotas 30 ml,activo
prod_399,OLIGOTERAPIA,CUPRUM K7 MH,Mo; Mn; K; Zn; Ni; Co; Cr,Diátesis pancreodigestiva,,Caja x 5 viales x 10 ml; Gotas 30 ml,activo
prod_400,OLIGOTERAPIA,PLATINUM K7 MH,Boro; Calcio; Phosphorus k7 MH; Cromo; Germanio; Litio; Magnesio; Manganeso; Molibdeno; Niquel; Potasio; Fosforo; Azufre; Selenio; Iodo; Zinc (Todo en D4),Oligoterapia completa,,Caja x 5 viales x 10 ml; Gotas 30 ml,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 40 (391-400) anexado correctamente.')
