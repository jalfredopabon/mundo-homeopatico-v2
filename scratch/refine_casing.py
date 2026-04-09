import pandas as pd
import re

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

def refine_casing(file_path):
    df = pd.read_csv(file_path)
    
    def apply_refinement(text):
        if not isinstance(text, str):
            return text
        
        # 1. MH a MAYÚSCULAS (palabra completa)
        text = re.sub(r'\bmh\b', 'MH', text, flags=re.IGNORECASE)
        
        # 2. D followed by numbers a MAYÚSCULAS (ej. d4 -> D4)
        def uppercase_potency(match):
            return match.group(0).upper()
        
        text = re.sub(r'\bd\d+', uppercase_potency, text, flags=re.IGNORECASE)
        
        return text

    df['nombre'] = df['nombre'].apply(apply_refinement)
    
    df.to_csv(file_path, index=False, encoding='utf-8')
    print("Refinamiento de Mayúsculas (D# y MH) completado.")

refine_casing(target_csv)
