
import {buscarcancion} from './api.js';

import { crearPlaylist, obtenerPlaylists, agregarCancionAPlaylist, cargarDeLocalStorage, quitarCancionDePlaylist, eliminarPlaylist } from './state.js';



//referencias html 
const inputBusqueda = document.querySelector('#inputbusqueda');  //queryselector:busca un element html y lo devuelve pa modificar
const btnBuscar = document.querySelector('#btnbuscar');
const mensajeBusqueda = document.querySelector('#mensajebusqueda');
const listaResultados = document.querySelector('#listaresultados');


const inputNombrePlaylist = document.querySelector('#nombreplaylist');
const btnCrearPlaylist = document.querySelector('#btncrearplaylist');
const mensajePlaylist = document.querySelector('#mensajeplaylist');
const listaPlaylists = document.querySelector('#listaplaylists');


btnBuscar.addEventListener('click', manejarBusqueda); // cuando click, ejecutar manejarBusqueda


//innerHTML reemplaza o borra el contenido interno de un elemento.
//appendChild() agrega un elemento nuevo al final, sin borrar lo anterior.

async function manejarBusqueda(){ 
    const termino=inputBusqueda.value.trim()  //value guarda lo q escribio el usuario en el input, trim:sin espacios inicio y final

    if (termino===''){
        mensajeBusqueda.textContent='Escribe algo para buscar';
        listaResultados.innerHTML = ''; // limpiamos resultados anteriores
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

//para cuando el usuario busque una cancion

//option value(no se muestrqa, pero necesitamos para saber cuala eligio el usuario por el id unico) 
//canciones :guarda lo q conincido con lo que el usuario buscó
function mostrarResultados(canciones) {  // foreach:por cada element, ejecuta este código (no genera un array nuevo)
    canciones.forEach(cancion => {
        const li = document.createElement('li'); // creamos un <li> nuevo por cada cancion con sus atributos
        const opcionesPlaylists = obtenerPlaylists()
            .map(p => `<option value="${p.id}">${p.nombrePlaylist}</option>`)
            .join('');

        //inner:agrega y borra anterior, strong:pone negrita , slect:desplegable opciones
        //value"" opcion vacia antes q el usuario escriba(por defecto
        li.innerHTML = `
            <img src="${cancion.caratula}" alt="Carátula de ${cancion.titulo}" width="50">
            <strong>${cancion.titulo}</strong> - ${cancion.artista} (${formatearDuracion(cancion.duracion)})
              <select class="selectplaylist">
                <option value="">Elige una playlist</option> 
                ${opcionesPlaylists}
            </select>
            <button class="btnagregar">Agregar</button>`;


 // busca el botón "Agregar" dentro de este li específico

const btnAgregar = li.querySelector('.btnagregar');  

// busca el select de playlists dentro de este li específico

const selectPlaylist = li.querySelector('.selectplaylist');  //slectplaylist q se genera en el inner de arriba

//focus:cuando entras o seleccionas el <select>(no es elegir una opción; es q selector quedó activo.)
//click:cuando presionas el botón Agregar.

selectPlaylist.addEventListener('focus', () => {   
//Agrega la playlist q acabas de crear despeus de buscar songs a la lista de playslists
    const opcionesActualizadas = obtenerPlaylists()  //viejas + nuevas playlists 
        .map(p => `<option value="${p.id}">${p.nombrePlaylist}</option>`)
        .join('');

        //se agrega otra vez elige una opcion y el value vacio porque inner borra todo lo q estaba antes y si no se pone otra vez, no aparece
    selectPlaylist.innerHTML = `<option value="">Elige una playlist</option>${opcionesActualizadas}`; 
});

        btnAgregar.addEventListener('click', () => {
            const playlistId = selectPlaylist.value;

            if (playlistId === '') {
                mensajePlaylist.textContent = 'Elige una playlist primero';
                return;
            }

            const resultado = agregarCancionAPlaylist(playlistId, cancion);
            mensajePlaylist.textContent = resultado.mensaje; //Accede al emnsaje de stat.js PARA Q SE MUESTRE e pamtalla

            if (resultado.exito) { //solo se ejecuta si fue exitoso, es decir, si no estaba duplicado
                renderizarPlaylists();
            }
        });


        listaResultados.appendChild(li); // insertar elemento para q se vea en la pagina
    });
}






function formatearDuracion(ms) {
    const totalSegundos = Math.floor(ms / 1000); //mlseg entre mil, math.floor:quita decimales
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60; // % te da el resto de la division
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;  //tostring: numero a texto, padstar: hace q siempre tenga 2 digitos
}






btnCrearPlaylist.addEventListener('click', manejarCrearPlaylist);

function manejarCrearPlaylist() {
    const nombre = inputNombrePlaylist.value.trim();

    if (nombre === '') {
        mensajePlaylist.textContent = 'Escribe un nombre para la playlist';
        return;
    }

    crearPlaylist(nombre); 
    mensajePlaylist.textContent = ''; //limpia el mensaje de error si lo había
    inputNombrePlaylist.value = ''; //limpia el input
    renderizarPlaylists(); 
}



//IMPORTANTE:

function renderizarPlaylists() {
    listaPlaylists.innerHTML = ''; // limpia la lista antes de repintar

    const playlists = obtenerPlaylists();

    playlists.forEach(playlist => { //recorre cada playlist y crea un <li> para cada una
        const li = document.createElement('li'); // crea un <li> nuevo por cada playlist
        li.style.cursor = 'pointer'; // cambia el cursor a manito

        const nombreSpan = document.createElement('span'); //span para el nombre de la playlist, para poder agregarle un evento de click sin interferir con el botón de eliminar
        nombreSpan.textContent = playlist.nombrePlaylist; //muestra el nombre de la playlist en el <li>
        nombreSpan.addEventListener('click', () => {
            mostrarDetallePlaylist(playlist);
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            mostrarModalConfirmacion('¿Eliminar esta playlist?', () => {
                eliminarPlaylist(playlist.id);
                detallePlaylist.textContent = 'Selecciona una playlist para ver su contenido';//Reemplaza la playlist eliminada x esto
                renderizarPlaylists();
            });
        });

        li.appendChild(nombreSpan); //se sube al li el nombre de la playlist para q se vea en la pagina
        li.appendChild(btnEliminar); //se sube al li el boton eliminar para q se vea en la pagina
        listaPlaylists.appendChild(li);
    });
}





























const detallePlaylist = document.querySelector('#detalleplaylist'); // referencia al contenedor de detalle de playlist

function mostrarDetallePlaylist(playlist) {
    detallePlaylist.innerHTML = ''; // limpia el detalle anterior

    if (playlist.canciones.length === 0) {
        detallePlaylist.textContent = 'Playlist vacía';
        return;
    }

    const titulo = document.createElement('h3');
    titulo.textContent = playlist.nombrePlaylist;
    detallePlaylist.appendChild(titulo); // agrega "h3" al contenedor de detalleplaylist


//para cuando el usuario dee click en mostrar detalle

    const ul = document.createElement('ul'); 
    playlist.canciones.forEach(cancion => {
        const li = document.createElement('li');
        const fecha = new Date(cancion.fecha).toLocaleDateString();
//br:crea un salto de línea, small:letra más pequeña, tolocaledatestring:convierte un objeto Date a un texto de fecha legibl
        li.innerHTML = `
            <img src="${cancion.caratula}" alt="Carátula de ${cancion.titulo}" width="50">
            <strong>${cancion.titulo}</strong> - ${cancion.artista} (${formatearDuracion(cancion.duracion)})
            <br>
            <small>Agregada el ${fecha}</small>
             <button class="btn-quitar-cancion">Quitar</button>
        `;


        const btnQuitar = li.querySelector('.btn-quitar-cancion');

        btnQuitar.addEventListener('click', () => {
            mostrarModalConfirmacion('¿Quitar esta canción de la playlist?', () => {
                quitarCancionDePlaylist(playlist.id, cancion.id);
                mostrarDetallePlaylist(playlist); // vuelve a pintar el detalle, ya sin esa canción
             });
        });

        ul.appendChild(li);  //LI SE SUBIO A UL

    });

    detallePlaylist.appendChild(ul); //UL SE SUBIO A DETALLEPLAYLIST
}







function iniciarApp() {


    const resultadoCarga = cargarDeLocalStorage();

    if (resultadoCarga && resultadoCarga.corrupto) {
        mostrarErrorDatosCorruptos();
    } else {
        renderizarPlaylists();
    }
}

function mostrarErrorDatosCorruptos() {
    listaPlaylists.innerHTML = ''; //
    const mensaje = document.createElement('p');
    mensaje.textContent = 'No pudimos leer tus datos guardados.';

    const btnEmpezarDeCero = document.createElement('button');
    btnEmpezarDeCero.textContent = 'Empezar de cero';

    btnEmpezarDeCero.addEventListener('click', () => {
        localStorage.removeItem('playlistsguardados'); //borra todo, para que la próxima vez que se intente cargar, no vuelva a fallar con ese mismo dato corrupto.
        renderizarPlaylists();
    });

    listaPlaylists.appendChild(mensaje);
    listaPlaylists.appendChild(btnEmpezarDeCero);
}

iniciarApp();



//referencias html
const modalConfirmacion = document.querySelector('#modal-confirmacion');
const mensajeModal = document.querySelector('#mensaje-modal');
const btnConfirmarModal = document.querySelector('#btn-confirmar-modal');
const btnCancelarModal = document.querySelector('#btn-cancelar-modal');


//'block' = visible; 'none' = oculto.


function mostrarModalConfirmacion(mensaje, accionAlConfirmar) {
    mensajeModal.textContent = mensaje; // modal por medio del parametro "mensaje"
    modalConfirmacion.style.display = 'block'; // muestra el modal

    btnConfirmarModal.onclick = () => { //se usa onclick en vez de addEventListener porque queremos que se ejecute solo una vez, y si usamos addEventListener, cada vez que se abra el modal, se agregaría otro listener y se ejecutaría varias veces.
        accionAlConfirmar(); // ejecuta la acción que le pasaron (quitar canción, eliminar playlist, etc.)
        modalConfirmacion.style.display = 'none'; // oculta el modal
    };

    btnCancelarModal.onclick = () => {
        modalConfirmacion.style.display = 'none'; // solo oculta, sin hacer nada más
    };
}