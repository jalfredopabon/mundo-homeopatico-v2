import os

csv_content = """prod_421,OLIGOTERAPIA,MAGNESIO,Magnesio,Disminuir el deseo de los azúcares y el drenaje del agua; además actúa en la irritabilidad; cansancio; calambres y preserva la tonicidad de la piel.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_422,OLIGOTERAPIA,MANGANESO,Manganeso,Necesario para los huesos y juega un papel importante en las funciones reproductoras.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_423,OLIGOTERAPIA,NÍQUEL,Níquel,Potencia el crecimiento y es recomendable para combatir anemias; enfermedades infecciosas y estados carenciales.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_424,OLIGOTERAPIA,POTASIO,Potasio,Favorecer los intercambios celulares e intracelulares. Equilibrio hídrico.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_425,OLIGOTERAPIA,SELENIO,Selenio,Potentísimo antioxidante. Garantiza el buen funcionamiento de los músculos; protege el sistema cardiovascular y previene cataratas.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_426,OLIGOTERAPIA,SILICIO,Silicio,Aumenta elasticidad y resistencia de huesos; previene arteriosclerosis; retrasa el envejecimiento y equilibra el sistema nervioso.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_427,OLIGOTERAPIA,SODIO,Sodio,Hidratar correctamente el organismo y actuar en la excitabilidad de los músculos.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_428,OLIGOTERAPIA,YODO,Yodo,Forma parte de las hormonas tiroideas; influye en el crecimiento y maduración; afecta piel; pelo; uñas y huesos.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_429,OLIGOTERAPIA,ZINC,Zinc,Interviene en hormonas; crecimiento; producción de insulina; funciones psicológicas y sistema inmunitario.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_430,ACEITES ESENCIALES,ALBAHACA,Aceite esencial de albahaca,Aliviar el estrés y ansiedad; mejorar concentración. Tónico digestivo; acné; picor de piel y repelente de insectos.,,Frasco de 10 ml; puros y al 20%,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 43 (421-430) anexado correctamente.')
