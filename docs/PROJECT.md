# Controller Scheme Designer

## Descripcion

Controller Scheme Designer es una aplicacion web de una sola pagina para definir, visualizar y compartir esquemas de control. Permite asociar acciones a botones de distintos mandos y perifericos, separar las asociaciones por contexto y exportar el resultado como JSON o PNG.

El proyecto funciona completamente en el navegador. No tiene backend, base de datos ni autenticacion. El estado se mantiene en memoria durante la sesion; para conservar el trabajo se debe exportar un archivo JSON y volver a importarlo cuando sea necesario.

## Caracteristicas

- Soporte para Xbox, Nintendo Switch, Steam Deck y teclado con mouse.
- Contextos independientes, inicialmente `MENU` y `GAMEPLAY`.
- Creacion y eliminacion de contextos.
- Acciones por gesto:
  - Botones: `press` y `hold`.
  - Sticks y superficies direccionales: `direction` y `press`.
- Asociaciones compatibles entre dispositivos mediante tres estrategias:
  - ID exacto del boton.
  - Posicion fisica, por ejemplo `position:south`.
  - Etiqueta visible, por ejemplo `label:A`.
- Resolucion de asociaciones en orden de prioridad: ID, posicion y etiqueta.
- Reordenamiento mediante arrastrar y soltar de las listas laterales.
- Cambio manual del lado en que aparece cada accion.
- Importacion y exportacion de esquemas JSON.
- Compatibilidad de importacion con el formato JSON antiguo basado en `mappings`.
- Exportacion PNG por combinacion seleccionada de controlador y contexto.
- Modo editor para ajustar, agregar y eliminar definiciones visuales de botones y copiar el arreglo resultante al portapapeles.

## Tecnologias

| Area | Tecnologia | Uso |
| --- | --- | --- |
| Interfaz | React 18 | Componentes, estado y renderizado |
| Entrada web | React DOM 18 | Montaje de la aplicacion |
| Desarrollo | Vite 5 | Servidor local y empaquetado |
| Imagenes | html-to-image | Renderizado de diagramas como PNG |
| Estilos | CSS | Layout, componentes y estados visuales |
| Iconos | Font Awesome y Bootstrap Icons por CDN | Iconografia de la interfaz y controles |
| Despliegue | gh-pages | Publicacion del directorio `dist` |

El codigo fuente usa JavaScript con JSX. Aunque existen paquetes `@types/react`, el proyecto no usa TypeScript.

## Requisitos

- Node.js 18 o superior, requerido por Vite 5.
- npm, incluido con Node.js.
- Conexion a Internet para instalar dependencias y cargar las fuentes de iconos externas.

Se recomienda respetar `package-lock.json` y usar `npm ci` en instalaciones reproducibles.

## Inicio rapido

```bash
npm ci
npm run dev
```

Vite muestra en la terminal la URL disponible. Por defecto suele ser `http://localhost:5173`.

## Comandos basicos

| Comando | Proposito |
| --- | --- |
| `npm install` | Instala o actualiza dependencias y puede modificar el lockfile |
| `npm ci` | Instala exactamente las versiones registradas en el lockfile |
| `npm run dev` | Inicia el servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera la version de produccion en `dist` |
| `npm run preview` | Sirve localmente el contenido generado en `dist` |
| `npm run deploy` | Ejecuta el build y publica `dist` mediante `gh-pages` |

No hay scripts de pruebas, lint o formato configurados actualmente.

## Arquitectura

La aplicacion sigue una estructura simple de componentes React:

```text
index.html
  -> src/main.jsx
     -> src/App.jsx
        -> selector y gestor de contextos
        -> visualizacion o editor del controlador
        -> editor de asociaciones
        -> importacion y exportacion
```

`App.jsx` es el propietario del estado global de la sesion: controlador activo, contextos, asociaciones, seleccion actual y orden visual. No se utiliza un gestor de estado externo.

### Directorios y archivos principales

```text
controllers/                    SVG fuente de los dispositivos
public/controllers/             SVG servidos como recursos estaticos
public/icons/                   Iconos SVG locales
src/components/controllers/     Vistas especificas de cada dispositivo
src/components/MappingEditor/   Edicion y presentacion de asociaciones
src/components/ButtonEditor/    Edicion de definiciones visuales de botones
src/constants/controllers.js    Catalogo de dispositivos, botones y posiciones
src/utils/buttonMatching.js     Resolucion de asociaciones por ID, posicion o etiqueta
src/utils/controllerDragDrop.js Organizacion de listas y arrastrar y soltar
src/utils/export.jsx            Importacion JSON y exportacion JSON/PNG
src/App.jsx                     Estado principal y composicion de la interfaz
src/App.css                     Estilos globales
vite.config.js                  Configuracion de Vite y ruta de produccion
```

Existe tambien `src/utils/export.js`, una variante anterior del modulo de exportacion. La aplicacion importa actualmente `src/utils/export.jsx`.

## Modelo de datos

El formato vigente de un esquema es:

```json
{
  "controller": "xbox",
  "contexts": ["MENU", "GAMEPLAY"],
  "contextMappings": {
    "GAMEPLAY": {
      "position:south": {
        "matchType": "position",
        "matchValue": "south",
        "press": {
          "action": "RUN",
          "description": "Run or sprint"
        }
      }
    }
  },
  "buttonSideOverrides": {},
  "customOrder": {}
}
```

- `controller`: dispositivo seleccionado al exportar.
- `contexts`: nombres de los contextos disponibles.
- `contextMappings`: asociaciones agrupadas por contexto.
- `buttonSideOverrides`: lado asignado manualmente a cada elemento de la lista.
- `customOrder`: orden personalizado de los elementos por lado.

Las claves de asociacion pueden tener estas formas:

| Clave | Alcance |
| --- | --- |
| `south` | Boton con ese ID |
| `position:south` | Misma posicion fisica en controladores compatibles |
| `label:A` | Misma etiqueta en cualquier controlador |

Los archivos `example-scheme.json` y `example-context-mappings.json` contienen ejemplos del formato antiguo y del vigente, respectivamente.

## Flujo de desarrollo

1. Instalar dependencias con `npm ci`.
2. Iniciar Vite con `npm run dev`.
3. Realizar cambios dentro de `src` o en los recursos de `public`.
4. Verificar manualmente los controladores, contextos, importacion y exportacion desde el navegador.
5. Ejecutar manualmente `npm run build` antes de publicar.

Para agregar un controlador se debe mantener una unica definicion coherente entre el catalogo de `src/constants/controllers.js`, su componente visual y su SVG dentro de `public/controllers`.

## Configuracion y despliegue

Vite usa `/` como ruta base en desarrollo y `/controller-schemas/` en produccion. Si cambia el nombre o la ruta del sitio publicado, se debe actualizar `base` en `vite.config.js` y revisar `homepage` en `package.json`.

`npm run deploy` dispara automaticamente `npm run build` mediante el script `predeploy` y publica la carpeta `dist` en GitHub Pages.

## Consideraciones conocidas

- Al recargar o cerrar la pagina se pierde el estado no exportado.
- La importacion valida que el JSON pueda analizarse, pero no aplica un esquema formal de validacion.
- La exportacion PNG depende del renderizado del navegador y de que los SVG e iconos hayan cargado.
- Font Awesome y Bootstrap Icons se cargan desde CDN en `index.html`; sin red, parte de la iconografia puede no mostrarse.
- No existe una suite automatizada de calidad o pruebas.
- Los recursos SVG aparecen tanto en `controllers` como en `public/controllers`; al modificarlos conviene comprobar cual consume cada flujo.

## Licencia

El proyecto se distribuye bajo licencia MIT. Consulta `LICENSE` para ver el texto completo.
