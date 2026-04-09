import pandas as pd

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

def format_nombre_master(file_path):
    df = pd.read_csv(file_path)
    
    # Aplicar Capitalize a la columna 'nombre'
    # Ejemplo: "CALCIUM PHOSPHORICUM" -> "Calcium phosphoricum"
    df['nombre'] = df['nombre'].str.capitalize()
    
    df.to_csv(file_path, index=False, encoding='utf-8')
    print("Transformación de 'nombre' a Sentence Case en Vademécum Maestro completada.")

format_nombre_master(target_csv)
