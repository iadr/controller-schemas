# Representación de varias acciones por control

La unidad visual es **contexto → control físico → evento → acción**. Un botón con pulsación corta y mantenimiento es un solo control con dos asociaciones. El tipo describe capacidades: un stick admite vector X/Y y clic; una rueda admite desplazamiento de un eje y clic. El dibujo aparece una vez, aunque existan varias acciones.

El [prototipo](index.html) muestra ejemplos al elegir Xbox o Teclado + mouse con contexto GAMEPLAY. Al cambiar a MENU se muestra una asociación de confirmación; los contextos nuevos quedan vacíos. Los demás dispositivos muestran ejemplos de botón y stick respetando las etiquetas de sus dibujos. No se asigna un gatillo analógico a Switch ni se añade a Steam Deck un gatillo que no aparece en su vista actual.

## Ejemplos visuales

| Control físico | Tipo / capacidad | Evento y condición de ejemplo | Acción de ejemplo |
| --- | --- | --- | --- |
| Xbox A | Botón digital | Soltar antes de 400 ms | Interactuar |
| Xbox A | Mismo botón | Mantener 400 ms o más | Abrir menú radial |
| Xbox RT | Gatillo, eje absoluto de 0 a 1 | Cambio continuo del valor | Acelerar |
| Xbox RT | Mismo gatillo | Cruzar de menos de 0.9 a 0.9 o más | Activar turbo |
| Xbox RT | Mismo gatillo | Permanecer en 0.9 o más durante 400 ms | Cargar impulso |
| Xbox LS | Stick, vector X/Y | Movimiento, componentes de −1 a 1 | Mover personaje |
| Xbox LS | Clic del mismo stick | Pulsar | Alternar carrera |
| Mouse izquierdo | Botón digital | Soltar antes de 400 ms / mantener al menos 400 ms | Seleccionar / arrastrar objeto |
| Rueda | Desplazamiento relativo de un eje | Desplazar arriba / abajo | Herramienta anterior / siguiente |
| Rueda | Clic central | Soltar antes de 400 ms / mantener al menos 400 ms | Marcar objetivo / abrir menú de herramientas |

Los 400 ms y 0.9 son parámetros ilustrativos, no valores del dispositivo ni defaults actuales. Arrastrar tras mantener es una interacción de juego de ejemplo, no una propuesta para cambiar el comportamiento del sistema operativo.

Una rueda y un stick comparten la posibilidad de tener movimiento y clic, pero su movimiento no significa lo mismo: la rueda entrega desplazamientos relativos; el stick expresa una posición en dos ejes. No se etiqueta la rueda como «stick» ni se le asigna un rango absoluto −1…1. La convención arriba/abajo debe normalizarse al importar; el prototipo no presupone el signo del evento nativo de una plataforma.

## Una representación por layout

| Propuesta | Presentación | Información visible | Control de dimensiones |
| --- | --- | --- | --- |
| 01 · Tres columnas | Tarjeta expandida por control en la lista derecha | Nombre, tipo, número de acciones y todas las filas evento → acción | Mantiene el panel de 280 px. Las tarjetas crecen verticalmente dentro del scroll; no ensanchan el mando |
| 03 · Inspector lateral | Detalle del control seleccionado más selector de controles | Todos los eventos del control activo y contador de acciones en cada opción | Conserva los 320 px del inspector. Cambiar control reemplaza el detalle. No se abren varios inspectores ni se aumenta su ancho |
| 04 · Secuencia vertical | Acordeón, como máximo un control expandido | Cabeceras con nombre/tipo/contador; filas completas al abrir | Mantiene la lista de 224 px con scroll, sin reducir adicionalmente el mando. Las cabeceras permiten abrir/cerrar el detalle |

Las cabeceras tienen al menos 44 px de alto, las filas de evento al menos 48 px, padding de tarjeta de 12 px y separación de tarjetas de 12 px. Las condiciones usan 11 px, el evento 12 px y la acción 14 px. El texto puede envolver; no se recortan nombres de acciones. Las filas apilan evento y acción para respetar el ancho disponible.

Las alternativas de archivos A/B siguen disponibles. Si comparten el inspector con las asociaciones, ambos bloques ocupan el mismo panel desplazable. El contador representa asociaciones por evento, no cantidad de controles ni cantidad de nombres de acciones diferentes.

## Semántica que debe quedar explícita

- **Pulsar inmediatamente y mantener:** si «pulsar» ocurre al bajar el botón, una pulsación larga puede ejecutar tanto la primera acción como la segunda. No son eventos mutuamente excluyentes.
- **Pulsación corta y mantener:** los ejemplos del botón A y clic central usan pulsación corta al soltar antes de 400 ms. A partir de 400 ms se ejecuta el mantenimiento una sola vez; al soltar no se ejecuta la corta. Deben mostrarse esos nombres y condiciones, sin llamar a ambos simplemente «pulsar».
- **Gatillo:** el recorrido continuo, el cruce del umbral y el mantenimiento pueden coexistir. En el ejemplo, acelerar continúa mientras se activa turbo. El cruce dispara una vez por entrada al rango; la repetición y el rearme deben definirse en el sistema de entrada real, no inferirse del dibujo.
- **Stick/rueda:** mover y hacer clic son capacidades distintas del mismo control y pueden coexistir. Mantener clic solo debe ofrecerse si está soportado por la definición del control y el modelo de eventos.
- **Conflictos:** dos acciones en el mismo contexto, control y evento requieren una regla explícita. Si se quieren varias acciones simultáneas para un único evento, eso es otra extensión; no se resuelve duplicando filas accidentalmente.

## Edición y exportación propuestas

Al seleccionar un control, el formulario debe ofrecer únicamente eventos compatibles con sus capacidades. Cada evento tiene su acción y sus condiciones. Para 01 puede abrirse el editor existente desde la tarjeta; para 03 el formulario cabe en el inspector; para 04 se propone una hoja de edición. Esta actualización muestra ejemplos y selección/despliegue, no implementa formularios nuevos ni entrada de hardware.

Al exportar PNG, mostrar todos los eventos configurados, incluso los que estén colapsados en la vista de edición. Una conexión del SVG llega a la cabecera del control, no una línea por cada acción. Si no cabe todo en las dimensiones elegidas, debe ofrecerse paginación o un tamaño mayor; no exportar una captura de la lista recortada ni reducir indefinidamente la tipografía.

JSON debe conservar eventos y parámetros, no un texto concatenado. Los eventos nuevos requieren un esquema versionado y conversión explícita. En `.inputactions`, las interacciones y tipos importados deben conservar su significado: no deducir pulsación corta exclusiva a partir de cualquier `press`, ni convertir automáticamente una rueda en dirección de stick.

## Diferencia con el soporte actual

La aplicación ya guarda más de un gesto por control. En `src/components/MappingEditor/MappingEditor.jsx`, los controles `stick` ofrecen `direction` y `press`; todos los demás ofrecen `press` y `hold`. En `src/constants/controllers.js`, los gatillos Xbox están clasificados como `button`; el mouse tiene `MiddleClick`, pero no eventos de desplazamiento de rueda. `getMappingGestures` en `src/utils/controllerDragDrop.js` reconoce solamente `hold`, `press` y `direction`.

Por eso el ejemplo de pulsación corta exclusiva, el recorrido/umbral del gatillo y los desplazamientos de rueda son **propuestas de ampliación**, no funciones existentes ni claves que el importador actual pueda interpretar. La siguiente implementación debería partir de capacidades por control y un pequeño catálogo de eventos, preservando los mappings actuales sin reinterpretarlos silenciosamente.

## Alcance y revisión

Se añadieron `events.js` y `events.css` al prototipo, con datos ilustrativos y variantes de presentación. `index.html` recalcula la lista al cambiar layout, dispositivo o contexto. La selección del inspector y los acordeones son interactivos; el SVG sigue siendo una imagen de referencia. No se modificó `src/`, no se capturan gamepads ni eventos físicos del mouse y no se simula el temporizador de 400 ms.

Revisión estática de sintaxis, referencias y estilos. No se ejecutaron `npm run` ni pruebas dinámicas. La verificación visual en navegador queda pendiente.
