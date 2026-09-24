# Estructura del layout 03

## Composicion

```text
SchemeWorkspace
  WorkspaceHeader
    Titulo
    SessionControls
      ContextSelector
      DeviceSelector
    FileActions
      Importar
      Exportar
  WorkspaceBody
    ControllerStage
      Nombre del dispositivo
      ControllerArtwork + regiones interactivas
      Medidas (solo prototipo)
    MappingPanel
      Asociaciones + contexto
      ControlMappingCard[]
        Control + tipo + cantidad de acciones
        ActionEventRow[]
          Evento + condicion
          Accion
        Editar acciones
  ModalHost
    ContextDialog | ActionDialog | ImportDialog | ExportDialog
```

Las modales se presentan sobre la interfaz, no ocupan una columna. Solo una modal de trabajo abierta a la vez. Las opciones del importador o exportador reemplazan el contenido de su modal; no apilar modales.

## Cabecera

Fondo azul oscuro uniforme. Titulo a la izquierda; selectores y acciones de archivo a la derecha en escritorio. Altura de 64 px. Contexto de 240 px y dispositivo de 200 px, separados por 12 px. Importar y Exportar miden 88 x 44 px, separados por 8 px.

El selector de contexto incluye Crear contexto. Su modal solicita nombre, rechaza vacios, duplicados sin distinguir mayusculas y nombres reservados. Maximo de 40 caracteres. Crear activa el contexto; cancelar conserva el anterior.

El selector de dispositivo actualiza el dibujo y las asociaciones del contexto/dispositivo. No mostrar navegacion lateral de proyecto en este layout.

## Area de trabajo

Dos columnas: lienzo flexible y panel de 320 px. Margen interior de 24 px, separacion de 16 px, superficies con radio de 12 px y borde de 1 px. Ambos hijos usan min-width: 0 y min-height: 0.

El lienzo tiene titulo, dibujo centrado y zona de medidas del prototipo. Maximo del dispositivo/conjunto: 880 x 560 px. Respetar el viewBox real y ambos ejes, sin deformar ni recortar. Teclado y mouse comparten escala.

El panel de asociaciones tiene scroll propio. Una tarjeta expandida por control muestra nombre, tipo, contador y todas sus asociaciones. Cada fila apila evento, condicion y accion; permite envolver texto. No sustituir estas tarjetas por un selector que muestre un solo control.

## Adaptacion

| Condicion | Composicion |
| --- | --- |
| Ancho desde 1000 px | Cabecera de 64 px; lienzo y panel lateral |
| Ancho de 600 a 999 px | Selectores debajo de cabecera, en franja de 104 px; lienzo y panel inferior de 224 px |
| Ancho menor de 600 px | Cabecera de 112 px: titulo y botones en filas separadas; franja de selectores de 104 px; panel inferior de 224 px |
| Alto menor de 600 px | Area de trabajo desplazable: lienzo de 300 px y panel de 224 px; una columna |

En modo apilado usar padding de 16 px y gap de 12 px. No colapsar las tarjetas como en la propuesta 04.

En React preferir grid/flex y filas auto para cabecera y selectores, dejando minmax(0, 1fr) al cuerpo. Las posiciones absolutas del prototipo sirven para la simulacion; no son un requisito del editor.

## Modales

| Modal | Ancho maximo | Contenido |
| --- | --- | --- |
| Crear contexto | 420 px | Nombre, error, cancelar, crear |
| Acciones | 540 px | Control/contexto, asociaciones editables, agregar, quitar, cancelar, guardar |
| Importar | 580 px | JSON o Unity .inputactions; archivo y revision |
| Exportar | 580 px | PNG o JSON; configuracion segun formato |

Margen minimo exterior de 16 px por lado, altura maxima de viewport menos 32 px y scroll interior. En pantallas estrechas los campos se apilan.

## Elementos exclusivos del prototipo

El selector 01/03/04, resoluciones simuladas, zoom, descripciones comparativas, leyenda de colores y medidas del dibujo no forman parte del editor final. El boton Editar acciones de cada tarjeta y las acciones de archivo si forman parte de la interfaz elegida.
