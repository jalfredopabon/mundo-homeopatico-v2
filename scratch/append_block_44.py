import os

csv_content = """prod_431,ACEITES ESENCIALES,BERGAMOTA,Bergamota,Acción antiséptica; analgésica; digestiva; cicatrizante; vermífuga; sedante y expectorante. Combate el mal aliento; alivia cólicos; reduce la fiebre y elimina piojos. Útil en cistitis; fatiga mental y estrés.,,Frasco de 10 ml; puros y al 20%,activo
prod_432,ACEITES ESENCIALES,CARDAMOMO,Cardamomo,Aroma cálido y especiado que revitaliza el ambiente. Propiedades estimulantes y digestivas; perfectas para aliviar el estrés y la ansiedad.,,Frasco de 10 ml; puros y al 20%,activo
prod_433,ACEITES ESENCIALES,CIDRÓN,Cidrón,Calma la ansiedad; el estrés y el insomnio gracias a sus propiedades sedantes y relajantes. Beneficioso para el sistema digestivo; aliviando cólicos y náuseas.,,Frasco de 10 ml; puros y al 20%,activo
prod_434,ACEITES ESENCIALES,CIPRÉS,Ciprés,Revitaliza la circulación; alivia molestias musculares y calambres. Excelente regulador emocional; astringente y reduce el exceso de sudoración.,,Frasco de 10 ml; puros y al 20%,activo
prod_435,ACEITES ESENCIALES,CITRONELA,Citronela,Aceite rico en citronelol; fungicida; antiséptico e insecticida. Destaca como repelente natural de insectos; especialmente mosquitos.,,Frasco de 10 ml; puros y al 20%,activo
prod_436,ACEITES ESENCIALES,CLAVO,Clavo,Rico en manganeso; potasio y calcio. Se usa para prevenir osteoporosis y anemia. Propiedades afrodisíacas; estimulantes y antivirales.,,Frasco de 10 ml; puros y al 20%,activo
prod_437,ACEITES ESENCIALES,CÚRCUMA,Cúrcuma,Antioxidante y rejuvenecedor; combate el envejecimiento prematuro. Digestivo; antiparasitario y antiinflamatorio (lumbalgias y ciática). Regulador menstrual.,,Frasco de 10 ml; puros y al 20%,activo
prod_438,ACEITES ESENCIALES,EUCALIPTO GLOBULUS,Eucalipto globulus,Aliado contra infecciones respiratorias (resfriado; gripe; bronquitis). Descongestionante de fosas nasales; antiséptico de piel y repelente de insectos.,,Frasco de 10 ml; puros y al 20%,activo
prod_439,ACEITES ESENCIALES,GERANIO,Geranio,Cicatrización de heridas y grietas; regenerador celular. Eficaz contra la piel madura o arrugada; piel grasa y acné.,,Frasco de 10 ml; puros y al 20%,activo
prod_440,ACEITES ESENCIALES,LAVANDA,Lavanda,Promueve la relajación; reduce el estrés y mejora la calidad del sueño. Alivia irritaciones de piel; quemaduras; dolores de cabeza y migrañas.,,Frasco de 10 ml; puros y al 20%,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 44 (431-440) anexado correctamente.')
