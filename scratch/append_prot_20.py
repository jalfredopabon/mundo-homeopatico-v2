import os

csv_content = """prot_191,REFLUJO,Taraxacum elixir; Fibaloe,,Alumina,Cuprum K7 MH,,activo
prot_192,REGENERACIÓN CELULAR,Elíxir de Cúrcuma; Viscum; Phosphoricum Acidum,,Conium; Stanum cápsulas o spray,,,activo
prot_193,REGULADOR HORMONAL FEMENINO,Viburnum,Cinnamomum,Lilium; Angélica,Zinc k7 MH,,activo
prot_194,REGULADOR HORMONAL MASCULINO,Agnus,Chimaphila,Damiana,Zinc k7 MH,,activo
prot_195,REUMATISMO,Magnesia; Elíxir de Cúrcuma,Colchicum,Rhododendron,Manganeso k7 MH,Árnica Crema o Gel,activo
prot_196,RINITIS,Euphatorium; Luffa spray nasal,,Hydrastis,Iodo k7 MH,,activo
prot_197,SCROFULOSIS,Juglans,,Scrophularia,Zinc k7 MH,,activo
prot_198,SINUSITIS,Luffa spray nasal; Euphatorium; Allium cepa ótico,,Hydrastis,Iodo k7 MH,,activo
prot_199,SISTEMA INMUNE,Conium; Galium; Echinacea; Ascorbicum acidum; MHPHOR; Stanum cápsulas o spray; Elíxir de Cúrcuma,Juglans,,Iodo k7 MH,,activo
prot_200,TABAQUISMO,Tabacum,,Nux vómica,,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 20 de Protocolos (191-200) anexado correctamente.')
