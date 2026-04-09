import os

csv_content = """prod_211,ESENCIAS FLORALES,MÍMULO (MIMULUS - MIMULUS GUTTATUS),MÍMULO (MIMULUS - MIMULUS GUTTATUS),Con valor; ayuda a enfrentar la timidez y los temores de origen conocido. Miedo a enfermarse; o a los animales.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_212,ESENCIAS FLORALES,MOSTAZA (MUSTARD - SINAPIS ARVENSIS),MOSTAZA (MUSTARD - SINAPIS ARVENSIS),Proporciona serenidad interna; alegría de vivir. Útil en depresiones profundas sin causa conocida.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_213,ESENCIAS FLORALES,NOGAL (WALNUT - JUGLANS REGIA),NOGAL (WALNUT - JUGLANS REGIA),Para los que tienen que decidirse a dar un paso adelante; permitiendo la apertura; para el cambio. Útil frente a influencias externas negativas.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_214,ESENCIAS FLORALES,OLIVO (OLIVE - OLEA EUROPOEA),OLIVO (OLIVE - OLEA EUROPOEA),En periodos de grandes sobrecargas de trabajo y duras exigencias; aporta fuerza y vitalidad. Útil para el completo agotamiento y cansancio extremo del cuerpo.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_215,ESENCIAS FLORALES,OLMO (ELM - ULMUS PROCERA),OLMO (ELM - ULMUS PROCERA),Da serenidad y equilibrio; sirve para la persona que se siente abrumada por sus responsabilidades; la vida cotidiana o un dolor físico; con sentimiento de incapacidad.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_216,ESENCIAS FLORALES,PINO SILVESTRE (PINE - PINUS SYLVESTRIS),PINO SILVESTRE (PINE - PINUS SYLVESTRIS),Aporta arrepentimiento; perdón y el ser capaz de aceptarse tal como es. Es útil para quienes se reprochan continuamente y no ven la realidad de sus responsabilidades. Para los sentimientos de culpa con respecto a la sexualidad.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_217,ESENCIAS FLORALES,ROBLE (OAK - QUERCUS ROBUR),ROBLE (OAK - QUERCUS ROBUR),Ayuda al luchador exhausto que jamás se rinde a reconocer y aceptar su propio límite de rendimiento. Para la obsesión por el trabajo.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_218,ESENCIAS FLORALES,ROSA SILVESTRE (WILD ROSE - ROSA CANINA),ROSA SILVESTRE (WILD ROSE - ROSA CANINA),Motiva interiormente al gozo de la vida interna y externa. Para el desinterés; la apatía y la resignación.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_219,ESENCIAS FLORALES,SAUCE - WILLOW (SALIX VITELLINA),SAUCE - WILLOW (SALIX VITELLINA),Útil para quien se siente víctima; es resentido y amargado; y no asume sus responsabilidades.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_220,ESENCIAS FLORALES,SCLERANTHUS (SCLERANTHUS - SCLERANTHUS ANNUUS),SCLERANTHUS (SCLERANTHUS - SCLERANTHUS ANNUUS),Aporta equilibrio; ayuda a quien fluctúa entre dos extremos con indecisión y cambios de ánimo continuos.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 22 (211-220) anexado correctamente.')
