

let playlists = []; // arranca vacío, luego se llenará con lo guardado en localStorage

export function obtenerPlaylists() {
    return playlists;
}

export function crearPlaylist(nombre) {
    const nuevaPlaylist = {
        id: crypto.randomUUID(),
        nombrePlaylist: nombre,
        canciones: [] // vacía hasta que se agreguen canciones (HU-03)
    };

    playlists = [...playlists, nuevaPlaylist]; // CRUD inmutable: array nuevo, no mutamos el original

    return nuevaPlaylist;
}