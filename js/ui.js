
import {buscarcancion} from './api.js';

//referencias html 
const inputBusqueda = document.querySelector('#inputbusqueda');  //queryselector:busca un element html y lo devuelve pa modificar
const btnBuscar = document.querySelector('#btnbuscar');
const mensajeBusqueda = document.querySelector('#mensajebusqueda');
const listaResultados = document.querySelector('#listaresultados');


btnBuscar.addEventListener('click', manejarBusqueda); // cuando click, ejecutar manejarBusqueda

async function manejarBusqueda(){ 
    const termino=inputBusqueda.value.trim()  //value guarda lo q escribio el usuario en el input, trim:sin espacios inicio y final

    if (termino===''){
        mensajeBusqueda.textContent='Escribe algo para buscar';
        listaResultados.innerHTML = ''; // ← agregar esta línea
        return;  // corta aquí, no llama a la API
    } else{

    mensajeBusqueda.textContent = 'Buscando...'; 
    listaResultados.innerHTML = ''; // limpiamos resultados anteriores mientras busca
    
    try { //intenta ejecutar esto
        const canciones = await buscarcancion(termino); //llamamos a la api que se definio en api.js

        if (canciones.length === 0) { //array vacio
            mensajeBusqueda.textContent = 'No se encontró ninguna canción';
            return;
        }
        //Si no entra al if 
        mensajeBusqueda.textContent = ''; // ya no busca
        mostrarResultados(canciones); // Muestra canciones

    } catch (error) {  //si falla lo del try
        mensajeBusqueda.textContent = 'Ocurrió un error al buscar. Intenta de nuevo.';
    }
}

}


//canciones :guarda lo q conincido con lo que el usuario buscó
function mostrarResultados(canciones) {  // foreach:por cada element, ejecuta este código (no genera un array nuevo)
    canciones.forEach(cancion => {
        const li = document.createElement('li'); // creamos un <li> nuevo por cada cancion con sus atributos

        //inner:agrega y borra anterior, strong:pone negrita 
        li.innerHTML = `
            <img src="${cancion.caratula}" alt="Carátula de ${cancion.titulo}" width="50">
            <strong>${cancion.titulo}</strong> - ${cancion.artista} (${formatearDuracion(cancion.duracion)})`;

        listaResultados.appendChild(li); // appendchil :agregar sin borrar lo q se metio y lo mete en el ul
    });
}

function formatearDuracion(ms) {
    const totalSegundos = Math.floor(ms / 1000); //mlseg entre mil, math.floor:quita decimales
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60; // % te da el resto de la division
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;  //tostring: numero a texto, padstar: hace q siempre tenga 2 digitos
}
