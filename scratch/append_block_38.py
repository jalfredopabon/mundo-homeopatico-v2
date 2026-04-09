import os

csv_content = """prod_371,SISTEMA FLORAL AUSTRALIANO,ROUGH BLUEBELL,ROUGH BLUEBELL,Libera toxinas; cura psicopatías; y perversiones en personas crueles.,,Spray oral; Gotas,activo
prod_372,SISTEMA FLORAL AUSTRALIANO,SHE OAK,CASUARINA GLAUCA,Para el síndrome premenstrual; desequilibrio hormonal femenino; incremento la fertilidad; embarazo y equilibrio hormonal.,,Spray oral; Gotas,activo
prod_373,SISTEMA FLORAL AUSTRALIANO,SYDNEY ROSE,SYDNEY ROSE,Sirve para ayudar a quienes se sienten separados; abandonados o solos; promoviendo una sensación de unidad. Supera el aislamiento y conecta con el amor incondicional.,,Spray oral; Gotas,activo
prod_374,SISTEMA FLORAL AUSTRALIANO,SILVER PRINCESS,EUCALYPTUS CAESIA,Para la falta de propósito en la vida. Incrementa la motivación; dirección y propósito de la vida.,,Spray oral; Gotas,activo
prod_375,SISTEMA FLORAL AUSTRALIANO,SLENDER RICE FLOWER,PIMELEA LINIFOLIA,Para el racismo y la estrechez de pensamiento. Son individuos rígidos en sus ideas y convicciones. Establece la cooperación grupal.,,Spray oral; Gotas,activo
prod_376,SISTEMA FLORAL AUSTRALIANO,SOUTHERN CROSS,XANTHOSIA ROTUNDIFOLIA,Genera una actividad positiva; ayuda a asumir responsabilidades de nuestras situaciones. Para el que tiende a sentirse víctima.,,Spray oral; Gotas,activo
prod_377,SISTEMA FLORAL AUSTRALIANO,SPINIFEX,TRIODIA SPECIES,Limpiador; desintoxicante; antibacteriano y sellador del cuerpo etérico. Para problemas de la piel.,,Spray oral; Gotas,activo
prod_378,SISTEMA FLORAL AUSTRALIANO,STURT DESERT PEA,CLIANTHUS FORMOSUS,Desvanece la tristeza; dejar ir; motiva y energiza; ante un dolor profundo emocional.,,Spray oral; Gotas,activo
prod_379,SISTEMA FLORAL AUSTRALIANO,STURT DESERT ROSE,GOSSYPIUM STURTIANUM,Para la culpa; baja autoestima; como consecuencias de hechos del pasado. Individuos fácilmente influenciables.,,Spray oral; Gotas,activo
prod_380,SISTEMA FLORAL AUSTRALIANO,SUNDEW,DROSERA SPATHULATA,Incrementa la concentración y la vivencia del presente. Recomendable para menores de 30 años.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 38 (371-380) anexado correctamente.')
