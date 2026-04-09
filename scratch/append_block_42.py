import os

csv_content = """prod_411,OLIGOTERAPIA,ALUMINIO,Aluminio,Retraso intelectual leve; Disminución de la memoria; Insomnio por estrés intelectual. Regulador del sistema nervioso.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_412,OLIGOTERAPIA,AZUFRE,Azufre,Disfunción Hepato-biliar; uñas y cabellos frágiles; acné. Importante detoxicante hepático y favorece la secreción biliar.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_413,OLIGOTERAPIA,BISMUTO,Bismuto,Tratamiento de Anginas; Faringitis; laringitis; otitis; sinusitis. Permite reducir el empleo de antibióticos en infecciones ORL.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_414,OLIGOTERAPIA,CALCIO,Calcio,Balancear el sistema nervioso; constituir los huesos; los dientes y llevar un óptimo nivel de coagulación de la sangre.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_415,OLIGOTERAPIA,COBALTO,Cobalto,Componente esencial de la vitamina B12. Contribuye a reducir la presión arterial; dilatar vasos sanguíneos y fijar la glucosa en los tejidos.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_416,OLIGOTERAPIA,COBRE,Cobre,Estimula el sistema inmunitario. Útil en procesos inflamatorios e infecciosos.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_417,OLIGOTERAPIA,CROMO,Cromo,Potencia la acción de la insulina y favorece la entrada de glucosa a las células. Su contenido decrece con la edad.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_418,OLIGOTERAPIA,FLÚOR,Flúor,Prevención de la caries dental y fortalecimiento de la estructura ósea.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_419,OLIGOTERAPIA,FÓSFORO,Fósforo,Constituye huesos y dientes; proporciona reacciones energéticas y participa en la formación de proteínas.,,Gotas por 30 ml; Glóbulos x 25 g,activo
prod_420,OLIGOTERAPIA,HIERRO,Hierro,Fundamental para el transporte de oxígeno en la sangre. Su carencia ocasiona fatiga y anemia.,,Gotas por 30 ml; Glóbulos x 25 g,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 42 (411-420) anexado correctamente.')
