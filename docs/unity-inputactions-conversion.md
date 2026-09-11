# Unity Input Actions: reglas de conversion

Complemento de [la propuesta](unity-inputactions-proposal.md). Reglas propuestas, pendientes de implementar.

## Entrada y seleccion

Validar maps, actions y bindings y resolver la referencia de cada binding a su accion dentro del mapa. Conservar nombres de mapas sin normalizarlos a mayusculas; detectar nombres duplicados que colisionen como claves de contexto.

Si se selecciona un Control Scheme, usar su bindingGroup para filtrar groups, separados por punto y coma; incluir bindings sin grupo. No asumir que el nombre visible del esquema coincide con el grupo. Sin Control Schemes, filtrar por la familia de dispositivo soportada.

## Correspondencias iniciales

| Path Unity | Clave de destino | Gesto inicial |
| --- | --- | --- |
| <Gamepad>/buttonSouth | position:south | press |
| <Gamepad>/buttonNorth | position:north | press |
| <Gamepad>/buttonEast | position:east | press |
| <Gamepad>/buttonWest | position:west | press |
| <Gamepad>/leftStick | position:leftStick | direction |
| <Gamepad>/rightStick | position:rightStick | direction |
| <Gamepad>/leftStickPress | position:leftStick | press |
| <Gamepad>/rightStickPress | position:rightStick | press |

Usar posiciones para los botones frontales: la etiqueta A no ocupa la misma posicion en Xbox y Switch. Hombros, gatillos, cruceta y botones de sistema necesitan equivalencias verificadas contra src/constants/controllers.js para cada destino; no basta con quitar el prefijo del path. El resolver actual de posiciones usa el ID del boton y no normaliza IDs diferentes entre dispositivos.

Una interaccion Hold simple puede representarse como hold si el control lo admite. Considerar tanto las interacciones del binding como las de la accion. Tap, MultiTap, combinaciones de interacciones y variantes de Press que el mapper no representa quedan pendientes de revision. Un binding sin interacciones usa press para botones o direction para sticks como convencion visual, sin inferir comportamiento a partir del nombre de la accion.

No ejecutar processors ni inferir umbrales, duraciones o comportamiento del juego. Informar parametros que no tengan representacion visual.

## Casos sin conversion automatica

- Composites: reconocer isComposite e isPartOfComposite y agrupar sus partes; no convertir la cabecera en un boton. El PoC los informa como pendientes junto a su accion y paths.
- Paths con comodines, usages, controles desconocidos o layouts personalizados: pendientes, sin adivinar equivalencias.
- Varias acciones en la misma clave y gesto: conservar candidatos en el informe y exigir resolucion antes de aplicar. El modelo actual admite una accion por gesto.
- Acciones sin binding compatible: informar; no inventar botones.
- Overrides de runtime: fuera de alcance. Unity serializa estos overrides por separado del asset.

## Salida e integracion

Generar el formato vigente: controller, contexts, contextMappings, buttonSideOverrides y customOrder. Los dos ultimos comienzan vacios. Ejemplo de una entrada en contextMappings.Gameplay:

```json
{
  "position:south": {
    "matchType": "position",
    "matchValue": "south",
    "press": { "action": "Jump", "description": "" }
  }
}
```

Mantener el informe de conversion separado del esquema: mapa, accion, binding ID, path original, motivo y candidatos cuando exista conflicto. Mostrar cantidades de bindings convertidos, excluidos por seleccion y pendientes.

Separacion minima propuesta: un modulo de conversion pura, una tabla de equivalencias y un componente de importacion/previsualizacion. App.jsx aplica el resultado ya validado; src/utils/export.jsx mantiene la importacion del formato propio y sus exportaciones. Evitar introducir un framework de adaptadores.

## Fuentes

- [Unity: estructura y semantica de bindings, grupos, composites e interacciones](https://docs.unity.cn/Packages/com.unity.inputsystem@1.13/manual/ActionBindings.html).
- [Unity: persistencia separada de rebindings](https://github.com/Unity-Technologies/InputSystem/blob/develop/Packages/com.unity.inputsystem/Documentation~/user-rebinding-runtime.md).
