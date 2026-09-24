# Asociaciones por boton y cardinalidad

- La barra lateral derecha muestra solo controles con al menos una accion efectiva en el contexto y dispositivo seleccionados. Si no hay asociaciones, invita a pulsar un control del dibujo.
- Pulsar un overlay, o activarlo con Enter/Espacio, abre el modal. Un control sin acciones ofrece «Agregar mapeo» con una fila de accion vacia; uno asociado ofrece editarlo.
- El modal contiene evento y accion, sin campo de descripcion. No permite guardar filas con acciones vacias. Quitar todas las filas y guardar elimina el mapeo en el alcance seleccionado mediante null.
- «Este boton en este dispositivo» crea una excepcion local. «Cardinalidad … en todos los mandos» comparte el mapeo dentro del contexto actual. Las excepciones locales de otros dispositivos mantienen prioridad; la del boton seleccionado se elimina al compartir.
- Ejemplo: guardar SOUTH → Aceptar y EAST → Cancelar/Volver por cardinalidad en MENU aplica A/B en Xbox y Steam Deck, Cross/Circle en PlayStation y B/A en Switch. En el Joy-Con izquierdo horizontal se usan los botones inferiores/derechos del dibujo como SOUTH/EAST. Teclado y raton no heredan cardinalidades.
- Los mapeos compartidos se exportan e importan en contextMappings con claves position:SOUTH, position:EAST, position:NORTH y position:WEST. No se crean acciones predeterminadas.

## Verificacion

Revision estatica del flujo overlay → modal → estado → resolucion → barra/exportacion y de la compatibilidad del importador con las claves compartidas. Comprobacion de espacios con git diff --check. No se ejecutaron npm run ni pruebas dinamicas.
