import os

csv_content = """prod_321,SISTEMA FLORAL AUSTRALIANO,ANGELSWORD,ANGELSWORD,Para aquellos que dudan de las verdades espirituales y están confusos. No debe ser usado por largos periodos de tiempo.,,Spray oral; Gotas,activo
prod_322,SISTEMA FLORAL AUSTRALIANO,ALPINE MINT BUSH,ALPINE MINT BUSH,Para el exceso de responsabilidad; para los que dan demasiado emocionalmente de sí mismos. Para el cansancio mental y emocional.,,Spray oral; Gotas,activo
prod_323,SISTEMA FLORAL AUSTRALIANO,AUTUMN LEAVES,AUTUMN LEAVES,Autumn Leaves nos permite escuchar ver y sentir comunicaciones desde el otro lado y estar abiertos a esa guía y comunicación. También enfatiza el sentido de dejarse ir y seguir adelante de una forma muy profunda. Esta esencia facilita la transición del paso del plano físico al mundo espiritual.,,Spray oral; Gotas,activo
prod_324,SISTEMA FLORAL AUSTRALIANO,BANKSIA ROBUR,BANKSIA ROBUR,Para el desaliento; frustración; abatimiento y desinterés. Aporta energía; interés y disfrute de la vida.,,Spray oral; Gotas,activo
prod_325,SISTEMA FLORAL AUSTRALIANO,BAUHINIA (LYSIPHYLLUM CUNNINGHAMII),BAUHINIA; LYSIPHYLLUM CUNNINGHAMII,Resistencia al cambio; rigidez; disgusto para aceptar nuevas ideas y conceptos. Desarrolla la capacidad de aceptación y apertura mental ante lo diferente.,,Spray oral; Gotas,activo
prod_326,SISTEMA FLORAL AUSTRALIANO,BILLY GOAT PLUM (PLANCHONIA CAREYA),BILLY GOAT PLUM; PLANCHONIA CAREYA,Aporta disfrute del placer sexual; aceptación del cuerpo físico. Para individuos con sentimientos de rechazo y asco hacia el sexo.,,Spray oral; Gotas,activo
prod_327,SISTEMA FLORAL AUSTRALIANO,BLACK EYED SUSAN (TETRATHECA ERICIFOLIA),BLACK EYED SUSAN; TETRATHECA ERICIFOLIA,Aporta paz interior; quietud. Ideal ante el estrés. Trabaja el cansancio; colapso nervioso; colesterol alto; cólicos.,,Spray oral; Gotas,activo
prod_328,SISTEMA FLORAL AUSTRALIANO,BLUEBELL (WAHLENBERGIA SPECIES),BLUEBELL; WAHLENBERGIA SPECIES,Abre el corazón; permite compartir con alegrías; miedo a la carencia efectiva. Para individuos avaros y posesivos.,,Spray oral; Gotas,activo
prod_329,SISTEMA FLORAL AUSTRALIANO,BOAB,BOAB,Limpia los patrones familiares negativos a nivel emocional y mental que han pasado de generación en generación. Esta esencia puede tener acceso y limpiar aquellos patrones muy interiores y toda las creencias limitantes relacionadas. Es muy benéfica para ayudar a las víctimas de abuso o prejuicio. También puede ayudar a limpiar líneas de karma negativo entre personas.^Cuando se usa en spray puede ser muy efectiva para limpiar energías negativas; especialmente cuando está combinada con Fringed Violet; Angelsword y Lichen. Boab puede ayudar a romper las cadenas que han estado rodeando la conciencia humana por miles de años.,,Spray oral; Gotas,activo
prod_330,SISTEMA FLORAL AUSTRALIANO,BORONIA (BORONIA LEDIFOLIA),BORONIA; BORONIA LEDIFOLIA,Aporta calma mental; serenidad; claridad de mente y pensamiento. En cuadros de ideas obsesivas y fijas. Ayuda a controlar la rumiación mental,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 33 (321-330) anexado correctamente.')
