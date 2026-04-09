import pandas as pd
import os

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

def audit_csv(file_path):
    print(f"--- Iniciando Auditoría de {os.path.basename(file_path)} ---\n")
    
    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        print(f"Error al leer el archivo: {e}")
        return

    # 1. Conteo básico
    total_rows = len(df)
    print(f"1. Total de registros: {total_rows}")

    # 2. Verificación de duplicados en Patología
    duplicates = df[df.duplicated('patologia', keep=False)]
    if not duplicates.empty:
        print(f"2. ALERTA: Patologías duplicadas encontradas:\n{duplicates[['id_protocolo', 'patologia']]}")
    else:
        print("2. No se encontraron patologías duplicadas.")

    # 3. Verificación de valores nulos críticos
    null_patologia = df['patologia'].isnull().sum()
    if null_patologia > 0:
        print(f"3. ALERTA: Hay {null_patologia} registros sin nombre de patología.")
    else:
        print("3. Todos los registros tienen nombre de patología.")

    # 4. Busqueda de caracteres extraños o remanentes de OCR
    ocr_artifacts = df[df.apply(lambda row: row.astype(str).str.contains(r'\[\d+\]').any(), axis=1)]
    if not ocr_artifacts.empty:
        print(f"4. ALERTA: Se encontraron posibles restos de OCR (ej. [1], [2]):\n{ocr_artifacts[['id_protocolo', 'patologia']]}")
    else:
        print("4. No se detectaron restos de OCR visibles.")

    # 5. Verificación de separadores inconsistentes (buscando comas donde no debe haber)
    # Nota: El CSV usa comas para separar columnas, por lo que pandas ya leyó eso. 
    # Buscaremos si hay "|" que se nos haya escapado.
    pipes_found = df[df.apply(lambda row: row.astype(str).str.contains(r'\|').any(), axis=1)]
    if not pipes_found.empty:
        print(f"5. ALERTA: Se encontraron pipes '|' en el contenido.")
    else:
        print("5. No se encontraron pipes '|'. Limpieza de separadores exitosa.")

    # 6. Verificación de espacios en blanco al inicio o final
    def has_whitespace(val):
        if isinstance(val, str):
            return val != val.strip()
        return False

    whitespace_rows = df[df.apply(lambda row: row.map(has_whitespace).any(), axis=1)]
    if not whitespace_rows.empty:
        print(f"6. NOTA: Se encontraron {len(whitespace_rows)} filas con espacios en blanco adicionales (leading/trailing).")
    else:
        print("6. No hay espacios en blanco innecesarios.")

    print("\n--- Auditoría Finalizada ---")

audit_csv(target_csv)
