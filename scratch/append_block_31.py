import os

csv_content = """prod_301,ORQUÍDEAS,ORQUÍDEA ALEGRÍA,VANDA TRICOLOR,Útil para personas con tendencia a ser tristes y depresivas. Favorece nuestro sentido del humor.,,Spray oral; Gotas,activo
prod_302,ORQUÍDEAS,ORQUÍDEA AMOR,ONCIDIUM ABORTIVUM,Representa la más alta concepción del amor Divino. Indicada para sanadores; terapeutas; religiosos y conseisros.,,Spray oral; Gotas,activo
prod_303,ORQUÍDEAS,ORQUÍDEA ÁNGEL DE PROTECCIÓN,MILTONIA PHALAENOPSIS,Nos permite estar abiertos al entendimiento de otros planos de energía; vibración y conciencia.,,Spray oral; Gotas,activo
prod_304,ORQUÍDEAS,ORQUÍDEA AURORA,EPIDENDRUM FRAGANS,Incrementa el sentido de pureza y de búsqueda de ésta. Purifica y limpia niveles sutiles bloqueados en el aura.,,Spray oral; Gotas,activo
prod_305,ORQUÍDEAS,ORQUÍDEA AUTOCONOCIMIENTO,PAPHIOPEDILUM INSIGNE,Nos permite profundizar en nosotros mismos; estimulando la búsqueda interna.,,Spray oral; Gotas,activo
prod_306,ORQUÍDEAS,ORQUÍDEA CANALIZACIÓN,ONCIDIUM INCURVUM,Ayuda a comprender y canalizar informaciones y energías de otros niveles de vibración.,,Spray oral; Gotas,activo
prod_307,ORQUÍDEAS,ORQUÍDEA CORAZÓN,LAELIOCATTLEYA HYBR.,Trabaja el egoísmo y los miedos permitiendo una apertura a la generosidad y el amor. Permite liberar tensiones reprimidas.,,Spray oral; Gotas,activo
prod_308,ORQUÍDEAS,ORQUÍDEA COLOR,ONCIDIUM LANCEANUM,Nos permite ser nosotros mismos en alegría de la nuestra vida; dejando partir nuestros pensamientos grises y tristes.,,Spray oral; Gotas,activo
prod_309,ORQUÍDEAS,ORQUÍDEA CHOCOLATE,STANHOPEA WARDII,Permite contemplar la vida con buen sentido del humor. Flexibiliza las actitudes y los patrones de pensamientos dogmáticos.,,Spray oral; Gotas,activo
prod_310,ORQUÍDEAS,ORQUÍDEA COMUNICACIÓN CON LOS ÁNGELES,EPIDENDRUM SECUNDUM,Permite estar abiertos al entendimiento de otras dimensiones de la energía; de la luz y del reino angélico.,,Spray oral; Gotas,activo"""

# Limpieza de artefactos PDF
csv_content = csv_content.replace('\u001b', 'f').replace('\u001e', 'fl').replace('\u001f', 'fi')

target_csv = r'c:\Users\Alfredo Pabón\Documents\Proyectos antigravity\mundo_homeopatico_v2\carpeta_temporal_tablas\vademecum_maestro.csv'

with open(target_csv, 'a', encoding='utf-8', newline='') as f:
    f.write('\n' + csv_content.strip())

print('Bloque 31 (301-310) anexado correctamente.')
