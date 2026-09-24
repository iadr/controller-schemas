# Layout 03 elegido

La propuesta 03, Inspector lateral, es el diseno elegido. Las propuestas 01 y 04 quedan como referencias historicas; no son alternativas pendientes de decision. En pantallas pequenas se adapta el propio layout 03, conservando las tarjetas expandidas.

## Especificacion vigente

- [Estructura y adaptacion](structure.md): zonas, medidas y comportamiento por ancho y alto.
- [Componentes React](react-components.md): responsabilidades, composicion, propiedades y estado.
- [Paleta y estilos](styles.md): variables editables, tipografia y estados visuales.
- [Interacciones](../interaction-behavior.md): seleccion, hover y registro de acciones.

Abrir [el prototipo](../index.html). Sus estilos consumen [tokens.css](../tokens.css). Cambiar ese archivo actualiza la presentacion sin buscar colores o medidas en cada componente.

## Alcance

Esta decision documenta la interfaz y organiza sus estilos. La migracion del editor en src/ a este layout queda pendiente. El prototipo usa HTML y JavaScript; sus cambios de acciones viven en memoria y los flujos de archivo son simulados.

La implementacion debe separar la interfaz en componentes React pequenos y editables, con una responsabilidad por archivo y estilos junto al componente. No trasladar el HTML completo a App.jsx ni reunir todas las modales en un solo componente. Reutilizar los modulos existentes cuando cumplan la misma responsabilidad.

## Criterios de aceptacion para la integracion

- Cabecera con contexto, dispositivo, Importar y Exportar separados.
- Lienzo flexible y panel de mapeo de 320 px en escritorio.
- Todas las acciones de cada control visibles en tarjetas expandidas.
- Seleccion y hover sincronizados entre SVG y lista.
- Modal para registrar, modificar y quitar acciones del control.
- Paleta y medidas compartidas mediante variables CSS.
- Modales con etiquetas, foco inicial, Escape y retorno del foco.
- Adaptacion a pantallas pequenas sin recortar el mando ni superponer controles.

La revision realizada es estatica. Los builds y la comprobacion visual quedan para ejecucion manual.
