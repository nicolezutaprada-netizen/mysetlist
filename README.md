# 🎵 Mi Setlist

Aplicación web que permite buscar canciones en un catálogo real (API de iTunes) y organizarlas en playlists personales que sobreviven al recargar la página. Calcula la duración total de cada playlist y muestra estadísticas sobre la música guardada.

## Funcionalidades

- **Buscar canciones** por artista o título, mostrando carátula, nombre, artista y duración.
- **Crear playlists** con nombre propio.
- **Agregar canciones** desde los resultados de búsqueda a una playlist, con validación de duplicados.
- **Ver el contenido** de una playlist: canciones con sus datos y fecha en que se agregaron.
- **Quitar canciones y eliminar playlists**, con confirmación previa mediante un modal propio.
- **Ver la duración total** de una playlist en formato legible (ej. "1 h 23 min").
- **Ver estadísticas**: cantidad de canciones, género más frecuente y artista más repetido.
- **Ordenar canciones** por fecha (recientes/antiguas) o alfabéticamente.
- **Persistencia automática** en `localStorage`, con recuperación ante datos corruptos ("Empezar de cero").

## Stack técnico

- HTML5 semántico
- CSS3
- JavaScript vanilla con módulos ESM (`import`/`export`)
- API de iTunes Search (solo lectura, sin API key)
- `localStorage` para persistencia

Sin frameworks, sin librerías de manejo de estado, sin backend.

## Arquitectura

- Estado central plano, con el patrón "cambias el estado → llamas `render()`".
- CRUD inmutable mediante `.filter()`, `.map()` y spread operator.
- Identificadores únicos generados con `crypto.randomUUID()`.
- Confirmaciones mediante un modal propio (no se usa `confirm()` nativo).

## Estructura del proyecto

```
mi-setlist/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js              # Punto de entrada
│   ├── ui.js                # Interfaz y eventos del DOM
│   ├── state.js              # Estado central (playlists)
│   ├── storage.js            # Persistencia en localStorage
│   ├── api.js                 # Conexión con la API de iTunes
│   └── models/
│       └── Cancion.js         # Clase que modela una canción
├── HISTORIAS.md              # Historias de usuario del MVP
├── SPRINTS.md                 # Planificación de sprints
├── PROMPTS.md                  # Registro de trabajo con la IA
└── README.md
```

## Sitio

https://nicolezutaprada-netizen.github.io/mysetlist/ 

## Historias de usuario

El detalle completo de las 10 historias de usuario del MVP, con sus criterios de aceptación, está en [`HISTORIAS.md`](./HISTORIAS.md).

## Planificación

La distribución de las historias en 2 sprints, con dependencias y justificación, está en [`SPRINTS.md`](./SPRINTS.md).

## Registro de trabajo con IA

Todo el uso de asistencia de IA durante el desarrollo está documentado en [`PROMPTS.md`](./PROMPTS.md), incluyendo el prompt usado y el resultado obtenido en cada historia de usuario.