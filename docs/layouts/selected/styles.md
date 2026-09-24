# Paleta y estilos

La fuente editable es [tokens.css](../tokens.css). El prototipo ya consume estas variables desde prototype.css, files.css, events.css e interactions.css. Al integrar React, trasladar este archivo a src/styles/tokens.css e importarlo una sola vez; no mantener dos copias activas ni mezclarlo con la paleta oscura anterior.

## Paleta clara con cabecera oscura

| Variable | Valor | Uso |
| --- | --- | --- |
| --color-text | #172337 | Texto principal |
| --color-muted | #526176 | Texto secundario y condiciones |
| --color-app | #f4f6fa | Fondo de aplicacion |
| --color-surface | #ffffff | Paneles, formularios y modales |
| --color-stage | #fafcff | Lienzo uniforme |
| --color-card | #f9fbff | Tarjetas de control |
| --color-header | #14243d | Cabecera |
| --color-on-dark | #ffffff | Texto sobre cabecera o primario |
| --color-header-button | #243d60 | Botones de archivo |
| --color-border | #b7c4d5 | Campos y controles |
| --color-panel-border | #d0d9e5 | Paneles |
| --color-primary | #224dc4 | Accion primaria y seleccion |
| --color-primary-soft | #eaf0ff | Fondo de acento suave |
| --color-selected-stroke | #153991 | Contorno seleccionado en SVG |
| --color-mapped | #17804a | Control con acciones |
| --color-hover | #d98b13 | Hover de controles |
| --color-hover-stroke | #925807 | Contorno de hover |
| --color-focus | #ec9c19 | Foco de interfaz |
| --color-danger | #a32020 | Mensajes de error |

Los tonos auxiliares de bordes, revision de archivos, backdrop y banco de propuestas tambien estan definidos en tokens.css. No introducir colores literales en componentes.

## Estados del mando

| Estado | Relleno | Opacidad | Contorno |
| --- | --- | --- | --- |
| Sin asociaciones | Primario invisible | 0 | Transparente |
| Con acciones | Verde mapeado | --mapping-opacity: .3 | Verde, --control-stroke: 2 |
| Seleccionado | Azul primario | --selection-opacity: .5 | Azul oscuro, --control-active-stroke: 3 |
| Hover o foco visible | Ambar | --hover-opacity: .5 | Ambar oscuro, trazo activo |

Prioridad visual: hover/foco, seleccion, mapeado, neutro. Al salir del hover reaparece el estado persistente. Las tarjetas replican borde ambar o borde azul con marca interior de seleccion. Los contornos SVG no escalan con el dibujo.

## Tipografia y espacios

Tipografia de sistema, sin descarga de fuentes; monospace solo para medidas del prototipo. Cuerpo de 14 px, titulo de panel de 16 px, marca de cabecera de 18 px, titulo de modal de 20 px. Condiciones y contadores de 11 px; texto auxiliar de 12 px.

Variables --font-size-*, --font-weight-* y --line-height-body controlan estos valores. Espacios en escala --space-1 a --space-6 (4, 8, 12, 16, 20 y 24 px), con pasos auxiliares para detalles de 2, 6 y 10 px.

Radios: --radius-control de 8 px, --radius-panel de 12 px. Borde base de 1 px. Foco con --focus-width y --focus-offset de 3 px.

## Medidas editables

- --header-height: 64 px; --header-height-mobile: 112 px.
- --session-height: 104 px; --context-width: 240 px; --device-width: 200 px.
- --inspector-width: 320 px; --mapping-height: 224 px.
- --controller-max-width: 880 px; --controller-max-height: 560 px.
- --control-height: 44 px; --event-row-height: 48 px.
- --file-button-width: 88 px.
- --dialog-context-width: 420 px; --dialog-action-width: 540 px; --dialog-file-width: 580 px.

Las alturas restantes y el espacio reservado para botones se derivan con calc() de esas variables. El escalado del mando 03 lee sus maximos desde las mismas variables.

Los umbrales de 1000 px de ancho, 600 px de ancho/alto y 480 px para campos de modal permanecen literales en las consultas CSS. Las custom properties no se pueden usar directamente como condiciones de media/container queries; modificar esos umbrales en las reglas y en structure.md, sin crear variables que parezcan controlarlos.

## Reglas visuales

Fondos uniformes, sin gradientes en botones ni superficies. Sin kickers redundantes encima de titulos. Una sola accion primaria por formulario, secundarios con borde, estados disabled nativos distinguibles. Texto largo envuelve; solo el nombre de contexto puede truncarse y conserva su titulo completo.

La sombra --shadow-preview pertenece al banco de propuestas, no a cada tarjeta. --modal-backdrop atenua la interfaz detras de las modales. No anadir sombras o animaciones nuevas por componente sin una necesidad concreta.
