# Propuesta: importar Unity Input Actions

Estado: pendiente, para cuando el mapper se considere estable. Este documento no inicia la implementacion.

## Objetivo

Cargar un archivo .inputactions del nuevo Input System de Unity y obtener un esquema editable de botones, con exportacion al JSON y PNG actuales. El archivo es JSON; la conversion puede realizarse en el navegador sin Unity instalado ni backend.

## PoC propuesto

1. Cargar el archivo y validar su estructura antes de modificar el estado.
2. Elegir Action Maps, Control Scheme si existe y controlador visual de destino.
3. Mostrar una previsualizacion con asociaciones resueltas, conflictos y bindings no soportados.
4. Aplicar el resultado como un esquema nuevo mediante una accion explicita, conservando el esquema abierto hasta ese momento.
5. Editar nombres o asociaciones y exportar con las funciones existentes.

Cada Action Map genera un contexto. El nombre de cada Action sirve como texto inicial del mapping. El Control Scheme filtra bindings; no determina por si solo si el dibujo debe ser Xbox, Switch o Steam Deck.

El primer PoC cubre bindings directos de Gamepad: botones frontales, hombros, gatillos, sticks y sus pulsaciones, solo cuando el catalogo visual de destino tiene una equivalencia explicita. Teclado, mouse, composites y layouts personalizados quedan identificados para revision, fuera de la conversion automatica inicial.

## Alcance y limites

La salida documenta controles; no reproduce la logica de ejecucion de Unity. Los nombres de acciones no garantizan textos localizados ni descripciones del juego. Los rebindings guardados durante una partida son datos separados y no se pueden deducir del .inputactions original.

No se incluye sincronizacion en vivo, plugin de Unity, exportacion de vuelta a Unity ni fusion automatica con un esquema existente.

## Aceptacion manual del PoC

- Un archivo real del juego con dos Action Maps produce dos contextos independientes.
- Jump asociado a <Gamepad>/buttonSouth aparece en el boton sur del controlador elegido.
- Movimiento de stick y pulsacion de stick conservan gestos distintos.
- Dos acciones para el mismo control y gesto generan un conflicto visible, sin sobrescritura silenciosa.
- Bindings excluidos por filtro se distinguen de los no soportados.
- Un archivo invalido o cancelar la previsualizacion conserva el esquema abierto.
- El JSON exportado puede volver a importarse y el PNG refleja el contexto elegido.

La validacion y el build se ejecutaran manualmente al implementar. Antes de concretar compatibilidad se necesitara un .inputactions representativo del juego y la version de su paquete Input System.

## Referencias

- [Reglas de conversion](unity-inputactions-conversion.md).
- [Unity: InputActionAsset y formato JSON](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.4/api/UnityEngine.InputSystem.InputActionAsset.html).
- [Unity: bindings e interacciones](https://docs.unity.cn/Packages/com.unity.inputsystem@1.13/manual/ActionBindings.html).
