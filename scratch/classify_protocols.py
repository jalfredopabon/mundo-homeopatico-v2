import csv
import os

# Rutas de archivos
INPUT_CSV = r'C:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'
OUTPUT_CSV = r'C:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos_enriquecido.csv'

# Mapeo de Sistemas y Palabras Clave (Minúsculas para matching flexible)
SISTEMAS = {
    "Digestivo": [
        "acidez", "gástrica", "cólico", "colitis", "estreñimiento", "diarrea", "gastritis", 
        "digestión", "flatulencia", "halitosis", "hígado", "hepatitis", "hemorroides", 
        "parásitos", "helmintiasis", "amebiasis", "lombrices", "oxiuriasis", "úlcera gástrica",
        "reflujo", "pancreatitis", "vómito", "náuseas", "colelitiasis", "cirrosis", 
        "anorexia", "inapetencia", "gingivitis", "prolapso", "dispepsia", "diverticulitis"
    ],
    "Respiratorio": [
        "asma", "bronquitis", "tos", "gripe", "rinitis", "sinusitis", "faringitis", "laringitis", 
        "pulmonar", "enfisema", "neumonía", "amigdalitis", "coriza", "catarro", "disnea", 
        "pólipo nasal", "ronquera", "afonía"
    ],
    "Nervioso / Psicología": [
        "ansiedad", "insomnio", "depresión", "miedos", "estrés", "pánico", "agorafobia", 
        "claustrofobia", "histeria", "vértigo", "mareos", "nerviosismo", "alzheimer", 
        "párkinson", "epilepsia", "parálisis", "cefalea", "migraña", "memoria", "aprendizaje",
        "neuralgia", "agotamiento", "debilidad", "convalecencia", "convulsiones", "apoplejía",
        "tics", "neuritis"
    ],
    "Osteoarticular": [
        "artritis", "artrosis", "reumatismo", "ciática", "lumbar", "esguince", "fractura", 
        "osteoporosis", "gota", "ácido úrico", "tendinitis", "mialgias", "calambres", 
        "coxalgias", "deformaciones óseas", "huesos", "calcificación", "descalcificación",
        "artralgia", "raquitismo"
    ],
    "Dermatológico": [
        "acné", "dermatitis", "psoriasis", "herpes", "eccema", "urticaria", "hongos", 
        "micosis", "celulitis", "cicatrices", "quemadura", "prurito", "abscesos", 
        "forúnculos", "furunculosis", "alopecia", "caspa", "pediculosis", "verrugas", 
        "vitíligo", "piel", "intertrigo", "impétigo", "escabiósis", "comedones", 
        "gangrena", "costra láctea", "tiña", "ulcus", "queloide"
    ],
    "Genitourinario": [
        "cistitis", "nefritis", "uretritis", "próstata", "adenoma", "erectil", "impotencia", 
        "menopausia", "dismenorrea", "amenorrea", "leucorrea", "vaginitis", "mioma", 
        "ovarios", "útero", "frigidez", "cálculos renales", "nefrolitiasis", "incontinencia",
        "anexitis", "endometritis", "mastitis", "mamario", "menorragia", "metrorragia", 
        "disuria", "pápulas", "condiloma"
    ],
    "Cardiovascular": [
        "hipertensión", "hipotensión", "varices", "venosa", "circulación", "corazón", 
        "taquicardia", "arritmia", "angina", "hemorragia", "arteriosclerosis", "infarto", 
        "palpitaciones", "edema", "anemia", "hematoma", "flebitis", "aneurisma", "colesterol"
    ],
    "Inmunológico / Infeccioso": [
        "fiebre", "defensas", "infección", "virus", "virosis", "bacterias", "adenitis", 
        "mononucleosis", "escarlatina", "sarampión", "erisipela", "antibiótico", "vacunas",
        "otitis", "antiviral"
    ],
    "Oftalmológico": [
        "conjuntivitis", "orzuelo", "cataratas", "blefaritis", "ojos", "vista", "queratitis", 
        "glaucoma", "macular", "estrabismo"
    ],
    "Endocrino / Metabólico": [
        "diabetes", "tiroides", "obesidad", "adelgazamiento", "hipotiroidismo", "hipertiroidismo",
        "dislipidemia", "colesterol", "triglicéridos", "ácido úrico", "adiposis", "crecimiento",
        "hormonal"
    ],
    "Oncológico": [
        "cáncer", "neoplasia", "tumor", "precancerosis", "quiste", "quimioterapia", 
        "linfoma", "sarcoma", "fibroma"
    ]
}

def clasificar_patologia(nombre_patologia):
    name_lower = nombre_patologia.lower()
    for sistema, keywords in SISTEMAS.items():
        for key in keywords:
            if key in name_lower:
                return sistema
    return "General / Otros"

def main():
    if not os.path.exists(INPUT_CSV):
        print(f"Error: No se encuentra el archivo {INPUT_CSV}")
        return

    rows_enriquecidas = []
    
    with open(INPUT_CSV, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames + ['sistema_corporal']
        
        for row in reader:
            # Eliminar espacios extra de los nombres de columnas y valores
            clean_row = {k.strip(): v.strip() for k, v in row.items()}
            patologia = clean_row.get('patologia', '')
            
            # Clasificar
            clean_row['sistema_corporal'] = clasificar_patologia(patologia)
            rows_enriquecidas.append(clean_row)

    # Escribir el nuevo archivo
    with open(OUTPUT_CSV, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows_enriquecidas)
    
    print(f"Éxito: Archivo enriquecido creado en {OUTPUT_CSV}")
    # Breve reporte
    conteo = {}
    for r in rows_enriquecidas:
        s = r['sistema_corporal']
        conteo[s] = conteo.get(s, 0) + 1
    
    print("\nResumen de Clasificación:")
    for s, c in sorted(conteo.items(), key=lambda item: item[1], reverse=True):
        print(f"- {s}: {c} patologías")

if __name__ == "__main__":
    main()
