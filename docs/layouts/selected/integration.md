# Integracion React del layout 03

El editor usa cabecera con contexto, dispositivo, Importar y Exportar, lienzo flexible y un inspector de tarjetas expandidas. En ancho menor de 1000 px o alto menor de 600 px se apila el inspector.

Los componentes estan en src/modules/workspace, controllers, mappings, contexts, import y export. Modal compartida usa dialog nativo, Escape, foco inicial y retorno al disparador. La seleccion es independiente del borrador de acciones.

La fuente de estilos compartidos es src/styles/tokens.css. El prototipo importa ese mismo archivo mediante docs/layouts/tokens.css.

JSON se valida y revisa antes de reemplazar la sesion. PNG genera una imagen por contexto/dispositivo en las dimensiones elegidas, ajustando todo el contenido sin recortarlo. Un esquema muy extenso reduce el tamano del texto al ajustar la imagen.

Unity .inputactions sigue pendiente y la interfaz lo indica. El editor de coordenadas legado queda fuera del espacio de trabajo.

## Verificacion manual pendiente

No se ejecutaron builds ni pruebas dinamicas. Revisar manualmente:
- Seleccion y hover desde SVG y tarjeta, incluyendo Enter/Espacio.
- Guardar, cancelar, Escape y quitar todas las acciones.
- Cambio de contexto/dispositivo y retorno del foco.
- Importacion de JSON antiguo y version 2, rechazo de archivos invalidos.
- PNG de cada dispositivo, dimensiones y texto largo.
- Anchos de 390, 768 y 1280 px, y alto menor de 600 px.

El SVG de teclado es compacto. Las teclas adicionales del registro (incluido el bloque numerico) siguen editables en el inspector, identificadas como no visibles en el dibujo. Los gatillos presentes en los SVG de PlayStation y Steam Deck se incorporaron al registro.
