# Steam Deck: mapeo del SVG frontal

Fuente: controllers/steam-deck_processed.svg. ViewBox: 0 0 1339 542.
Las zonas usan data-button-id, como Xbox y teclado. Los IDs originales se conservan.

| ID del SVG | ID de la aplicacion |
| --- | --- |
| leftStick | leftStick |
| rightStick | rightStick |
| xButton | west |
| yButton | north |
| aButton | east |
| bButton | south |
| dpadUp | dPadUp |
| dpadDown | dPadDown |
| dpadLeft | dPadLeft |
| dpadRight | dPadRight |
| Path_447-3 | leftButton |
| rightBumper | rightButton |
| startButton | start |
| backButton | select |

aButton esta sobre la letra B y bButton sobre A: se asignan por geometria.
Se agregan leftPad, rightPad, steam y quickAccess siguiendo los contornos visibles.
L2/R2 y los botones traseros no tienen zonas distinguibles en esta vista; no se inventan areas ni se superponen a L1/R1.
Las coordenadas de las definiciones se normalizan al nuevo viewBox. La exportacion usa las zonas del SVG.
Verificacion estatica solamente; pruebas dinamicas y build pendientes de revision manual.
