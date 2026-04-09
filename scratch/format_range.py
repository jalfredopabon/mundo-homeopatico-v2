import pandas as pd

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

def format_range_principios(file_path, start_row, end_row):
    df = pd.read_csv(file_path)
    
    # En pandas, el índice es 0-based. 
    # CSV fila 1 es header (index None).
    # CSV fila 192 es index 190.
    # Usamos .iloc para el rango específico.
    # Nota: el rango en iloc es [inicio:fin] donde fin no se incluye.
    
    start_idx = start_row - 2 # Ajuste para header y zero-based
    end_idx = end_row - 1     # Ajuste para incluir la fila final
    
    # Aplicar capitalize solo al rango
    df.loc[start_idx:end_idx, 'principios_activos'] = df.loc[start_idx:end_idx, 'principios_activos'].astype(str).str.capitalize()
    
    df.to_csv(file_path, index=False, encoding='utf-8')
    print(f"Formateo de principios_activos en el rango {start_row}-{end_row} completado.")

# Ejecutamos para el rango solicitado
format_range_principios(target_csv, 192, 390)
