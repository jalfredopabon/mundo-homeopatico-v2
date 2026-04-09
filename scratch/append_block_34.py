import os

csv_content = """prod_331,SISTEMA FLORAL AUSTRALIANO,BOTTLEBRUSH,CALLISTEMON LINEARIS,Para los grandes cambios en la vida; pubertad; jubilación; embarazo. Aferrarse al pasado y a los viejos hábitos.,,Spray oral; Gotas,activo
prod_332,SISTEMA FLORAL AUSTRALIANO,BUSH FUCSHIA,EPACRIS LONGIFLORA,Ideal para toda dificultad en el aprendizaje. Equilibra los hemisferios derecho-izquierdo. Dislexia; tartamudez; epilepsia.,,Spray oral; Gotas,activo
prod_333,SISTEMA FLORAL AUSTRALIANO,BUSH GARDENIA,GARDENIA MEGASPERMA,Renueva el interés por la pareja; mejorando la comunicación con las personas más cercanas.,,Spray oral; Gotas,activo
prod_334,SISTEMA FLORAL AUSTRALIANO,BUSH IRIS,PATERSONIA LONGIFOLIA,Para el materialismo; ateísmo; adicción; vida disipada. Aporta entendimiento de las cosas más allá de lo material.,,Spray oral; Gotas,activo
prod_335,SISTEMA FLORAL AUSTRALIANO,CHRISTMAS BELL,CHRISTMAS BELL,Este remedio ayuda a tener maestría en el plano físico y en la administración de las posesiones. También es muy benéfico para cualquier persona que tenga una sensación de carencia.,,Spray oral; Gotas,activo
prod_336,SISTEMA FLORAL AUSTRALIANO,CROWEA,CROWEA SALIGNA,Aporta paz; calma; equilibra y centra al individuo. Elimina la ansiedad y la excesiva preocupación. Para el que se preocupa por no sentirse muy bien.,,Spray oral; Gotas,activo
prod_337,SISTEMA FLORAL AUSTRALIANO,DAGGER HAKEA,HAKEA TERETIFOLIA,Para dejar los resentimiento ante los familiares; amigos íntimos; amantes. Perdón y expresión abierta del sentimiento.,,Spray oral; Gotas,activo
prod_338,SISTEMA FLORAL AUSTRALIANO,DOG ROSE,BAUERA RUBIOIDES,Para personas miedosas; tímidas; inseguras. Para miedos cotidianos; aporta confianza; coraje; creer en uno mismo.,,Spray oral; Gotas,activo
prod_339,SISTEMA FLORAL AUSTRALIANO,DOG ROSE OF THE WILD FORCES,DOG ROSE OF THE WILD FORCES,Incrementa el autocontrol y la capacidad de tomar contacto con el inconsciente. En cuadros de psicosis; desórdenes psicosomáticos.,,Spray oral; Gotas,activo
prod_340,SISTEMA FLORAL AUSTRALIANO,FIVE CORNERS,STYPHELIA TRIFLORA,Para la baja autoestima; disgusto de sí mismo; brinda amor y auto aceptación; gozar de la propia belleza.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 34 (331-340) anexado correctamente.')
