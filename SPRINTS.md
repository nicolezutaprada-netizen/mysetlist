## Sprint 1 — Meta: buscar una canción real, crear una playlist, agregarla, verla y que sobreviva al recargar la página.
- HU-01: Buscar canciones (va primero porque sin resultados de búsqueda no hay nada que agregar a una playlist)
- HU-02: Crear una playlist (va antes de agregar canciones porque necesito al menos una playlist existente)
- HU-03: Agregar canciones a una playlist (depende de HU-01 y HU-02, es la unión de ambas)
- HU-04: Ver el contenido de una playlist (depende de HU-03, no hay nada que ver si no se agregó nada antes)
- HU-05: Persistencia y restauración de datos (debe envolver todo desde el inicio, para no reescribir después cómo se guardan/leen los datos)

## Sprint 2  — Meta: gestionar (quitar/eliminar), entender (duración/estadísticas) y organizar (ordenar) las playlists ya construidas en Sprint 1.
- HU-06: Quitar una canción de una playlist (depende de que ya existan canciones agregadas)
- HU-07: Eliminar una playlist (depende de que ya existan playlists)
- HU-08: Ver la duración total de una playlist (cálculo derivado de datos que ya existen desde Sprint 1)
- HU-09: Ver estadísticas de una playlist (necesita datos reales acumulados para calcular género y artista más frecuente)
- HU-10: Ordenar canciones de una playlist (solo tiene sentido si ya hay una lista de canciones con fechas y nombres que ordenar)

## Dependencias detectadas
- Para HU-03 necesito antes HU-01 y HU-02, porque no puedo agregar una canción que no encontré, ni a una playlist que no existe.
- Para HU-04 necesito antes HU-03, porque no hay contenido que mostrar si nunca se agregó nada.
- Para HU-08, HU-09 y HU-10 necesito antes HU-03 y HU-04, porque duración, estadísticas y orden son cálculos sobre canciones ya agregadas y visibles.
- Para HU-06 necesito antes HU-03, porque solo puedo quitar una canción que ya fue agregada.

## Mi reto técnico principal
La HU que más me intimida es HU-09 (estadísticas) porque calcular el género más frecuente y el artista más repetido implica lógica de conteo/agregación (contar ocurrencias, comparar máximos, decidir qué hacer en caso de empate) y depende de que los datos de género vengan bien desde la API de iTunes.