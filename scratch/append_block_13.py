import os

csv_content = """prod_121,PRODUCTOS MH,SENNA D4 MH,Alumina D3-D6; Chamomilla D4; Graphites D12; Magnesium sulphuricum D8; Nux vómica D6; Opium D6 D12; Paladium D3-D6; Selenium D6; Senna D6 D12; Taraxacum D6.,Disfunciones del colon.,,Gotas x 30 ml; Tabletas x 90 (En stock permanente) Bajo pedido: Glóbulos; Elixir; Spray oral; Spray nasal; Viales bebibles; Viales nebulizables.,activo
prod_122,PRODUCTOS MH,SEPIA D4 MH,Acidum ascorbicum; Aloe D3; Asperguillus Níger D30; Aurum met D12; Candida D3; Caléndula D3; Chlamyda D12; Cuprum D12; Echinacea D4; Mycosis fungoides D12; Sepia D3; Sepia D6; Silícea D6; Tecoma D4; Thuja D6. Zincum metallicum D9.,Hongos en piel y uñas.,Una aplicación tres veces al día o según criterio médico.,Spray tópico por 30 ml.,activo
prod_123,PRODUCTOS MH,SILÍCEA D4 MH CÁPSULAS,Silícea D4; Colágeno; resveratrol.,formación y cuidado de la piel; los huesos; los ligamentos; los tendones; las uñas; los vasos sanguíneos y los ojos. Rejuvenecimiento orgánico. Prevención y tratamiento de enfermedades de las articulaciones y del sistema cardiovascular.,,Frasco por 90 cápsulas,activo
prod_124,PRODUCTOS MH,SILÍCEA D4 MH CREMA,Silícea D4; Colágeno hidrolizado; Ácido hialurónico.,Regeneración de piel. Rejuvenecimiento facial. Dermatitis; psoriasis; seborrea; quemaduras; acné.,Para uso facial; aplicar una capa delgada sobre rostro y cuello en la noche. Para otros usos aplicar 2 veces al día en el área afectada.,Frasco por 100gr,activo
prod_125,PRODUCTOS MH,SOLIDAGO D4 MH,Berberis D4; Cantharis D6; Equisetum D3; Formica rufa D8; Lycopodium D6; Pareira brava D6; Petroselinum D3; Plantago D6; Sabal D6-D12; Sarsaparrilla D4; Terebentina D6; Solidago D4-D6-D12; Staphysagria D6; Urtica urens D3.,Regulador del funcionamiento renal; cálculos renales; depurativo renal; cistitis; nefritis.,,Gotas x 30 ml; Tabletas x 90 (En stock permanente) Bajo pedido: Glóbulos; Elixir; Spray oral; Spray nasal; Viales bebibles; Viales nebulizables.,activo
prod_126,PRODUCTOS MH,STANNUM D4 MH,Stanum metallicum D4; Calostro bovino y embrión de pato.,Factor de transferencia; fortalece el sistema inmune; coadyuvante en tratamiento de cáncer y VIH.,,Frasco por 90 cápsulas. Spray por 30 ml,activo
prod_127,PRODUCTOS MH,STAPHYSAGRIA D4 MH,Apis D4-D6; Belladona D4-D6-D12; Euphrasia o D4-D6; Pulsatilla D4-D6; Staphysagria D4-D6-D12.,Blefaritis; conjuntivitis; queratitis; retinitis; orzuelos.,,Gotas x 30 ml; Tabletas x 90 (En stock permanente) Bajo pedido: Glóbulos; Elixir; Spray oral; Spray nasal; Viales bebibles; Viales nebulizables.,activo
prod_128,PRODUCTOS MH,SULPHUR MH,Antimonium crudum D12; Hepar D6-D12; Hydrastis D4; Mezereum D6; Sulphur D8; Sulphur iodatum D8; Viola tricolor D4.,Alergias; dermatosis; piodermitis; eccema; herpes zoster; prurito; eccemas vesiculares; leucorrea.,,Gotas x 30 ml; Tabletas x 90 (En stock permanente) Bajo pedido: Glóbulos; Elixir; Spray oral; Spray nasal; Viales bebibles; Viales nebulizables.,activo
prod_129,PRODUCTOS MH,SULPHUR MH CREMA O GEL,Antimonium crudum D12; Hepar D6-D12; Hydrastis D4; Mezereum D6; Sulphur D8; Sulphur iodatum D8; Viola tricolor D4.,Alergias; dermatosis; piodermitis; eccema; herpes zoster; prurito; eccemas vesiculares; leucorrea; espolones.,,Crema tubo por 120 g y Gel tubo x 120 g.,activo
prod_130,PRODUCTOS MH,SYZYGIUM D4 MH,Acidum phosphoric. D3; Arsenicum alb. D8; Equisetum D4; Gentiana lutea D4; Juglans D4; Leptandra D6; Lycopodium D30; Natrium sulfuric. D12; Secale cornut. D4; Syzygium D8 D12; Uranium nitric D30.,Coadyuvante en la diabetes mellitus. En el caso de una terapia de insulina; es posible una reducción precavida de su unidad diaria necesitada.,,Gotas x 30 ml; Tabletas x 90 (En stock permanente) Bajo pedido: Glóbulos; Elixir; Spray oral; Spray nasal; Viales bebibles; Viales nebulizables.,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 13 (121-130) anexado correctamente.')
