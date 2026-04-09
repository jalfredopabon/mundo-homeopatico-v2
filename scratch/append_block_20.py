import os

csv_content = """prod_191,ESENCIAS FLORALES,ALERCE (LARCH - LARIX DECIDUA),ALERCE (LARCH - LARIX DECIDUA),Aportando confianza y seguridad en si mismo; sirve para quienes anticipan el fracaso porque dudan de sus capacidades.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_192,ESENCIAS FLORALES,AULAGA (GORSE - ULEX EUROPAEUS),AULAGA (GORSE - ULEX EUROPAEUS),Con fe; ayuda en el desaliento y la desesperanza profunda. Para quien ha dejado de perseverar.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_193,ESENCIAS FLORALES,AVENA SILVESTRE (WILD OAT - BROMUS RAMOSUS),AVENA SILVESTRE (WILD OAT - BROMUS RAMOSUS),Con discernimiento ayuda a la persona a encontrar el propósito de la vida. Para la insatisfacción que produce la vocación dudosa.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_194,ESENCIAS FLORALES,BREZO (HEATHER - CALLUNA VULGARIS),BREZO (HEATHER - CALLUNA VULGARIS),Buscando el amor dentro de sí mismo y viviéndolo con el de los demás; sirve para quien se siente solo.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_195,ESENCIAS FLORALES,BROTE DE CASTAÑO (CHESTNUT BUD - AESCULUS HIPPOCASTANUM),BROTE DE CASTAÑO (CHESTNUT BUD - AESCULUS HIPPOCASTANUM),A través del reconocimiento y la observación sirve para quienes repiten los mismos errores y no aprenden de estos.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_196,ESENCIAS FLORALES,CASTAÑO BLANCO (WHITE CHESTNUTO - AESCULUS HIPPOCASTANUM),CASTAÑO BLANCO (WHITE CHESTNUTO - AESCULUS HIPPOCASTANUM),Aquieta la mente cuando hay ideas repetitivas; interfiriendo con la capacidad de concentrarse debido a la excesiva preocupación.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_197,ESENCIAS FLORALES,CASTAÑO DULCE (SWEET CHESTNUT - CASTANEA SATIVA),CASTAÑO DULCE (SWEET CHESTNUT - CASTANEA SATIVA),Por medio de la aceptación y de la transformación; ayuda en estados de desesperación profunda y tormento interior. Permite que las viejas estructuras de la personalidad se abran y crea un espacio para nuevos estados de conciencia.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_198,ESENCIAS FLORALES,CASTAÑO ROJO (RED CHESTNUT - AESCULUS CARNEA),CASTAÑO ROJO (RED CHESTNUT - AESCULUS CARNEA),Para quienes tienen pensamientos de preocupación exagerada por los demás. Se imponen y descuidan sus propias necesidades; viviendo la vida de los otros como si fuera la propia. Para madres sobreprotectoras.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_199,ESENCIAS FLORALES,CENTAURA (CENTAURY - CENTAURIUM UMBELLATUM),CENTAURA (CENTAURY - CENTAURIUM UMBELLATUM),Útil para quien sirve exageradamente; buscando aceptación; no sabe decir No. Permite establecer el contacto con la propia voluntad,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_200,ESENCIAS FLORALES,CERASIFERA(CHERRY PLUM - PRUNUS CERASIFERA),CERASIFERA(CHERRY PLUM - PRUNUS CERASIFERA),Aportando autocontrol permite salir victorioso de situaciones donde se tiene miedo a perder el control.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 20 (191-200) anexado correctamente.')
