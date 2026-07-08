const parametros = new URLSearchParams(window.location.search);

const consoleSelecionado = parametros.get("console");
const colecaoSelecionada = parametros.get("colecao");

const caminho =
`../data/${consoleSelecionado}/${colecaoSelecionada}.json`;

fetch(caminho)
.then(resposta => resposta.json())
.then(dados => {

document.getElementById("titulo").innerHTML = "RetroPlay";

document.getElementById("subtitulo").innerHTML =
dados.descricao;

document.getElementById("colecao").innerHTML =
dados.nome;

let lista = "";

dados.jogos.forEach(jogo => {

lista += `

<div class="jogo">

<div class="nomeJogo">

🎮 ${jogo.nome}

</div>

<a class="botaoJogar"
href="../emulator/?console=${consoleSelecionado}&rom=${jogo.arquivo}">

▶ Jogar

</a>

</div>

`;

});

document.getElementById("listaJogos").innerHTML = lista;

})
.catch(() =>{

document.getElementById("listaJogos").innerHTML =
"Erro ao carregar coleção.";

});
document.getElementById("descricao").innerHTML =
dados.descricao;

document.getElementById("console").innerHTML =
"🎮 " + dados.console.toUpperCase();

document.getElementById("quantidade").innerHTML =
dados.jogos.length + " Jogos";