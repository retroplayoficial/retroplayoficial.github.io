const params = new URLSearchParams(window.location.search);

const consoleSelecionado = params.get("console");

carregarConsole();

async function carregarConsole() {

    document.getElementById("tituloConsole").innerHTML =
        consoleSelecionado.toUpperCase();

    const resposta = await fetch(`data/${consoleSelecionado}/index.json`);

    const lista = await resposta.json();

    let html = "";

    for(const arquivo of lista){

        const respostaJson =
            await fetch(`data/${consoleSelecionado}/${arquivo}`);

        const franquia = await respostaJson.json();

        html += `

        <div class="card">

            <div class="imagem">

                <img src="${franquia.imagem}" alt="${franquia.nome}">

            </div>

            <h2>${franquia.nome}</h2>

            <p>${franquia.jogos.length} Jogos</p>

            <a class="botao"

            href="colecao.html?id=${franquia.id}">

            Abrir

            </a>

        </div>

        `;

    }

    document.getElementById("listaFranquias").innerHTML = html;

}