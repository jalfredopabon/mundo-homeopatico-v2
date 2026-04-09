import os

csv_content = """prod_291,ESENCIAS FLORALES,VARA DE ORO (SOLIDAGO VIRGA - AUREA),SOLIDAGO VIRGA-AUREA,Útil en los problemas de autoimagen y egoísmo; permite entender el servicio a la humanidad. Fortalece y nos protege de influencias mentales negativas.,,Spray oral; Gotas,activo
prod_292,ESENCIAS FLORALES,VERBASCO (VERBASCUM THAPSUS),VERBASCUM THAPSUS,Facilita y armoniza el trabajo en grupo; especial para proyectos a largo plazo. Crea conciencia colectiva. Decrementa la tensión derivada de problemas genitales. Se emplea en la impotencia sexual masculina.,,Spray oral; Gotas,activo
prod_293,ESENCIAS FLORALES,VICTORIA REGIA (VICTORIA REGIA),VICTORIA REGIA,Permite la aceptación del proceso de la muerte física y facilita el transito del paciente terminal. Corrige los temores relativos a la muerte. Sirve para entrar a otros planos de conciencia.,,Spray oral; Gotas,activo
prod_294,ESENCIAS FLORALES,VIOLETA PENSAMIENTO (VIOLA HIRTA),VIOLA HIRTA,Permite abrirse en grupo y ante los demás; superando la timidez las dificultades de relacionarse. Bueno para las inmunodeficiencias e infecciones vírales.,,Spray oral; Gotas,activo
prod_295,ESENCIAS FLORALES,VISCUM ALBUM SOLAR (MUÉRDAGO),VISCUM ALBUM,Para cuando la demanda del ser; es tan grande que de no ser suplida; induce a procesos degenerativos. Útil en cualquier situación de grave perturbación celular.,,Spray oral; Gotas,activo
prod_296,ESENCIAS FLORALES,ZANAHORIA SALVAJE (DAUCUS CAROTA),DAUCUS CAROTA,Es un buen tónico a nivel ocular; mejora y alivia los problemas relacionados con la visión. Permite disminuir la actividad incesante de la mente. Útil para el cansancio mental por abuso.,,Spray oral; Gotas,activo
prod_297,ESENCIAS FLORALES,ZARZAMORA (RUBUS FRUCTICOSA),RUBUS FRUCTICOSA,Es útil para superar la inercia y la indolencia. Estimula las experiencias oníricas y la posibilidad de trabajar a este nivel.,,Spray oral; Gotas,activo
prod_298,ESENCIAS FLORALES,ZINIA (ZINNIA ELEGANS),ZINNIA ELEGANS,Incrementa las capacidades lúdicas y relaja las tensiones serias de la vida. Da sensación de ligereza y trivialidad a la vida cotidiana.,,Spray oral; Gotas,activo
prod_299,ESENCIAS FLORALES,ELÍXIR DE LAS SIETE FLORES,Siete Flores,De gran utilidad en cualquier situación de crisis o urgencia. Es una combinación con un amplísimo campo de acción.,,Spray oral; Gotas,activo
prod_300,ESENCIAS FLORALES,ORQUÍDEA AGRESIÓN (ACINETA SUPERBA),ACINETA SUPERBA,Ayuda a liberar energías reprimidas; como la sexualidad; el instinto de conservación y la agresividad esta última entendida como fuerza vital y no como violencia. Su uso es de gran precaución.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 30 (291-300) anexado correctamente.')
