# Cuatro propuestas de layout

Fecha: 2026-09-23. Abrir [index.html](index.html) directamente en el navegador, sin instalar dependencias. Permite elegir propuesta, dispositivo, resolución, ancho y alto personalizados, y visualización ajustada o 1:1. Son prototipos de composición; las asociaciones son ilustrativas. En 03 y 04, los selectores de contexto y mando y la creación de contextos son funcionales en memoria. No modifican el editor existente.

## Análisis del proyecto

La aplicación usa React 18 y Vite 7 según `package.json`. `App.jsx` concentra el estado, el selector, los contextos, el editor y la exportación. `ControllerDisplay.jsx` selecciona la vista por dispositivo. Los componentes SVG importan los archivos de `controllers/` como texto; esas son las fuentes utilizadas por este prototipo.

Problemas concretos encontrados por lectura del código:

| Fuente | Regla actual | Consecuencia dimensional |
| --- | --- | --- |
| `src/App.css`, `.app-content` | Columna de 300 px, separación de 16 px, padding de 16 px y máximo de 1600 px | A 1440 px deja 1092 px para el panel principal, antes de sus bordes y padding |
| `.controller-with-list`, `.mappings-list-container` | Dos listas con mínimo de 250 px y dos separaciones de 32 px | Las listas y separaciones requieren 564 px, antes de incluir el mando |
| `XboxController.jsx` | Ancho declarado de 600 px | Composición nominal de 1164 px; supera los aproximadamente 1058 px interiores del panel a 1440 px. Flex puede reducir elementos; estos valores no garantizan su tamaño final |
| `SteamDeckController.jsx` | Contenedor de 700 px | Composición nominal de 1264 px con listas; no existe un presupuesto común para ambos ejes |
| `SwitchController.jsx` | `maxWidth: 600px`, `height: 78vh` | A 900 px de alto solicita 702 px independientemente del espacio ocupado por la interfaz |
| `KeyboardMouseDisplay.jsx` | Teclado de 620 px, mouse de 120 px, separación vertical de 24 px | Por sus proporciones, el conjunto solicita aproximadamente 620 × 447 px, antes de listas y relleno |
| `src/App.css` | Paneles con `height: calc(100vh - 80px)`; a 1024 px las columnas pasan a una sola | El apilamiento conserva alturas ligadas a toda la pantalla y no distribuye un presupuesto vertical conjunto |
| `src/utils/controllerDragDrop.js` | Escucha el redimensionado de ventana para recalcular posiciones | Al implementar cambios de paneles se debe observar también el tamaño del contenedor y el scroll de las listas |

Estos son hallazgos estáticos, no mediciones tomadas de una sesión del editor. `docs/PROJECT.md` menciona Vite 5; para este análisis se tomó la versión declarada en `package.json`.

## Reglas comunes de diseño

- Todas las dimensiones son píxeles CSS, no píxeles físicos ni milímetros. Pantalla significa viewport disponible, sin las barras externas del navegador.
- Retícula de 8 px: cabecera de 64 px, margen de 24 px en escritorio, separaciones de 16 px, padding de panel de 16 px. La propuesta vertical y el modo estrecho usan margen de 16 px y separación de 12 px.
- Una sola jerarquía visual: fondo gris, superficies blancas, cabecera azul oscuro y azul para selección. Tipografía de sistema; título de panel de 16 px, contenido de 14 px y anotaciones de 12 px.
- El contexto encabeza la pantalla, el dispositivo ocupa el área central y las asociaciones forman un grupo separado. Las listas tienen filas de al menos 48 px y scroll propio.
- Cada mando tiene una caja máxima de ancho **y** alto. Se centra y conserva su proporción. No se recorta ni se estira para llenar la caja.
- Las grillas usan `minmax(0, 1fr)` y sus hijos `min-width: 0; min-height: 0`, para que el contenido no imponga anchos mínimos ocultos.
- El lienzo reserva 40 px para título, 32 px para dimensiones, 32 px para padding vertical y 2 px para bordes. El mando utiliza solamente el espacio restante.
- Los controles del prototipo tienen al menos 44 px de alto y foco visible. Al implementar el editor, los botones pequeños del SVG deben tener una alternativa en la lista; no basta con ampliar el dibujo.

### Proporciones reales

| Dispositivo | Archivo utilizado | `viewBox` ancho × alto | Ancho / alto |
| --- | --- | --- | ---: |
| Xbox | `controllers/xbox-one.svg` | 520.26486 × 365.63068 | 1.423 |
| Switch | `controllers/switch.svg` | 275.78001 × 413.90065 | 0.666 |
| Joy-Con | `controllers/switch_joycon_processed.svg` | 785 × 360 | 2.181 |
| Steam Deck | `controllers/steam-deck_processed.svg` | 1339 × 542 | 2.470 |
| Teclado | `controllers/keyboard.svg` | 868.95991 × 326.18396 | 2.664 |
| Mouse | `controllers/mouse.svg` | 240 × 380 | 0.632 |

La forma vertical de Switch proviene del SVG actual. No debe imponerse la proporción horizontal del Joy-Con ni usarse la proporción del Steam Deck sin procesar.

Para un SVG de tamaño intrínseco `Iw × Ih`, un área libre `Aw × Ah` y un máximo de propuesta `Mw × Mh`:

```text
Bw = min(Aw, Mw)
Bh = min(Ah, Mh)
s = max(0, min(Bw / Iw, Bh / Ih))
ancho = Iw × s
alto  = Ih × s
```

En teclado + mouse se colocan ambos en horizontal, con separación de 16 px. Se usa un mouse base de 150 × 237.5 px y una escala común: `s = max(0, min((Bw - 16) / (868.95991 + 150), Bh / 326.18396))`. Es una relación visual propuesta, no una escala física entre periféricos. En móvil, la lista permite consultar las acciones aunque las teclas del diagrama sean pequeñas.

## Las cuatro propuestas

| Propuesta | Distribución de escritorio | Caja máxima del mando/conjunto | Uso principal | Coste concreto |
| --- | --- | --- | --- | --- |
| 01. Tres columnas | Navegación 240 px / lienzo flexible / asociaciones 280 px | 640 × 480 px | Editar manteniendo contextos y archivos visibles | Reserva 552 px de ancho entre paneles fijos y separaciones |
| 02. Mesa horizontal | Navegación 224 px / lienzo arriba / asociaciones abajo 208 px | 800 × 400 px | Steam Deck, Joy-Con y teclado + mouse | La franja inferior consume 224 px de alto contando separación |
| 03. Inspector lateral | Lienzo flexible / asociaciones 320 px; contexto en cabecera | 880 × 560 px | Inspeccionar botones y asociaciones en escritorio | Los selectores ocupan 452 px de la cabecera, contando su separación |
| 04. Secuencia vertical | Selectores 104 px / lienzo / asociaciones 224 px | 560 × 360 px | Tablet y móvil | Selectores, lista y separación ocupan 340 px, además del padding del área de trabajo |

En 01 las asociaciones se unifican en un inspector, manteniendo el lado como dato al integrarlo. En 02 se reparten en dos columnas en la franja inferior. En 03 se propone editar la acción seleccionada en el mismo inspector. En 04 el contexto permanece encima del mando. La creación de contextos sí funciona en el prototipo; la edición de asociaciones y la gestión de archivos siguen pendientes de integración.

### Medidas de referencia a 1440 × 900

Valores calculados con las reglas anteriores y redondeados al píxel. Corresponden al rectángulo completo del SVG, que puede contener espacio vacío interno.

| Propuesta | Xbox | Switch | Joy-Con | Steam Deck |
| --- | --- | --- | --- | --- |
| 01 | 640 × 450 | 320 × 480 | 640 × 294 | 640 × 259 |
| 02 | 569 × 400 | 267 × 400 | 800 × 367 | 800 × 324 |
| 03 | 797 × 560 | 373 × 560 | 880 × 404 | 880 × 356 |
| 04 | 509 × 358 | 239 × 358 | 560 × 257 | 560 × 227 |

### Pantallas y límites

| Pantalla | Comportamiento |
| --- | --- |
| 1920 × 1080 | Conserva las cajas máximas; el espacio extra queda alrededor del dispositivo |
| 1440 × 900 | Referencia comparativa de la tabla anterior |
| 1366 × 768 | Mantiene columnas; el límite vertical puede reducir el mando antes que el horizontal |
| 1024 × 768 | Último preset de escritorio; 01 dispone de 424 px de panel central antes de descontar padding y bordes |
| 768 × 1024 | 01–02 pasan a lienzo + lista inferior; 03–04 muestran selectores arriba del lienzo |
| 390 × 844 | Márgenes de 16 px, lista de una columna, SVG contenido por ambos ejes |
| 844 × 390 | Área de trabajo con scroll; lienzo de 300 px y lista de 224 px; navegación secundaria oculta |

Umbrales exactos: ancho menor de 1000 px para apilar 01–03; ancho menor de 600 px para listas de una columna; alto menor de 600 px para permitir scroll del área de trabajo con lienzo de 300 px. El prototipo acepta anchos de 320–3840 px y altos de 320–2160 px. La reducción visual para caber en la página no cambia la resolución simulada ni las medidas informadas.

A 390 × 844, 01–02 tienen una caja libre de dibujo de 324 × 406 px, antes de aplicar sus máximos. 03–04 tienen 324 × 302 px por la barra de selectores de 104 px. Por ejemplo, Xbox se representa aproximadamente a 324 × 228 px en las cuatro propuestas.

## Propuesta de adopción

Tomar **03 como base de escritorio**: a 1440 × 900 permite Xbox de 797 × 560 px, frente a 640 × 450 px de 01. Adoptar **04 para anchos inferiores a 1000 px**. Si el trabajo se concentra en dispositivos horizontales y edición de varias asociaciones, evaluar 02 con su franja inferior de 208 px. Las cuatro variantes están disponibles para comparar antes de modificar el editor.

La implementación posterior debería centralizar las cajas y proporciones, retirar los anchos y alturas inline de cada controlador y compartir el cálculo con exportación. El PNG debe calcularse contra las dimensiones elegidas para la imagen, sin reutilizar `vh` del editor. Para líneas de conexión, observar cambios del contenedor y scroll, limitar las búsquedas al controlador activo y mostrar preferentemente la conexión seleccionada para evitar cruces entre listas y dibujo.

## Revisión realizada y límites

Se revisaron código, rutas locales y atributos raíz de los SVG. El prototipo reutiliza recursos locales y no requiere red. No se ejecutaron `npm run`, servidores, navegador automatizado ni pruebas dinámicas, conforme a las instrucciones del proyecto. Las medidas son cálculos de diseño; queda pendiente validación visual en navegador antes de integrar alguna propuesta en producción.


## Actualización: contextos y mandos en 03 y 04

El prototipo abre inicialmente en **03**. Dentro de la pantalla simulada:

- **03, ancho desde 1000 px:** cabecera de 64 px con selector de contexto de 240 × 44 px y selector de mando de 200 × 44 px, separados por 12 px.
- **04 y 03 con ancho menor de 1000 px:** franja debajo de la cabecera de 104 px, con dos selectores de 44 px, separación de 8 px y padding vertical de 4 px. Con pantalla de 390 px, su ancho es de 358 px.
- **Crear:** elegir `+ Crear contexto…`, escribir el nombre y confirmar `Crear`. Se rechazan nombres vacíos, duplicados sin distinguir mayúsculas y el identificador reservado. Límite de 40 caracteres. El nuevo contexto queda activo y muestra un estado sin asociaciones.
- **Cambiar contexto:** elegir GAMEPLAY, MENU o un contexto creado. GAMEPLAY y MENU tienen asociaciones de ejemplo diferentes.
- **Cambiar mando:** usar el selector dentro de la pantalla; actualiza el SVG y sus dimensiones, conserva el contexto y se sincroniza con el selector externo de dispositivo.
- **Cancelar:** botón Cancelar o Escape; conserva el contexto anterior. El formulario usa un diálogo nativo sobre la página de revisión para mantener foco y legibilidad incluso con la vista previa reducida.

Los contextos se conservan al cambiar de propuesta y se pierden al recargar. La adaptación real de asociaciones por dispositivo corresponde al editor existente y no se reproduce en este prototipo. En pantallas de menos de 600 px de alto los selectores continúan visibles y el lienzo y la lista tienen desplazamiento dentro del espacio restante.

Revisión de esta actualización: inspección estática del HTML, CSS y eventos; sin `npm run` ni pruebas dinámicas.
