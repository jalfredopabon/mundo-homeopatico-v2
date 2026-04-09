import os

csv_content = """prod_311,ORQUÍDEAS,ORQUÍDEA CONEXIÓN CÓSMICA,CATTLEYA WARSCEWICZII,Sirve para aprender a dar y recibir lo que obtenemos de la abundancia del cosmos. Crea una conexión entre el Cosmos; el Hombre y la Tierra.,,Spray oral; Gotas,activo
prod_312,ORQUÍDEAS,ORQUÍDEA COORDINACIÓN,CYMBIDIUM LOWIANUM,Favorece la coordinación y el equilibrio psico-físico; estimula la búsqueda de la salud y el equilibrio orgánico.,,Spray oral; Gotas,activo
prod_313,ORQUÍDEAS,ORQUÍDEA DEVA,EPIDENDRUM PRISMATOCARPUM,Nos conecta con una mayor conciencia de la naturaleza y el reino vegetal y aumenta la sensibilidad hacia las energías sutiles que habitan en ella.,,Spray oral; Gotas,activo
prod_314,ORQUÍDEAS,ORQUÍDEA ENTUSIASMO,VANDA COERULEA,Devuelve la alegría y el sentido profundo de entusiasmo. Para el decaimiento anímico y la tristeza.,,Spray oral; Gotas,activo
prod_315,ORQUÍDEAS,ORQUÍDEA INSPIRACIÓN,CATTLEYA TRIANAE,Estimula la inspiración y la capacidad creativa sublimándolos para integrarlo a lo cotidiano.,,Spray oral; Gotas,activo
prod_316,ORQUÍDEAS,ORQUÍDEA SER SUPERIOR,LAELIOCATTLEYA ANCEPS CLARA,Purifica y abre nuestros chakras superiores. Estimula la posibilidad de entrar en contacto con el mundo invisible.,,Spray oral; Gotas,activo
prod_317,ORQUÍDEAS,ORQUÍDEA VIDAS PASADAS,PAPHIOPEDILUM HARRISIANUM,Estimula nuestra memoria ancestral. De utilidad en trabajo de regresión.,,Spray oral; Gotas,activo
prod_318,ORQUÍDEAS,ORQUÍDEA VENUS,ANGULOA CLIFTONII,Incrementa el sentido de lo femenino y receptivo en la personalidad sacando a flote virtudes como la ternura y la dulzura.,,Spray oral; Gotas,activo
prod_319,ORQUÍDEAS,ORQUÍDEA SOLAR,CYMBIDIUM,Permitiendo un contacto con la energía solar; equilibra el ego y abre el plexo solar.,,Spray oral; Gotas,activo
prod_320,ORQUÍDEAS,CENTRO DE LA TIERRA,AMAZONAS,Desarrolla un lazo de unión con el centro de la tierra; lo que nos permite una mejor comprensión de nuestro planeta y de todos los demás reinos de la naturaleza.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 32 (311-320) anexado correctamente.')
