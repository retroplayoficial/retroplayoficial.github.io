function carregarColecao(caminhoJson) {

    fetch(caminhoJson)
    .then(response => response.json())
    .then(dados => {

        document.getElementById("titulo").innerHTML = dados.nome;
        document.getElementById("descricao").innerHTML = dados.descricao;

        let html = "";

        dados.jogos.forEach(jogo => {

            html += `

            <div class="card">

                <h2>${jogo.nome}</h2>

                <p>${dados.console.toUpperCase()}</p>

                <a class="botao" href="../emulator/index.html?console=${dados.console}&colecao=${dados.colecao}&rom=${jogo.arquivo}">
                    ▶ Jogar
                </a>

            </div>

            `;

        });

        document.getElementById("listaJogos").innerHTML = html;

    })

    .catch(error => {

        document.getElementById("listaJogos").innerHTML =
        "<h2>Erro ao carregar a coleção.</h2>";

        console.log(error);

    });

}