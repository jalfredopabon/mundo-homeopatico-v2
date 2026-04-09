import os

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_home_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'
# Corrigiendo ruta si es necesario (el usuario usa mundo_homeopatico_v2)
target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

def fix_csv_structure(file_path):
    fixed_lines = []
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    header = lines[0].strip()
    fixed_lines.append(header)
    
    for i, line in enumerate(lines[1:], 1):
        parts = line.strip().split(',')
        
        # Si la línea tiene más de 8 partes, probablemente es por comas extras al final o campos mal formados
        if len(parts) > 8:
            # En el caso de prot_049, el problema es que hay demasiadas comas vacías entre el campo 3 y el 8
            # Reconstruimos la fila asumiendo el ID y Patología están bien
            new_parts = parts[:3] # ID, Patología, Principales
            # Rellenamos hasta la columna 7
            while len(new_parts) < 7:
                new_parts.append('')
            new_parts.append('activo')
            fixed_lines.append(','.join(new_parts))
        else:
            fixed_lines.append(line.strip())

    with open(file_path, 'w', encoding='utf-8', newline='') as f:
        f.write('\n'.join(fixed_lines))
    
    print("Reparación estructural completada.")

fix_csv_structure(target_csv)
