import os

csv_content = """prod_201,ESENCIAS FLORALES,CERATOSTIGMA (CERATOSTIGMA WILLMOTTIANA),CERATOSTIGMA WILLMOTTIANA,Aporta seguridad y confianza en las propias decisiones. Permite reconocer; aceptar y oír el YO interior.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_202,ESENCIAS FLORALES,CLEMÁTIDE (CLEMATIS VITALBA),CLEMATIS VITALBA,Estando afianzado en el presente sirve para quienes evaden la realidad y sueñan despiertos.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_203,ESENCIAS FLORALES,ESTRELLA DE BELÉN (STAR OR BETHLEHEM - ORNITHOGALUM UMBELATUM),STAR OR BETHLEHEM; ORNITHOGALUM UMBELATUM,Corrige; traumas físicos; mentales o psíquicos; independiente de que sean recientes o hayan ocurrido hace mucho tiempo.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_204,ESENCIAS FLORALES,GENCIANA(GENTIAN-GENTIANA AMARELLA),GENTIAN; GENTIANA AMARELLA,Aportando ánimo permite superar la tristeza; el desánimo y la depresión de causa conocida.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_205,ESENCIAS FLORALES,HAYA (BEECH - FAGUS SYLVATICA),BEECH; FAGUS SYLVATICA,Sirve para las personas críticas e intolerantes que se creen poseedoras de la verdad.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_206,ESENCIAS FLORALES,HELIANTEMO (ROCK ROSE-HELIANTHEMUM NUMMULARIUM),ROCK ROSE; HELIANTHEMUM NUMMULARIUM,Con coraje ayuda en situaciones de miedos extremos; terror; pánico.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_207,ESENCIAS FLORALES,HOJARAZO (HORNBEAM - CARPINUS BETULUS),HORNBEAM; CARPINUS BETULUS,Debido a la rutina es útil para las personas que tienen la sensación de estar cansadas; agotadas mental y físicamente; como un estado transitorio o de larga duración. Para la pereza del lunes en la mañana.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_208,ESENCIAS FLORALES,IMPACIENCIA (IMPATIENS - IMPATIENS GLANDULIFERA),IMPATIENS; IMPATIENS GLANDULIFERA,Estimulando la paciencia sirve a las personas que son ágiles mentalmente y nerviosas e irritables; que siempre tienen prisa y todo les parece lento ya que odian la rutina.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_209,ESENCIAS FLORALES,MADRESELVA(HONEY SUCKLE- LONICERA CAPRIFOLIUM),HONEY SUCKLE; LONICERA CAPRIFOLIUM,Para aprender de las experiencias pasadas sin vivir en ellas. Nos libera de los sentimientos de nostalgia y añoranzas; ubicándonos en el presente. Personas que les cuesta mucho separarse de algo.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo
prod_210,ESENCIAS FLORALES,MANZANO SILVESTRE (CRAB APPLE - MALUS PUMILA),CRAB APPLE; MALUS PUMILA,Corrige la escrupulosidad; la sensación de impureza y de suciedad física o emocional.,,Spray oral por 30 ml; Gotas por 30 ml; Globulos x 25g,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 21 (201-210) anexado correctamente.')
