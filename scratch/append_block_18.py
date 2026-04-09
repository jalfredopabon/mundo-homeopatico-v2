import os

csv_content = """prod_171,ESENCIAS FLORALES,SER FELIZ,Scleranthus; mostaza; genciana; aulaga; agrimonia; borraja; madreselva; corazoncillo; sauce; estrella de belén; espino blanco,Recuperar la alegría de vivir y el disfrute de la cotidianidad; para superar la depresión.,2 puff 4 veces al día,Frasco 30 ml,activo
prod_172,ESENCIAS FLORALES,SERENIDAD,Diente de león; manzanilla; impaciencia; agrimonia; verbena; valeriana,Lograr calma y relajación ante los días agitados y situaciones de mucha presión. Para superar el estrés.,2 puff 4 veces al día,Frasco 30 ml,activo
prod_173,ESENCIAS FLORALES,TEMPLANZA,Don diego; cerasífera; agrimonia; haya; centaura; brote de castaño; aulaga; madreselva; impaciencia,Fortalecer la voluntad de abandonar la adicción y de no repetir los errores del pasado.,2 puff 4 veces al día,Frasco 30 ml,activo
prod_174,ESENCIAS FLORALES,TRANQUILIDAD,Acebo; cerasífera; nogal; lavanda; milenrama; verbena; vid,Canalizar los sentimientos de ira; enojo y agresión; aportando calma y dominio de las emociones negativas.,2 puff 4 veces al día,Frasco 30 ml,activo
prod_175,ESENCIAS FLORALES,VALENTÍA,Heliantemo; mímulo; cerasífera; álamo temblón; castaño rojo,Las flores en esta esencia aportan confianza y valentía; bien sea que se conozca o no la causa del miedo.,2 puff 4 veces al día,Frasco 30 ml,activo
prod_176,ESENCIAS FLORALES,ABUNDANCIA-PROSPERIDAD,Esencias florales de Bluebell; avena silvestre; rosa silvestre y genciana. Esencia mineral de pirita y aceite esencial de canela,Atraer la abundancia material y la prosperidad en cada proyecto; labor o empresa.,Aplicar en el centro y las esquinas del espacio que lo requiera 1 o 2 veces al día,Splash 120 ml,activo
prod_177,ESENCIAS FLORALES,AMBIENTE LABORAL POSITIVO,Esencias florales: Para una comunicación asertiva: dragón; pensamiento violeta; agrimonia; Bush gardenia; cosmos; clavel de indias. Para motivar y mejorar el trabajo en grupo: Haya; mimosa; orquídea amor; verbasco. Para ser más eficientes: Genciana; hojarazo; avena silvestre; clemátide. Esencias minerales de cuarzo amatista y aceite esencial de mandarina,Crear y mantener un clima organizacional positivo donde prime el respeto; la buena comunicación y la motivación.,Aplicar en el centro y las esquinas del espacio que lo requiera 1 o 2 veces al día,Splash 120 ml,activo
prod_178,ESENCIAS FLORALES,ARMONÍA EN PAREJA,Esencias florales de acebo; achicoria; alerce; brezo; castaño rojo; haya; nogal; agrimonia; vid; Bluebell; flannel Flower; mountain devil; wedding Bush y wisteria. Esencia mineral de cuarzo rosado. Aceite esencial de geranio,Mantener una excelente comunicación; tolerancia y disfrute de todos los aspectos de la vida en pareja.,Aplicar en el centro y las esquinas del espacio que lo requiera 1 o 2 veces al día,Splash 120 ml,activo
prod_179,ESENCIAS FLORALES,LIMPIEZA-TRANSMUTACIÓN,Esencias florales de lavanda; manzano silvestre; álamo temblón; estrella de belén y orquídea del amor. Esencia mineral de amatista; jade y angelita. Aceite esencial de salvia,Eliminar las energías negativas que se encuentren en el hogar o en el trabajo; llenando los espacios con las vibraciones positivas que emiten los componentes de este splash.,Aplicar en el centro y las esquinas del espacio que lo requiera 1 o 2 veces al día,Splash 120 ml,activo
prod_180,ESENCIAS FLORALES,PROTECCIÓN,Esencias florales de menta; mimosa; milenrama; angelsword; pasionaria; nogal y orquídea ángel de protección. Esencias minerales de shungita; angelita y turmalina negra. Aceite esencial de romero,Crear una barrera que impida el daño que puedan ocasionar los malos pensamientos o intenciones maliciosas de quienes llegan al entorno familiar o laboral.,Aplicar en el centro y las esquinas del espacio que lo requiera 1 o 2 veces al día,Splash 120 ml,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 18 (171-180) anexado correctamente.')
