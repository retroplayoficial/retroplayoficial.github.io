// ========================================
// RetroPlay Database Engine v1.0
// ========================================

function criarRegistroDatabase(dados){

    return {

        id: dados.id,

        nome: dados.nome,

        console: dados.console,

        colecao: dados.colecao,

        arquivo: dados.colecao + ".json",

        jogos: dados.jogos.length,

        banner: dados.banner,

        imagem: dados.imagem

    };

}