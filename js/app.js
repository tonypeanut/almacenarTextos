// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event listeners
eventListeners();

function eventListeners() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}

// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value;

    // validación....
    if(tweet === ""){
        mostrarError("Un mensaje no puede ir vacío.");
        return; // evita que se ejecuten más líneas de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreeglo de tweets
    tweets = [...tweets, tweetObj];

    crearHTML();

    // Reiniciar el formulario
    formulario.reset();

}

function mostrarError(error) {
    const mensajeError = document.createElement("P");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");

    // Insertarlo en el contenido
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);

    // Elimina la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

function crearHTML(){

    limpiarHTML(); 

    if (tweets.length > 0 ){
        tweets.forEach( tweet => {
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.innerText = "X";

            // Añadir la función de eliminar
            btnEliminar.onclick= () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement("li");

            // añadir el texto
            li.innerText = tweet.tweet;

            // Asignar el botón
            li.appendChild(btnEliminar);

            // insertarlo en el html
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

// Agrega los Tweets 
function sincronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

// Limpiar el HTML
function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}