window.onload = function () {

    gerarID();
    adicionarJogo();

};

// ======================
// GERAR ID AUTOMÁTICO
// ======================

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