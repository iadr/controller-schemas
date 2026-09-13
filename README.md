# Controller Scheme Designer

Aplicacion React para crear esquemas de controles con acciones por contexto.

## Funciones

- Xbox, Nintendo Switch, Joy-Con izquierdo, Steam Deck y teclado con raton.
- Asignaciones por ID, posicion o etiqueta, compatibles con JSON existentes.
- Acciones de direccion, pulsacion y mantener.
- Ordenar acciones y moverlas entre listas.
- Importar/exportar JSON y exportar PNG con lineas opcionales.
- Iconografia SVG inline mediante react-icons.
- Editor de coordenadas conservado como legacy/deprecated.

## Desarrollo

Instalar dependencias con npm install y abrir el servidor con npm run dev.
El build se realiza manualmente con npm run build. No ejecutar pruebas dinamicas
ni builds como parte de la refactorizacion automatizada.

## Estructura

- src/app: composicion y estado del esquema.
- src/modules/controllers: datos, registro y SVG compartido.
- src/modules/mappings: edicion de acciones, listas y conexiones.
- src/modules/contexts: gestion de contextos.
- src/modules/export: JSON y PNG.
- src/shared/icons: adaptador de react-icons.
- src/legacy/coordinate-editor: editor de coordenadas deprecado.
- src/styles: estilos compartidos.

Detalle en [modulos](docs/refactor/modules.md),
[iconografia](docs/refactor/icons.md) y
[revision manual](docs/refactor/verification.md).

## Editor legacy

El editor exporta arrays de coordenadas para flujos antiguos. No modifica los paths
de los SVG. Las zonas activas se definen con data-button-id en controllers/.
Su codigo se carga solo al abrir el editor.

## Licencia

MIT.
