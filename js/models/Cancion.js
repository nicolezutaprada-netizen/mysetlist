

//define propiedades de una cancion q se va a guardar en la playlist

export class CancionSetList{
    constructor (datoscancion){  //recibe datos de una cancion
        this.id=crypto.randomUUID(); //Genera un id unico pa cada cancion
        this.titulo=datoscancion.trackName;
        this.artista=datoscancion.artistName;
        this.caratula=datoscancion.artworkUrl100;
        this.duracion=datoscancion.trackTimeMillis;
        this.genero=datoscancion.primaryGenreName;
        this.fecha = new Date(); //Crea la hora del momento
    }
}