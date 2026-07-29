//para q las playlists no se pierdan al recargar la página
export function guardarEnLocalStorage(playlists) {
    try {
        //setItem(clave, valor)
        // stringify: convierte obj array a string para poder guardarlo en localStorage  
        //localStorage: para guardar datos del navegador
        localStorage.setItem('playlistsguardados', JSON.stringify(playlists)); // el "playlists" de stringify sí es el nombre del array 
    } catch (error) {
        console.log('No se pudo guardar en localStorage');
    }
}




export function cargarDeLocalStorage() {
    //getitem(clave): devuelve el valor guardado en localStorage con la clave "playlistsguardados"
    const datosGuardados = localStorage.getItem('playlistsguardados');

    if (datosGuardados === null) {
        return; // no hay nada guardado todavía (primera vez que se abre la app), no hay nada que cargar
    }

    try {
        //parse: convierte string a obj array para poder usarlo en el código
        const datosParseados = JSON.parse(datosGuardados);

        // Rehidratar fechas: convertir el texto de vuelta a objetos Date
        const playlistsCargadas = datosParseados.map(playlist => ({
            ...playlist,
            canciones: playlist.canciones.map(cancion => ({
                ...cancion,
                fecha: new Date(cancion.fecha) // Convertir el texto de vuelta a objeto Date xq parse no puede
            }))
        }));

        return { corrupto: false, playlists: playlistsCargadas };

    } catch (error) {
        return { corrupto: true, playlists: [] }; // datos corruptos, empieza vacío
    }
}