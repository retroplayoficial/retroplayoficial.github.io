const params = new URLSearchParams(window.location.search);
const consoleSelecionado = params.get("console");

carregarConsole();

async function carregarConsole() {
    try {
        if (!consoleSelecionado) {
            document.getElementById("tituloConsole").innerHTML = "Console não especificado";
            return;
        }

        document.getElementById("tituloConsole").innerHTML = consoleSelecionado.toUpperCase();

        // Carrega o index de coleções daquele console específico
        const resposta = await fetch(`data/${consoleSelecionado}/index.json`);
        if (!resposta.ok) throw new Error(`Não foi possível carregar o index do console: ${consoleSelecionado}`);
        
        const lista = await resposta.json();
        let html = "";

        for (const arquivo of lista) {
            try {
                // CORREÇÃO 1: Garante que o caminho não duplique pastas desnecessárias
                let caminhoArquivo = arquivo;
                if (caminhoArquivo.startsWith("data/")) {
                    // Se o arquivo já tiver o caminho completo, usamos ele direto
                    caminhoArquivo = caminhoArquivo;
                } else {
                    // Se for apenas o nome do arquivo, monta o caminho padrão
                    caminhoArquivo = `data/${consoleSelecionado}/${arquivo}`;
                }

                const respostaJson = await fetch(caminhoArquivo);
                if (!respostaJson.ok) continue; // Pula se o JSON dessa coleção específica falhar

                const franquia = await respostaJson.json();

                // CORREÇÃO 2: Ajusta o caminho da imagem para ler de dentro da pasta correta
                let caminhoImagem = franquia.imagem || "";
                if (caminhoImagem && !caminhoImagem.startsWith("http") && !caminhoImagem.startsWith("data/")) {
                    caminhoImagem = `data/${consoleSelecionado}/${caminhoImagem}`;
                }

                // CORREÇÃO 3: Proteção para evitar erros se a lista de jogos estiver vazia
                const totalJogos = (franquia.jogos && Array.isArray(franquia.jogos)) ? franquia.jogos.length : 0;

                html += `
                <div class="card">
                    <div class="imagem">
                        <!-- Se não houver imagem, exibe uma imagem padrão de cartucho -->
                        <img src="${caminhoImagem || 'images/default-cartridge.png'}" alt="${franquia.nome || 'Coleção'}" onerror="this.src='images/default-cartridge.png'">
                    </div>
                    <h2>${franquia.nome || "Coleção Sem Nome"}</h2>
                    <p>${totalJogos} Jogos</p>
                    <a class="botao" href="colecao.html?id=${franquia.id || franquia.nome}">
                        Abrir
                    </a>
                </div>
                `;
            } catch (erroInterno) {
                console.error("Erro ao processar item da lista:", arquivo, erroInterno);
            }
        }

        document.getElementById("listaFranquias").innerHTML = html || "<h2>Nenhuma coleção encontrada para este console.</h2>";

    } catch (erro) {
        console.error("Erro ao carregar o console:", erro);
        document.getElementById("listaFranquias").innerHTML = "<h2>Erro ao carregar as coleções do console.</h2>";
    }
}