# Controller Scheme Designer

Editor React para crear esquemas de controles por contexto y dispositivo, con el layout 03 de inspector lateral.

## Funciones

- Xbox, PlayStation, Nintendo Switch, Joy-Con izquierdo, Steam Deck y teclado con mouse.
- Tarjetas expandidas con todas las acciones y seleccion/hover sincronizados con el dibujo.
- Acciones de direccion, pulsacion y mantener, editadas en un borrador con guardar/cancelar.
- Crear contextos y recuperar asociaciones al cambiar contexto o dispositivo.
- Importar JSON con validacion y revision antes de reemplazar la sesion.
- Exportar el esquema completo a JSON o imagenes PNG por contexto/dispositivo.
- Interfaz adaptable, controles por teclado y modales con gestion de foco.

Las asociaciones permanecen en memoria hasta recargar. Exportar JSON permite conservarlas.
Unity .inputactions sigue pendiente.

## Desarrollo

Instalar dependencias con npm install y abrir el servidor con npm run dev.
El build se realiza manualmente con npm run build. No ejecutar pruebas dinamicas ni builds como parte de la reconstruccion automatizada.

## Estructura

- src/app: composicion y estado del esquema.
- src/modules/workspace: cabecera y distribucion del espacio.
- src/modules/controllers: registro, dibujo y regiones SVG.
- src/modules/mappings: tarjetas y edicion de acciones.
- src/modules/contexts: selector y creacion de contextos.
- src/modules/import y export: flujos JSON y PNG.
- src/shared/ui: modal accesible.
- src/styles/tokens.css: paleta y medidas compartidas con el prototipo.
- src/legacy/coordinate-editor: editor de coordenadas historico, fuera de la interfaz activa.

Ver [layout seleccionado](docs/layouts/selected/README.md),
[integracion y revision manual](docs/layouts/selected/integration.md) y
[formato JSON](docs/scheme-format.md).

## Licencia

MIT.
