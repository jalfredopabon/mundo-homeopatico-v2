import os

csv_content = """prod_241,ESENCIAS FLORALES,CALÉNDULA,CALÉNDULA OFFICINALIS,Ideal para aquellos que sólo oyen las palabras pero no entienden su significado; incremento la capacidad para conectarse con los otros y generar niveles sensibles de comunicación.,,Spray oral por 30 ml; Gotas por 30 ml,activo
prod_242,ESENCIAS FLORALES,CALLA,ZANTEDESCHIA AETHIOPICA,Permite encontrar la identidad sexual. Equilibra la polaridad; corrigiendo los desbalances interior hombre - mujer. Bueno contra el agotamiento mental.,,Spray oral por 30 ml; Gotas por 30 ml,activo
prod_243,ESENCIAS FLORALES,CAPUCHINA,TROPAEOLUM ADUNCUM,Aporta claridad mental cuando el exceso de actividad intelectual produce confusión; incredulidad o cansancio mental. Da apertura a nuevas ideas. Para individuos demasiados racionales. Incrementa la absorción de vitamina B.,,Spray oral por 30 ml; Gotas por 30 ml,activo
prod_244,ESENCIAS FLORALES,CLAVEL DE INDIAS,TAGETES PATULA,Para quien tiene dificultades en la escucha de sí mismo y de los demás. Útil en problemas de aprendizaje.,,Spray oral por 30 ml; Gotas por 30 ml,activo
prod_245,ESENCIAS FLORALES,CORAZONCILLO,DICENTRA SPECTABILIS,Armoniza los asuntos del corazón después de una separación dolorosa.,,Spray oral por 30 ml; Gotas por 30 ml,activo
prod_246,ESENCIAS FLORALES,CONSUELDA,SYMPHYTUM OFFICINALE,Refuerza la memoria y tonifica el sistema nervioso. Ayuda en los problemas de coordinación psico-motora.,,Spray oral por 30 ml; Gotas por 30 ml,activo
prod_247,ESENCIAS FLORALES,CONSUELDA MENOR,PRUNELLA VULGARIS,Despierta el deseo de curación; ayuda en la aceptación de lo que somos y las transformaciones que vivimos.,,Spray oral por 30 ml; Gotas por 30 ml,activo
prod_248,ESENCIAS FLORALES,COSMOS,COSMOS BIPINNATUS,Aumenta la capacidad de expresión en público; y en privado; facilita una mejor comunicación.,,Spray oral por 30 ml; Gotas por 30 ml,activo
prod_249,ESENCIAS FLORALES,DIGITALIS,DIGITALIS PURPUREA,Permite superar los problemas de apego; ayudando a aliviar la tensión centrada alrededor del corazón.,,Spray oral por 30 ml; Gotas por 30 ml,activo
prod_250,ESENCIAS FLORALES,DIENTE DE LEÓN,TARAXACUM OFFICINALE,Ideal para el estrés que se convierte en tensión mental; emocional y muscular. Se puede aplicar externamente en masajes.,,Spray oral por 30 ml; Gotas por 30 ml,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 25 (241-250) anexado correctamente.')
