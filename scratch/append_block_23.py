import os

csv_content = """prod_221,ESENCIAS FLORALES,VERBENA (VERBAIN - VERBENA OFFICINALIS),VERBENA (VERBAIN - VERBENA OFFICINALIS),Para los fanáticos; entusiastas y vehementes que quieren cambiar el mundo. Útil en niños hiperactivos.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_222,ESENCIAS FLORALES,VID (VINE - VITIS VINIFERA),VID (VINE - VITIS VINIFERA),Para los dominantes; autoritarios e inflexibles que quieren imponer su voluntad siempre en todo y a todos.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_223,ESENCIAS FLORALES,VIOLETA DE AGUA (WATER VIOLET - HOTTONIA PALUSTRIS),VIOLETA DE AGUA (WATER VIOLET - HOTTONIA PALUSTRIS),Aporta humildad y permite entregarse a los demás. Para los sentimientos de superioridad y arrogancia.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_224,ESENCIAS FLORALES,RESCATE (REMEDIO DE URGENCIA - RESCUE REMEDY),Combinación de cinco esencias florales,Útil en situaciones de crisis; urgencias o accidentes. Cuida que no se desintegre el sistema energético.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_225,ESENCIAS FLORALES,AJO SALVAJE (ALLIUM ANGULOSUM),AJO SALVAJE (ALLIUM ANGULOSUM),Nos libera de todo tipo de temores; ansiedad e inseguridad. Excelente repelente de insectos y parásitos. Fortalece el sistema inmune en la medida en que disminuye la incertidumbre y el temor.,,Spray oral; Gotas,activo
prod_226,ESENCIAS FLORALES,ALBAHACA (ONCIMUM BASILICUM),ALBAHACA (ONCIMUM BASILICUM),Integra la sexualidad y la espiritualidad a la vida cotidiana. Incrementa el entendimiento sobre la sexualidad.,,Spray oral; Gotas,activo
prod_227,ESENCIAS FLORALES,ALBARICOQUE (PRUNUS ARMENIACA),ALBARICOQUE (PRUNUS ARMENIACA),Fortalece el páncreas. Para la sensación de impureza interior. Útil para los cambios bruscos de temperamento. Facilita el entendimiento de conceptos como: ternura y dulzura.,,Spray oral; Gotas,activo
prod_228,ESENCIAS FLORALES,ALGODÓN (GOSSYPIUM ARBOREUM),ALGODÓN (GOSSYPIUM ARBOREUM),Muy útil en la pérdida del cabello independientemente de su origen; para los que no se sienten queridos ni nutridos de afecto del padre.,,Spray oral; Gotas,activo
prod_229,ESENCIAS FLORALES,ALMENDRO (PRUNUS AMYGDALUS),ALMENDRO (PRUNUS AMYGDALUS),Permite llegar a la madurez de manera natural; para los problemas de desarrollo físico; facilita la regeneración celular. Corrige el miedo a envejecer.,,Spray oral; Gotas,activo
prod_230,ESENCIAS FLORALES,ALOE (ALOE VERA - SÁBILA),ALOE (ALOE VERA - SÁBILA),Permite liberar las emociones reprimidas a través de un efecto catártico. Excelente cicatrizante; para problemas en la piel; regenerador de tejidos. Aporta vitalidad y regeneración.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 23 (221-230) anexado correctamente.')
