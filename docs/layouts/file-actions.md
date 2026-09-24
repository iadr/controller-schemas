# Acciones de archivo por propuesta visual

Abrir [index.html](index.html), elegir 01 o 04 y alternar **A / B** en «Acciones de archivo». Los botones dentro de la pantalla abren los flujos. Se recuerda la alternativa elegida para cada layout durante la sesión.

En 03, Importar y Exportar permanecen en cabecera y cada boton abre su modal correspondiente. No hay selector A/B.

## Comparacion de accesos

Las activaciones indicadas cuentan desde la pantalla del editor hasta abrir la configuración de una operación; no incluyen elegir archivo, configurar o confirmar.

| Layout | Alternativa | Ubicación y dimensiones | Acceso a PNG / JSON / importar JSON / importar .inputactions | Coste |
| --- | --- | --- | --- | --- |
| 01 · Tres columnas | **A · Bloque en navegación** | Cuatro botones de mínimo 44 px, separados por 8 px, dentro de la columna de 240 px | Cada operación tiene botón propio: 1 activación | 200 px de contenido y 32 px de márgenes verticales dentro de navegación |
| 01 · Tres columnas | **B · Menú Archivo** | Botón de 112 × 44 px en cabecera | Archivo → operación: 2 activaciones | No consume altura del lienzo; oculta el texto de contexto de esa cabecera para dar espacio al botón |
| 03 Inspector lateral | Cabecera fija | Dos botones de 88 x 44 px separados por 8 px | Importar o Exportar abre su modal; elegir formato abre su configuracion | No ocupa espacio del inspector; bajo 600 px la cabecera crece a 112 px |
| 04 · Secuencia vertical | **A · Barra inferior** | Barra fija de 64 px con Importar / Exportar | Grupo → formato: 2 activaciones | Resta 64 px al área de trabajo. A 390 px de ancho: botones de 175 × 44 px, separados por 8 px |
| 04 · Secuencia vertical | **B · Hoja de archivos** | Archivo de 112 × 44 px en cabecera; hoja temporal desde abajo | Archivo → operación: 2 activaciones | No resta altura permanente adicional al lienzo |

Cuando la navegación de 01 se oculta (ancho inferior a 1000 px o alto inferior a 600 px), las acciones se trasladan al botón Archivo de la cabecera: siguen disponibles, con 2 activaciones. En 03, por debajo de 600 px, los botones quedan en una segunda fila de la cabecera. En 04A se descuenta el alto de la barra inferior del área de trabajo; el SVG se vuelve a ajustar a la caja restante.

Para este prototipo, Archivo abre un diálogo con opciones, en lugar de implementar un menú desplegable con navegación de teclado propia. En 04 los diálogos se presentan como hojas inferiores. Todos usan el diálogo nativo, cierre con Escape y devolución del foco al botón de entrada. Los diálogos aparecen sobre la página de revisión, fuera de la escala del viewport simulado, para conservar legibilidad. Su ancho máximo es 580 px; el diseño de su envolvente deberá integrarse al viewport real de la aplicación.

## Flujos comunes

### Exportar imagen

1. Elegir **Exportar imagen PNG** o **Exportar → Imagen PNG**.
2. Elegir uno o más contextos y mandos; inicialmente se selecciona el contexto y mando activos.
3. Elegir tamaño de imagen: 1920 × 1080, 1440 × 900 o 1080 × 1080 px.
4. Revisar el número de imágenes: cantidad de contextos × cantidad de mandos. Con cero combinaciones, la acción queda deshabilitada.
5. Confirmar la exportación. En el prototipo el botón dice **Simular exportación PNG** y no descarga archivos.

El producto debería exportar el diagrama y las asociaciones sin barras, botones ni inspector de edición. Las dimensiones de exportación son independientes de la pantalla; el contenido debe volver a distribuirse y preservar la proporción del mando.

### Exportar JSON

1. Elegir **Exportar esquema JSON** o **Exportar → Esquema JSON**.
2. Revisar que se exportará el esquema completo: mando seleccionado, todos los contextos, asociaciones, lados y orden.
3. Descargar `controller-scheme.json`. En el prototipo se simula sin generar archivos.

JSON no tiene dimensiones de pantalla o imagen. Se diferencia explícitamente de la exportación PNG por contexto/mando.

### Importar JSON

1. Elegir **Importar JSON** o **Importar → Importar JSON**.
2. Seleccionar un `.json`.
3. Revisar contextos, asociaciones y mando detectados antes de reemplazar el esquema.
4. Confirmar **Reemplazar esquema** o cancelar conservando el actual.

El prototipo permite seleccionar el archivo y muestra su nombre, pero no lee su contenido. **Ver revisión de ejemplo** abre datos fijos, identificados como ejemplo, y **Simular reemplazo del esquema** no cambia los contextos. La validación y la revisión previa son comportamiento propuesto para integrar al editor.

### Importar Unity .inputactions

1. Elegir **Importar .inputactions** o **Importar → Importar .inputactions**.
2. Seleccionar archivo, Action Maps, Control Scheme y mando de destino.
3. Revisar cantidades convertidas, excluidas, pendientes y conflictos. Cada Action Map crea un contexto; el mando de destino se elige por separado.
4. Resolver conflictos antes de aplicar. Los casos sin conversión requieren revisión; no deben descartarse silenciosamente.
5. Aplicar como reemplazo explícito del esquema o cancelar conservando el actual.

Se visualizan dos estados de ejemplo: uno con 12 bindings convertidos, 3 excluidos, 2 pendientes y 1 conflicto; otro independiente con 8 convertidos y 0 conflictos, excluidos o pendientes. El primero bloquea aplicar. El segundo permite simular reemplazo. Estos valores son ilustrativos, no resultados del archivo seleccionado ni de los filtros. No se implementó un conversor.

## Elección sugerida

- **01A:** cuatro operaciones directamente visibles con 1 activación, aprovechando la columna de navegación existente.
- **03:** Importar y Exportar en cabecera conservan el espacio del inspector para las asociaciones.
- **04A:** dos acciones siempre visibles en la parte inferior a cambio de 64 px. Para pantallas bajas, 04B recupera esos 64 px.

## Estado real del proyecto y revisión

El editor actual ya exporta JSON, importa JSON y exporta PNG por combinación de mandos/contextos (`src/utils/export.jsx`, `src/components/ExportImageModal.jsx`). La elección de dimensiones y los flujos de revisión mostrados aquí son propuestas. La importación `.inputactions` continúa pendiente según [la propuesta existente](../unity-inputactions-proposal.md) y [sus reglas](../unity-inputactions-conversion.md).

Archivos de esta actualización: `index.html` incorpora el selector de alternativas; `files.css` define posiciones y dimensiones; `files.js` presenta los accesos y los diálogos simulados. La aplicación en `src/` no se modifica. Revisión estática de código y rutas; sin `npm run` ni pruebas dinámicas. Pendiente comprobar visualmente las propuestas en navegador antes de integrarlas.
