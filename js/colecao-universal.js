const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const arquivo = params.get("arquivo");

// INICIALIZAÇÃO INTELIGENTE:
if (arquivo) {
    // Se passamos o caminho do arquivo direto na URL, carrega ele imediatamente
    carregarColecao(arquivo);
} else if (id) {
    // Se passamos o ID, busca no banco de dados primeiro
    buscarColecao(id);
} else {
    document.getElementById("titulo").innerHTML = "Erro";
    document.getElementById("listaJogos").innerHTML = "<h2>Nenhuma coleção foi especificada na URL.</h2>";
}

async function buscarColecao(idColecao) {
    try {
        console.log("[Coleção] Buscando ID no index:", idColecao);
        const resposta = await fetch("data/index.json");
        const indice = await resposta.json();
        const registro = indice.find(item => item.id === idColecao);

        if (!registro) {
            document.getElementById("titulo").innerHTML = "Coleção não encontrada";
            document.getElementById("listaJogos").innerHTML = "<h2>Esta coleção não está cadastrada no índice.</h2>";
            return;
        }

        carregarColecao(registro.arquivo);
    }
    catch (erro) {
        console.error("Erro ao buscar a coleção no índice:", erro);
        document.getElementById("listaJogos").innerHTML = "<h2>Erro ao carregar índice de coleções.</h2>";
    }
}

async function carregarColecao(caminhoArquivo) {
    try {
        if (!caminhoArquivo || caminhoArquivo === "undefined") {
            console.error("[Coleção] Tentativa de carregar um arquivo inválido ou undefined.");
            return;
        }

        console.log("[Coleção] Carregando arquivo JSON:", caminhoArquivo);
        const resposta = await fetch(caminhoArquivo);
        const dados = await resposta.json();

        // Extrai o nome da coleção a partir do nome do arquivo JSON (Ex: "data/snes/mario-colection.json" vira "mario-colection")
        const nomeColecao = caminhoArquivo.split("/").pop().replace(".json", "");

        document.getElementById("titulo").innerHTML = dados.nome;
        document.getElementById("descricao").innerHTML = dados.descricao || "";

        let html = "";

        dados.jogos.forEach(jogo => {
            // Garante que o arquivo do jogo não esteja nulo ou undefined
            if (jogo.arquivo) {
                html += `
                <div class="card">
                    <h2>${jogo.nome}</h2>
                    <p>${dados.console.toUpperCase()}</p>
                    <a class="botao" 
                    href="emulator/index.html?console=${dados.console}&colecao=${nomeColecao}&rom=${jogo.arquivo}">
                    ▶ Jogar
                    </a>
                </div>
                `;
            }
        });

        document.getElementById("listaJogos").innerHTML = html || "<h2>Nenhum jogo encontrado nesta coleção.</h2>";
    }
    catch (erro) {
        console.error("Erro ao ler os dados do arquivo de coleção:", erro);
        document.getElementById("listaJogos").innerHTML = "<h2>Erro ao carregar os jogos desta coleção.</h2>";
    }
}