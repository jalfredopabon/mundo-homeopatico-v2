# Plan de Reingeniería Móvil: "Elite Compacto"

Este documento detalla la hoja de ruta para la optimización responsiva del proyecto Mundo Homeopático, adaptando la versión de escritorio bajo la filosofía **Elite Minimalista**.

**⚠️ REGLA DE ORO:** La aplicación estricta de las normas UI/UX (Reglamentos) es obligatoria en cada fase. Se respeta rigurosamente el paradigma de construcción: No se pinta sin tener paredes, no se cablea sin tener estructura. Tareas granulares para garantizar precisión clínica y evitar desbordes.

---

## 🧱 Fase 1: Cimientos (Estabilidad Estructural, Layout y Contención)
*Objetivo: Sentar las bases técnicas del Layout en pantallas pequeñas (< 768px), evitar desbordamientos horizontales y asegurar anclajes maestros.*

### 📋 Tareas Puntuales
- [x] **Tarea 1.1: Muro de Contención Global**
  - Aplicar `overflow-x-hidden` al `body` o contenedor principal (`BaseLayout`) para bloquear desplazamientos horizontales accidentales.
- [x] **Tarea 1.2: Democratización del Header**
  - Eliminar bloqueos de ancho fijo asfixiantes (ej. `w-64`) en secciones del Header para móviles, priorizando el uso de `flex-1` y `justify-between`.
- [x] **Tarea 1.3: Anclaje de Footer Estricto**
  - Reemplazar cualquier `h-screen` por `min-h-screen` y asegurar estructura Flex-Column para que el Footer siempre resida en el fondo real de la página.
- [X] **Tarea 1.4: Alturas Dinámicas Universales (DVH)**
  - Implementar unidades `dvh` (Dynamic Viewport Height) en contenedores maestros para evitar que interfaces modernas de navegadores móviles (Safari/Chrome) tapen contenido clave.

---

## 🏠 Fase 2: Paredes (Distribución Espacial, Arquitectura y Ergonomía)
*Objetivo: Construir los contenedores principales adaptados a la "Thumb-Zone", reestructurar información densa y crear los cascarones de la interfaz App.*

### 📋 Tareas Puntuales
- [x] **Tarea 2.1: Reestructuración de Tarjetas de Producto**
  - Transformar las filas de tablas horizontales en "Tarjetas Apiladas Verticalmente".
  - Orden estructural: Título arriba, subtítulo descriptivo, Badges de laboratorio debajo, y métricas integradas al fondo.
- [x] **Tarea 2.2: Cascarón de Navegación por Segmentos (Tab Bar Superior)**
  - Maquetar bajo el Header un control segmentado estático (`Precios | Vademécum | Sedes`) para agrupar navegación core.
- [x] **Tarea 2.3: Cascarón del Menú Desplegable (Drawer)**
  - Construir la estructura oculta (`fixed`, 100% pantalla) para el menú lateral tipo Figma.
  - Maquetar jerarquía interna para enlaces secundarios ("Soy Médico", Ajustes).
- [x] **Tarea 2.4: Optimización de Densidad Espacial**
  - Reducir paddings generales de escritorio (ej. pasar de `px-8` a `px-4`) en contenedores principales de Catálogo y Vademécum para recuperar área útil en móviles.

---

## 🔌 Fase 3: Cableado (Interacción, Estado y Conexión de Datos)
*Objetivo: Conectar los componentes móviles creados en la Fase 2, enlazar eventos Javascript y habilitar navegación jerárquica.*

### 📋 Tareas Puntuales
- [x] **Tarea 3.1: Lógica del Menú Hamburguesa**
  - Instalar ícono hamburguesa en el Header y programar el evento (JS nativo) para abrir/cerrar el Drawer (manipulación fluida de estado).
- [x] **Tarea 3.2: Lógica de Árbol en Categorías (Tree-guide)**
  - Mapear iteración de Catálogo (N3/N4) dentro del Drawer.
  - Habilitar acordeones Javascript (colapsables con flechas `↓`) para prevenir saturación cognitiva e infinita altura.
- [x] **Tarea 3.3: Comportamiento de Sticky Headers**
  - Dotar de clase `sticky` a los encabezados de categorías (ej. "Analgésicos") y enlazar lógicamente con el scroll para calcular posición compensando el Header.
- [x] **Tarea 3.4: Botón de Acción de Alta Densidad (FAB Integrado)**
  - Enlazar la lógica existente del carrito a un nuevo botón `+` diminuto y cuadrado/redondo, ubicado al lado del precio en la nueva tarjeta apilada.

---

## 🎨 Fase 4: Pintura (UI/UX Elite, Glassmorphism y Acabados Visuales)
*Objetivo: Inyectar el diseño Premium Minimalista, garantizar contrastes de accesibilidad y pulir animaciones para un "App Feel" impecable.*

### 📋 Tareas Puntuales
- [x] **Tarea 4.1: Acabados de Cristal (Backdrop Blur)**
  - Inyectar utilidades de glassmorphism (`backdrop-blur-md`, `bg-background/90`) al Header, Drawer, Componente de Segmentos y Sticky Headers.
- [x] **Tarea 4.2: Fluidez Micro-Cinética**
  - Añadir transiciones (`transition-transform duration-300 ease-out`) al Drawer lateral.
  - Asegurar interpolación de tamaño CSS en acordeones para apertura orgánica.
- [x] **Tarea 4.3: Pintura Ergónomica (UI y Tipografía)**
  - Pintar el Selector de Tamaño de Fuente (`A-`, `A`, `A+`) en la zona inferior del Drawer (zona del pulgar).
  - Sombrear componentes flotantes y pintar el buscador estilo Notion (`rounded-2xl`, fondo solido o `ring-1` sutil).
- [x] **Tarea 4.4: Contraste Psicológico de Precios**
  - Destacar la métrica vital: Precio base pequeño y tachado en color opaco (`text-slate-400`); Precio real con tamaño incrementado y color de marca activo (`text-brand text-lg font-bold`).
