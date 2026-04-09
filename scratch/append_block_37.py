import os

csv_content = """prod_361,SISTEMA FLORAL AUSTRALIANO,OLD MAN BANKSIA (BANKSIA SERRATA),BANKSIA SERRATA,Para el hipotiroidismo; incremento la energía; entusiasmo; disfrute e interés por la vida.,,Spray oral; Gotas,activo
prod_362,SISTEMA FLORAL AUSTRALIANO,PAW PAW (CARICA PAPAYA),CARICA PAPAYA,Asimilación e integración de nuevas ideas. Mejora el acceso al ser superior para la resolución de problemas. Halitosis. Hipoglucemia. Nauseas. Resfrío. Gripa.,,Spray oral; Gotas,activo
prod_363,SISTEMA FLORAL AUSTRALIANO,PINK MULLA MULLA,PINK MULLA MULLA,Para las personas dominadas por un miedo a sentirse herida; escudándose en la crítica e hiriendo a los demás. Actúa en problemas visuales; obesidad; rigidez corporal.,,Spray oral; Gotas,activo
prod_364,SISTEMA FLORAL AUSTRALIANO,PEACH FLOWERED TEA TREE (LEPTOSPERMUM SQUARROSUM),LEPTOSPERMUM SQUARROSUM,Para individuos hipocondríacos e inestables emocionalmente. Equilibra el páncreas. Humor cambiante y falta de compromiso.,,Spray oral; Gotas,activo
prod_365,SISTEMA FLORAL AUSTRALIANO,PHILOTHECA (PHILOTHECA SALSOLIFOLIA),PHILOTHECA SALSOLIFOLIA,Para poder aceptar la alabanza; el reconocimiento y el amor. Nos libera del temor a sobresalir. Timidez. Inseguridad.,,Spray oral; Gotas,activo
prod_366,SISTEMA FLORAL AUSTRALIANO,PINK FLANNEL FLOWER,PINK FLANNEL FLOWER,Ayuda a alcanzar un estado de gratitud por todos los aspectos de nuestras vidas. Especialmente indicada para bebés en el seno materno para mantener el chakra corazón abierto ante la densidad de la realidad terrestre.,,Spray oral; Gotas,activo
prod_367,SISTEMA FLORAL AUSTRALIANO,RED GREVILLEA (GREVILLEA SPECIOSA),GREVILLEA SPECIOSA,Para la dependencia de otros; aporta fuerza para separarse de las otras personas desagradables. Da coraje. Nos permite aprender a ser independiente.,,Spray oral; Gotas,activo
prod_368,SISTEMA FLORAL AUSTRALIANO,RED HELMET ORCHID (CORYBAS DILATATUS),CORYBAS DILATATUS,Rebeldes; egoísta; problemas con la figura de la autoridad proveniente de una mala relación con el propio padre. Ayuda a crear vínculos con sus hijos; sensibilidad y respeto.,,Spray oral; Gotas,activo
prod_369,SISTEMA FLORAL AUSTRALIANO,RED LILY (NELUMBO NUCIFERA),NELUMBO NUCIFERA,Incrementa la concentración; para dejar de soñar despiertos. Usarse en mayores de 20 años.,,Spray oral; Gotas,activo
prod_370,SISTEMA FLORAL AUSTRALIANO,RED SUVA FRANGIPANI,RED SUVA FRANGIPANI,Trata la gran intensidad emocional; dificultad y dureza cuando una relación está terminando o atravesando un periodo duro. Para el dolor inicial y la tristeza de la pérdida de un ser querido.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 37 (361-370) anexado correctamente.')
