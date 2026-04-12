import os

files_to_fix = [
    r'C:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv',
    r'C:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos_enriquecido.csv'
]

def clean_double_newlines(file_path):
    if not os.path.exists(file_path):
        return

    # 1. Leer el archivo ignorando los saltos de línea automáticos
    # Usamos utf-8-sig para leer el BOM si ya existe
    with open(file_path, 'r', encoding='utf-8-sig') as f:
        # Leer todas las líneas y quitar las que estén vacías o solo tengan espacios
        lines = f.readlines()
    
    # 2. Filtrar líneas que realmente tienen datos
    # strip() elimina espacios y saltos de línea, si queda algo, la línea es válida
    clean_lines = [line.strip() for line in lines if line.strip()]

    # 3. Guardar de nuevo con UTF-8-sig y forzando saltos de línea únicos estilo Unix (\n)
    # que Windows interpreta bien pero sin duplicarlos
    with open(file_path, 'w', encoding='utf-8-sig', newline='') as f:
        f.write('\n'.join(clean_lines) + '\n')
    
    print(f"Reparado: {os.path.basename(file_path)} (Eliminadas filas vacías)")

if __name__ == "__main__":
    for f in files_to_fix:
        clean_double_newlines(f)
