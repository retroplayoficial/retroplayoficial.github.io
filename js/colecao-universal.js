const params = new URLSearchParams(window.location.search);

const id = params.get("id");

buscarColecao(id);

async function buscarColecao(id){

    try{

        const resposta = await fetch("data/index.json");

        const indice = await resposta.json();

        const registro = indice.find(item => item.id === id);

        if(!registro){

            document.getElementById("titulo").innerHTML="Coleção não encontrada";

            return;

        }

        carregarColecao(registro.arquivo);

    }

    catch(erro){

        console.log(erro);

    }

}

async function carregarColecao(arquivo){

    const resposta = await fetch("data/"+arquivo);

    const dados = await resposta.json();

    document.getElementById("titulo").innerHTML=dados.nome;

    document.getElementById("descricao").innerHTML=dados.descricao;

    let html="";

    dados.jogos.forEach(jogo=>{

        html+=`

        <div class="card">

            <h2>${jogo.nome}</h2>

            <p>${dados.console.toUpperCase()}</p>

            <a class="botao"

            href="emulator/index.html?console=${dados.console}&colecao=${dados.colecao}&rom=${jogo.arquivo}">

            ▶ Jogar

            </a>

        </div>

        `;

    });

    document.getElementById("listaJogos").innerHTML=html;

}