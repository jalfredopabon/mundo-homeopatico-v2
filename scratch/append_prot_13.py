import os

csv_content = """prot_121,HEMATOMA,Árnica; Hamamelis,Cactus,,Hierro k7 MH,Aesculus Gel,activo
prot_122,HEMORRAGIAS,Cinnamomum,,Crocus,Hierro k7 MH,,activo
prot_123,HEMORROIDES,Aesculus,,Hamamelis,Hierro k7 MH,Aesculus óvulos o gel,activo
prot_124,HEPATITIS,Chelidonium; Plata Coloidal,,Leptandra; Elíxir de Cúrcuma,Cuprum k7 MH,,activo
prot_125,HEPATOPATÍA,Chelidonium; Elíxir de Cúrcuma,,Leptandra,Cuprum k7 MH,,activo
prot_126,HERPES,Borax; Mezereum; Plata Coloidal oral,Juglans; Thallium,Galium,Iodo k7 MH,Echinacea Crema o Gel,activo
prot_127,HIDROCELE,Hydrangea,Chimaphila,Sabal; Árnica,Magnesio k7 MH,Árnica Crema o Gel,activo
prot_128,HIPERHIDROSIS,Jaborandi,,Marrubium,Magnesio k7 MH,,activo
prot_129,HIPERTENSIÓN,Baryta; Carduus; Elíxir de Cúrcuma,Cactus,Manganum; Glonoinum,Hierro k7 MH,,activo
prot_130,HIPERURICEMIA,Benzoicum acidum,,Glonoinum,Magnesio k7 MH,,activo"""

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_protocolos.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 13 de Protocolos (121-130) anexado correctamente.')
