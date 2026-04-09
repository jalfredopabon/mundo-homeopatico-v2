import pandas as pd

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

def format_linea(file_path):
    df = pd.read_csv(file_path)
    
    # Aplicar Capitalize a la columna 'linea'
    # Esto asegura: "LINEA MH" -> "Linea mh" o "COMPLEJOS" -> "Complejos"
    df['linea'] = df['linea'].str.capitalize()
    
    df.to_csv(file_path, index=False, encoding='utf-8')
    print("Transformación de 'linea' a Sentence Case en Vademécum Maestro completada.")

format_linea(target_csv)
