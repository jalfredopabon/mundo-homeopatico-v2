import csv
import io
import re

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

rows = []
header = None

with open(target_csv, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        if not row: continue
        # 1. Unificar separadores | a ;
        cleaned_row = [cell.replace(' | ', '; ').replace('|', ';') for cell in row]
        
        # 2. Limpiar espacios antes de ;
        cleaned_row = [cell.replace(' ;', ';') for cell in cleaned_row]
        
        # 3. Normalizar Nombres (Columna C / index 2) a UPPERCASE
        cleaned_row[2] = cleaned_row[2].upper()
        
        # 4. Corregir errores de OCR específicos
        # arterioes-clerosis -> arterioesclerosis
        cleaned_row[4] = cleaned_row[4].replace('arterioes-clerosis', 'arterioesclerosis')
        # P hosphoricum -> Phosphoricum
        cleaned_row[3] = cleaned_row[3].replace('P hosphoricum', 'Phosphoricum')
        cleaned_row[4] = cleaned_row[4].replace('P hosphoricum', 'Phosphoricum')
        # Calciúm -> Calcium
        cleaned_row[3] = cleaned_row[3].replace('Calciúm', 'Calcium')
        cleaned_row[4] = cleaned_row[4].replace('Calciúm', 'Calcium')
        
        # 5. Normalizar puntuación en Indicaciones (Columna E / index 4)
        # Cambiar . por ; si hay una lista de síntomas (ej: "Sintoma. Sintoma." -> "Sintoma; Sintoma;")
        # Pero no si es al final de una frase o en decimales.
        # Regla simple: ". " seguido de mayúscula se vuelve "; "
        cleaned_row[4] = re.sub(r'\.\s+([A-ZÁÉÍÓÚ])', r'; \1', cleaned_row[4])
        
        # 6. Eliminar semicolons duplicados ";;" o "; ;"
        cleaned_row = [re.sub(r';\s*;\s*', r'; ', cell) for cell in cleaned_row]
        # Eliminar punto y coma al final de las celdas
        cleaned_row = [cell.strip().rstrip(';') for cell in cleaned_row]
        
        rows.append(cleaned_row)

# Escribir el archivo limpio
with open(target_csv, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(rows)

print(f'Limpieza profunda completada en {len(rows)} filas.')
