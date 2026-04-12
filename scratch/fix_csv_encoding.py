import os

files_to_fix = [
    r'C:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv',
    r'C:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos_enriquecido.csv'
]

def fix_file(file_path):
    if not os.path.exists(file_path):
        print(f"No existe: {file_path}")
        return

    # Intentar leer el archivo. 
    # Si vemos "Ã³", es que el archivo está en UTF-8 pero se guardó mal anteriormente.
    # O tal vez esté en ISO-8859-1.
    
    try:
        # 1. Intentar leer como latin-1 (que nunca falla) para detectar mojibake
        with open(file_path, 'rb') as f:
            content = f.read()
        
        # Intentar decodificar como utf-8. Si falla, es que es puramente latin-1.
        try:
            text = content.decode('utf-8')
            print(f"Archivo {os.path.basename(file_path)} detectado como UTF-8.")
        except UnicodeDecodeError:
            text = content.decode('latin-1')
            print(f"Archivo {os.path.basename(file_path)} detectado como Latin-1. Convirtiendo...")

        # 2. Guardar como UTF-8 con BOM (sig-utf-8) para compatibilidad total con Excel y Web
        with open(file_path, 'w', encoding='utf-8-sig') as f:
            f.write(text)
        
        print(f"Éxito: {os.path.basename(file_path)} reparado y guardado como UTF-8-sig.")

    except Exception as e:
        print(f"Error procesando {file_path}: {e}")

if __name__ == "__main__":
    for f in files_to_fix:
        fix_file(f)
