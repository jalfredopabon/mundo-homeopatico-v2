import os

csv_content = """prod_161,ESENCIAS FLORALES,CRECER (de la infancia a la adolescencia),Mímulo; manzano silvestre; mostaza; centaura; ceratostigma; scleranthus; acebo; sauce; verbena; haya; malva; impaciencia; nogal; bottlebrush.,Aceptar los desafíos de la adolescencia; mejorando la relación consigo mismo; con los padres y otras figuras de autoridad.,,Frasco 30 ml,activo
prod_162,ESENCIAS FLORALES,DUELOS,Castaño dulce; madreselva; espino blanco; estrella de belén; nogal; corazoncillo.,Soltar el pasado y superar los sentimientos dolorosos de las pérdidas materiales o afectivas.,,Frasco 30 ml,activo
prod_163,ESENCIAS FLORALES,EQUILIBRIUM,Scleranthus; alerce; violeta de agua; castaño dulce.,Desarrollar las cualidades de equilibrio; estabilidad; confianza y liberación. Para las personas con trastorno bipolar.,,Frasco 30 ml,activo
prod_164,ESENCIAS FLORALES,FÓRMULA DE EXÁMEN,Alerce; genciana; clemátide; olmo; castaño blanco; mímulo; no me olvides; eneldo.,Ante un examen o prueba; las flores de esta fórmula aportan optimismo; seguridad; confianza y concentración.,,Frasco 30 ml,activo
prod_165,ESENCIAS FLORALES,INTEGRACIÓN (Aislamiento),Violeta de agua; impaciencia; brezo; tall mulla mulla.,Disfrutar de la compañía de los otros; reconociendo también el valor de la vida en comunidad.,,Frasco 30 ml,activo
prod_166,ESENCIAS FLORALES,MEMORIES,Scleranthus; clemátide; madreselva; cerasífera; consuelda; bellis.,Estas flores están relacionadas con la separación de la realidad; el regreso al pasado y la inestabilidad; aportan equilibrio y presencia.,,Frasco 30 ml,activo
prod_167,ESENCIAS FLORALES,PERDÓN,Acebo; girasol; lirio mariposa; sauce; pino.,Liberar los viejos rencores y resentimientos; dando paso al perdón y con él a la paz interior.,,Frasco 30 ml,activo
prod_168,ESENCIAS FLORALES,PERSEVERANCIA,Kapok Bush; genciana; scleranthus; nogal; alerce; roble; verbena.,Fortalecer la voluntad; constancia y entusiasmo para afianzar las decisiones y para no abandonar las tareas; propósitos o proyectos.,,Frasco 30 ml,activo
prod_169,ESENCIAS FLORALES,RELAX,Acebo; olmo; impaciencia; castaño rojo; mímulo; manzanilla; cerasífera.,Lograr un estado de calma; reduciendo el miedo; la impaciencia y los pensamientos obsesivos; es ideal para los estados de ansiedad.,,Frasco 30 ml,activo
prod_170,ESENCIAS FLORALES,RESCATE,Cerasífera; clemátide; impaciencia; estrella de belén; heliantemo.,Esta esencia es para situaciones que provoquen una agitación emocional; es útil en todo tipo de traumas; en estados de shock; en crisis nerviosas y angustia profunda,,Frasco 30 ml,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 17 (161-170) anexado correctamente.')
