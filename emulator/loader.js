const params = new URLSearchParams(window.location.search);

const consoleSelecionado = params.get("console");
const rom = params.get("rom");

const caminhoRom = `../roms/${consoleSelecionado}/${rom}`;

document.getElementById("console").innerHTML =
"Console: " + consoleSelecionado;

document.getElementById("nomeJogo").innerHTML =
rom;

document.getElementById("barra").innerHTML =
"Preparando emulador...";

console.log("ROM:", caminhoRom);

setTimeout(() => {

document.getElementById("barra").innerHTML =
"Pronto para iniciar.";

},1500);