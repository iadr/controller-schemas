# Interaccion del layout 03

- Clic o Enter/Espacio sobre un control del dibujo: lo selecciona y abre la modal de acciones.
- Hover o foco sobre un control: destacado temporal ambar, sincronizado con su tarjeta.
- Seleccionar una tarjeta: destaca el control en azul. Editar acciones abre su modal.
- Guardar: registra las asociaciones por contexto y dispositivo durante la sesion. Los controles con acciones quedan verdes; la seleccion azul tiene prioridad. Hover usa ambar temporalmente.
- Cancelar o Escape: conserva las acciones anteriores. La seleccion permanece.
- Quitar todas las acciones y guardar: elimina el mapeo y su marca verde.
- Cambiar contexto o dispositivo: limpia la seleccion y recupera las asociaciones de ese contexto y dispositivo.

Los eventos y condiciones son texto de demostracion, sin captura de hardware ni validacion de capacidades. Solo las filas con accion se guardan; requieren nombre de evento. Los ejemplos iniciales se pueden editar. Recargar restablece los datos.

Las regiones interactivas se extraen de los SVG locales con extract-controls.py y se guardan en control-regions.js para abrir index.html directamente, sin servidor. Regenerar ese archivo cuando cambien las regiones de los SVG. No se modifican los SVG originales.

Revision estatica; sin builds, pruebas dinamicas ni validacion visual automatizada.
