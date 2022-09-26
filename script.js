const mainApp = document.querySelector(".main-app");
const palabraNueva = document.querySelector(".palabra-nueva");
const horca = document.querySelector(".horca");
const letrasCorrectas = document.querySelector(".letras-correctas");
const rayitas = document.querySelector(".rayitas");
const boton1 = document.querySelector(".boton1");
const boton2 = document.querySelector(".boton2");

let palabrasSecretas = ["PERRO", "GATO", "MALALA", "DINERO", "DUDI", "MONTESANTO", "GENIO",
"ESPALDA", "DOLOR", "FRACASADO", "PAJARITO", "TORSO", "CHETO"];

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
}

function dibujarLineas() {
    let rayitasHeight = rayitas.height;
    let lineSize = (calcularTamañoDelDash() + 3) * palabraSecreta.length;
    let principio = calcularStartDelDash(lineSize);
    let final = principio + lineSize;
    let baseline = rayitasHeight-1;

    const contexto = rayitas.getContext("2d");

    contexto.canvas.width = window.innerWidth;

    contexto.lineWidth = 2;
    contexto.setLineDash([calcularTamañoDelDash(), 3]);

    contexto.strokeStyle = "#0A3871";
    contexto.beginPath();
    contexto.moveTo(principio, baseline);
    contexto.lineTo(final, baseline);
    contexto.stroke();
    contexto.closePath();
    dibujarLetrasCorrectas(principio);
    dibujarHorca();
}

function dibujarLetrasCorrectas(principio) {
    const contexto = letrasCorrectas.getContext("2d");
    contexto.canvas.width = window.innerWidth;
    let baseline = letrasCorrectas.height - 1;
    contexto.fillStyle = "#0A3871";

    if (window.innerWidth >= 270 && window.innerWidth <= 412) {
        let posición = principio;
        let gap = 3;
        contexto.font = "bold 2.6rem monospace";
        for (let i = 0; i < palabraSecreta.length; i++) {
            let letraWidth = contexto.measureText(palabraSecreta[i]).width;
            contexto.fillText(palabraSecreta[i], posición, baseline);
            contexto.moveTo((posición + letraWidth + gap), baseline);
            posición = posición + letraWidth + gap;
        }
    }

    if (window.innerWidth >= 413 && window.innerWidth <= 912) {
        let posición = principio;
        let gap = 3;
        contexto.font = "bold 3.3rem monospace";
        for (let i = 0; i < palabraSecreta.length; i++) {
            let letraWidth = contexto.measureText(palabraSecreta[i]).width;
            contexto.fillText(palabraSecreta[i], posición, baseline);
            contexto.moveTo((posición + letraWidth + gap), baseline);
            posición = posición + letraWidth + gap;
        }
    }

    if (window.innerWidth >= 913) {
        let posición = principio;
        let gap = 3;
        contexto.font = "bold 4rem monospace";
        for (let i = 0; i < palabraSecreta.length; i++) {
            let letraWidth = contexto.measureText(palabraSecreta[i]).width;
            contexto.fillText(palabraSecreta[i], posición, baseline);
            contexto.moveTo((posición + letraWidth + gap), baseline);
            posición = posición + letraWidth + gap;
        }
    }
}

function calcularTamañoDelDash() {
    let tamaño = 0;
    if (window.innerWidth >= 270 && window.innerWidth <= 412) {
        tamaño = 23;
    }
    if (window.innerWidth >= 413 && window.innerWidth <= 912) {
        tamaño = 29;
    }
    if (window.innerWidth >= 913) {
        tamaño = 35;
    }
    return tamaño;
}

function calcularStartDelDash(lineSize) {
    let centroRayitas = window.innerWidth / 2;
    let origin = lineSize / 2;
    let start = centroRayitas - origin;
    return start;
}

function dibujarHorca() {
    const contexto = horca.getContext("2d");
    contexto.canvas.width = window.innerWidth;
}