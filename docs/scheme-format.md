# Esquema JSON version 2

Se mantienen controller, contexts, contextMappings, buttonSideOverrides y customOrder. Los archivos antiguos con mappings se convierten a MENU y GAMEPLAY al importar.

contextMappings admite reglas por cardinalidad: position:SOUTH, position:EAST, position:NORTH y position:WEST. Se resuelven usando position del control, solo en mandos con esa cardinalidad. Conserva las reglas heredadas ID, position:ID y label:LABEL. La prioridad es: entrada local (incluido null), cardinalidad (incluido null), ID, position:ID y label:LABEL.

Se agrega deviceMappings[contexto][dispositivo][controlId]. Cada entrada contiene eventos direction, press o hold con action; description es opcional y se acepta al importar archivos anteriores. Una entrada local tiene prioridad sobre la regla compartida. El valor null elimina la asociacion para ese dispositivo sin borrar la regla compartida para otros.

El modal permite guardar por boton en el dispositivo seleccionado o por cardinalidad compartida en el contexto actual. Al guardar por cardinalidad se elimina la excepcion local del boton seleccionado; las excepciones de otros dispositivos se conservan. El modal no incluye descripcion y guarda solo action por evento. Los sticks ofrecen direction y press; los demas controles ofrecen press y hold. Los eventos heredados se muestran y se conservan hasta su edicion o eliminacion. El formato permite una accion por evento, igual que el esquema anterior.

Exportar JSON incluye version: 2, todas las reglas compartidas y las locales, ademas de orden y lados heredados. Los consumidores anteriores no conocen deviceMappings; usar el editor actualizado para conservar las ediciones por dispositivo.

El estado sigue viviendo en memoria. Descargar JSON permite conservarlo entre sesiones.
