import os

csv_content = """prod_261,ESENCIAS FLORALES,HYPÉRICO (HYPERICUM PERFORATUM),HYPERICUM PERFORATUM,Útil en casos de miedos del pasado; trastornos de sueños; pesadillas y terrores nocturnos.,,Spray oral; Gotas,activo
prod_262,ESENCIAS FLORALES,JACINTO DE AGUA (EICHHORNIA CRASSIPES),EICHHORNIA CRASSIPES,Incrementa la capacidad de percepción e intuición y permite entrar en contacto con la conciencia superior.,,Spray oral; Gotas,activo
prod_263,ESENCIAS FLORALES,JAZMÍN (JASMINUM OFFICINALE),JASMINUM OFFICINALE,Favorece la búsqueda del propio camino y sentido de lo trascendente. Útil en el exceso de mucosidades y la asimilación de proteínas.,,Spray oral; Gotas,activo
prod_264,ESENCIAS FLORALES,JARA ESTEPA (CISTUS ALBIDUS),CISTUS ALBIDUS,Ayuda en los procesos de desesperanza y abatimiento; ideal cuando se pierde la vitalidad a causas de traumatismos psíquicos o físicos. Fortalece el sistema inmune.,,Spray oral; Gotas,activo
prod_265,ESENCIAS FLORALES,LAVANDA (LAVANDULA OFFICINALIS),LAVANDULA OFFICINALIS,Es un excelente purificador; se puede tomar o rociar en el ambiente. Permite integrar los aspectos espirituales a lo cotidiano. Armonizador de los grandes valores integrando lo espiritual a la vida cotidiana.,,Spray oral; Gotas,activo
prod_266,ESENCIAS FLORALES,LILA (SYRINGA VULGARIS),SYRINGA VULGARIS,Ideal para tratamientos quiroprácticos. Normaliza y equilibra la circulación energética en la columna vertebral; aportando alivio; flexibilidad y buena postura. Para la rigidez emocional y física en cualquier manifestación.,,Spray oral; Gotas,activo
prod_267,ESENCIAS FLORALES,LIMÓN (CITRUS LIMONUM),CITRUS LIMONUM,Tonifica el hemisferio cerebral izquierdo e incrementa la capacidad racional; matemática y lingüística.,,Spray oral; Gotas,activo
prod_268,ESENCIAS FLORALES,LIRIO (IRIS GERMANICA),IRIS GERMANICA,Desarrollar nuestra inspiración y creatividad.,,Spray oral; Gotas,activo
prod_269,ESENCIAS FLORALES,LIRIO MARIPOSA (CALOCHORTUS LEICHTLINII),CALOCHORTUS LEICHTLINII,Bueno ante conflictos con la imagen materna. Para los hijos que se sienten abandonados por sus padres.,,Spray oral; Gotas,activo
prod_270,ESENCIAS FLORALES,LOTUS (NELUMBO NUCIFERA),NELUMBO NUCIFERA,Armoniza nuestra alma; nuestro ser y favorece la apertura espiritual. Tiende a incrementar el nivel vibracional de los demás elíxires.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 27 (261-270) anexado correctamente.')
