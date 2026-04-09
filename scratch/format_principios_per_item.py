import pandas as pd

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

def format_principios_per_item(file_path, start_row, end_row):
    df = pd.read_csv(file_path)
    
    start_idx = start_row - 2
    end_idx = end_row - 1
    
    def process_cell(text):
        if not isinstance(text, str) or text.lower() == 'nan':
            return text
        
        # Separar por punto y coma
        parts = text.split(';')
        
        # Procesar cada parte: Limpiar espacios y Capitalizar
        processed_parts = [p.strip().capitalize() for p in parts if p.strip()]
        
        # Unir de nuevo con el separador estándar
        return '; '.join(processed_parts)

    df.loc[start_idx:end_idx, 'principios_activos'] = df.loc[start_idx:end_idx, 'principios_activos'].apply(process_cell)
    
    df.to_csv(file_path, index=False, encoding='utf-8')
    print(f"Refinamiento de principios_activos (Capitalize por elemento) en el rango {start_row}-{end_row} completado.")

format_principios_per_item(target_csv, 192, 390)
