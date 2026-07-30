import {buscarcancion} from './api.js';

import { crearPlaylist, obtenerPlaylists, agregarCancionAPlaylist, cargarDeLocalStorage, quitarCancionDePlaylist, eliminarPlaylist } from './state.js';

let criterioOrdenActual = 'default';  // guarda el criterio de orden elegido; 'default' = orden original, sin ordenar todavía 
const audioReproductor = new Audio(); // reproductor global reutilizable — se reutiliza para todas las canciones

//referencias html 
const inputBusqueda = document.querySelector('#inputbusqueda');  //queryselector:busca un element html y lo devuelve pa modificar
const btnBuscar = document.querySelector('#btnbuscar');
const mensajeBusqueda = document.querySelector('#mensajebusqueda');
const listaResultados = document.querySelector('#listaresultados');

const inputNombrePlaylist = document.querySelector('#nombreplaylist');
const btnCrearPlaylist = document.querySelector('#btncrearplaylist');
const mensajePlaylist = document.querySelector('#mensajeplaylist');
const listaPlaylists = document.querySelector('#listaplaylists');
const listaTendencias = document.querySelector('#listatendencias'); // canciones más escuchadas
const seccionDescubre = document.querySelector('.seccion-descubre'); // sección de géneros musicales
const seccionTendencias = document.querySelector('.seccion-tendencias'); // sección de tendencias
const btnVolver = document.querySelector('#btnvolver'); // botón para volver a la vista principal

// referencias del miniplayer
const miniplayer = document.querySelector('#miniplayer');
const miniplayerCaratula = document.querySelector('#miniplayer-caratula');
const miniplayerTitulo = document.querySelector('#miniplayer-titulo');
const miniplayerArtista = document.querySelector('#miniplayer-artista');
const miniplayerBtn = document.querySelector('#miniplayer-btn');

// botón pausa/play del miniplayer
miniplayerBtn.addEventListener('click', () => {
    if (audioReproductor.paused) {
        audioReproductor.play();
        miniplayerBtn.textContent = '⏸';
    } else {
        audioReproductor.pause();
        miniplayerBtn.textContent = '▶';
    }
});

// función para reproducir una canción y actualizar el miniplayer
function reproducirCancion(cancion) {
    if (!cancion.preview) return;
    audioReproductor.src = cancion.preview;
    audioReproductor.play();
    // actualiza el miniplayer con la info de la canción actual
    miniplayer.style.display = 'flex';
    miniplayerCaratula.src = cancion.caratula;
    miniplayerTitulo.textContent = cancion.titulo;
    miniplayerArtista.textContent = cancion.artista;
    miniplayerBtn.textContent = '⏸';

    // barra de progreso: se actualiza continuamente mientras suena el audio
    const miniplayerProgreso = document.querySelector('#miniplayer-progreso');
    audioReproductor.ontimeupdate = () => {
        if (audioReproductor.duration) {
            const porcentaje = (audioReproductor.currentTime / audioReproductor.duration) * 100;
            miniplayerProgreso.style.width = `${porcentaje}%`; // crece según el avance
        }
    };

    // cuando termina el preview, vuelve al ícono de play y resetea la barra
    audioReproductor.onended = () => {
        miniplayerBtn.textContent = '▶';
        miniplayerProgreso.style.width = '0%'; // resetea la barra al terminar
    };
}

inputBusqueda.addEventListener('input', () => {
    mensajeBusqueda.textContent = '';
    mensajePlaylist.textContent = '';
});

inputNombrePlaylist.addEventListener('input', () => {
    mensajePlaylist.textContent = '';
});

btnBuscar.addEventListener('click', manejarBusqueda); // cuando click, ejecutar manejarBusqueda

// evento del botón volver: limpia resultados y muestra de nuevo géneros y tendencias
btnVolver.addEventListener('click', () => {
    listaResultados.innerHTML = '';
    inputBusqueda.value = '';
    mensajeBusqueda.textContent = '';
    btnVolver.style.display = 'none';
    seccionDescubre.style.display = 'block';
    seccionTendencias.style.display = 'block';
});

//innerHTML reemplaza o borra el contenido interno de un elemento.
//appendChild() agrega un elemento nuevo al final, sin borrar lo anterior.

async function manejarBusqueda(){ 
    const termino=inputBusqueda.value.trim()  //value guarda lo q escribio el usuario en el input, trim:sin espacios inicio y final

    mensajeBusqueda.textContent = '';
    mensajePlaylist.textContent = '';
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
        // oculta géneros y tendencias, muestra botón volver
        seccionDescubre.style.display = 'none';
        seccionTendencias.style.display = 'none';
        btnVolver.style.display = 'inline-block';
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
            <div class="cancion-info">
                <strong class="cancion-titulo">${cancion.titulo}</strong>
                <span class="cancion-artista">${cancion.artista}</span>
            </div>
            <span class="cancion-duracion">${formatearDuracion(cancion.duracion)}</span>
            <select class="selectplaylist">
                <option value="">Elige una playlist</option> 
                ${opcionesPlaylists}
            </select>
            <button class="btnagregar">Agregar</button>
        `;

        // busca el botón "Agregar" dentro de este li específico
        const btnAgregar = li.querySelector('.btnagregar');  

        // busca el select de playlists dentro de este li específico
        const selectPlaylist = li.querySelector('.selectplaylist');  //slectplaylist q se genera en el inner de arriba

        //focus:cuando entras o seleccionas el <select>(no es elegir una opción; es q selector quedó activo.)
        selectPlaylist.addEventListener('focus', () => {   
           // focus: desktop — touchstart: móvil
    const actualizarOpciones = () => {
    const opcionesActualizadas = obtenerPlaylists()
        .map(p => `<option value="${p.id}">${p.nombrePlaylist}</option>`)
        .join('');
    selectPlaylist.innerHTML = `<option value="">Elige una playlist</option>${opcionesActualizadas}`;
};

selectPlaylist.addEventListener('focus', actualizarOpciones);
selectPlaylist.addEventListener('touchstart', actualizarOpciones);
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

                //si la playlist a la que se agregó la canción es la misma que está abierta en el detalle, se refresca también
                const playlistActualizada = obtenerPlaylists().find(p => p.id === playlistId);
                if (playlistActualizada) {
                    mostrarDetallePlaylist(playlistActualizada);
                }
            }
        });

        // AUDIO: al hacer clic en la fila reproduce el preview — e.target.closest evita q se dispare al clickear botones o selects
        li.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('select')) return;
            reproducirCancion(cancion);
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

function formatearDuracionTotal(ms) { //mlseg entre mil, math.floor:quita decimales
    const totalMinutos = Math.floor(ms / 60000);
    const horas = Math.floor(totalMinutos / 60);
    const minutos = totalMinutos % 60;//// % te da el resto de la division

    if (horas === 0) {
        return `${minutos} min`; //si no hay horas, solo muestra minutos
    }

    return `${horas} h ${minutos} min`;
}

function ordenarCanciones(canciones, criterio) {
    const copia = [...canciones]; // copia para no mutar el array original
    //sort:compara

    if (criterio === 'recientes') {
        return copia.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    }

    if (criterio === 'antiguas') {
        return copia.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }

    if (criterio === 'alfabetico') {
        return copia.sort((a, b) => a.titulo.localeCompare(b.titulo));//localecomapre:comapara alafabeticamente
    }

    return copia; // si NINGUNO de los if de arriba se cumple (o sea, criterio === 'default')
}

function encontrarMasFrecuentes(array) {
    const conteo = {};//objeto vacio para contar cuántas veces aparece cada valor en el array

    array.forEach(valor => {
        //cada que aparece "Rock" en el array de generos, +1 a su contador y vas llevando la cuenta de cuántas veces se repite.
        // se usa [valor] y no .valor  porque .valor busca una propiedad ,  [valor] mira el contenido de la variable.  
        conteo[valor] = (conteo[valor] || 0) + 1;//si lo de la izquierda no existe (es undefined), usa lo de la derecha (0). 
    });

    //object.values:agarra valores de objeto=> {rock:1, pop:2} agarra solo 1 y 2, rock es nombre propiedad
    //math.max:encuentra num mas grande
    const maxima = Math.max(...Object.values(conteo));

    //object.keys: saca solo los nombres del obj=>{rock:1, pop:2} agarra rock  y pop
    //filter devuelve nombres cuyo conteo sea igual al máximo,si hay empate, quedan varios nombres, no solo uno.
    const masFrecuentes = Object.keys(conteo).filter(valor => conteo[valor] === maxima);

    return masFrecuentes.join(', '); //["Rock", "Pop"].join(', ') → "Rock, Pop".
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
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            mostrarModalConfirmacion('¿Eliminar esta playlist?', () => {
                eliminarPlaylist(playlist.id);

                if (obtenerPlaylists().length === 0) {
                    detallePlaylist.textContent = 'Selecciona una playlist para ver su contenido';
                }

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

    // suma la duración de todas las canciones
    //reduce:se usa porque queremos un solo valor (la suma) a partir de un array (las canciones)
    //reduce: (acumulador, lo que se va a acumular)
    //suma:acumulador q guarda la suma de duraciones, cancion:cada cancion del array
    //0: valor inicial del acumulador (suma) para q empiece desde 0
    const duracionTotalMs = playlist.canciones.reduce((suma, cancion) => suma + cancion.duracion, 0); //duracion:del constructor en cancion.js
    const parrafoDuracion = document.createElement('p');
    parrafoDuracion.textContent = `Duración total: ${formatearDuracionTotal(duracionTotalMs)}`;
    detallePlaylist.appendChild(parrafoDuracion);

    //HU-09: estadísticas de la playlist (cantidad, género más frecuente, artista más frecuente)
    const cantidadCanciones = playlist.canciones.length; //cantidad total de canciones

    const generos = playlist.canciones.map(c => c.genero); //array con solo los géneros de cada canción
    const generoMasFrecuente = encontrarMasFrecuentes(generos); //usa la función de conteo para saber cuál se repite más

    const artistas = playlist.canciones.map(c => c.artista); //array con solo los artistas de cada canción
    const artistaMasFrecuente = encontrarMasFrecuentes(artistas); //misma función, pero con artistas

    const parrafoEstadisticas = document.createElement('p');
    parrafoEstadisticas.textContent = `${cantidadCanciones} canciones · Género: ${generoMasFrecuente} · Artista: ${artistaMasFrecuente}`;
    detallePlaylist.appendChild(parrafoEstadisticas);

    const selectOrden = document.createElement('select');
    selectOrden.innerHTML = `
        <option value="default">Orden original</option>
        <option value="recientes">Más recientes primero</option>
        <option value="antiguas">Más antiguas primero</option>
        <option value="alfabetico">Alfabético</option>
    `;
    selectOrden.value = criterioOrdenActual; // mantiene el criterio ya elegido, si lo había

    selectOrden.addEventListener('change', () => {  //se dispara cuando el usuario elige una opción distinta en el <select>
        criterioOrdenActual = selectOrden.value;
        mostrarDetallePlaylist(playlist);
    });

    detallePlaylist.appendChild(selectOrden);

    //para cuando el usuario dee click en mostrar detalle
    const ul = document.createElement('ul'); 

    //HU-10: aplica el criterio de orden elegido antes de mostrar las canciones
    const cancionesOrdenadas = ordenarCanciones(playlist.canciones, criterioOrdenActual);

    cancionesOrdenadas.forEach(cancion => {
        const li = document.createElement('li');
        const fecha = new Date(cancion.fecha).toLocaleDateString();
        //br:crea un salto de línea, small:letra más pequeña, tolocaledatestring:convierte un objeto Date a un texto de fecha legibl
        li.innerHTML = `
            <img src="${cancion.caratula}" alt="Carátula de ${cancion.titulo}" width="50">
            <div class="cancion-info">
                <strong class="cancion-titulo">${cancion.titulo}</strong>
                <span class="cancion-artista">${cancion.artista}</span>
                <small class="cancion-fecha">Agregada el ${fecha}</small>
            </div>
            <span class="cancion-duracion">${formatearDuracion(cancion.duracion)}</span>
            <button class="btn-quitar-cancion">Quitar</button>
        `;

        const btnQuitar = li.querySelector('.btn-quitar-cancion');

        btnQuitar.addEventListener('click', () => {
            mostrarModalConfirmacion('¿Quitar esta canción de la playlist?', () => {
                quitarCancionDePlaylist(playlist.id, cancion.id);
                const playlistActualizada = obtenerPlaylists().find(p => p.id === playlist.id); //se compara id 
                mostrarDetallePlaylist(playlistActualizada); // usa la versión FRESCA, no la vieja
            });
        });

        // AUDIO: al hacer clic en la fila reproduce el preview — e.target.closest evita q se dispare al clickear el botón "Quitar"
        li.addEventListener('click', (e) => {
            if (e.target.closest('button')) return;
            reproducirCancion(cancion);
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
    cargarTendencias();
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

async function cargarTendencias() {
    try {
        const artistas = ['Bad Bunny', 'Taylor Swift', 'Maluma', 'Ariana Grande', 'Harry Styles', 'Olivia Rodrigo', 'Myke Towers'];
        
        // busca los 2 primeros resultados de cada artista y los junta en un solo array
        const promesas = artistas.map(artista => buscarcancion(artista));
        const resultados = await Promise.all(promesas);
        
        // toma las primeras 2 canciones de cada artista
        const canciones = resultados.flatMap(lista => lista.slice(0, 2));
        
        listaTendencias.innerHTML = '';
        canciones.forEach(cancion => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="tendencia-card">
                    <img src="${cancion.caratula}" alt="Carátula de ${cancion.titulo}">
                    <strong class="cancion-titulo">${cancion.titulo}</strong>
                    <span class="cancion-artista">${cancion.artista}</span>
                </div>
            `;

            // AUDIO: al hacer clic en la tarjeta de tendencia reproduce el preview
            li.addEventListener('click', () => {
                reproducirCancion(cancion);
            });

            listaTendencias.appendChild(li);
        });
    } catch (error) {
        listaTendencias.innerHTML = '<li style="color: var(--texto-secundario); padding: 1rem;">No se pudieron cargar las tendencias.</li>';
    }
}

// HU-extra: géneros rápidos — al hacer clic en una tarjeta, lanza la búsqueda de ese género
document.querySelectorAll('.genero-card').forEach(card => {
    card.addEventListener('click', () => {
        const termino = card.dataset.termino; // lee el atributo data-termino del HTML
        inputBusqueda.value = termino; // pone el término en el input de búsqueda
        manejarBusqueda(); // dispara la búsqueda exactamente igual que si el usuario hubiera escrito y dado clic en Buscar
    });
});

iniciarApp();

//referencias html
const modalConfirmacion = document.querySelector('#modal-confirmacion');
const mensajeModal = document.querySelector('#mensaje-modal');
const btnConfirmarModal = document.querySelector('#btn-confirmar-modal');
const btnCancelarModal = document.querySelector('#btn-cancelar-modal');

//'block' = visible; 'none' = oculto.
function mostrarModalConfirmacion(mensaje, accionAlConfirmar) {
    mensajeModal.textContent = mensaje; // muestra el mensaje en el modal por medio del parametro "mensaje"
    modalConfirmacion.style.display = 'block'; // muestra el modal

    btnConfirmarModal.onclick = () => { //se usa onclick en vez de addEventListener porque queremos que se ejecute solo una vez, y si usamos addEventListener, cada vez que se abra el modal, se agregaría otro listener y se ejecutaría varias veces.
        accionAlConfirmar(); // ejecuta la acción que le pasaron (quitar canción, eliminar playlist, etc.)
        modalConfirmacion.style.display = 'none'; // oculta el modal
    };

    btnCancelarModal.onclick = () => {
        modalConfirmacion.style.display = 'none'; // solo oculta, sin hacer nada más
    };
}