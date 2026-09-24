# Separacion en componentes React

## Regla de implementacion

Separar por responsabilidad para facilitar cambios independientes de layout, contenido y estilos. Un componente principal por archivo .jsx; CSS del componente en su modulo. Importar tokens.css una vez en la entrada. App.jsx solo compone el espacio de trabajo y conecta el estado.

No crear un componente por cada span ni agregar una libreria de estado para este alcance. Usar props, callbacks y hooks locales. Reutilizar el registro de mandos, ControllerArtwork, ControllerSvg y MappingEditor donde corresponda, adaptando su contrato.

## Componentes de estructura

| Componente | Responsabilidad y estructura | Datos y callbacks |
| --- | --- | --- |
| SchemeWorkspace | Compone cabecera, lienzo, panel y modal activa; distribuye el espacio | Estado del esquema y handlers del hook |
| WorkspaceHeader | Titulo, SessionControls y FileActions; adaptacion de filas | contextos, contexto, dispositivos, dispositivo; callbacks |
| SessionControls | Agrupa los dos selectores con etiquetas accesibles | contexto/dispositivo activos y cambios |
| ContextSelector | Seleccion de contexto y opcion Crear contexto | contexts, value, onChange, onCreate |
| DeviceSelector | Seleccion de dispositivo del registro | devices, value, onChange |
| FileActions | Solo dos botones: Importar y Exportar | onImport, onExport |

Ubicacion sugerida: src/modules/workspace/. Mantener selector de dispositivos en src/modules/controllers/ si se reutiliza el existente.

## Dibujo y mapeo

| Componente | Responsabilidad y estructura | Datos y callbacks |
| --- | --- | --- |
| ControllerStage | Titulo y caja proporcional del dibujo | controller, children |
| ControllerArtwork | Compone uno o varios SVG, incluido teclado + mouse | controller, mappings, selectedControlId, hoveredControlId |
| ControllerSvg | Regiones del dibujo; estilos de mapeado, seleccionado y hover; entrada por teclado | onControlSelect, onControlHover, onEditControl |
| MappingPanel | Titulo/contexto, lista desplazable y estado vacio | controls, mappings, seleccion, hover, callbacks |
| ControlMappingCard | Cabecera seleccionable, contador, lista de eventos y Editar acciones | control, events, selected, hovered, onSelect, onHover, onEdit |
| ActionEventRow | Evento, condicion y accion, sin estado propio | event, condition, action |

Ubicaciones: dibujo en src/modules/controllers/; panel y tarjetas en src/modules/mappings/. ControllerMappingView puede pasar a componer el lienzo y un unico MappingPanel; no conservar dos listas laterales para la propuesta 03.

## Modales y formularios

| Componente | Responsabilidad y estructura | Datos y callbacks |
| --- | --- | --- |
| Modal | Envolvente compartida: titulo, contenido, foco, Escape, cierre y backdrop | open, title, children, onClose, openerRef |
| ContextDialog | Nombre y validacion; crea contexto al confirmar | contexts, onCreate, onClose |
| ActionDialog | Borrador de asociaciones del control; confirmar o cancelar | control, context, mapping, onSave, onClose |
| ActionEditorRow | Campos de una asociacion y quitar fila | value, onChange, onRemove |
| ImportDialog | Elegir formato y mostrar paso de importacion/revision | onApply, onClose |
| JsonImportForm | Archivo JSON, revision y confirmacion de reemplazo | onReview, onApply |
| UnityImportForm | Archivo, Action Maps, Control Scheme, destino y conflictos | onReview, onApply |
| ExportDialog | Elegir PNG/JSON y su configuracion | scheme, onClose |
| ImageExportForm | Contextos, mandos, dimensiones y cantidad de imagenes | selection, onChange, onExport |
| JsonExportSummary | Resumen del esquema y descarga JSON | scheme, onExport |

Modal puede vivir en src/shared/ui/. Los formularios de archivo pertenecen a sus modulos de importacion/exportacion. La importacion Unity sigue siendo una funcionalidad pendiente: la documentacion del layout no supone que el conversor ya exista.

El MappingEditor existente puede reutilizarse dentro de ActionDialog tras adaptar los eventos admitidos; no duplicar su logica. Crear filas por capacidades reales cuando se integre: los campos de evento libres del prototipo solo demuestran el flujo.

## Estado y flujo

- Un hook de esquema mantiene contexto, dispositivo y asociaciones. Preservar formatos y reglas existentes de importacion; cualquier cambio de esquema se documenta aparte.
- Un hook de seleccion mantiene selectedControlId y hoveredControlId. Ambos identificadores son independientes de la modal abierta.
- El estado de modal contiene tipo y control editado, cuando corresponda. Cerrar la modal no borra la seleccion.
- ActionDialog mantiene un borrador local. Guardar comunica los cambios al esquema; cancelar o Escape descarta el borrador.
- Los datos de asociaciones determinan la marca de control mapeado; no almacenar un booleano duplicado.
- Cambiar contexto o dispositivo limpia seleccion y hover; recuperar sus asociaciones correspondientes.
- SVG y tarjeta consumen la misma seleccion. Clic en tarjeta selecciona; Editar acciones o clic en el SVG selecciona y abre ActionDialog.
- Eliminar todas las acciones quita la marca de mapeado. El control puede seguir seleccionado.

## Accesibilidad

Selectores con label; botones con nombre; cabecera seleccionable de tarjeta con aria-pressed. Regiones SVG operables con Enter/Espacio y foco visible. Modal con nombre accesible, foco contenido, Escape y retorno al disparador; si desaparecio, volver al control o al panel.

No depender solo del color: la tarjeta incluye cantidad de acciones, estado de seleccion accesible y foco visible. Evitar botones anidados dentro de otros botones.

## Estilos y edicion

Usar clases de componente y variables compartidas, evitando selectores globales como header, button o .active en la version React. No copiar el CSS global del banco de propuestas dentro de App.jsx. Los valores constantes de color, espacio, radio y medidas se leen de tokens.css; los estilos inline quedan para geometria calculada.
