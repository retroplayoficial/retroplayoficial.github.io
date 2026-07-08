const params = new URLSearchParams(window.location.search);

const consoleSelecionado = params.get("console");

const rom = params.get("rom");

document.getElementById("console").innerHTML =
"Console: " + consoleSelecionado;

document.getElementById("nomeJogo").innerHTML =
rom;

setTimeout(() => {

document.getElementById("barra").innerHTML =
"Cartucho inserido com sucesso.";

},2000);