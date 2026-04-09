import os

csv_content = """prod_351,SISTEMA FLORAL AUSTRALIANO,JACARANDA,JACARANDA MIMOSAEFOLIA,Para los individuos dispersos; cambiantes; vacilantes; sin metas; acelerados. Aporta capacidad de decisión y rapidez mental.,,Spray oral; Gotas,activo
prod_352,SISTEMA FLORAL AUSTRALIANO,KANGAROO PAW,ANIGOZANTHOS MANGLESII,Socialmente inmaduro; torpe; poco sensible a las necesidades de los demás. Estimula las habilidades sociales.,,Spray oral; Gotas,activo
prod_353,SISTEMA FLORAL AUSTRALIANO,KAPOK BUSH,COCHLOSPERMUM FRASERI,Baja tolerancia a la frustración. Se desanima fácilmente. Resignado; desalentado y apático. Da persistencia.,,Spray oral; Gotas,activo
prod_354,SISTEMA FLORAL AUSTRALIANO,LICHEN,LICHEN,Se utiliza principalmente para ayudar en el proceso de la muerte o en transiciones significativas de la vida. Sirve para dar serenidad; conciencia y coraje al dejar ir el plano físico; ayudando a la separación entre lo físico y lo etérico.,,Spray oral; Gotas,activo
prod_355,SISTEMA FLORAL AUSTRALIANO,LITTLE FLANNEL FLOWER,ACTINOTUS MINOR,Para los que niegan el niño interior; adultos serios; niños que han crecido demasiado rápidos. Aporta alegría; simpatía y espontaneidad.,,Spray oral; Gotas,activo
prod_356,SISTEMA FLORAL AUSTRALIANO,MACROCARPA,EUCALYPTUS MACROCARPA,Para el cansancio y extremo agotamiento. Fortalece el sistema inmune. Equilibra las glándulas suprarrenales; poderosa ante el estrés; fuerza y vitalidad.,,Spray oral; Gotas,activo
prod_357,SISTEMA FLORAL AUSTRALIANO,MONGA WARATAH,MONGA WARATAH,Esta esencia ayuda a encontrar fuerza interior. Trata la codependencia; falta de poder personal y adicciones. Ayuda a reclamar nuestro espíritu y salir de situaciones de dependencia extrema.,,Spray oral; Gotas,activo
prod_358,SISTEMA FLORAL AUSTRALIANO,MOUNTAIN DEVIL,LAMBERTIA FORMOSA,Para el amor incondicional; perdón y felicidad. Desarrolla la generosidad; el dar y el compartir. Para la ira; odio; rencor; celos.,,Spray oral; Gotas,activo
prod_359,SISTEMA FLORAL AUSTRALIANO,MINT BUSH,MINT BUSH,Para las personas que se sienten a prueba o en grandes problemas. Bueno ante trastornos en el sistema óseo.,,Spray oral; Gotas,activo
prod_360,SISTEMA FLORAL AUSTRALIANO,MULLA MULLA,PTILOTUS ATRIPIFOLIUS,Para el temor al fuego; llamas y objetos calientes. Para los que están expuestos a rayos x o trabajan con medicina nuclear.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 36 (351-360) anexado correctamente.')
