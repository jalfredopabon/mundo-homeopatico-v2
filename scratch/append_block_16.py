import os

csv_content = """prod_151,PRODUCTOS MH,ZINCUM MET D4 MH,Ambra grisea C12-C30; Anacardium C12-C30; Arsenicum álbum C12-C30; Aurum met. C12-C30; Colchicum C30; Helleborus C12-C30; Kalium phosphoricum C12-C30; Natrum muriaticum C12-C30; Zincum met C12-C30.,Depresión; trastornos nerviosos.,,Gotas x 30 ml; Tabletas x 90 (En stock permanente) Bajo pedido: Glóbulos; Elixir; Spray oral; Spray nasal; Viales bebibles; Viales nebulizables.,activo
prod_152,PRODUCTOS MH,ZINGIBER ANTIOXIDANTE MH,Acido ascórbico D3-D4; Aconitum D30; Calcarea carbonica D6; Calcarea fluorica D6; Cobaltum gluconato D4; Cobre gluconato D4; CoenzimE Q10 D3-D4; Crataegus D3; Cuprum sulfuricum D8; Cysteinum D4; Ferrum phos D6; Folicum acidum D3-D4; Ginkgo biloba D3; Hydrastis D4-D6; Ignatia D30; Lisina-arginina-ornitina D2; Magnesium phos D4; Manganum phos D4; Medicago sativa D3-D4; Nicotinaminum D4; Panax ginseng TM; Selenium D3-D4; Vitamina B12 D3 D4; Vitamina E D3; Zinc gluconato D4; Zincum metalicum D4; Zingiber D3 D4; Complejo B.,Bloqueador de radicales libres; Antioxidante; Multivitamínico; Regenerador orgánico; enfermedades crónico degenerativas.,,Frascos por 90 tabletas; Gotas 30 ml; Elíxir por 240 ml.,activo
prod_153,ESENCIAS FLORALES,ARMONÍA DEL SER,Castaño blanco; lotus; maíz; alerce; estrella de belén; scleranthus; siete cueros.,Lograr un equilibrio emocional; permitiendo una relación armoniosa consigo mismo y con los demás,2 puff 4 veces al día,Frasco 30 ml,activo
prod_154,ESENCIAS FLORALES,AUTOACEPTACIÓN,Rosa silvestre; ajo; mimosa; manzano silvestre; pino; cerasífera; castaño blanco; castaño dulce; olivo.,Ayuda a recuperar el sentido de la proporción y la aceptación del cuerpo; así como a superar la culpa y el miedo; útil para las personas anoréxicas.,2 puff 4 veces al día,Frasco 30 ml,activo
prod_155,ESENCIAS FLORALES,AUTOCONFIANZA,Achicoria; acebo; alerce; mímulo; castaño rojo; estrella de belén,Superar los sentimientos posesivos; la inseguridad; la dependencia y el miedo a quedarse solo; ideal para las personas celosas.,2 puff 4 veces al día,Frasco 30 ml,activo
prod_156,ESENCIAS FLORALES,AUTOESTIMA,Ceratostigma; scleranthus; genciana; alerce; aulaga; hojarazo; avena silvestre; botón de oro; five corners.,Incrementar la autoaceptación; el amor propio y la confianza en sí mismo.,2 puff 4 veces al día,Frasco 30 ml,activo
prod_157,ESENCIAS FLORALES,AUTONOMÍA,Achicoria; corazoncillo; acebo; red gravillea.,Desarrollar o fortalecer la capacidad de vivir con autonomía y libertad; ayuda a quienes tienen una dependencia afectiva.,2 puff 4 veces al día,Frasco 30 ml,activo
prod_158,ESENCIAS FLORALES,BUEN DORMIR,Heliantemo; manzanilla; agrimonia; castaño blanco; valeriana; hipérico; impaciencia; verbena; clemátide; nomeolvides; amaranto.,Lograr un descanso profundo y reparador.,2 puff 4 veces al día,Frasco 30 ml,activo
prod_159,ESENCIAS FLORALES,CONTROL DEL APETITO (Exceso),Cerasífera; impaciencia; agrimonia; verbena; brezo; pino; rescate; manzano silvestre,Controlar el impulso de comer; apoyando así el propósito de perder peso; apoyo en el tratamiento de bulimia.,2 puff 4 veces al día,Frasco 30 ml,activo
prod_160,ESENCIAS FLORALES,CORAJE,Ajo salvaje; heliantemo; cerasífera; álamo temblón; impaciencia.,Estas esencias florales le aportarán calma; coraje; valor y autocontrol; para las crisis de pánico.,2 puff 4 veces al día,Frasco 30 ml,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 16 (151-160) anexado correctamente.')
