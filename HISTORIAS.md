

### HU-01: Buscar canciones
**Como** usuario de Mi Setlist,
**quiero** buscar canciones por artista o título,
**para** encontrar canciones que me interesa agregar a una playlist.

**Criterios de aceptación:**
- Al escribir un término y confirmar la búsqueda, aparece una lista de resultados que muestra la carátula, el nombre de la canción, el artista y la duración de cada resultado.
- Mientras la búsqueda está en curso, se muestra un indicador de carga visible en pantalla.
- Si la búsqueda falla por un error de la API, se muestra un mensaje de error comprensible para el usuario.
- Si la búsqueda no arroja resultados, se muestra un mensaje amigable indicando que no se encontró ninguna canción.

---

### HU-02: Crear una playlist
**Como** usuario de Mi Setlist,
**quiero** crear una playlist con un nombre propio,
**para** organizar mis canciones según un tema o momento.

**Criterios de aceptación:**
- Existe una opción visible en la interfaz para crear una nueva playlist.
- Al ingresar un nombre y confirmar, la nueva playlist aparece inmediatamente en la lista de playlists existentes.
- Si el usuario intenta crear una playlist con el nombre vacío, no se crea y se muestra un mensaje de validación.
- La playlist recién creada se muestra vacía hasta que se le agreguen canciones.

---

### HU-03: Agregar canciones a una playlist
**Como** usuario de Mi Setlist,
**quiero** agregar canciones desde los resultados de búsqueda a una playlist existente,
**para** armar mi colección de música dentro de cada playlist.

**Criterios de aceptación:**
- Desde cada resultado de búsqueda existe una acción visible para agregar la canción a una playlist.
- Al seleccionar la acción de agregar, el usuario puede elegir una de sus playlists existentes.
- Después de confirmar, la canción aparece inmediatamente en el contenido de la playlist seleccionada.
- Si el usuario intenta agregar una canción que ya se encuentra en la misma playlist, la canción no se duplica y se muestra el mensaje: "Esta canción ya está agregada a la playlist".

---

### HU-04: Ver el contenido de una playlist
**Como** usuario de Mi Setlist,
**quiero** ver el detalle de las canciones dentro de una playlist,
**para** revisar qué contiene y cuándo agregué cada canción.

**Criterios de aceptación:**
- Al seleccionar una playlist, se muestra la lista completa de sus canciones con carátula, nombre, artista y duración.
- Cada canción muestra la fecha en que fue agregada a esa playlist.
- Si la playlist no contiene canciones, se muestra el mensaje "Playlist vacía" en lugar de una lista en blanco.

---

### HU-05: Persistencia y restauración de datos
**Como** usuario de Mi Setlist,
**quiero** que mis playlists se guarden automáticamente y continúen disponibles al volver a abrir la aplicación,
**para** no perder mi trabajo al cerrar o recargar la página.

**Criterios de aceptación:**
- Al recargar la página, todas las playlists creadas y sus canciones continúan visibles tal como se dejaron.
- Si los datos guardados están corruptos o no se pueden leer, la aplicación continúa mostrando una interfaz funcional.
- Cuando se detectan datos corruptos, se ofrece al usuario la opción "Empezar de cero".
- Al seleccionar "Empezar de cero", se eliminan los datos dañados y la aplicación queda en un estado inicial limpio y funcional.

---


### HU-06: Quitar una canción de una playlist
**Como** usuario de Mi Setlist,
**quiero** quitar una canción de una playlist con confirmación previa,
**para** corregir errores sin eliminar contenido accidentalmente.

**Criterios de aceptación:**
- En el detalle de la playlist existe una acción visible para quitar cada canción.
- Al seleccionar la acción de quitar, se muestra un modal propio de confirmación y no el `confirm()` nativo del navegador.
- Si el usuario cancela la operación, la canción permanece en la playlist sin cambios.
- Si el usuario confirma la operación, la canción desaparece inmediatamente de la playlist.

---

### HU-07: Eliminar una playlist
**Como** usuario de Mi Setlist,
**quiero** eliminar una playlist completa con confirmación previa,
**para** deshacerme de una colección que ya no necesito sin borrarla por accidente.

**Criterios de aceptación:**
- En la lista o el detalle de cada playlist existe una acción visible para eliminarla.
- Al seleccionar la acción de eliminar, se muestra un modal propio de confirmación y no el `confirm()` nativo del navegador.
- Si el usuario cancela la operación, la playlist y sus canciones permanecen sin cambios.
- Si el usuario confirma la operación, la playlist desaparece inmediatamente de la lista de playlists.

---

### HU-08: Ver la duración total de una playlist
**Como** usuario de Mi Setlist,
**quiero** ver cuánto dura una playlist en total,
**para** saber si me alcanza para un trayecto, ensayo o actividad específica.

**Criterios de aceptación:**
- Al abrir el detalle de una playlist, se muestra su duración total.
- La duración se presenta en un formato legible, por ejemplo, "1 h 23 min", y no en segundos o milisegundos.
- Si la playlist está vacía, se muestra "0 min" o un estado equivalente sin errores en pantalla.
- La duración total se actualiza automáticamente al agregar o quitar canciones.

---

### HU-09: Ver estadísticas de una playlist
**Como** usuario de Mi Setlist,
**quiero** ver la cantidad de canciones, el género más frecuente y el artista más repetido de una playlist,
**para** entender mejor la composición de mi música.

**Criterios de aceptación:**
- Al abrir el detalle de una playlist, se muestra la cantidad total de canciones que contiene.
- Se muestra el género más frecuente entre las canciones de la playlist.
- Se muestra el artista que más se repite en la playlist.
- Si la playlist está vacía o los datos no permiten calcular una estadística, se muestra un estado amigable en lugar de un valor incorrecto o vacío.

---

### HU-10: Ordenar canciones de una playlist
**Como** usuario de Mi Setlist,
**quiero** ordenar las canciones por fecha o alfabéticamente,
**para** encontrar canciones con mayor facilidad según cómo prefiera revisarlas.

**Criterios de aceptación:**
- Existe una opción visible para ordenar por recientes primero, antiguas primero o alfabéticamente.
- Al seleccionar un criterio, la lista de canciones se reordena inmediatamente en pantalla.
- El orden elegido no modifica los datos originales de las canciones, como la fecha de agregado o la duración.
- Si la playlist tiene una sola canción o está vacía, la opción de ordenar no genera errores visibles.



## [2026-07-30] — Desarrollo de la décima historia de usuario

**Para qué:** Cerrar el Sprint 2 y el proyecto completo, con la HU-10.

**Prompt:**

[HISTORIA DE USUARIO]

### HU-10: Ordenar canciones de una playlist
**Como** usuario de Mi Setlist,
**quiero** ordenar las canciones por fecha o alfabéticamente,
**para** encontrar canciones con mayor facilidad según cómo prefiera revisarlas.

**Criterios de aceptación:**
- Existe una opción visible para ordenar por recientes primero, antiguas primero o alfabéticamente.
- Al seleccionar un criterio, la lista de canciones se reordena inmediatamente en pantalla.
- El orden elegido no modifica los datos originales de las canciones, como la fecha de agregado o la duración.
- Si la playlist tiene una sola canción o está vacía, la opción de ordenar no genera errores visibles.

[MODO DE TRABAJO]

Mismo modo de trabajo que en historias anteriores: preguntas estratégicas antes de código, luego código en porciones pequeñas con explicación y archivo de destino.

[RESTRICCIONES]

Mismas restricciones que las historias anteriores, aplicadas ahora solo a HU-10.

**Resultado:** Se agregó `ordenarCanciones()` en `ui.js`, usando spread (`[...canciones]`) para copiar el array antes de `.sort()` (evitando mutar el original), con comparación de fechas para recientes/antiguas y `.localeCompare()` para orden alfabético. Se agregó un `<select>` de criterio de orden en `mostrarDetallePlaylist()`, con una variable (`criterioOrdenActual`) que recuerda la elección del usuario entre renders.




[CONTEXTO]

Terminé de programar las 10 historias de usuario de mi proyecto "Mi Setlist" (Sprint 1 y Sprint 2 completos). El stack es HTML5 + CSS3 + JavaScript vanilla con módulos ESM, sin frameworks ni backend, usando localStorage para persistencia y la API de iTunes Search para buscar canciones.

[TAREA]

Quiero verificar que toda mi aplicación funcione correctamente de principio a fin. Dame un plan de pruebas manual, organizado por historia de usuario (HU-01 a HU-10), que cubra:

- El camino feliz (todo funciona como se espera).
- Los casos borde mencionados en los criterios de aceptación de cada HU (campos vacíos, duplicados, datos corruptos, playlists vacías, etc.).
- Pruebas de integración entre historias (por ejemplo: crear una playlist, agregar canciones, recargar la página, verificar que persista, luego ordenar y quitar canciones).

[FORMATO]

Preséntalo como una checklist clara, agrupada por HU, para que pueda ir marcando cada prueba mientras la realizo en el navegador con Live Server.

[RESTRICCIÓN]

No me des código nuevo, solo el plan de pruebas — mi código ya está terminado, solo quiero verificarlo.