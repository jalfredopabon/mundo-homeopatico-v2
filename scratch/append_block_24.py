import os

csv_content = """prod_231,ESENCIAS FLORALES,AMARANTO (AMARANTHUS HIPOCHONDRIACUS),AMARANTHUS HIPOCHONDRIACUS,Proporciona equilibrio y paz; útil como inmunológico. Incrementa la atención y claridad mental. Especial para los estados psicológicos alterados con posible alteración bioquímica.,,Spray oral; Gotas,activo
prod_232,ESENCIAS FLORALES,AMAPOLA (PAPAVER RHOEAS),PAPAVER RHOEAS,Para entender y aceptar el rol en la propia vida; y descubrir la misión o vocación en la vida. Útil en procesos degenerativos del sistema nervioso. Para la tranquilidad y lucidez mental.,,Spray oral; Gotas,activo
prod_233,ESENCIAS FLORALES,ÁRNICA (ARNICA MONTANA),ARNICA MONTANA,Cuando se presenta pérdida de contacto con el Yo; debido a daños producidos por traumatismos agudos.,,Spray oral; Gotas,activo
prod_234,ESENCIAS FLORALES,BELLIS (BELLIS PERENNIS),BELLIS PERENNIS,Da lucidez mental; permite asimilar la información recibida. Para los que deben planificar sus proyectos y organizar una actividad.,,Spray oral; Gotas,activo
prod_235,ESENCIAS FLORALES,BERGAMOTA (CITRUS BERGAMIA),CITRUS BERGAMIA,Es un analgésico y antiséptico; ideal ante virosis. Sirve como antiespasmódico ante la tensión física producida por estrés. Incrementa el nivel de cicatrización en heridas leves. Su uso se extiende ante la bronquitis; fiebre; herpes e indigestión.,,Spray oral; Gotas,activo
prod_236,ESENCIAS FLORALES,BETÓNICA (STACHYS OFFICINALIS),STACHYS OFFICINALIS,Ideal en tratamientos en los que se requiere abstinencia sexual. Permite un mayor control de sí mismo.,,Spray oral; Gotas,activo
prod_237,ESENCIAS FLORALES,BISTORTA (POLYGONUM BISTORTA),POLYGONUM BISTORTA,Incrementa la atención y la concentración en personas dispersas. Ayuda en problemas de aprendizaje.,,Spray oral; Gotas,activo
prod_238,ESENCIAS FLORALES,BORRAJA (BORAGO OFFICINALIS),BORAGO OFFICINALIS,Da coraje interior frente a los problemas que producen tristeza y abatimiento. Facilita la obtención de oxígeno a grandes alturas. Suaviza las tensiones del cuerpo emocional.,,Spray oral; Gotas,activo
prod_239,ESENCIAS FLORALES,BOTÓN DE ORO (RANUNCULUS ACRIS),RANUNCULUS ACRIS,Incrementa la autoestima; permite que la persona se acepte y reconozca su valor. Para las personas que constantemente están pidiendo disculpas sin causa real.,,Spray oral; Gotas,activo
prod_240,ESENCIAS FLORALES,CALABACÍN (CUCURBITA PEPO),CUCURBITA PEPO,Normaliza los desarreglos del sistema hormonal en la mujer; armoniza el embarazo haciendo que este sea gozoso y estimula la creatividad femenina; permitiendo un incremento de la intuición.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 24 (231-240) anexado correctamente.')
