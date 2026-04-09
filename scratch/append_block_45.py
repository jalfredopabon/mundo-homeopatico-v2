import os

csv_content = """prod_441,ACEITES ESENCIALES,LIMÓN,Limón,Manejo de ansiedad; problemas digestivos y de piel. Mejora la concentración; útil para mareos en el auto y mal aliento. Acción antiarrugas.,,Frasco de 10 ml; puros y al 20%,activo
prod_442,ACEITES ESENCIALES,LIMONCILLO,Limoncillo,Antiséptico; desinflamatorio; antiacné; desodorante e insecticida. Tonifica tejidos; alivia dolores musculares y de cabeza.,,Frasco de 10 ml; puros y al 20%,activo
prod_443,ACEITES ESENCIALES,MENTA,Menta,Alivia dolores de cabeza; mejora la digestión y calma el tracto digestivo. Descongestiona vías respiratorias y mejora la concentración.,,Frasco de 10 ml; puros y al 20%,activo
prod_444,ACEITES ESENCIALES,NARANJA,Naranja,Mejora el ánimo; reduce estrés y ansiedad. Acción antiséptica; rejuvenecedora (celulitis; acné) y fortalece el sistema inmunológico.,,Frasco de 10 ml; puros y al 20%,activo
prod_445,ACEITES ESENCIALES,ORÉGANO,Orégano,Combate infecciones bacterianas; fúngicas y virales. Fortalece el sistema inmune y mejora digestión. Útil en picaduras y dolores musculares.,,Frasco de 10 ml; puros y al 20%,activo
prod_446,ACEITES ESENCIALES,PALO SANTO,Palo Santo,Indicado para la relajación; limpieza espiritual y purificación de ambientes. Calma estrés y ansiedad; cuida la piel.,,Frasco de 10 ml; puros y al 20%,activo
prod_447,ACEITES ESENCIALES,PIMIENTA NEGRA,Pimienta negra,Alivia dolores musculares (calambres; artritis) y mejora circulación. Estimula digestión y aporta energía y concentración en aromaterapia.,,Frasco de 10 ml; puros y al 20%,activo
prod_448,ACEITES ESENCIALES,PRONTO ALIVIO,Pronto alivio,Calma dolores de cabeza; musculares y articulares. Limpieza energética y purificación de ambientes; ideal para yoga y meditación. Eleva el ánimo.,,Frasco de 10 ml; puros y al 20%,activo
prod_449,ACEITES ESENCIALES,ROMERO,Romero,Mejora circulación y estimula crecimiento del cabello. Antiinflamatorio para dolores articulares. Mejora memoria y claridad mental.,,Frasco de 10 ml; puros y al 20%,activo
prod_450,ACEITES ESENCIALES,TOMILLO,Tomillo,Alivia afecciones respiratorias (tos; sinusitis). Potente desinfectante de piel; fortalece el cabello y combate la caspa. Limpiador natural.,,Frasco de 10 ml; puros y al 20%,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 45 (441-450) anexado correctamente.')
