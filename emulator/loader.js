const params = new URLSearchParams(window.location.search);

const consoleSelecionado = params.get("console");
const rom = params.get("rom");

document.getElementById("console").innerHTML =
"Console: " + consoleSelecionado.toUpperCase();

document.getElementById("nomeJogo").innerHTML =
rom;

document.getElementById("status").innerHTML =
"Localizando ROM...";

const caminhoRom =
`../roms/${consoleSelecionado}/${rom}`;

console.log("ROM:", caminhoRom);

setTimeout(() => {

document.getElementById("status").innerHTML =
"Emulador pronto.";

},1500);