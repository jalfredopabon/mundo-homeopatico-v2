import os

csv_content = """prot_031,APRENDIZAJE,Conium; Elíxir de Ruta,,Ruta; Cúrcuma elixir; Zingiber,Silicea K7,,activo
prot_032,ARRITMIA CARDÍACA,Cactus; Cúrcuma elixir,,Baryta,Cobre k7 MH,,activo
prot_033,ARTERIOSCLEROSIS,Glonoinum; Carduus; Curcuma elíxir,,Cholesterolum,Hierro k7 MH,,activo
prot_034,ARTRALGIA,Harpagophytum cápsulas; Cúrcuma elíxir,Colchicum,,Phosphorus k7 MH,Cannabis crema; Cápsicum ungüento,activo
prot_035,ARTRITIS,Harpagophytum cápsulas; Rhus tox,Colchicum,Rhododendron,Cobre k7 MH,Cápsicum ungüento; Cannabis crema; Árnica crema o gel,activo
prot_036,ARTROSIS,Harpagophytum cápsulas; Rhus tox; Cúrcuma elíxir,Colchicum,Kalmia; Colágeno,Manganeso k7 MH,Cápsicum ungüento; Árnica Crema o Gel,activo
prot_037,ASCARIDIASIS,Teucrium,Alumina,Casc.sagrada; Echinacea; Plata Coloidal oral,Cuprum k7 MH,,activo
prot_038,ASCITIS,Chelidonium; Cúrcuma elíxir,Equisetum,Hydrangea,Zinc k7 MH,,activo
prot_039,ASMA,Ipeca,Kalium bich,Euphatorium,Aurum k7 MH,,activo
prot_040,BACTERIURIA,Vaccinium,Juglans,Echinacea; Hydrangea,Aurum k7 MH,,activo"""

# Limpieza básica de espacios adicionales
csv_content = csv_content.replace(' ;', ';')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 04 de Protocolos (031-040) anexado correctamente.')
