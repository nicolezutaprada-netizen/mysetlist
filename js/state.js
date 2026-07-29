import { guardarEnLocalStorage, cargarDeLocalStorage as cargarDatosGuardados } from './storage.js';

let playlists = []; // arranca vacío, luego se llenará con lo guardado en localStorage

export function obtenerPlaylists() {
    return playlists;
}

//nuevaplaylist objeto xq agrupa varios datos bajo un nombre
//DEFINE PROPIEDADES DE UNA PLAYLIST

export function crearPlaylist(nombre) {
    const nuevaPlaylist = {
        id: crypto.randomUUID(),
        nombrePlaylist: nombre,
        canciones: [] // vacía hasta que se agreguen canciones (HU-03)
    };
//...play devyuelve las antiguas y , las nuevas
    playlists = [...playlists, nuevaPlaylist]; // CRUD inmutable: array nuevo, no mutamos el original

    guardarEnLocalStorage(playlists);

    return nuevaPlaylist;
}




export function agregarCancionAPlaylist(playlistId, cancion) {

// find recorre hasta allar coincidencia y para
// // y buscamos la que tenga el mismo id que nos pasaron y esa es la q guardamos 
    const playlist = playlists.find(p => p.id === playlistId);
//.canciones xq find devuelve la playlist con las 3 propiedades  del nuevo playlits guardado en playlists
//some:si al menos 1 del array cumple la condición devuelve true o false
//c:canción del array de canciones de la playlist, y comparamos si el título y artista son iguales a la canción que queremos agregar
//usamos playlist xq representa cada nuevaplaylist con sus 3 propiedades (tiene la propiedad canciones y playlists tiene playlits q cada playlits tiene canciones)
const cancionyaExiste = playlist.canciones.some(c => c.titulo === cancion.titulo && c.artista === cancion.artista);
//exito: falso no se agrego xq estaba duplicado
    if (cancionyaExiste) {
        return { exito: false, mensaje: 'Esta canción ya está agregada a la playlist' };
    }

    playlists = playlists.map(p => {
        if (p.id === playlistId) { // p playlist q se revisa de todo el array (map lo recorre)
             //..p:devuelve la palylist q se esta revisando
             //...p.canciones:devuelve el array de canciones q tiene la playlist q se esta revisando(canciones q ya tenía)
             //cancion:la cancion q se quiere agregar a la playlist q se esta revisando
            return { ...p, canciones: [...p.canciones, cancion] }; 
            
        }
        return p; //se devuelve  la playlist que se revisa sin modificarlo si no es la playlist a la que se quiere agregar la canción
    });



    guardarEnLocalStorage(playlists); 

    return { exito: true, mensaje: 'Canción agregada' }; //solo si no entra al if
}




export function cargarDeLocalStorage() {
    const resultado = cargarDatosGuardados();

    if (!resultado) {
        return; // no hay nada guardado todavía (primera vez que se abre la app), no hay nada que cargar
    }

    if (resultado.corrupto) {
        playlists = []; // datos corruptos, empieza vacío
        return { corrupto: true };
    }

    playlists = resultado.playlists;
    return { corrupto: false };
}





export function quitarCancionDePlaylist(playlistId, cancionId) {
    playlists = playlists.map(p => {
        if (p.id === playlistId) { //si la playlist q se esta revisando es la misma a la que se quiere quitar la canción
            //...p:devuelve la palylist q se esta revisando
            //p.canciones.filter:devuelve un array nuevo con las canciones q cumplen la condición (c.id !== cancionId) y se queda con las canciones cuyo id no coincida
            return { ...p, canciones: p.canciones.filter(c => c.id !== cancionId) }; //solo se queda con las canciones cuyo id no coincida con el de la canción que queremos quitar
        }
        return p; //se ejecuta cuando el p.id no coincide con el playlistId que se quiere quitar la canción, devuelve la playlist sin modificarla
    });

    guardarEnLocalStorage(playlists);
}



export function eliminarPlaylist(playlistId) {
    playlists = playlists.filter(p => p.id !== playlistId); //filter devuelve un array de playlists con id no coincida con el playlistId que se quiere eliminar
    guardarEnLocalStorage(playlists);
}