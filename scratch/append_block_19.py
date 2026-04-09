import os

csv_content = """prod_181,ESENCIAS FLORALES,RECIÉN NACIDO,Esencias florales de estrella de belén; manzano silvestre; nogal; heliantemo y lirio mariposa. Esencia mineral de jade y aceite esencial de azahar.,Ayudar amorosamente al recién nacido a adaptarse a su nuevo entorno; brindándole la tranquilidad y confianza que lo lleven a superar el trauma natural del nacimiento.,,Splash x 120 ml,activo
prod_182,ESENCIAS FLORALES,SERENITY,Diente de león; manzanilla; agrimonia; verbena; valeriana heliantemo; alerce e impaciencia. Esencia mineral de obsidiana. Aceite esencial de lavanda.,Lograr calma y relajación en situaciones de estrés; angustia; miedo; ansiedad y presión.,,Splash x 120 ml,activo
prod_183,ESENCIAS FLORALES,LIMPIEZA ÁURICA PERSONAL,Esencias florales de estrella de belén; manzano silvestre; angelsword; fringed violet. Esencias minerales de obsidiana y shungita. Aceite esencial de salvia.,Nuestra aura; como campo energético; puede ser contaminada por diversos factores; por eso es necesario limpiarla y así mantener su equilibrio.,,Caja con 2 spray,activo
prod_184,ESENCIAS FLORALES,PROTECCIÓN DEL AURA,Nogal; menta; milenrama; mimosa; álamo temblón; orquídea ángel de protección. Esencias minerales de turmalina negra y shungita. Aceite esencial de sándalo.,El aura es nuestro campo energético y como tal debemos protegerla de las energías negativas que puedan perturbarla; empezando por nuestros pensamientos y complementándolo con el uso de esta esencia.,,Caja con 2 spray,activo
prod_185,ESENCIAS FLORALES,RESCATE CREMA,Cerasífera; clemátide; impaciencia; estrella de belén; heliantemo; manzano silvestre.,En caso de golpes se aplica sobre la zona afectada con masaje suave. En situaciones de shock emocional aplicar una pequeña cantidad en la base de la nariz; detrás de las orejas o en la parte interior de las muñecas.,,Crema x 20g,activo
prod_186,ESENCIAS FLORALES,ACEBO (HOLLY - ILEX AQUIFOLIUM),Acebo,Para aprender del amor en todas sus manifestaciones. Comprensión; solidaridad; afecto; respeto. Para quienes se ven atacados por pensamientos contrarios al amor como el odio; la envidia; el egoísmo y la sospecha.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_187,ESENCIAS FLORALES,ACHICORIA (CHICORY - CICHORIUM INTYBUS),Achicoria,Quien necesita aprender del amor incondicional; el dar sin recibir nada a cambio. Para la posesividad y la manipulación.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_188,ESENCIAS FLORALES,AGRIMONIA (AGRIMONY - AGRIMONIA EUPATORIA),Agrimonia,Para quienes ocultan detrás de su buen humor todas sus preocupaciones. Permite aceptarse a sí mismo.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_189,ESENCIAS FLORALES,AGUA DE ROCA (ROCK WATER - AGUA PETRA),Agua de roca,A través de la flexibilidad y de la apertura; ayuda a quienes son rigurosos y estrictos en exceso consigo mismo.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_190,ESENCIAS FLORALES,ÁLAMO TEMBLÓN (ASPEN - POPULUS TREMULA),Álamo temblón,Da confianza a la persona que necesita superar los miedos de origen desconocido.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 19 (181-190) anexado correctamente.')
