import os

csv_content = """prot_181,PIELITIS,Solidago,Equisetum,Berberis,Iodo k7 MH,,activo
prot_182,PÓLIPO NASAL,Euphatorium; Luffa Spray nasal,,Hydrastis,Iodo k7 MH,,activo
prot_183,PRECANCEROSIS,Elíxir de Cúrcuma; Viscum,,Scrophularia; Thuja,Magnesio k7 MH,Hydrocotile (piel),activo
prot_184,PROLAPSO RECTAL,Aesculus,,Hamamelis,Hierro k7 MH,Aesculus gel,activo
prot_185,PROSTATITIS,Sabal,Chimaphila,Agnus; Árnica,Magnesio k7 MH,Árnica Crema o Gel,activo
prot_186,PRURITO,Sulphur,,Graphites,Manganeso k7 MH,Caléndula Crema o Gel,activo
prot_187,PSORIASIS,Marrubium; Mezereum,,Sulphur,Manganeso k7 MH,Urtica Gel o Crema; Plata Coloidal spray,activo
prot_188,QUEMADURA,Apis,,Árnica; Echinacea,,Caléndula Crema o Gel,activo
prot_189,QUERATITIS,Staphysagria,,Vincetoxicum; Euphrasia,Zinc k7 MH,,activo
prot_190,QUISTE,En general: Thuja Scrophularia; De ovario: Lilium Thuja; De senos: Thuja Conium D6 Phytolacca D6,,,,,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 19 de Protocolos (181-190) anexado correctamente.')
