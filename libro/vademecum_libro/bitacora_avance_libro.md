# Bitácora de Avance - Plan de Reestructuración desde Cero del Libro Vademécum

Este documento contiene el plan detallado para reconstruir desde cero el generador del Vademécum Digital impreso en formato HTML/PDF, garantizando el mapeo correcto con las tablas actuales de datos (CSV/Google Sheets) y aplicando los estándares de diseño editorial premium.

---

## 📋 Hitos del Plan

### 1. Auditoría del Diseño Base
* Extraer el diseño CSS y sistema de grillas (`1.5fr 1fr`) del archivo `libro/vademecum_primera_version.html` y `libro/index.html` anterior.
* Asegurar las reglas `@media print` para formato A4 (saltos de página automáticos por ficha, numeración de páginas física en el centro inferior, y ocultamiento de botones de navegación).
* **Estilo de Tarjetas Planas:** Las tarjetas y fichas técnicas serán planas, limpias, sin sombras (`box-shadow: none`) ni animaciones o efectos de movimiento al hacer hover.

### 2. Normalización del Mapeo de Datos
Reconfigurar la lectura en el script de Python para leer exactamente los encabezados de las tablas actuales de la carpeta `carpeta_temporal_tablas`:

* **Medicamentos (`vademecum_medicamentos.csv`)**:
  * `nombre` -> Título principal de la tarjeta.
  * `tipo_terapia` -> Línea o Categoría del medicamento.
  * `composicion` -> Sección "Acción Terapéutica".
  * `indicaciones_terapeuticas` -> Sección "Indicaciones".
  * `presentacion_posologia` -> Sección "Posología Sugerida".
  * `forma_farmaceutica` -> Sección "Presentación".
* **Protocolos (`vademecum_protocolos.csv`)**:
  * `patologia` -> Nombre de la enfermedad.
  * `principales` -> Medicamentos principales.
  * `sistema` -> Sistema corporal de apoyo.
  * `complementarios` -> Medicamentos complementarios.
  * `oligoelementos` -> Oligoelementos recomendados.
  * `topicos` -> Medicamento tópico.

### 3. Rediseño Minimalista de Portada
* Diseñar una portada limpia basada exclusivamente en tipografía premium (*Outfit* y *Inter*).
* **Sin logos ni imágenes decorativas.**
* Títulos principales:
  * **Vademécum**
  * **MUNDO HOMEOPÁTICO**
* Sin marcas de versiones de desarrollo, códigos de depuración ni fechas variables.

### 4. Automatización y Salida
* Unificar el script generador en un único archivo limpio `libro/generar_libro_vademecum.py` que se ejecute con un solo comando.
* El archivo HTML de salida se escribirá directamente en: `libro/index.html` (sobrescribiendo de manera segura el anterior).
