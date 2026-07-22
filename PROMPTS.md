# Registro de prompts — Mi Setlist

## [2026-07-20] — Descomposición del MVP en historias de usuario

**Para qué:** Derivar las historias de usuario a partir de las funcionalidades del MVP y del contrato técnico del proyecto.

**Prompt:**

[CONTEXTO]

Estoy construyendo **Mi Setlist**, una aplicación web que permite buscar canciones en un catálogo real mediante la API de iTunes y organizarlas en playlists personales que sobreviven al recargar la página. La aplicación calcula la duración total de cada playlist y muestra estadísticas sobre la música almacenada.

**Contrato técnico:**

- Stack: HTML5 semántico, CSS3 propio o Tailwind mediante Play CDN y JavaScript vanilla con módulos ESM.
- Arquitectura: estado central plano y patrón “cambias el estado → llamas `render()`”.
- CRUD inmutable mediante `.filter()`, `.map()` y spread operator.
- Delegación de eventos para las listas.
- Identificadores generados con `crypto.randomUUID()`.
- Persistencia mediante `localStorage`.
- Uso de `JSON.stringify()` y `JSON.parse()` dentro de bloques `try/catch`.
- Rehidratación de fechas al cargar los datos.
- Confirmaciones mediante un modal propio; no se permite `confirm()` nativo.
- Estados vacíos amigables.
- API de iTunes Search de solo lectura y sin API key.
- Despliegue mediante GitHub Pages.
- Los módulos ESM no funcionan con `file://`, por lo que se debe utilizar Live Server.

**No se permite:**

- Utilizar frameworks de JavaScript como React o Vue.
- Utilizar librerías para el manejo de estado.
- Implementar un backend.
- Copiar código generado por IA sin registrarlo en `PROMPTS.md`.

El MVP contiene las siguientes 10 funcionalidades:

1. Buscar canciones por artista o título en la API y mostrar su carátula, nombre, artista y duración.
2. Comunicar el estado de la búsqueda mediante un indicador de carga, un mensaje de error si la API falla y un mensaje amigable si no existen resultados.
3. Crear playlists con un nombre personalizado, por ejemplo, “Road trip” o “Ensayo sábado”.
4. Agregar canciones desde los resultados de búsqueda a una playlist.
5. Ver el contenido de una playlist con los datos de cada canción y la fecha en que fue agregada.
6. Quitar canciones y eliminar playlists con confirmación previa mediante un modal propio.
7. Ver la duración total de una playlist en formato legible, por ejemplo, “1 h 23 min”.
8. Ver estadísticas de una playlist: cantidad de canciones, género más frecuente y artista más repetido.
9. Ordenar las canciones de una playlist por fecha —recientes o antiguas— o alfabéticamente.
10. Persistir toda la información en `localStorage` y restaurarla al recargar. Si los datos están corruptos, la aplicación no debe romperse y debe ofrecer la opción “Empezar de cero”.

[TAREA]

Descompón las 10 funcionalidades del MVP en historias de usuario para una sola persona que desarrollará el proyecto en dos sprints de una sesión cada uno.

[FORMATO]

Para cada historia utiliza:

“Como [rol], quiero [funcionalidad], para [beneficio]”.

Incluye entre 3 y 5 criterios de aceptación.

[RESTRICCIONES]

- Los criterios de aceptación deben describir resultados observables en pantalla, no detalles de implementación.
- No agregues funcionalidades que estén fuera del MVP.
- Genera un documento con el resultado.

**Resultado:** Se obtuvo una primera versión compuesta por **9 historias de usuario distribuidas en 2 sprints**, que cubrían las 10 funcionalidades del MVP.

---

## [2026-07-20] — Corrección de las historias de usuario

**Para qué:** Corregir los problemas de tamaño y observabilidad detectados al comparar las historias de usuario con el checklist del curso.

**Prompt:**

Revisé mis historias de usuario utilizando el checklist del curso y encontré los siguientes problemas:

1. En la HU-03, “Agregar canciones a una playlist”, el criterio relacionado con las canciones duplicadas quedó abierto y no define un resultado observable. Necesito que indiques explícitamente qué sucede cuando el usuario intenta agregar una canción que ya se encuentra en la playlist.

2. La historia que agrupa “quitar canciones” y “eliminar playlists” contiene dos funcionalidades diferentes y resulta demasiado grande. Divídela en dos historias de usuario independientes, cada una con sus propios criterios de aceptación.

[TAREA]

Corrige el documento de historias de usuario aplicando estos dos cambios.

[FORMATO]

Mantén la estructura:

“Como [rol], quiero [funcionalidad], para [beneficio]”.

Cada historia debe incluir entre 3 y 5 criterios de aceptación observables.

También actualiza la numeración de las historias y la tabla de cobertura del MVP.

[RESTRICCIONES]

- Los criterios deben describir resultados observables en pantalla.
- No agregues funcionalidades fuera del MVP.
- Mantén la distribución en dos sprints.

**Resultado:** Se generó un documento corregido con **10 historias de usuario**. La HU-03 ahora establece que una canción duplicada no se agrega nuevamente y se muestra el mensaje **“Esta canción ya está agregada a la playlist”**. La historia de eliminación se dividió en **HU-06: Quitar una canción de una playlist** y **HU-07: Eliminar una playlist**. Además, se actualizaron la numeración y la tabla de cobertura.

---

## [2026-07-20] — Desarrollo de la primera historia de usuario

**Para qué:** Obtener orientación para comenzar a programar la HU-01 de manera progresiva y alineada con el contrato técnico del proyecto.

**Prompt:**

[CONTEXTO]

Estoy construyendo **Mi Setlist**, una aplicación web que permite buscar canciones en un catálogo real mediante la API de iTunes y organizarlas en playlists personales que sobreviven al recargar la página. La aplicación calcula la duración total de cada playlist y muestra estadísticas sobre la música almacenada.

**Contrato técnico:**

- Stack: HTML5 semántico, CSS3 propio o Tailwind mediante Play CDN y JavaScript vanilla con módulos ESM.
- Arquitectura: estado central plano y patrón “cambias el estado → llamas `render()`”.
- CRUD inmutable mediante `.filter()`, `.map()` y spread operator.
- Delegación de eventos para las listas.
- Identificadores generados con `crypto.randomUUID()`.
- Persistencia mediante `localStorage`.
- Uso de `JSON.stringify()` y `JSON.parse()` dentro de bloques `try/catch`.
- Rehidratación de fechas al cargar los datos.
- Confirmaciones mediante un modal propio; no se permite `confirm()` nativo.
- Estados vacíos amigables.
- API de iTunes Search de solo lectura y sin API key.
- Despliegue mediante GitHub Pages.
- Los módulos ESM no funcionan con `file://`, por lo que se debe utilizar Live Server.

**No se permite:**

- Utilizar frameworks de JavaScript como React o Vue.
- Utilizar librerías para el manejo de estado.
- Implementar un backend.
- Copiar código generado por IA sin registrarlo en `PROMPTS.md`.

[HISTORIA DE USUARIO]

### HU-01: Buscar canciones

**Como** usuario de Mi Setlist,  
**quiero** buscar canciones por artista o título,  
**para** encontrar canciones que me interesa agregar a una playlist.

**Criterios de aceptación:**

- Al escribir un término y confirmar la búsqueda, aparece una lista de resultados que muestra la carátula, el nombre de la canción, el artista y la duración de cada resultado.
- Mientras la búsqueda está en curso, se muestra un indicador de carga visible en pantalla.
- Si la búsqueda falla por un error de la API, se muestra un mensaje de error comprensible para el usuario.
- Si la búsqueda no arroja resultados, se muestra un mensaje amigable indicando que no se encontró ninguna canción.

[MODO DE TRABAJO]

Antes de escribir código, hazme entre 2 y 3 preguntas estratégicas sobre decisiones que me corresponden, relacionadas con:

- La experiencia de usuario.
- Los casos borde.
- La estructura de los datos.

Espera mis respuestas antes de continuar.

Después de recibirlas:

1. Proporciona el código en porciones pequeñas.
2. Explica qué hace cada porción.
3. Indica exactamente en qué archivo debe colocarse.
4. Avanza de manera progresiva para que pueda entender y comprobar cada parte.

[RESTRICCIONES]

- Respeta estrictamente el contrato técnico.
- No reescribas archivos que no te haya pedido modificar.
- No agregues funcionalidades fuera de la HU-01.
- Si alguna solicitud contradice el contrato técnico, indícamelo en lugar de ignorar la restricción.
- No realices únicamente configuración o setup: el resultado debe permitir completar y observar la funcionalidad solicitada.

**Resultado:** Se obtuvo una guía progresiva para iniciar el desarrollo de la HU-01, comenzando con preguntas estratégicas antes de generar el código y manteniendo el desarrollo alineado con el contrato técnico.




## [2026-07-21] — Desarrollo de la segunda historia de usuario

**Para qué:** Obtener orientación para comenzar a programar la HU-02 de manera progresiva y alineada con el contrato técnico del proyecto.

**Prompt:**

[CONTEXTO]

Estoy construyendo **Mi Setlist**, una aplicación web que permite buscar canciones en un catálogo real mediante la API de iTunes y organizarlas en playlists personales que sobreviven al recargar la página. La aplicación calcula la duración total de cada playlist y muestra estadísticas sobre la música almacenada.

**Contrato técnico:**

- Stack: HTML5 semántico, CSS3 propio o Tailwind mediante Play CDN y JavaScript vanilla con módulos ESM.
- Arquitectura: estado central plano y patrón "cambias el estado → llamas `render()`".
- CRUD inmutable mediante `.filter()`, `.map()` y spread operator.
- Delegación de eventos para las listas.
- Identificadores generados con `crypto.randomUUID()`.
- Persistencia mediante `localStorage`.
- Uso de `JSON.stringify()` y `JSON.parse()` dentro de bloques `try/catch`.
- Rehidratación de fechas al cargar los datos.
- Confirmaciones mediante un modal propio; no se permite `confirm()` nativo.
- Estados vacíos amigables.
- API de iTunes Search de solo lectura y sin API key.
- Despliegue mediante GitHub Pages.
- Los módulos ESM no funcionan con `file://`, por lo que se debe utilizar Live Server.

**No se permite:**

- Utilizar frameworks de JavaScript como React o Vue.
- Utilizar librerías para el manejo de estado.
- Implementar un backend.
- Copiar código generado por IA sin registrarlo en `PROMPTS.md`.

**HU-01 ya completada:** clase `CancionSetList` (models/Cancion.js), función `buscarcancion()` (api.js) conectada a la API de iTunes, y `ui.js` con el flujo completo de búsqueda (input, botón, estados de carga/error/sin resultados, renderizado de resultados).

[HISTORIA DE USUARIO]

### HU-02: Crear una playlist
**Como** usuario de Mi Setlist,
**quiero** crear una playlist con un nombre propio,
**para** organizar mis canciones según un tema o momento.

**Criterios de aceptación:**
- Existe una opción visible en la interfaz para crear una nueva playlist.
- Al ingresar un nombre y confirmar, la nueva playlist aparece inmediatamente en la lista de playlists existentes.
- Si el usuario intenta crear una playlist con el nombre vacío, no se crea y se muestra un mensaje de validación.
- La playlist recién creada se muestra vacía hasta que se le agreguen canciones.

[MODO DE TRABAJO]

Antes de escribir código, hazme preguntas estratégicas sobre decisiones que me corresponden, relacionadas con:

- La experiencia de usuario.
- Los casos borde.
- La estructura de los datos.

Espera mis respuestas antes de continuar.

Después de recibirlas:

1. Proporciona el código en porciones pequeñas.
2. Explica qué hace cada porción.
3. Indica exactamente en qué archivo debe colocarse.
4. Avanza de manera progresiva para que pueda entender y comprobar cada parte.

[RESTRICCIONES]

- Respeta estrictamente el contrato técnico.
- No reescribas archivos que no te haya pedido modificar.
- No agregues funcionalidades fuera de la HU-02.
- Si alguna solicitud contradice el contrato técnico, indícamelo en lugar de ignorar la restricción.
- No realices únicamente configuración o setup: el resultado debe permitir completar y observar la funcionalidad solicitada.

**Resultado:** [completar cuando terminemos HU-02]