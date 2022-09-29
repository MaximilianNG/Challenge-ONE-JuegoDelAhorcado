const mainApp = document.querySelector(".main-app");
const palabraNueva = document.querySelector(".palabra-nueva");
const horca = document.querySelector(".horca");
const letrasCorrectas = document.querySelector(".letras-correctas");
const highlight = document.querySelector(".highlight");
const rayitas = document.querySelector(".rayitas");
const errores = document.querySelector(".errores");
const boton1 = document.querySelector(".boton1");
const boton2 = document.querySelector(".boton2");

let palabrasSecretas = ["PERRO", "GATO", "MALALA", "DINERO", "PILETA", "MONTESANTO", "GENIO",
"ESPALDA", "DOLOR", "FRACASADO", "PAJARITO", "CINE", "CHETO", "MARIANA", "VIRGINIA", "AHORCADO",
"BUFANDA"];

let palabraSecreta = "";
let principio = 0;
let aciertos = [];
let vidas = 8;
let aciertosNecesarios = 0;
let caracteresVálidos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ",
"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let ganar = false;

function iniciarJuego() {
    mainApp.style.display = "flex";
    horca.style.display = "inherit";
    letrasCorrectas.style.display = "inherit";
    rayitas.style.display = "inherit";

    boton1.style.minHeight = "2.6rem";
    boton1.innerHTML = "Nuevo juego";
    boton1.style.fontSize = "1rem";
    boton1.style.width = "15rem";
    boton1.onclick = clear;

    boton2.style.width = "15rem";
    boton2.innerHTML = "Desistir";

    elegirPalabraSecreta();
    dibujarLineas();
    jugar();
}

function jugar() {
    window.addEventListener("keydown", (e) => {
        let tecla = e.key.toUpperCase();
        if (vidas <= 0 || ganar == true) {
            console.log("Iniciar nueva partida.");
        } else {
            if (palabraSecreta.includes(tecla)) {
                if (aciertos.includes(tecla)) {
                    rayitas.style.animation = "blink 0.5s linear 3";
                    setTimeout(function() {
                        rayitas.style.animation = ''}, 1500);
                } else {
                    aciertos.push(tecla);
                    console.log(aciertos);
                    dibujarLetrasCorrectas(principio, aciertos);
                    if (aciertos.length == aciertosNecesarios) {
                        setTimeout(function() {
                            alert("¡Felicitaciones, ganaste!");
                        }, 1000);
                        ganar = true;
                    }
                }
            } else {
                    if (!caracteresVálidos.includes(tecla)) {
                        console.log("No es una tecla válida.");
                    } else {
                        if (errores.innerHTML.includes(tecla)) {
                            errores.style.animation = "blink 0.5s linear 3";
                    setTimeout(function() {
                        errores.style.animation = ''}, 1500);
                        } else {
                            errores.innerHTML = errores.innerHTML + " " + tecla;
                            vidas = vidas - 1;
                            dibujarHorca(vidas);
                            console.log("Vidas left: " + vidas);
                        }
                    }
            } 
        }    
    })
}

function elegirPalabraSecreta() {
    palabraSecreta = palabrasSecretas[Math.floor(Math.random() * palabrasSecretas.length)];
    let sinRepetir = [];
    for (let i = 0; i < palabraSecreta.length; i++) {
        if (!sinRepetir.includes(palabraSecreta[i])) {
            sinRepetir.push(palabraSecreta[i]);
        }
    }
    aciertosNecesarios = sinRepetir.length;
    console.log(palabraSecreta);
}

function dibujarLineas() {
    let rayitasHeight = rayitas.height;
    let lineSize = (calcularTamañoDelDash() + 3) * palabraSecreta.length;
    principio = calcularStartDelDash(lineSize);
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
}

function dibujarLetrasCorrectas(principio, aciertos) {
    const contexto = letrasCorrectas.getContext("2d");
    contexto.canvas.width = window.innerWidth;
    let baseline = letrasCorrectas.height - 1;
    contexto.fillStyle = "#0A3871";
    let posición;
    let gap;

    if (window.innerWidth >= 270 && window.innerWidth <= 412) {
        posición = principio;
        gap = 4;
        contexto.font = "bold 2.6rem monospace";
    }

    if (window.innerWidth >= 413 && window.innerWidth <= 912) {
        posición = principio - 3;
        gap = 4;
        contexto.font = "bold 3.3rem monospace";
    }

    if (window.innerWidth >= 913) {
        posición = principio - 3;
        gap = 5;
        contexto.font = "bold 4rem monospace";
    }

    for (let i = 0; i < palabraSecreta.length; i++) {
        let letraWidth = contexto.measureText(palabraSecreta[i]).width;
        if (aciertos.includes(palabraSecreta[i])) {
            contexto.fillText(palabraSecreta[i], (posición - gap), baseline);
        }
        contexto.moveTo((posición + letraWidth + gap), baseline);
        posición = posición + letraWidth + gap;
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

function dibujarHorca(vidas) {
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
    let torsoY = (horcaHeight / 4) * 2.3;
    let radioCabeza = 22.5;
    let anchoCuerpa = horcaWidth / 14;
    let extremiLength = horcaHeight / 6;
    let cuello = ((top + (radioCabeza * 3))) + 3;

    contexto.lineWidth = 4;
    contexto.strokeStyle = "#0A3871";
    contexto.beginPath();
    contexto.moveTo(baseStart, baseline);
    contexto.lineTo(baseEnd, baseline);
    contexto.moveTo(baseMiddleOff, baseline);
    contexto.lineTo(baseMiddleOff, top);
    contexto.lineTo(topBar, top);
    contexto.lineTo(topBar, (top + radioCabeza));
    if (vidas == 7) {
        contexto.stroke();
    } 
    contexto.moveTo((topBar + radioCabeza), (top + (radioCabeza * 2)));
    contexto.arc(topBar, (top + (radioCabeza * 2)), radioCabeza, 0, 2*Math.PI)
    if (vidas == 6) {
        contexto.stroke();
    }
    contexto.moveTo(topBar, (top + (radioCabeza * 3)));
    contexto.lineTo(topBar, torsoY);
    if (vidas == 5) {
        contexto.stroke();
    }
    contexto.lineTo((topBar - anchoCuerpa), (torsoY + extremiLength));
    if (vidas == 4) {
        contexto.stroke();
    }
    contexto.moveTo(topBar, torsoY);
    contexto.lineTo((topBar + anchoCuerpa), (torsoY + extremiLength));
    if (vidas == 3) {
        contexto.stroke();
    }
    contexto.moveTo(topBar, cuello);
    contexto.lineTo((topBar - anchoCuerpa), (cuello + extremiLength));
    if (vidas == 2) {
        contexto.stroke();
    }
    contexto.moveTo(topBar, cuello);
    contexto.lineTo((topBar + anchoCuerpa), (cuello + extremiLength));
    if (vidas <= 1) {
        contexto.stroke();
    }
    if (vidas <= 0) {
        setTimeout(function() {
            alert("Perdiste :(");
        }, 1000);
    }
}

function clear() {
    let limpiar = horca.getContext("2d");
    limpiar.clearRect(0, 0, limpiar.canvas.width, limpiar.canvas.height);
    limpiar = rayitas.getContext("2d");
    limpiar.clearRect(0, 0, limpiar.canvas.width, limpiar.canvas.height);
    limpiar = letrasCorrectas.getContext("2d");
    limpiar.clearRect(0, 0, limpiar.canvas.width, limpiar.canvas.height);
    errores.innerHTML = "";
    vidas = 8;
    aciertos = [];
    ganar = false;
    iniciarJuego();
}