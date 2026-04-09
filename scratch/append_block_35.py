import os

csv_content = """prod_341,SISTEMA FLORAL AUSTRALIANO,FLANNEL FLOWER (ACTINOTUS HELIANTHI),ACTINOTUS HELIANTHI,Aporta gentileza y sensibilidad en la caricia; experimentar con el gozo de tocar; alegría en la actividad física; sensualidad.,,Spray oral; Gotas,activo
prod_342,SISTEMA FLORAL AUSTRALIANO,FRESHWATER MANGROVE,FRESHWATER MANGROVE,La calidad sanadora de esta esencia es la de liberar y sanar los prejuicios mentales; permitiendo que el corazón se abra sin prejuzgar. Para aquellos que mentalmente rechazan o han decidido mentalmente acerca de algo sin haberlo experimentado nunca.,,Spray oral; Gotas,activo
prod_343,SISTEMA FLORAL AUSTRALIANO,FRINGED VIOLET (THYSANOTUS TUBEROSUS),THYSANOTUS TUBEROSUS,Elimina los efectos de traumas viejos o recientes; genera protección psíquica.,,Spray oral; Gotas,activo
prod_344,SISTEMA FLORAL AUSTRALIANO,GYMEA LILY,GYMEA LILY,Este remedio es para la arrogancia y el orgullo excesivos y ayuda a encontrar humildad. Alcanza la energía de la arrogancia y la transforma para permitir utilizarla para alcanzar grandes alturas. También es benéfico para gente cuya personalidad es muy intensa o extrovertida; o aquellos que son dominantes; demandan demasiado y son muy carismáticos.,,Spray oral; Gotas,activo
prod_345,SISTEMA FLORAL AUSTRALIANO,GREY SPIDER FLOWER (GREVILLEA BUXIFOLIA),GREVILLEA BUXIFOLIA,Da fe y coraje; bueno ante el pánico. Para los miedos a lo sobrenatural y ataque psíquico; terror; pánico; desesperanza; sensación de ahogo y tensión.,,Spray oral; Gotas,activo
prod_346,SISTEMA FLORAL AUSTRALIANO,GREEN ESSENCE,GREEN ESSENCE,Es usado para armonizar cualquier levadura; moho o parásito a la misma vibración de nuestro cuerpo. También puede ser usada para ducharse en caso necesario; al mismo tiempo que se toma internamente.,Tomar por vía oral por lo menos por dos semanas; 5 gotas 3 veces al día antes de las comidas. Tópico: Coloque 7 gotas en una vasija de agua; rocíelo en el área afectada y déjelo secar; por la mañana y por la noche por dos semanas.,Spray oral; Gotas,activo
prod_347,SISTEMA FLORAL AUSTRALIANO,GREEN SPIDER ORCHID,GREEN SPIDER ORCHID,Orquídea que provoca estados alterados de conciencia. Ayuda a las personas que realizan prácticas espirituales. No debe usarse en personas inestables. Bueno para tratar fobias.,,Spray oral; Gotas,activo
prod_348,SISTEMA FLORAL AUSTRALIANO,HIBBERTIA (HIBBERTIA PEDUNCULATA),HIBBERTIA PEDUNCULATA,Para la excesiva auto disciplina; adquisición de conocimiento; fanatismo. Aceptación de sí mismo sin querer ser superiores a otros.,,Spray oral; Gotas,activo
prod_349,SISTEMA FLORAL AUSTRALIANO,ILLAWARRA FLAME TREE (BRACHYCHITON ACERIFOLIUS),BRACHYCHITON ACERIFOLIUS,Para el que sufre al sentirse rechazado. Miedo a la responsabilidad. Auto aprobación; auto confianza y fuerza interior.,,Spray oral; Gotas,activo
prod_350,SISTEMA FLORAL AUSTRALIANO,ISOPOGON (ISOPOGON ANETHIFOLIUS),ISOPOGON ANETHIFOLIUS,Para la falta de memoria; ayuda a superar la incapacidad de aprender de la experiencia pasada. Personalidad testaruda y controladora.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 35 (341-350) anexado correctamente.')
