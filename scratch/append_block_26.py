import os

csv_content = """prod_251,ESENCIAS FLORALES,DON DIEGO DE DÍA (IPOMEA PURPUREA),IPOMEA PURPUREA,Equilibra e incrementa la fuerza vital; Nos libera del sentido de autodestrucción que puede llevar a hábitos y adicciones nocivas.,,Spray oral; Gotas,activo
prod_252,ESENCIAS FLORALES,DRAGÓN (ANTIRRHINUM MAJUS),ANTIRRHINUM MAJUS,Libera las emociones reprimidas y facilita la expresión verbal; Ayuda en los tratamientos que tengan que ver con garganta y boca; Para el miedo a expresarse.,,Spray oral; Gotas,activo
prod_253,ESENCIAS FLORALES,ENCINA (QUERCUS ILEX),QUERCUS ILEX,Ideal para los miedos ancestrales y el sentimiento profundo de soledad; Libera la bondad y la generosidad; Remedio indicado para la insensibilidad y la falta de ternura a causa de prejuicios o conceptos muy arraigados.,,Spray oral; Gotas,activo
prod_254,ESENCIAS FLORALES,ENELDO (ANETHUM GRAVEOLENS),ANETHUM GRAVEOLENS,Gracias a su amplio efecto mejora la digestión y permite la asimilación de los nutrientes; Ideal para el estrés producido por la vida acelerada de la ciudad; Aporta luz ante las dificultades emocionales.,,Spray oral; Gotas,activo
prod_255,ESENCIAS FLORALES,EPILOBIO (EPILOBIUM ANGUSTIFOLIUM),EPILOBIUM ANGUSTIFOLIUM,Restaurador de la energía vital deteriorada en casos de accidentes o traumatismos fuertes.,,Spray oral; Gotas,activo
prod_256,ESENCIAS FLORALES,ESPINO BLANCO (CRATAEGUS OXYACANTHA),CRATAEGUS OXYACANTHA,Permite elaborar los duelos; aliviando la tensión y el dolor causado por la pérdida de un ser querido.,,Spray oral; Gotas,activo
prod_257,ESENCIAS FLORALES,EUCALIPTO (EUCALYPTUS GLOBULUS),EUCALYPTUS GLOBULUS,Eficaz en tratamientos de asma; Ictericia; Estimula el sistema circulatorio; Alivia inflamaciones de las fosas nasales.,,Spray oral; Gotas,activo
prod_258,ESENCIAS FLORALES,EUFRASIA (EUPHRASIA OFFICINALIS),EUPHRASIA OFFICINALIS,Incrementa la intuición y la percepción en general; En los terapeutas facilita el diagnóstico.,,Spray oral; Gotas,activo
prod_259,ESENCIAS FLORALES,GAMONITO (ASPHODELUS ALBUS),ASPHODELUS ALBUS,Estimula la memoria celular y la regeneración del tejido neuronal; Para los temores a enfermar; Para las personas que se sienten impuras física y mentalmente.,,Spray oral; Gotas,activo
prod_260,ESENCIAS FLORALES,GIRASOL (HELIANTHUS ANNUUS),HELIANTHUS ANNUUS,Ayuda a resolver los problemas relacionados con la imagen paterna; Útil en geopatías.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 26 (251-260) anexado correctamente.')
