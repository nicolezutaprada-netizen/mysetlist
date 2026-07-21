## [2026-07-20] — Descomposición del MVP en HUs

**Para qué:** derivar mis historias de usuario a partir del MVP y el contrato técnico.

**Prompt:** 

[CONTEXTO] : ESTOY CONSTRUYENDO MI SETLIST ,  una aplicación web que permita buscar canciones en un catálogo real (API de iTunes) y organizarlas en playlists personales que sobreviven al recargar la página. La app calcula la duración total de cada playlist y 
muestra estadísticas de tu música.
Stack: HTML5 semántico + CSS3 (propio o Tailwind Play CDN, a tu criterio) + JavaScript vanilla con módulos ESM (import/export, <script type="module">).
Arquitectura: estado central plano + patrón “cambias el estado → llamas render()”. CRUD inmutable (.filter/.map/spread). Delegación de eventos para las listas. Ids con crypto.randomUUID().
Persistencia: localStorage + JSON.stringify/parse envueltos en try/catch; fechas rehidratadas al cargar.
UX: confirmaciones con modal propio (nada de confirm() nativo); estados vacíos amigables.
API: iTunes Search API (solo lectura, sin key).
Deploy: GitHub Pages. ESM no corre con file:// → usar Live Server.
No se permite: frameworks JS (React, Vue…), librerías de manejo de estado, backend, copiar código de la IA sin registrarlo en PROMPTS.md
EL MVP tiene estas 10 funcionalidades
Buscar canciones por artista o título en la API, mostrando carátula, nombre, artista y duración.
Comunicar el estado de la búsqueda: indicador de carga, mensaje de error si la API falla, mensaje amigable si no hay resultados.
Crear playlists con nombre propio (ej: “Road trip”, “Ensayo sábado”).
Agregar canciones desde los resultados de búsqueda a una playlist.
Ver el contenido de una playlist con los datos de cada canción y la fecha en que se agregó.
Quitar canciones y eliminar playlists con confirmación previa (modal propio).
Ver la duración total de la playlist en formato legible (ej: “1 h 23 min”).
Ver estadísticas de la playlist: cantidad de canciones, género más frecuente, artista más repetido.
Ordenar las canciones de una playlist (recientes/antiguas, alfabético).
Persistir todo en LocalStorage y restaurar al recargar; si los datos están corruptos, la app no se rompe y ofrece “Empezar de cero”.

[TAREA] NECESITO QUE DESCOMPONGAS EL MVP en historias de usuario para UNA persona desarrollando en 2 sprints de una sesión cada uno.
[FORMATO]  Historia ("Como... quiero... para...") + 3-5 criterios de aceptación.
[RESTRICCIÓN] Los criterios describen RESULTADOS observables en pantalla, no implementación. Nada fuera del MVP.
Generame un documento con el resultado

**Resultado:** base de 9 HUs en 2 sprints, cubriendo las 10 funcionalidades del MVP.

---

## [2026-07-20] — Corrección de HUs

**Para qué:** cerrar huecos de cobertura detectados al revisar mis 9 HUs contra la rúbrica del curso.

**Prompt:**
"Revisé mis historias de usuario contra el checklist del curso y encontré dos problemas:
1. En HU-03 (agregar canciones) el criterio sobre canciones duplicadas quedaba abierto, sin un resultado observable definido. Necesito que definas explícitamente qué pasa si el usuario intenta agregar una canción que ya está en la playlist.
2. La HU que junta 'quitar canciones y eliminar playlists' es muy grande para una sola historia. Divídela en dos historias independientes, cada una con sus propios criterios de aceptación.

Corrige mi documento de historias de usuario con estos dos cambios, manteniendo el mismo formato (Como/quiero/para + criterios observables) y actualiza la tabla de cobertura del MVP."

**Resultado:** documento corregido con 10 HUs — HU-03 ahora define el comportamiento ante duplicados (mensaje "Esta canción ya está agregada a la playlist"), y la historia de eliminación se dividió en HU-06 (quitar canción) y HU-07 (eliminar playlist). Ajusté la tabla de cobertura para reflejar las 10 historias.