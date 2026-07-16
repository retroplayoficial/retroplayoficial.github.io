function carregarColecao(caminhoJson) {

    fetch(caminhoJson)
    .then(response => response.json())
    .then(dados => {

        // Descobre o nome da coleção a partir do nome do arquivo JSON (Ex: "data/snes/mario-colection.json" vira "mario-colection")
        const nomeColecao = caminhoJson.split("/").pop().replace(".json", "");

        document.getElementById("titulo").innerHTML = dados.nome;
        
        // Garante que não dê erro se a descrição vier vazia no JSON
        document.getElementById("descricao").innerHTML = dados.descricao || "";

        let html = "";

        dados.jogos.forEach(jogo => {
            // CORREÇÃO: Substituímos "dados.colecao" por "nomeColecao", que agora possui o valor correto!
            html += `
            <div class="card">
                <h2>${jogo.nome}</h2>
                <p>${dados.console.toUpperCase()}</p>
                <a class="botao" href="../emulator/index.html?console=${dados.console}&colecao=${nomeColecao}&rom=${jogo.arquivo}">
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