import os

csv_content = """prod_271,ESENCIAS FLORALES,MAÍZ (ZEA MAYS),ZEA MAYS,Nos permite adaptarnos y arraigarnos a la vida en las grandes ciudades; especial en situaciones de hacinamiento. Incrementa la capacidad para procrear.,,Spray oral; Gotas,activo
prod_272,ESENCIAS FLORALES,MADROÑO (ARBUTUS UNEDO),ARBUTUS UNEDO,Ayuda en la coordinación cuerpo-mente; alma-personalidad. Estimula escucha interior y el auto reconocimiento.,,Spray oral; Gotas,activo
prod_273,ESENCIAS FLORALES,MALVA (MALVA SYLVESTRIS),MALVA SYLVESTRIS,Permite aceptar los procesos naturales de transformación en la vida. Desarrolla la confianza y cordialidad en las personas tímidas; da apertura hacia el exterior.,,Spray oral; Gotas,activo
prod_274,ESENCIAS FLORALES,MANZANILLA (MATRICARIA CHAMOMILLA),MATRICARIA CHAMOMILLA,Fortalece todo el sistema nervioso; permitiendo relajar la tensión emocional. Útil para el insomnio.,,Spray oral; Gotas,activo
prod_275,ESENCIAS FLORALES,MENTA (MENTA SPICATA),MENTA SPICATA,Nos protege de pensamientos negativos ajenos; despeja mentalmente a la persona.,,Spray oral; Gotas,activo
prod_276,ESENCIAS FLORALES,MEJORANA (ORIGANUM VULGARE),ORIGANUM VULGARE,Es un buen digestivo; sirve para las afecciones gástricas; úlceras y dolores abdominales. Desinflamante de los ganglios. Se le considera un estimulante.,,Spray oral; Gotas,activo
prod_277,ESENCIAS FLORALES,MILENRAMA (ACHILLEA MILLEFOLIUM),ACHILLEA MILLEFOLIUM,Neutraliza geopatías y radiaciones débiles. Útil ante la vulnerabilidad extrema a influencias negativas externas.,,Spray oral; Gotas,activo
prod_278,ESENCIAS FLORALES,MIMOSA (MIMOSA PUDICA),MIMOSA PUDICA,Protege contra fuerzas externas diferentes al amor. Corrige la imagen negativa de sí mismo.,,Spray oral; Gotas,activo
prod_279,ESENCIAS FLORALES,MIOSOTIS (NO ME OLVIDES - MYOSOTIS SYLVATICA),MYOSOTIS SYLVATICA,Estimula el subconsciente; aumenta la memoria y perspicacia. Corrige pensamientos negativos.,,Spray oral; Gotas,activo
prod_280,ESENCIAS FLORALES,ORTIGA (URTICA DIOICA),URTICA DIOICA,Alivia las tensiones en el ámbito familiar. Útil en problemas de piel; alergias respiratorias.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 28 (271-280) anexado correctamente.')
