let numeroSecreto = Math.floor(Math.random()*100)+1;
let intentos = 0;
let tiempoRestante = 60;
let tiempo;

function iniciarTemporizador(){
    tiempo = setInterval (() => {
        tiempoRestante -=1;
        document.getElementById("temporizador").innerText = "Tiempo restante:" + tiempoRestante + " segundos ";

        if(tiempoRestante<=0){
            clearInterval(tiempo);
            document.getElementById("resultado").innerText= "Se acabó el tiempo!!";
            document.getElementById("resetBoton").style.display="block";
        }
    },1000);
}

function adivinar(){
    let inputField = document.getElementById("adivinaInput");
    let intento = parseInt(document.getElementById("adivinaInput").value);
    intentos +=1;
    let experimento = "";

    if(intento < numeroSecreto) {
        experimento = "El numero és mayor.";
    }else if (intento> numeroSecreto){
        experimento = "El numero és menor.";
    }else {
        experimento = `¡Felicidades! El número secreto era ${numeroSecreto}. Te tomó ${intentos} intentos.`;
        clearInterval(tiempo);
        document.getElementById("resetBoton").style.display="block";
    }
    document.getElementById("resultado").innerText = experimento;

    inputField.value = "";
}

function reiniciar(){
    numeroSecreto= Math.floor(Math.random()*100)+1;
    intentos = 0;
    tiempoRestante = 60;
    document.getElementById("adivinaInput").value="";
    document.getElementById("resultado").innerText="";
    document.getElementById("temporizador").innerText="Tiempo restante 60 segundos";
    document.getElementById("resetBoton").style.display="none";
    iniciarTemporizador();
}

window.onload = iniciarTemporizador;

// Adiciona um evento ao campo de entrada para ativar o botão ao pressionar Enter
document.getElementById("adivinaInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        adivinar(); // Chama a função como se o botão tivesse sido clicado
        document.getElementById("adivinaInput").value = ""; // Limpa o input automaticamente
    }
});
