import os

csv_content = """prod_281,ESENCIAS FLORALES,PASIONARIA O PASIFLORA (PASSIFLORA BRYONOIDES),PASSIFLORA BRYONOIDES,Permite asimilar experiencias espirituales por que favorece la apertura hacia niveles superiores de conciencia. Permite entrar en la conciencia de la nueva era. Ayuda a conciliar el sueño.,,Spray oral; Gotas,activo
prod_282,ESENCIAS FLORALES,PETUNIA (PETUNIA HYBRIDA),PETUNIA HYBRIDA,Ideal para personas excesivamente lógicas; niños hiperactivos. Permite localizar nuestra atención y reconocer las prioridades frente a exceso de información innecesaria. Corrige problemas generados por dificultades en el hemisferio izquierdo.,,Spray oral; Gotas,activo
prod_283,ESENCIAS FLORALES,PIMIENTO (CAPSICUM ANNUUM),CAPSICUM ANNUUM,Permite transformar la inercia y la indecisión en actividad creadora. Gran motivador. Para bloqueos al inicio de cualquier tratamiento.,,Spray oral; Gotas,activo
prod_284,ESENCIAS FLORALES,PRINGAMOSA (URTICA BACCIFERA),URTICA BACCIFERA,Para enfermedades eruptivas; prurito; alergias; acné; asma; erisipela. Purifica el sistema circulatorio. Incrementa la oxigenación de la sangre. Desintoxica en el ámbito físico y emocional.,,Spray oral; Gotas,activo
prod_285,ESENCIAS FLORALES,ROMERO (ROSMARINUS OFFICINALIS),ROSMARINUS OFFICINALIS,Ideal para los olvidadizos; ayuda a poner los pies en la tierra.. Da fuerza e interés cuando se requiere hacer algún negocio. Reordena los estados emocionales.,,Spray oral; Gotas,activo
prod_286,ESENCIAS FLORALES,RUDBECKIA (RUDBECKIA HIRTA),RUDBECKIA HIRTA,Permite enfrentar las partes ocultas de uno mismo; facilita la autotransformación gracias a la comprensión de sí mismo. Contra la falta de honestidad; para la mitomanía. Corrige la resistencia del paciente ante el terapeuta.,,Spray oral; Gotas,activo
prod_287,ESENCIAS FLORALES,SALVIA (SALVIA OFFICINALIS),SALVIA OFFICINALIS,Permite integrar el camino espiritual al estilo convencional de vida. Para la fatiga en vuelos largos.,,Spray oral; Gotas,activo
prod_288,ESENCIAS FLORALES,SIETE CUEROS (TIBOUCHINA AURIVILLEANA),TIBOUCHINA AURIVILLEANA,Vitaliza y alinea todos los centros sutiles. Estabiliza la energía interna después de una gran estimulación.,,Spray oral; Gotas,activo
prod_289,ESENCIAS FLORALES,TRÉBOL ROJO (TRIFOLIUM PRATENSE),TRIFOLIUM PRATENSE,Permite estar serenos ante el miedo y la histeria colectiva. Ideal para situaciones de peligro colectivo.,,Spray oral; Gotas,activo
prod_290,ESENCIAS FLORALES,VALERIANA (VALERIANA OFFICINALIS),VALERIANA OFFICINALIS,Permite superar las tensiones importantes de la vida; el insomnio; estar calmados ante momentos de estrés. Tranquilizante.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 29 (281-290) anexado correctamente.')
