import pandas as pd

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

def format_patologia(file_path):
    df = pd.read_csv(file_path)
    
    # Aplicar Capitalize (Primera letra Mayúscula, el resto minúscula)
    # Usamos capitalize() en lugar de title() para que solo la primera letra de la CELDA sea mayúscula
    df['patologia'] = df['patologia'].str.capitalize()
    
    df.to_csv(file_path, index=False, encoding='utf-8')
    print("Transformación de 'patologia' a Sentence Case completada.")

format_patologia(target_csv)
