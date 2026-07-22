

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
//...play devyuelve las antiguas y , las nuevas
    playlists = [...playlists, nuevaPlaylist]; // CRUD inmutable: array nuevo, no mutamos el original

    return nuevaPlaylist;
}




export function agregarCancionAPlaylist(playlistId, cancion) {

// find recorre hasta allar coincidencia y para
// // y buscamos la que tenga el mismo id que nos pasaron y esa es la q guardamos 
    const playlist = playlists.find(p => p.id === playlistId); 
//some:si al menos 1 del array cumple la condición devuelve true o false
//c:canción del array de canciones de la playlist, y comparamos si el título y artista son iguales a la canción que queremos agregar
    const cancionyaExiste = playlist.canciones.some(c => c.titulo === cancion.titulo && c.artista === cancion.artista);
//exito: falso no se agrego xq estaba duplicado
    if (cancionyaExiste) {
        return { exito: false, mensaje: 'Esta canción ya está agregada a la playlist' };
    }

    playlists = playlists.map(p => {
        if (p.id === playlistId) { // p playlist q se revisa de todo el array (map lo recorre)
             //..p:devuelve la palylist q se esta revisando
            return { ...p, canciones: [...p.canciones, cancion] }; 
            
        }
        return p; //se devuelve  la playlist que se revisa sin modificarlo
    });

    return { exito: true, mensaje: '' }; //solo si no entra al if
}