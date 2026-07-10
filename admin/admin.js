window.onload = function () {

    gerarID();
    adicionarJogo();

};

// ======================
// GERAR ID AUTOMÁTICO
// ======================

async function carregarDashboard(){

const consoles=[

"snes",

"megadrive",

"gba",

"n64"

];

let franquias=0;

let jogos=0;

for(const consoleNome of consoles){

try{

const resposta=

await fetch(`../data/${consoleNome}/index.json`);

const lista=

await resposta.json();

franquias+=lista.length;

for(const arquivo of lista){

try{

const json=

await fetch(`../data/${consoleNome}/${arquivo}`);

const dados=

await json.json();

jogos+=dados.jogos.length;

}

catch{}

}

}

catch{}

}

document.getElementById("totalFranquias").innerHTML=

franquias;

document.getElementById("totalJogos").innerHTML=

jogos;

}async function carregarDashboard(){

const consoles=[

"snes",

"megadrive",

"gba",

"n64"

];

let franquias=0;

let jogos=0;

for(const consoleNome of consoles){

try{

const resposta=

await fetch(`../data/${consoleNome}/index.json`);

const lista=

await resposta.json();

franquias+=lista.length;

for(const arquivo of lista){

try{

const json=

await fetch(`../data/${consoleNome}/${arquivo}`);

const dados=

await json.json();

jogos+=dados.jogos.length;

}

catch{}

}

}

catch{}

}

document.getElementById("totalFranquias").innerHTML=

franquias;

document.getElementById("totalJogos").innerHTML=

jogos;

}

async function gerarID() {

    const consoleSelecionado = document.getElementById("console").value;

    let prefixo = "";

    switch (consoleSelecionado) {

        case "snes":
            prefixo = "RPSNES";
            break;

        case "megadrive":
            prefixo = "RPMD";
            break;

        case "n64":
            prefixo = "RPN64";
            break;

        case "gba":
            prefixo = "RPGBA";
            break;

    }

    try {

        const resposta = await fetch(`../data/${consoleSelecionado}/index.json`);

        const lista = await resposta.json();

        const numero = String(lista.length + 1).padStart(4, "0");

        document.getElementById("id").value = prefixo + numero;

    } catch {

        document.getElementById("id").value = prefixo + "0001";

    }

}

// ======================
// GERAR NOME DA PASTA
// ======================

function atualizarColecao() {

    const nome = document.getElementById("nome").value;

    let slug = nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/collection/g, "")
        .replace(/colecao/g, "")
        .replace(/coleção/g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-");

    document.getElementById("colecao").value = slug;

}

// ======================
// ADICIONAR JOGOS
// ======================

let contador = 0;

function adicionarJogo() {

    contador++;

    const html = `

<div class="jogo">

<h3>Jogo ${contador}</h3>

<input
type="text"
placeholder="Nome do jogo"
class="nomeJogo">

<input
type="text"
placeholder="Ano"
class="anoJogo">

<input
type="text"
placeholder="Arquivo da ROM"
class="arquivoJogo">

</div>

`;

    document
        .getElementById("listaJogos")
        .insertAdjacentHTML("beforeend", html);

}

// ======================
// GERAR JSON
// ======================

function gerarJSON() {

    const consoleSelecionado = document.getElementById("console").value;

    const colecao = document.getElementById("colecao").value;

    const caminhoBase = `${consoleSelecionado}/${colecao}`;

    const dados = {

        id: document.getElementById("id").value,

        console: consoleSelecionado,

        colecao: colecao,

        imagem: `images/${caminhoBase}/card.jpg`,

        banner: `images/${caminhoBase}/banner.jpg`,

        nome: document.getElementById("nome").value,

        descricao: document.getElementById("descricao").value,

        cor: document.getElementById("cor").value,

        jogos: []

    };

    const nomes = document.querySelectorAll(".nomeJogo");

    const anos = document.querySelectorAll(".anoJogo");

    const arquivos = document.querySelectorAll(".arquivoJogo");

    for (let i = 0; i < nomes.length; i++) {

        dados.jogos.push({

            id: "jogo" + (i + 1),

            nome: nomes[i].value,

            ano: anos[i].value,

            arquivo: arquivos[i].value

        });

    }

    document.getElementById("saidaJson").value =
        JSON.stringify(dados, null, 4);

}

// ======================
// BAIXAR JSON
// ======================

function baixarJSON() {

    gerarJSON();

    const json = document.getElementById("saidaJson").value;

    const nomeArquivo =
        document.getElementById("colecao").value + ".json";

    const blob = new Blob([json], {
        type: "application/json"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = nomeArquivo;

    link.click();

    URL.revokeObjectURL(link.href);

}

// ======================
// NAVEGAÇÃO ENTRE ABAS
// ======================

function mostrarAba(nome) {

    const abas = [
        "franquia",
        "jogos",
        "imagens",
        "exportar"
    ];

    abas.forEach(id => {

        document.getElementById(id).style.display = "none";

    });

    document.getElementById(nome).style.display = "block";

}

// ======================
// PRÉ-VISUALIZAÇÃO DAS IMAGENS
// ======================

function previewImagem(input, id) {

    if (!input.files.length) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const img = document.getElementById(id);

        img.src = e.target.result;

        img.style.display = "block";

    };

    reader.readAsDataURL(input.files[0]);

}

function baixarIndex(){

    const colecao =
    document.getElementById("colecao").value;

    const lista=[

        `${colecao}.json`

    ];

    const blob=new Blob(

        [JSON.stringify(lista,null,4)],

        {type:"application/json"}

    );

    const link=document.createElement("a");

    link.href=URL.createObjectURL(blob);

    link.download="index.json";

    link.click();

    URL.revokeObjectURL(link.href);

}

async function carregarBiblioteca() {

    const consoles = [
        "snes",
        "megadrive",
        "n64",
        "gba"
    ];

    let html = '<div class="biblioteca-grid">';

    for (const consoleNome of consoles) {

        try {

            const resposta =
                await fetch(`../data/${consoleNome}/index.json`);

            const lista =
                await resposta.json();

            for (const arquivo of lista) {

                const json =
                    await fetch(`../data/${consoleNome}/${arquivo}`);

                const dados =
                    await json.json();

                html += `

<div class="card-franquia">

<img src="../${dados.imagem}" alt="${dados.nome}">

<div class="card-body">

<h3>${dados.nome}</h3>

<p><strong>Console:</strong> ${dados.console.toUpperCase()}</p>

<p><strong>Jogos:</strong> ${dados.jogos.length}</p>

<p><strong>ID:</strong> ${dados.id}</p>

<div class="botoes">

<a href="../pages/${dados.colecao}.html">

▶ Abrir

</a>

<a href="editar.html?id=${dados.id}">

✏ Editar

</a>

</div>

</div>

</div>

`;

            }

        } catch (erro) {

            console.log(erro);

        }

    }

    html += "</div>";

    document.getElementById("listaFranquias").innerHTML = html;

}

function criarMenu() {

    return `

<aside class="sidebar">

    <h2>🎮 RetroPlay</h2>

    <nav>

        <a href="dashboard.html">🏠 Dashboard</a>

        <a href="biblioteca.html">📚 Biblioteca</a>

        <a href="index.html">➕ Nova Franquia</a>

        <a href="editar.html">✏ Editar</a>

    </nav>

</aside>

`;

}

async function carregarEditor() {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (!id) {

        document.getElementById("conteudo").innerHTML =
        "<h2>Nenhuma franquia selecionada.</h2>";

        return;

    }

    const consoles = [

        "snes",
        "megadrive",
        "n64",
        "gba"

    ];

    for (const consoleNome of consoles) {

        try {

            const resposta =
            await fetch(`../data/${consoleNome}/index.json`);

            const lista =
            await resposta.json();

            for (const arquivo of lista) {

                const json =
                await fetch(`../data/${consoleNome}/${arquivo}`);

                const dados =
                await json.json();

                if (dados.id == id) {

                    mostrarEditor(dados);

                    return;

                }

            }

        }

        catch {}

    }

}

function mostrarEditor(dados){

let html = `

<h2>${dados.nome}</h2>

<p>

<strong>ID:</strong>

${dados.id}

</p>

<p>

<strong>Console:</strong>

${dados.console.toUpperCase()}

</p>

<p>

<strong>Descrição:</strong>

</p>

<textarea
id="novaDescricao"
style="width:100%;height:120px;">

${dados.descricao}

</textarea>

<h3>Jogos</h3>

`;

dados.jogos.forEach(jogo=>{

html += `

<div class="card">

<b>${jogo.nome}</b>

<br>

ROM:

${jogo.arquivo}

</div>

`;

});

html += `

<br>

<button>

💾 Salvar

</button>

`;

document.getElementById("conteudo").innerHTML = html;

}