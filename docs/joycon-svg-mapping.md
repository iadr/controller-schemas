# Joy-Con izquierdo: mapeo horizontal

Fuente: controllers/switch_joycon_processed.svg. ViewBox: 0 0 785 360.
Se agrega como joycon y se conserva switch.

| ID del SVG | ID de la aplicacion |
| --- | --- |
| leftStickClick | leftStick |
| xButton | dPadLeft |
| aButton | dPadRight |
| bButton | dPadDown |
| yButton | dPadUp |
| backButton | minus |
| leftBumperSingle | sl |
| rightBumperSingle | sr |

Los IDs A/B/X/Y del archivo cubren flechas, no botones con letras.
Las direcciones se expresan respecto a la orientacion horizontal del dibujo.
SL/SR son botones independientes de L. Se agrega capture sobre Rectangle_377 y se copia el contorno Path_447 para L.
No se asignan un stick derecho, Home, Plus o ZL a zonas inexistentes.
Las zonas usan data-button-id y conservan los IDs originales del archivo.
Verificacion estatica solamente; pruebas dinamicas y build pendientes de revision manual.
