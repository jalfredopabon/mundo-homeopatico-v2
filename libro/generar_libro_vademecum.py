import csv
import os
import unicodedata
from datetime import datetime
from collections import defaultdict

# Rutas de archivos
BASE_PATH = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2'
CSV_MAESTRO = os.path.join(BASE_PATH, 'carpeta_temporal_tablas', 'vademecum_medicamentos.csv')
CSV_PROTOCOLOS = os.path.join(BASE_PATH, 'carpeta_temporal_tablas', 'vademecum_protocolos.csv')
OUTPUT_HTML = os.path.join(BASE_PATH, 'libro', 'index.html')

def leer_csv(ruta):
    data = []
    if not os.path.exists(ruta):
        print(f"Error: No se encontró {ruta}")
        return data
    with open(ruta, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter=';')
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

def generar_barra_letras():
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return "\n".join([f'<span data-let="{l}">{l}</span>' for l in letters])

def generar_html(productos, protocolos):
    # Ordenar productos alfabéticamente
    productos_alfabeticos = sorted(productos, key=lambda x: normalizar_texto(x.get('nombre', '').strip()))
    
    # Agrupar productos por categoría (Línea)
    productos_por_categoria = defaultdict(list)
    for p in productos:
        lineas = [l.strip() for l in p.get('tipo_terapia', 'General').split(',')]
        for linea in lineas:
            productos_por_categoria[linea].append(p)
    
    # Ordenar productos dentro de cada categoría
    for cat in productos_por_categoria:
        productos_por_categoria[cat].sort(key=lambda x: normalizar_texto(x.get('nombre', '').strip()))
    
    categorias_ordenadas = sorted(productos_por_categoria.keys())
    protocolos.sort(key=lambda x: x.get('patologia', '').strip().upper())

    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vademécum - Mundo Homeopático</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500&display=swap');
        
        :root {{
            --primary: #0284c7;
            --primary-dark: #0369a1;
            --accent: #f59e0b;
            --text-main: #1e293b;
            --text-sub: #64748b;
            --bg-body: #ffffff;
            --bg-card: #ffffff;
            --border: #cbd5e1;
            --radius: 6px;
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
            .product-card {{ border-bottom: 1px solid var(--border); margin-bottom: 20px; page-break-inside: avoid; }}
        }}

        /* Adaptabilidad en pantallas móviles (Pantalla) */
        @media screen and (max-width: 768px) {{
            .book-container {{
                padding: 2rem 1.2rem;
                margin: 0;
                width: 100%;
                border: none;
            }}
            .cover h1 {{
                font-size: 3rem;
            }}
            .cover h2 {{
                font-size: 1.3rem;
                letter-spacing: 3px;
                margin-bottom: 2rem;
            }}
            .cover-divider {{
                margin-bottom: 2rem;
            }}
            .product-grid {{
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }}
            .protocol-table {{
                display: block;
                overflow-x: auto;
            }}
            .alphabet-nav {{
                display: flex !important;
            }}
        }}

        .book-container {{
            width: 95%;
            max-width: 1100px;
            margin: 2rem auto;
            background: var(--bg-card);
            box-shadow: none;
            border: 1px solid var(--border);
            padding: 3rem 4rem;
            min-height: 100vh;
        }}

        /* Barra de navegación de contactos A-Z (Solo móvil) */
        .alphabet-nav {{
            position: fixed;
            right: 6px;
            top: 50%;
            transform: translateY(-50%);
            display: none;
            flex-direction: column;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 6px 3px;
            z-index: 1000;
            font-family: 'Outfit', sans-serif;
            font-size: 0.65rem;
            font-weight: 700;
            color: var(--text-sub);
            user-select: none;
            touch-action: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }}
        
        .alphabet-nav span {{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 15px;
            height: 15px;
            margin: 1px 0;
            cursor: pointer;
            border-radius: 50%;
            transition: all 0.1s ease;
        }}

        .alphabet-nav span.active {{
            background-color: var(--primary);
            color: white;
        }}

        .giant-letter-indicator {{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(2, 132, 199, 0.92);
            color: white;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3.5rem;
            font-weight: 800;
            font-family: 'Outfit', sans-serif;
            z-index: 2000;
            pointer-events: none;
            transition: opacity 0.15s ease-out;
            box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        }}
    </style>
</head>
<body>

    <div class="book-container">
        
        <!-- COVER MINIMALISTA -->
        <section class="cover" id="inicio">
            <h1>Vademécum</h1>
            <h2>Mundo Homeopático</h2>
            <div class="cover-divider"></div>
            <p class="cover-subtitle">
                Guía de Remedios Naturales y Protocolos Clínicos para Profesionales de la Salud
            </p>
        </section>

        <div class="page-break"></div>

        <!-- ÍNDICE GENERAL ALFABÉTICO -->
        <section id="indice" style="padding-bottom: 3rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2rem; border-bottom: 2px solid var(--primary); padding-bottom: 1rem;">
                <h2 style="font-size: 2.2rem; margin: 0; font-weight: 700;">Índice General</h2>
            </div>
            <p style="color: var(--text-sub); margin-bottom: 2rem; font-size: 0.9rem;">Búsqueda rápida de todos los productos por orden alfabético.</p>
            <div style="column-count: 3; column-gap: 2rem; font-size: 0.75rem; line-height: 1.5;">
                {generar_indice_global(productos_alfabeticos)}
            </div>
        </section>

        <!-- SECCIONES POR CATEGORÍA -->
        {generar_bloques_categorias(productos_por_categoria, categorias_ordenadas)}

        <div class="page-break"></div>

        <!-- PROTOCOLOS -->
        <section id="protocolos" style="margin-top: 4rem;">
            <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem; color: var(--primary-dark);">Protocolos Clínicos</h2>
            <p style="color: var(--text-sub); margin-bottom: 2rem; font-size: 0.95rem;">Guía de asociación terapéutica de medicamentos para patologías comunes.</p>
            
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

    <!-- Barra de navegación vertical A-Z y visualizador gigante flotante -->
    <div class="alphabet-nav no-print">
        {generar_barra_letras()}
    </div>
    <div id="giant-letter" class="giant-letter-indicator no-print" style="opacity: 0; display: none;"></div>

    <div class="no-print" style="position: fixed; bottom: 20px; right: 20px; display: flex; gap: 10px;">
        <a href="#inicio" style="background: var(--primary); color: white; padding: 10px 15px; border-radius: 50px; text-decoration: none; font-size: 0.8rem; font-weight: 500;">↑ Inicio</a>
        <a href="#indice" style="background: var(--text-main); color: white; padding: 10px 15px; border-radius: 50px; text-decoration: none; font-size: 0.8rem; font-weight: 500;">Índice A-Z</a>
    </div>

    <!-- Script para navegación táctil A-Z inteligente -->
    <script class="no-print">
        document.addEventListener('DOMContentLoaded', () => {{
            const giantLetter = document.getElementById('giant-letter');
            const nav = document.querySelector('.alphabet-nav');
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let activeTimeout = null;

            function getActiveCategory() {{
                const categories = document.querySelectorAll('.category-separator');
                let activeCat = null;
                let minDiff = Infinity;
                
                categories.forEach(cat => {{
                    const rect = cat.getBoundingClientRect();
                    const diff = Math.abs(rect.top);
                    if (diff < minDiff) {{
                        minDiff = diff;
                        activeCat = cat;
                    }}
                }});
                return activeCat;
            }}

            function handleScrollToLetter(letter) {{
                const activeCat = getActiveCategory();
                if (!activeCat) return;
                
                const catId = activeCat.id;
                let targetMarker = null;
                const idx = alphabet.indexOf(letter);
                
                // Buscar letra hacia adelante
                for (let i = idx; i < alphabet.length; i++) {{
                    const marker = document.querySelector(`.letter-marker[data-cat="${{catId}}"][data-letra="${{alphabet[i]}}"]`);
                    if (marker) {{
                        targetMarker = marker;
                        break;
                    }}
                }}
                
                // Buscar hacia atrás
                if (!targetMarker) {{
                    for (let i = idx; i >= 0; i--) {{
                        const marker = document.querySelector(`.letter-marker[data-cat="${{catId}}"][data-letra="${{alphabet[i]}}"]`);
                        if (marker) {{
                            targetMarker = marker;
                            break;
                        }}
                    }}
                }}

                if (targetMarker) {{
                    targetMarker.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
                    
                    giantLetter.textContent = letter;
                    giantLetter.style.display = 'flex';
                    giantLetter.style.opacity = '1';
                    
                    clearTimeout(activeTimeout);
                    activeTimeout = setTimeout(() => {{
                        giantLetter.style.opacity = '0';
                        setTimeout(() => {{ giantLetter.style.display = 'none'; }}, 150);
                    }}, 800);
                }}
            }}

            nav.addEventListener('touchmove', (e) => {{
                e.preventDefault();
                const touch = e.touches[0];
                const target = document.elementFromPoint(touch.clientX, touch.clientY);
                if (target && target.hasAttribute('data-let')) {{
                    const l = target.getAttribute('data-let');
                    handleScrollToLetter(l);
                    
                    document.querySelectorAll('.alphabet-nav span').forEach(s => s.classList.remove('active'));
                    target.classList.add('active');
                }}
            }}, {{ passive: false }});

            nav.addEventListener('touchstart', (e) => {{
                const target = e.target;
                if (target && target.hasAttribute('data-let')) {{
                    const l = target.getAttribute('data-let');
                    handleScrollToLetter(l);
                    document.querySelectorAll('.alphabet-nav span').forEach(s => s.classList.remove('active'));
                    target.classList.add('active');
                }}
            }});
        }});
    </script>
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
        items.append(f'<div style="margin-bottom: 2px;"><a href="#prod-{pid}" style="color: var(--text-main); text-decoration: none;">• {nombre}</a></div>')
    return "\n".join(items)

def generar_bloques_categorias(grupos, categorias):
    output = []
    output.append("""
    <section id="catalogo-header" style="text-align: left; padding: 4rem 0; page-break-before: always; margin-bottom: 2rem;">
        <h2 style="font-size: 3rem; color: var(--text-main); margin-bottom: 0.5rem; font-weight: 700;">Catálogo de Productos</h2>
        <p style="font-size: 1.1rem; color: var(--text-sub); font-weight: 300; max-width: 800px; margin: 0;">
            Fichas técnicas de medicamentos organizadas por líneas terapéuticas.
        </p>
    </section>
    """)
    
    for cat in categorias:
        cat_slug = slugify(cat)
        output.append(f'<div class="category-separator" id="cat-{cat_slug}"><h2>{cat}</h2><p>Línea de tratamiento especializado</p></div>')
        
        current_letter = None
        for p in grupos[cat]:
            nombre = p.get('nombre', '')
            letra = normalizar_texto(nombre)[0] if nombre else '#'
            if not letra.isalpha(): letra = '#'
            
            if letra != current_letter:
                current_letter = letra
                output.append(f'<div class="letter-marker" data-cat="cat-{cat_slug}" data-letra="{current_letter}">{current_letter}</div>')
            
            pid = slugify(nombre)
            
            # Formatear el contenido de texto reemplazando circunflejos por saltos de línea
            composicion = p.get('composicion', '-').replace('^', '<br>')
            indicaciones = p.get('indicaciones_terapeuticas', '-').replace('^', '<br>')
            posologia = p.get('presentacion_posologia', '').strip()
            if not posologia:
                posologia = 'Consulte con su especialista médico.'
            else:
                posologia = posologia.replace('^', '<br>')
            presentacion = p.get('forma_farmaceutica', '-').replace('^', '<br>')
            
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
                            <div class="info-content" style="font-weight: 500;">{composicion}</div>
                        </div>
                        <div class="info-group">
                            <span class="info-label">Indicaciones</span>
                            <div class="info-content">{indicaciones}</div>
                        </div>
                    </div>
                    <div class="side-info">
                        <div class="info-group posologia-box">
                            <span class="info-label">Posología Sugerida</span>
                            <div class="info-content" style="font-size: 0.85rem;">{posologia}</div>
                        </div>
                        <div class="info-group">
                            <span class="info-label">Presentación</span>
                            <div class="info-content text-sm">{presentacion}</div>
                        </div>
                    </div>
                </div>
            </article>
            """)
    return "\n".join(output)

def generar_filas_protocolos(protocolos):
    rows = []
    for pr in protocolos:
        patologia = pr.get('patologia', 'N/A')
        
        # Medicamentos principales
        principales = pr.get('medicamentos_principales', '-').split(';')
        principales_html = '<div class="badge-list">' + "".join([f'<span class="badge">{x.strip()}</span>' for x in principales if x.strip()]) + '</div>'
        
        # Complementarios
        complementarios = pr.get('medicamentos_complementarios', '-').replace('^', '<br>')
        
        # Oligoelementos y tópicos
        oligo = pr.get('oligoelementos_recomendados', '-').replace('^', '<br>')
        topicos = pr.get('medicamento_topico', '-').replace('^', '<br>')
        apoyo = pr.get('apoyo_emocional_bienestar', '-').replace('^', '<br>')
        
        # Columna de soporte estructurada con Apoyo Emocional
        soporte_html = f"""
        <div class="info-group" style="margin-bottom: 0.5rem;">
            <span class="info-label" style="font-size: 0.6rem;">Complementarios</span>
            <div class="info-content" style="font-size: 0.8rem;">{complementarios}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.5rem; border-top: 1px solid var(--border); padding-top: 0.5rem;">
            <div>
                <span class="info-label" style="font-size: 0.6rem;">Oligo</span>
                <div class="info-content" style="font-size: 0.75rem;">{oligo}</div>
            </div>
            <div>
                <span class="info-label" style="font-size: 0.6rem;">Tópicos</span>
                <div class="info-content" style="font-size: 0.75rem;">{topicos}</div>
            </div>
        </div>
        """
        if apoyo and apoyo != '-':
            soporte_html += f"""
            <div class="info-group" style="margin-top: 0.5rem; border-top: 1px solid var(--border); padding-top: 0.5rem;">
                <span class="info-label" style="font-size: 0.6rem;">Apoyo Emocional / Bienestar</span>
                <div class="info-content" style="font-size: 0.75rem; font-style: italic;">{apoyo}</div>
            </div>
            """
        
        rows.append(f"""
        <tr>
            <td>
                <span style="font-weight: 700; color: var(--primary-dark); font-size: 0.95rem; display: block; margin-bottom: 0.2rem;">{patologia}</span>
                <span class="text-xs" style="color: var(--text-sub)">Protocolo Clínico</span>
            </td>
            <td>{principales_html}</td>
            <td>{soporte_html}</td>
        </tr>
        """)
    return "\n".join(rows)

if __name__ == "__main__":
    print("Iniciando generación de libro Vademécum (Estilo Plano Editorial)...")
    products = leer_csv(CSV_MAESTRO)
    protocols = leer_csv(CSV_PROTOCOLOS)
    
    print(f"Leídos {len(products)} productos y {len(protocols)} protocolos.")
    
    html_content = generar_html(products, protocols)
    
    os.makedirs(os.path.dirname(OUTPUT_HTML), exist_ok=True)
    with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
        f.write(html_content)
        
    print(f"SUCCESS: Vademécum generado en {OUTPUT_HTML}")
