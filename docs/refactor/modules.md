# Modulos

- app: estado del esquema y composicion de la interfaz.
- modules/controllers: registro, datos por dispositivo y renderizado SVG compartido.
- modules/mappings: formulario de acciones, listas, orden y conexiones.
- modules/contexts: seleccion y mantenimiento de contextos.
- modules/export: JSON, captura PNG, listas y trazado de conexiones.
- shared/icons: react-icons y compatibilidad con etiquetas serializadas.
- legacy/coordinate-editor: editor de coordenadas deprecado, cargado bajo demanda.
- styles: estilos compartidos; cada modulo conserva sus reglas especificas.

Un solo ControllerSvg aplica seleccion, eventos y resaltado. ControllerArtwork compone teclado y raton.
ControllerMappingView reemplaza las vistas repetidas de Xbox, Switch, Steam Deck y teclado.
El registro devuelve arrays estables, incluidos teclado y raton combinados.
