



//llama a la API de iTunes 
import {CancionSetList} from './models/Cancion.js'; 
const URLAPI='https://itunes.apple.com/search';
const Limiteresultado=50;

//https://itunes.apple.com/search?term=harry%20styles&entity=song&limit=10

export async function buscarcancion(termino){  //termino recibe lo que el usuario busco
    const url=`${URLAPI}?term=${encodeURIComponent(termino)}&entity=song&limit=${Limiteresultado}`; //endecode convierte lo q busco el usuario(termino)

    const respuesta = await fetch(url);  //fetch hace peticion, await :espera antes de seguir

    if (respuesta.ok){ //ok: es tru cuando todo es exitoso
        const datos=await respuesta.json(); //json convierte a json y await: xq eso tarda un poco
        return datos.results.map(resultado=> new CancionSetList(resultado)); //results: array de canciones dentro del API y resultado:cada cancion individuak con atributos

    } else{
        throw new Error ('La Api no respondió correctamente');
    }
}




