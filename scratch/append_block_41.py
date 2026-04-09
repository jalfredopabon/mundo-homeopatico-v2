import os

csv_content = """prod_401,OLIGOTERAPIA,ALUMINIO - LITIO - COBALTO,Aluminio; Litio; Cobalto,Neurología; psiquiatría: Problemas de memoria y Sueño.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_402,OLIGOTERAPIA,MANGANESO - COBRE - COBALTO,Manganeso; Cobre; Cobalto,Refuerzo inmunológico; combate la fatiga y el estrés oxidativo. Coadyudante en anemia y estados asténicos.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_403,OLIGOTERAPIA,MANGANESO - COBRE,Manganeso; Cobre,Fortalece el sistema inmunológico; mejora respuestas a alergias y afecciones respiratorias.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_404,OLIGOTERAPIA,MANGANESO - COBALTO,Manganeso; Cobalto,Trastornos circulatorios venosos y arteriales. Pesadez de piernas; varices; hipertensión crónica. Ansiedad y pérdida de memoria.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_405,OLIGOTERAPIA,MAGNESIO - COBALTO,Magnesio; Cobalto,Bloqueos digestivos y manifestaciones espasmódicas (aerofagia; hipo). Espasmos y bloqueos vasculares.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_406,OLIGOTERAPIA,MAGNESIO - COBRE,Magnesio; Cobre,Irritabilidad neuromuscular. Presente en todas las algias y espasmos. Infecciones e inflamaciones crónicas.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_407,OLIGOTERAPIA,MAGNESIO - COBRE - COBALTO,Magnesio; Cobre; Cobalto,Bloqueos digestivos y manifestaciones espasmódicas. Tratamiento de la arteritis de miembros inferiores.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_408,OLIGOTERAPIA,COBRE - ORO - PLATA,Cobre; Oro; Plata,Fatiga global que el reposo no quita. Fenómenos depresivos; abulia y desaparición del entusiasmo. Anergia.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_409,OLIGOTERAPIA,ZINC - NIQUEL - COBALTO,Zinc; Níquel; Cobalto,Diurético; ayuda en dietas de control de peso. Calma la ansiedad de comer.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_410,OLIGOTERAPIA,NIQUEL - COBALTO,Níquel; Cobalto,Difíciles digestiones de grasas; fermentaciones y estreñimiento.,,Gotas por 30 ml; Glóbulos x 25 g,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 41 (401-410) anexado correctamente.')
