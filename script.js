const mainApp = document.querySelector(".main-app");
const palabraNueva = document.querySelector(".palabra-nueva");
const horca = document.querySelector(".horca");
const letrasCorrectas = document.querySelector(".letras-correctas");
const rayitas = document.querySelector(".rayitas");
const boton1 = document.querySelector(".boton1");
const boton2 = document.querySelector(".boton2");

let palabrasSecretas = ["PERRO", "GATO", "MALALA", "BICHO", "DUDI", "MONTESANTO", "GENIO",
"ESPALDA", "DOLOR", "FRACASADO", "PAJARITO", "ABDOMINALES", "DADDY", "TORSO", "DILDO",
"CELESTE", "CHETO", "MIERDA"];
//Tiene 18 palabras.

let palabraSecreta = "";

function iniciarJuego() {
    mainApp.style.display = "flex";
    
    horca.style.display = "inherit";

    letrasCorrectas.style.display = "inherit";

    rayitas.style.display = "inherit";

    boton1.style.minHeight = "3rem";
    boton1.innerHTML = "Nuevo juego";
    boton1.style.fontSize = "1rem";
    boton1.style.width = "15rem";

    boton2.style.width = "15rem";
    boton2.innerHTML = "Desistir";

    elegirPalabraSecreta();
    dibujarLineas();
}

function elegirPalabraSecreta() {
    palabraSecreta = palabrasSecretas[Math.floor(Math.random() * palabrasSecretas.length)];
    console.log(palabraSecreta);
}

function dibujarLineas() {
    const contexto = horca.getContext("2d");
    contexto.strokeStyle = "darkblue";
    contexto.lineWidth = 2;
    contexto.beginPath();
    contexto.moveTo(10, 375);
    contexto.lineTo(48, 375);
    contexto.stroke();
}