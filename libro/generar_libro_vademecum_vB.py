import csv
import os
import unicodedata
from datetime import datetime
from collections import defaultdict

# Rutas de archivos
BASE_PATH = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2'
CSV_MAESTRO = os.path.join(BASE_PATH, 'carpeta_temporal_tablas', 'vademecum_maestro.csv')
CSV_PROTOCOLOS = os.path.join(BASE_PATH, 'carpeta_temporal_tablas', 'vademecum_protocolos.csv')
OUTPUT_HTML = os.path.join(BASE_PATH, 'vademecum_digital_mh_v2.html')

def leer_csv(ruta):
    data = []
    if not os.path.exists(ruta):
        print(f"Error: No se encontró {ruta}")
        return data
    with open(ruta, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row.get('estado', 'activo').lower() == 'activo':
                data.append(row)
    return data

def normalizar_texto(texto):
    if not texto: return ""
    return ''.join(c for c in unicodedata.normalize('NFD', texto)
                  if unicodedata.category(c) != 'Mn').upper()

def slugify(text):
    import re
    return re.sub(r'[^a-z0-9]', '-', text.lower()).strip('-')

def generar_html(productos, protocolos):
    # Ordenar productos alfabéticamente para el índice general
    productos_alfabeticos = sorted(productos, key=lambda x: normalizar_texto(x['nombre'].strip()))
    
    # Agrupar productos por categoría (Línea)
    # Si un producto tiene varias líneas separadas por coma, lo duplicamos
    productos_por_categoria = defaultdict(list)
    for p in productos:
        lineas = [l.strip() for l in p.get('linea', 'General').split(',')]
        for linea in lineas:
            productos_por_categoria[linea].append(p)
    
    # Ordenar productos dentro de cada categoría
    for cat in productos_por_categoria:
        productos_por_categoria[cat].sort(key=lambda x: normalizar_texto(x['nombre'].strip()))
    
    categorias_ordenadas = sorted(productos_por_categoria.keys())
    protocolos.sort(key=lambda x: x['patologia'].strip().upper())

    fecha_hoy = datetime.now().strftime('%d/%m/%Y')

    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vademécum Mundo Homeopático - Versión B (Segmentada)</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500&display=swap');
        
        :root {{
            --primary: #0284c7;
            --primary-dark: #0369a1;
            --accent: #f59e0b;
            --text-main: #1e293b;
            --text-sub: #64748b;
            --bg-body: #f8fafc;
            --bg-card: #ffffff;
            --border: #e2e8f0;
            --radius: 12px;
        }}

        * {{ box-sizing: border-box; -webkit-print-color-adjust: exact; scroll-behavior: smooth; }}
        
        body {{ 
            font-family: 'Inter', sans-serif; 
            margin: 0; padding: 0; 
            color: var(--text-main);
            line-height: 1.6;
            background-color: var(--bg-body);
        }}

        h1, h2, h3, h4 {{ font-family: 'Outfit', sans-serif; margin: 0; }}

        .text-xs {{ font-size: 0.7rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }}
        .text-sm {{ font-size: 0.85rem; color: var(--text-sub); }}
        .text-brand {{ color: var(--primary); font-weight: 600; }}

        @page {{
            size: A4;
            margin: 1.5cm 2cm;
            @bottom-center {{
                content: "Página " counter(page);
                font-size: 9pt;
                color: #94a3b8;
            }}
        }}

        @media print {{
            body {{ background-color: white; }}
            .page-break {{ page-break-before: always; }}
            .no-print {{ display: none !important; }}
            .book-container {{ box-shadow: none !important; margin: 0 !important; width: 100% !important; max-width: none !important; padding: 0 !important; }}
            .product-card {{ border-bottom: 1px solid #eee; margin-bottom: 20px; page-break-inside: avoid; }}
        }}

        .book-container {{
            width: 95%;
            max-width: 1100px;
            margin: 2rem auto;
            background: var(--bg-card);
            box-shadow: 0 20px 50px -12px rgba(0,0,0,0.05);
            padding: 3rem 4rem;
            min-height: 100vh;
        }}

        .cover {{
            height: 85vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
        }}
        
        .cover-badge {{
            background: var(--primary);
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 2rem;
        }}

        .cover h1 {{ font-size: 4rem; line-height: 1; color: var(--text-main); margin-bottom: 0.5rem; }}
        .cover h2 {{ font-size: 1.5rem; color: var(--text-sub); font-weight: 300; }}

        .category-separator {{
            background: none;
            color: var(--text-main);
            padding: 4rem 0 2rem 0;
            margin: 4rem 0 2rem 0;
            text-align: left;
            border-bottom: 1px solid var(--border);
            page-break-before: always;
        }}
        .category-separator h2 {{ 
            font-size: 2.8rem; 
            color: var(--primary); 
            text-transform: uppercase; 
            letter-spacing: 2px;
            margin-bottom: 0.5rem;
        }}
        .category-separator p {{ 
            opacity: 0.7; 
            font-weight: 400; 
            font-size: 1rem;
            color: var(--text-main);
        }}

        .letter-marker {{
            font-size: 2.5rem;
            color: var(--primary);
            font-weight: 800;
            border-bottom: 2px solid var(--border);
            margin: 3rem 0 1.5rem 0;
            display: block;
        }}

        .product-card {{
            padding: 2rem 0;
            border-bottom: 1px solid var(--border);
            page-break-inside: avoid;
        }}
        
        .product-header {{ display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }}
        .product-title {{ font-size: 1.75rem; color: var(--primary-dark); }}
        .product-line {{ background: var(--bg-body); padding: 0.2rem 0.8rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; color: var(--text-sub); }}

        .product-grid {{ display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; }}
        
        .info-group {{ margin-bottom: 1.2rem; }}
        .info-label {{ font-size: 0.7rem; font-weight: 700; color: var(--text-sub); text-transform: uppercase; margin-bottom: 0.3rem; display: block; }}
        .info-content {{ font-size: 0.95rem; line-height: 1.5; }}
        
        .posologia-box {{ background: #f0f9ff; padding: 1rem; border-radius: var(--radius); border-left: 4px solid var(--primary); }}

        .protocol-table {{
            width: 100%;
            border-collapse: collapse;
            font-size: 0.85rem;
            background: white;
        }}
        
        .protocol-table th {{
            text-align: left;
            padding: 1rem;
            background: var(--text-main);
            color: white;
            font-weight: 600;
        }}
        
        .protocol-table td {{
            padding: 1.2rem 1rem;
            border-bottom: 1px solid var(--border);
            vertical-align: top;
        }}

        .badge-list {{ display: flex; flex-wrap: wrap; gap: 0.5rem; }}
        .badge {{ background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; }}
    </style>
</head>
<body>

    <div class="book-container">
        
        <!-- COVER -->
        <section class="cover" id="inicio" style="position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 95vh; padding: 6rem 2rem;">
            
            <div style="z-index: 10; text-align: center; width: 100%;">
                <div class="cover-badge" style="margin-bottom: 2.5rem;">EDICIÓN CORPORATIVA • VERSIÓN B (SEGMENTADA)</div>
                <h1 style="margin-bottom: 0.5rem; font-size: 3.5rem; width: 100%; text-align: center;">Vademécum</h1>
                <h2 style="font-weight: 400; letter-spacing: 4px; font-size: 1.6rem; color: var(--text-main); margin-bottom: 2.5rem; line-height: 1.4; text-align: center; width: 100%; display: block;">MUNDO HOMEOPÁTICO</h2>
                <p style="color: var(--text-sub); font-weight: 300; font-style: italic; font-size: 1.1rem; max-width: 450px; margin: 0 auto 5rem auto;">
                    "Estructura profesional por líneas terapéuticas y especialidades"
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; max-width: 600px; margin: 0 auto; font-size: 0.85rem; color: var(--text-sub); font-weight: 500;">
                    <span>{fecha_hoy}</span>
                    <span style="letter-spacing: 3px; color: var(--primary);">VERSION B</span>
                    <span>BOGOTÁ, COLOMBIA</span>
                </div>
            </div>
        </section>

        <div class="page-break"></div>

        <!-- ÍNDICE GENERAL ALFABÉTICO (Global) -->
        <section id="indice" style="padding-bottom: 3rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2rem; border-bottom: 2px solid var(--primary); padding-bottom: 1rem;">
                <h2 style="font-size: 2.2rem; margin: 0;">Índice General A-Z</h2>
            </div>
            <p style="color: var(--text-sub); margin-bottom: 2rem; font-size: 0.9rem;">Búsqueda rápida de todos los productos por orden alfabético global.</p>
            <div style="column-count: 3; column-gap: 2rem; font-size: 0.75rem; line-height: 1.5;">
                {generar_indice_global(productos_alfabeticos)}
            </div>
        </section>

        <!-- SECCIONES POR CATEGORÍA -->
        {generar_bloques_categorias(productos_por_categoria, categorias_ordenadas)}

        <div class="page-break"></div>

        <!-- PROTOCOLOS -->
        <section id="protocolos" style="margin-top: 6rem;">
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Protocolos Clínicos</h2>
            <table class="protocol-table">
                <thead>
                    <tr>
                        <th style="width: 25%;">Patología</th>
                        <th style="width: 25%;">Medicamentos Principales</th>
                        <th style="width: 50%;">Complementarios y Soporte</th>
                    </tr>
                </thead>
                <tbody>
                    {generar_filas_protocolos(protocolos)}
                </tbody>
            </table>
        </section>

    </div>

    <div class="no-print" style="position: fixed; bottom: 20px; right: 20px; display: flex; gap: 10px;">
        <a href="#inicio" style="background: var(--primary); color: white; padding: 10px 15px; border-radius: 50px; text-decoration: none; font-size: 0.8rem;">↑ Inicio</a>
        <a href="#indice" style="background: var(--text-main); color: white; padding: 10px 15px; border-radius: 50px; text-decoration: none; font-size: 0.8rem;">Índice A-Z</a>
    </div>

</body>
</html>
"""
    return html

def generar_indice_global(productos):
    items = []
    current_letter = None
    for p in productos:
        nombre = p.get('nombre', '').strip()
        if not nombre: continue
        letra = normalizar_texto(nombre)[0] if nombre else '#'
        if not letra.isalpha(): letra = '#'
        if letra != current_letter:
            current_letter = letra
            items.append(f'<div style="margin-top: 1rem; font-weight: 800; color: var(--primary);">{current_letter}</div>')
        pid = slugify(nombre)
        items.append(f'<div style="margin-bottom: 1px;"><a href="#prod-{pid}" style="color: var(--text-main); text-decoration: none;">• {nombre}</a></div>')
    return "\n".join(items)

def generar_bloques_categorias(grupos, categorias):
    output = []
    # Encabezado General del Catálogo
    output.append("""
    <section id="catalogo-header" style="text-align: left; padding: 6rem 0; page-break-before: always; margin-bottom: 2rem;">
        <h2 style="font-size: 3.5rem; color: var(--text-main); margin-bottom: 0.5rem;">Catálogo de Productos</h2>
        <p style="font-size: 1.2rem; color: var(--text-sub); font-weight: 300; max-width: 800px; margin: 0;">
            Fichas técnicas organizadas alfabéticamente para consulta rápida.
        </p>
    </section>
    """)
    
    for cat in categorias:
        output.append(f'<div class="category-separator"><h2>{cat}</h2><p>Catálogo de Productos - Línea Especializada</p></div>')
        
        current_letter = None
        for p in grupos[cat]:
            nombre = p.get('nombre', '')
            letra = normalizar_texto(nombre)[0] if nombre else '#'
            if not letra.isalpha(): letra = '#'
            
            if letra != current_letter:
                current_letter = letra
                output.append(f'<div class="letter-marker">{current_letter}</div>')
            
            pid = slugify(nombre)
            output.append(f"""
            <article class="product-card" id="prod-{pid}">
                <div class="product-header">
                    <h3 class="product-title">{nombre}</h3>
                    <span class="product-line">{cat}</span>
                </div>
                <div class="product-grid">
                    <div class="main-info">
                        <div class="info-group">
                            <span class="info-label">Acción Terapéutica</span>
                            <div class="info-content" style="font-weight: 500;">{p.get('principios_activos', '-')}</div>
                        </div>
                        <div class="info-group">
                            <span class="info-label">Indicaciones</span>
                            <div class="info-content">{p.get('indicaciones', '-').replace('^', '<br>')}</div>
                        </div>
                    </div>
                    <div class="side-info">
                        <div class="info-group posologia-box">
                            <span class="info-label">Posología Sugerida</span>
                            <div class="info-content" style="font-size: 0.85rem;">{p.get('posologia', 'Consulte a su médico')}</div>
                        </div>
                        <div class="info-group">
                            <span class="info-label">Presentación</span>
                            <div class="info-content text-sm">{p.get('presentaciones', '-')}</div>
                        </div>
                    </div>
                </div>
            </article>
            """)
    return "\n".join(output)

def generar_filas_protocolos(protocolos):
    rows = []
    for pr in protocolos:
        principales = pr.get('principales', '-').split(',')
        principales_html = '<div class="badge-list">' + "".join([f'<span class="badge">{x.strip()}</span>' for x in principales if x.strip()]) + '</div>'
        rows.append(f"""
        <tr>
            <td><span style="font-weight: 700; color: var(--primary-dark);">{pr.get('patologia', 'N/A')}</span></td>
            <td>{principales_html}</td>
            <td>
                <div class="text-sm"><strong>Comp:</strong> {pr.get('complementarios', '-')}</div>
                <div class="text-xs" style="margin-top: 5px; opacity: 0.7;">Oligo: {pr.get('oligoelementos', '-')} | Tópicos: {pr.get('topicos', '-')}</div>
            </td>
        </tr>
        """)
    return "\n".join(rows)

if __name__ == "__main__":
    print("Iniciando generación de Versión B (Categorizada)...")
    products = leer_csv(CSV_MAESTRO)
    protocols = leer_csv(CSV_PROTOCOLOS)
    html_content = generar_html(products, protocols)
    with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"SUCCESS: Versión B generada en {OUTPUT_HTML}")
