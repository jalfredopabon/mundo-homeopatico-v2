import os

csv_content = """prod_381,SISTEMA FLORAL AUSTRALIANO,SUNSHINE WATTLE,ACACIA TERMINALIS,Para el que está anclado en el pasado y tiene expectativas sombrías del futuro. Genera optimismo.,,Spray oral; Gotas,activo
prod_382,SISTEMA FLORAL AUSTRALIANO,TALL YELLOW TOP,SENECIO MAGNIFICUS,Para la soledad y el aislamiento. Incrementa el sentido de pertenencia.,,Spray oral; Gotas,activo
prod_383,SISTEMA FLORAL AUSTRALIANO,TALL MULLA MULLA,TALL MULLA MULLA,Para la soledad interior. Problemas circulatorios; infartos; arteriosclerosis; várices; y antihistamínico.,,Spray oral; Gotas,activo
prod_384,SISTEMA FLORAL AUSTRALIANO,TURKEY BUSH,TURKEY BUSH,Incrementa la inspiración creativa; promueve la confianza artística.,,Spray oral; Gotas,activo
prod_385,SISTEMA FLORAL AUSTRALIANO,WEDDING BUSH,RICINOCARPUS PINIFOLIUS,Para la dificultad para comprometerse con las relaciones íntimas; personales o laborales.,,Spray oral; Gotas,activo
prod_386,SISTEMA FLORAL AUSTRALIANO,WILD POTATO BUSH,SOLANUM QUADRILOCULATUM,Libertad; vitalidad para moverse en la vida. Para los sentimientos de frustración. Restricción. Tristeza. Bueno en casos de glaucoma.,,Spray oral; Gotas,activo
prod_387,SISTEMA FLORAL AUSTRALIANO,WISTERIA,WISTERIA,Para mujeres que se tensionan frente al sexo; y que son incapaces de disfrutarlo.,,Spray oral; Gotas,activo
prod_388,SISTEMA FLORAL AUSTRALIANO,WARATAH,WARATAH,Desesperación; actitudes suicidas; incapacidad para responder a una crisis. Coraje; tenacidad; fe; adaptabilidad; habilidad de supervivencia.,,Spray oral; Gotas,activo
prod_389,SISTEMA FLORAL AUSTRALIANO,YELLOW COWSLIP ORCHID,YELLOW COWSLIP ORCHID,Equilibra la glándula pituitaria. Para el crítico y que tiende a juzgar a otros.,,Spray oral; Gotas,activo
prod_390,OLIGOTERAPIA,SILICEA K7 MH,Zn; Si; Cr; Fe; Fl; I; Co; Mo; Mg; Mn; P,Diátesis Básicoregenerativa,,Caja x 5 viales x 10 ml; Gotas 30 ml,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 39 (381-390) anexado correctamente.')
