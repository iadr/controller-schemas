# Esquema JSON version 2

Se mantienen controller, contexts, contextMappings, buttonSideOverrides y customOrder. Los archivos antiguos con mappings se convierten a MENU y GAMEPLAY al importar.

contextMappings conserva las reglas compartidas existentes: ID, position:ID y label:LABEL. Se resuelven con la prioridad anterior.

Se agrega deviceMappings[contexto][dispositivo][controlId]. Cada entrada contiene eventos direction, press o hold con action y description. Una entrada local tiene prioridad sobre la regla compartida. El valor null elimina la asociacion para ese dispositivo sin borrar la regla compartida para otros.

La edicion del layout 03 guarda asociaciones locales del control seleccionado. Los sticks ofrecen direction y press; los demas controles ofrecen press y hold. Los eventos heredados se muestran y se conservan hasta su edicion o eliminacion. El formato permite una accion por evento, igual que el esquema anterior.

Exportar JSON incluye version: 2, todas las reglas compartidas y las locales, ademas de orden y lados heredados. Los consumidores anteriores no conocen deviceMappings; usar el editor actualizado para conservar las ediciones por dispositivo.

El estado sigue viviendo en memoria. Descargar JSON permite conservarlo entre sesiones.
