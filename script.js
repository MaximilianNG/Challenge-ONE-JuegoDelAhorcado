const mainApp = document.querySelector(".main-app");
const palabraNueva = document.querySelector(".palabra-nueva");
const horca = document.querySelector(".horca");
const letrasCorrectas = document.querySelector(".letras-correctas");
const highlight = document.querySelector(".highlight");
const rayitas = document.querySelector(".rayitas");
const errores = document.querySelector(".errores");
const boton1 = document.querySelector(".boton1");
const boton2 = document.querySelector(".boton2");
const input = document.querySelector("[data-input]");
const inputPalabraNueva = document.querySelector("[data-input-palabra-nueva]")
const ingresarPalabraNueva = document.querySelector(".ingresar-palabra-nueva");
const aclaracion = document.querySelector(".aclaración");

let palabrasSecretas = ["PERRO", "GATO", "DINERO", "PILETA", "GENIO",
"ESPALDA", "DOLOR", "PAJARO", "CINE", "AHORCADO", "JAVASCRIPT", "HTML", "PROGRAMACION", "CALIENTE",
"FRIO", "SORTEO", "MERIENDA", "BRASIL", "OPORTUNIDAD", "GRACIAS"];

let palabraSecreta = "";
let principio = 0;
let aciertos = [];
let vidas = 8;
let aciertosNecesarios = 0;
let touchscreen = false;
let caracteresVálidos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ",
"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let ganar = false;

function iniciarJuego() {
    ingresarPalabraNueva.style.display = "none";
    aclaracion.style.display = "none";
    mainApp.style.display = "flex";
    horca.style.display = "inherit";
    letrasCorrectas.style.display = "inherit";
    rayitas.style.display = "inherit";

    boton1.style.minHeight = "2.6rem";
    boton1.innerHTML = "Nueva palabra";
    boton1.style.fontSize = "1rem";
    boton1.style.width = "15rem";
    boton1.onclick = restart;

    boton2.style.width = "15rem";
    boton2.innerHTML = "Desistir";
    boton2.onclick = desistir;

    elegirPalabraSecreta();
    dibujarLineas();
    jugar();
}

function jugar() {

    if ("ontouchstart" in document.documentElement)
    {
        input.style.display = "inherit";
        touchscreen = true;
        input.addEventListener('input', capturarInputTouchscreen)
    } else {
        window.addEventListener("keydown", capturarInputTeclado)
    }
}

function capturarInputTeclado(e) {
    mainGameLoop(e.key.toUpperCase());
}

function capturarInputTouchscreen(e) {
    if (input.value == null || input.value == "") {
    } else {
        mainGameLoop(e.data.toUpperCase());
        input.value = input.value.toUpperCase();
        input.select();
    }   
}

function mainGameLoop(tecla) {
    if (vidas <= 0 || ganar == true) {
    } else {
        if (palabraSecreta.includes(tecla)) {
            if (aciertos.includes(tecla)) {
                rayitas.style.animation = "blink 0.5s linear 3";
                setTimeout(function() {
                    rayitas.style.animation = ''}, 1500);
            } else {
                aciertos.push(tecla);
                dibujarLetrasCorrectas(principio, aciertos);
                if (aciertos.length == aciertosNecesarios) {
                    ganar = true;
                    errores.classList.add("typewriter");
                    setTimeout(function() {errores.classList.add("rainbow");}, 700);
                    errores.innerHTML = "FELICITACIONES :D"
                }
            }
        } else {
                if (!caracteresVálidos.includes(tecla)) {
                } else {
                    if (errores.innerHTML.includes(tecla)) {
                        errores.style.animation = "blink 0.5s linear 3";
                setTimeout(function() {
                    errores.style.animation = ''}, 1500);
                    } else {                    
                        errores.classList.remove("typewriter");
                        errores.classList.remove("rainbow");
                        errores.innerHTML = errores.innerHTML + " " + tecla;
                        vidas = vidas - 1;
                        dibujarHorca(vidas);
                    }
                }
        }
        } 
    }

function agregarPalabraView() {
    ingresarPalabraNueva.style.display = "flex";
    aclaracion.style.display = "inherit";
    boton1.innerHTML = "Guardar y empezar";
    boton2.innerHTML = "Cancelar";

    inputPalabraNueva.addEventListener("input", (e) => {
        inputPalabraNueva.value = inputPalabraNueva.value.toUpperCase();
        if (inputPalabraNueva.value.length > 1) {
            inputPalabraNueva.value.slice(0, -1);
        }
    })
    boton1.onclick = agregarPalabra;

    boton2.onclick = desistir;
}

function agregarPalabra() {
    let palabra = inputPalabraNueva.value;
    inputPalabraNueva.value = "";
    palabrasSecretas.push(palabra);
    iniciarJuego();
}

function desistir() {
    restart();
    mainApp.style.display = "none";
    ingresarPalabraNueva.style.display = "none";
    aclaracion.style.display = "none";
    input.style.display = "none";
    inputPalabraNueva.value = "";

    if (touchscreen) {
        input.removeEventListener("input", capturarInputTouchscreen)
    } else {
        window.removeEventListener("keydown", capturarInputTeclado)
    }

    boton1.innerHTML = "Iniciar juego";
    boton1.style = `border-radius: 24px;
    background-color: #0A3871;
    color: white;
    font-size: 1.3rem;
    min-height: 6rem;
    min-width: 14rem;
    max-width: 20rem;`;

    boton2.innerHTML = "Agregar nueva palabra";
    boton2.style.width = "";
    boton2.onclick = agregarPalabraView;
}

function elegirPalabraSecreta() {
    if (palabraSecreta != "") {
        let palabraPrevia = palabraSecreta;
        // Elegir una palabra.
        palabraSecreta = palabrasSecretas[Math.floor(Math.random() * palabrasSecretas.length)];
        // Si es igual a la última que ya se usó, elegir otra hasta que no sea la misma.
        while (palabraPrevia == palabraSecreta) {
            palabraSecreta = palabrasSecretas[Math.floor(Math.random() * palabrasSecretas.length)];
            if (palabraPrevia != palabraSecreta) {
                break;
            }
        }
    } else {
        palabraSecreta = palabrasSecretas[Math.floor(Math.random() * palabrasSecretas.length)];
    }
    
    let sinRepetir = [];
    //Sin repetir refiere a caracteres que no se repiten en la palabra secreta elegida.
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
        gap = 3.5;
        contexto.font = "bold 2.15rem monospace";
    }

    if (window.innerWidth >= 413 && window.innerWidth <= 912) {
        posición = principio - 3;
        gap = 4;
        contexto.font = "bold 3.25rem monospace";
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
        tamaño = 24;
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
    if (vidas == 0) {
        contexto.strokeStyle = "#DC143C";
    } else {
        contexto.strokeStyle = "#0A3871";
    }
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
        contexto.moveTo((topBar - (anchoCuerpa / 1.5)), cuello);
        contexto.lineTo((topBar + (anchoCuerpa / 1.5)), cuello);
        contexto.stroke();
        errores.classList.add("typewriter");
        errores.innerHTML = "La palabra era: " + palabraSecreta;

    }
}

function restart() {
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
    errores.classList.remove("typewriter");
    errores.classList.remove("rainbow");
    iniciarJuego();
}