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
    //palabraSecreta = palabrasSecretas[Math.floor(Math.random() * palabrasSecretas.length)];
    palabraSecreta = "MONTESANTO";
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
        let gap = 4;
        contexto.font = "bold 2.6rem monospace";
        for (let i = 0; i < palabraSecreta.length; i++) {
            let letraWidth = contexto.measureText(palabraSecreta[i]).width;
            contexto.fillText(palabraSecreta[i], (posición - gap), baseline);
            contexto.moveTo((posición + letraWidth + gap), baseline);
            posición = posición + letraWidth + gap;
        }
    }

    if (window.innerWidth >= 413 && window.innerWidth <= 912) {
        let posición = principio;
        let gap = 4;
        contexto.font = "bold 3.3rem monospace";
        for (let i = 0; i < palabraSecreta.length; i++) {
            let letraWidth = contexto.measureText(palabraSecreta[i]).width;
            contexto.fillText(palabraSecreta[i], (posición - gap), baseline);
            contexto.moveTo((posición + letraWidth + gap), baseline);
            posición = posición + letraWidth + gap;
        }
    }

    if (window.innerWidth >= 913) {
        let posición = principio;
        let gap = 4;
        contexto.font = "bold 4rem monospace";
        for (let i = 0; i < palabraSecreta.length; i++) {
            let letraWidth = contexto.measureText(palabraSecreta[i]).width;
            contexto.fillText(palabraSecreta[i], (posición - gap), baseline);
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
    let horcaWidth = window.innerWidth - 15;
    if (horcaWidth > 400) {
        horcaWidth = 400;
    }
    contexto.canvas.width = horcaWidth;
    let horcaHeight = contexto.canvas.height;
    let baseline = horcaHeight - 25;
    let baseStart = horcaWidth / 7;
    let baseEnd = (baseStart * 6) - 15;
    let baseMiddleOff = (baseEnd / 2) - 35;
    let top = horcaHeight / 10;
    let topBar = (horcaWidth / 5) * 3.5;

    contexto.lineWidth = 3;
    contexto.strokeStyle = "#0A3871";
    contexto.beginPath();
    contexto.moveTo(baseStart, baseline);
    contexto.lineTo(baseEnd, baseline);
    contexto.stroke();
    //Acá termina la base.
    contexto.moveTo(baseMiddleOff, baseline);
    contexto.lineTo(baseMiddleOff, top);
    contexto.lineTo(topBar, top);
    contexto.lineTo(topBar, (top+30));
    contexto.stroke();
    //Acá termina la horca en sí.
    contexto.closePath();
}