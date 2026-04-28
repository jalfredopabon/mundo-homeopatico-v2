import csv
import os
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
            # Solo incluir si está activo. Si no hay columna estado, incluir por defecto.
            if row.get('estado', 'activo').lower() == 'activo':
                data.append(row)
    return data

def slugify(text):
    import re
    return re.sub(r'[^a-z0-9]', '-', text.lower()).strip('-')

def generar_html(productos, protocolos):
    # Ordenar datos
    productos.sort(key=lambda x: x['nombre'].strip().upper())
    protocolos.sort(key=lambda x: x['patologia'].strip().upper())

    # Agrupar productos por letra inicial
    productos_por_letra = defaultdict(list)
    for p in productos:
        nombre = p.get('nombre', '').strip()
        if not nombre: continue
        letra = nombre[0].upper()
        if not letra.isalpha(): letra = '#'
        productos_por_letra[letra].append(p)
    
    letras_ordenadas = sorted(productos_por_letra.keys())

    fecha_hoy = datetime.now().strftime('%d/%m/%Y')

    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vademécum Mundo Homeopático - Edición Profesional</title>
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
            --radius: 8px;
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

        /* Tipografía Editorial */
        .text-xs {{ font-size: 0.7rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }}
        .text-sm {{ font-size: 0.85rem; color: var(--text-sub); }}
        .text-brand {{ color: var(--primary); font-weight: 600; }}

        /* Estilos de Impresión / PDF */
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

        /* Portada Premium */
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
        .cover h2 {{ font-size: 1.5rem; color: var(--text-sub); font-weight: 300; max-width: 500px; }}
        
        .cover-footer {{
            position: absolute;
            bottom: 2rem;
            width: 100%;
            padding-top: 2rem;
        }}

        /* Índice Dinámico */
        .toc {{ margin-bottom: 6rem; background: #fff; }}
        .toc h2 {{ font-size: 2rem; margin-bottom: 2rem; border-left: 5px solid var(--primary); padding-left: 1rem; }}
        
        .toc-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }}
        .toc-section h3 {{ font-size: 1rem; color: var(--text-sub); text-transform: uppercase; margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }}
        
        .toc ul {{ list-style: none; padding: 0; margin: 0; }}
        .toc li {{ margin-bottom: 0.4rem; }}
        .toc a {{ text-decoration: none; color: var(--text-main); font-size: 0.95rem; display: flex; justify-content: space-between; align-items: baseline; }}
        .toc a:hover {{ color: var(--primary); }}
        .toc a::after {{ content: ""; flex: 1; border-bottom: 1px dotted #cbd5e1; margin: 0 0.5rem; }}
        .toc .dot-less::after {{ display: none; }}

        /* Secciones de Letras */
        .letter-marker {{
            font-size: 3rem;
            color: var(--primary);
            font-weight: 800;
            border-bottom: 4px solid var(--primary);
            margin: 4rem 0 2rem 0;
            display: block;
        }}

        /* Ficha de Producto */
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

        /* Protocolos de Tabla */
        .protocol-section {{ margin-top: 6rem; }}
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
        
        .protocol-table tr:hover {{ background-color: #f8fafc; }}
        .protocol-name {{ font-weight: 700; color: var(--primary-dark); font-size: 1rem; display: block; margin-bottom: 0.3rem; }}

        /* Utilidades */
        .badge-list {{ display: flex; flex-wrap: wrap; gap: 0.5rem; }}
        .badge {{ background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; }}
    </style>
</head>
<body>

    <div class="book-container">
        
        <!-- COVER -->
        <section class="cover" id="inicio" style="position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 95vh; padding: 6rem 2rem;">
            
            <!-- Elementos Decorativos (Esquinas) - Posición más centrada para evitar cortes -->
            <img src="vademecum_libro/flor_1_webp.png" style="position: absolute; top: 10px; left: 15px; width: 220px; opacity: 0.25; pointer-events: none; transform: rotate(-10deg);">
            <img src="vademecum_libro/flor_2_webp.png" style="position: absolute; top: 10px; right: 15px; width: 220px; opacity: 0.25; pointer-events: none; transform: rotate(10deg);">
            <img src="vademecum_libro/flor_3_webp.png" style="position: absolute; bottom: 10px; left: 15px; width: 220px; opacity: 0.25; pointer-events: none;">
            <img src="vademecum_libro/flor_4_webp.png" style="position: absolute; bottom: 10px; right: 15px; width: 220px; opacity: 0.25; pointer-events: none;">

            <!-- Contenido Principal -->
            <div style="z-index: 10; text-align: center; width: 100%;">
                <!-- Logo Principal - Tamaño Reducido -->
                <div style="margin-bottom: 3.5rem;">
                    <img src="vademecum_libro/hoja_principal_webp.png" alt="Logo MH" style="width: 130px; height: auto; display: block; margin: 0 auto;">
                </div>

                <div class="cover-badge" style="margin-bottom: 2.5rem;">EDICIÓN 2026 • SINGLE SOURCE OF TRUTH</div>

                <h1 style="margin-bottom: 0.5rem; font-size: 3.5rem;">Vademécum</h1>
                <h2 style="font-weight: 400; letter-spacing: 4px; font-size: 1.6rem; color: var(--text-main); margin-bottom: 2.5rem; line-height: 1.4;">MUNDO HOMEOPÁTICO<br>CORPORATIVO</h2>
                
                <p style="color: var(--text-sub); font-weight: 300; font-style: italic; font-size: 1.1rem; max-width: 450px; margin: 0 auto 5rem auto;">
                    "Guía Esencial de Remedios Naturales y Terapias"
                </p>
                
                <div class="cover-footer" style="width: 100%; padding-top: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; max-width: 600px; margin: 0 auto; font-size: 0.85rem; color: var(--text-sub); font-weight: 500;">
                        <span>{fecha_hoy}</span>
                        <span style="letter-spacing: 3px; color: var(--primary);">MH V2.0</span>
                        <span>BOGOTÁ, COLOMBIA</span>
                    </div>
                </div>
            </div>
        </section>

        <div class="page-break"></div>

        <!-- DETAILED PRODUCT INDEX -->
        <section id="indice" style="padding-bottom: 3rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2rem; border-bottom: 2px solid var(--primary); padding-bottom: 1rem;">
                <h2 style="font-size: 2.2rem; margin: 0;">Índice General</h2>
                <a href="#protocolos" style="text-decoration: none; color: var(--primary); font-weight: 700; font-size: 1.1rem; border: 2px solid var(--primary); padding: 0.5rem 1rem; border-radius: 50px;">→ Ir a Protocolos Clínicos</a>
            </div>
            
            <p style="color: var(--text-sub); margin-bottom: 2rem; font-size: 0.9rem;">Lista completa de medicamentos organizados alfabéticamente. Haga clic en el nombre para ver la dosificación.</p>
            
            <div style="column-count: 3; column-gap: 2rem; font-size: 0.8rem; line-height: 1.6;">
                {generar_indice_lista_completa(productos)}
            </div>
        </section>

        <div class="page-break"></div>

        <!-- PRODUCTOS -->
        <section id="catalogo">
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Catálogo de Productos</h2>
            <p style="color: var(--text-sub); margin-bottom: 4rem;">Fichas técnicas organizadas alfabéticamente para consulta rápida.</p>

            {generar_bloque_alphabetico(productos_por_letra, letras_ordenadas)}
        </section>

        <div class="page-break"></div>

        <!-- PROTOCOLOS -->
        <section id="protocolos" class="protocol-section">
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Protocolos Clínicos</h2>
            <p style="color: var(--text-sub); margin-bottom: 3rem;">Guía terapéutica basada en medicamentos complejos y complementarios.</p>

            <table class="protocol-table" style="table-layout: auto;">
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

        <footer style="margin-top: 6rem; border-top: 1px solid var(--border); padding-top: 2rem; text-align: center; color: var(--text-sub); font-size: 0.8rem;">
            <p>© {datetime.now().year} Mundo Homeopático. Documento generado por motor de automatización Python.</p>
        </footer>

    </div>

    <!-- Navegación Flotante (no-print) -->
    <div class="no-print" style="position: fixed; bottom: 20px; right: 20px; display: flex; gap: 10px;">
        <a href="#inicio" style="background: var(--primary); color: white; padding: 10px 15px; border-radius: 50px; text-decoration: none; font-size: 0.8rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">↑ Inicio</a>
        <a href="#indice" style="background: var(--text-main); color: white; padding: 10px 15px; border-radius: 50px; text-decoration: none; font-size: 0.8rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">Índice</a>
    </div>

</body>
</html>
"""
    return html

def generar_toc_letras(letras):
    items = []
    for l in letras:
        items.append(f'<li><a href="#letra-{l}">{l}</a></li>')
    return "\n".join(items)

def generar_indice_lista_completa(productos):
    items = []
    for p in productos:
        pid = slugify(p.get('nombre', ''))
        items.append(f'<div style="margin-bottom: 2px;"><a href="#prod-{pid}" style="color: var(--text-main); text-decoration: none;">• {p.get("nombre", "N/A")}</a></div>')
    return "\n".join(items)

def generar_bloque_alphabetico(grupos, letras):
    output = []
    for l in letras:
        letra_html = f'<div id="letra-{l}" class="letter-marker">{l}</div>'
        output.append(letra_html)
        
        for p in grupos[l]:
            pid = slugify(p.get('nombre', ''))
            block = f"""
            <article class="product-card" id="prod-{pid}">
                <div class="product-header">
                    <h3 class="product-title">{p.get('nombre', 'N/A')}</h3>
                    <span class="product-line">{p.get('linea', 'General')}</span>
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
                            <span class="info-label" style="color: var(--primary-dark)">Posología Sugerida</span>
                            <div class="info-content" style="font-size: 0.85rem;">{p.get('posologia', 'Consulte a su médico')}</div>
                        </div>
                        <div class="info-group">
                            <span class="info-label">Presentación</span>
                            <div class="info-content text-sm">{p.get('presentaciones', '-')}</div>
                        </div>
                    </div>
                </div>
            </article>
            """
            output.append(block)
    return "\n".join(output)

def generar_filas_protocolos(protocolos):
    rows = []
    for pr in protocolos:
        # Limpiar y formatear productos principales
        principales = pr.get('principales', '-').split(',')
        principales_html = '<div class="badge-list">' + "".join([f'<span class="badge">{x.strip()}</span>' for x in principales if x.strip()]) + '</div>'
        
        row = f"""
        <tr>
            <td>
                <span class="protocol-name">{pr.get('patologia', 'N/A')}</span>
                <span class="text-xs" style="color: var(--text-sub)">Protocolo Clínico</span>
            </td>
            <td>{principales_html}</td>
            <td>
                <div class="info-group" style="margin-bottom: 0.5rem;">
                    <span class="info-label" style="font-size: 0.6rem;">Complementarios</span>
                    <div class="text-sm">{pr.get('complementarios', '-')}</div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.5rem; border-top: 1px solid #f1f5f9; padding-top: 0.5rem;">
                    <div>
                        <span class="info-label" style="font-size: 0.6rem;">Oligo</span>
                        <div class="text-xs" style="font-weight:400;">{pr.get('oligoelementos', '-')}</div>
                    </div>
                    <div>
                        <span class="info-label" style="font-size: 0.6rem;">Tópicos</span>
                        <div class="text-xs" style="font-weight:400;">{pr.get('topicos', '-')}</div>
                    </div>
                </div>
            </td>
        </tr>
        """
        rows.append(row)
    return "\n".join(rows)

if __name__ == "__main__":
    print("Iniciando generación de libro V2 (Premium Light)...")
    
    products = leer_csv(CSV_MAESTRO)
    protocols = leer_csv(CSV_PROTOCOLOS)
    
    print(f"Total: {len(products)} productos, {len(protocols)} protocolos.")
    
    html_content = generar_html(products, protocols)
    
    # Asegurar que el directorio existe (por si acaso)
    os.makedirs(os.path.dirname(OUTPUT_HTML), exist_ok=True)
    
    # Escribir con codificación UTF-8 para caracteres especiales
    with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"\nSUCCESS: El Vademécum Digital ha sido actualizado.")
    print(f"Ubicación: {OUTPUT_HTML}")
    print("-" * 50)
