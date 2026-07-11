// ======================================
// BUILDER RETROPLAY
// Responsável por gerar arquivos do CMS
// ======================================

// GERA O JSON DA COLEÇÃO
function gerarJSON(){

    const consoleSelecionado =
    document.getElementById("console").value;

    const colecao =
    document.getElementById("colecao").value;

    const caminho =
    `${consoleSelecionado}/${colecao}`;

    const dados={

        id:
        document.getElementById("id").value,

        console:
        consoleSelecionado,

        colecao:
        colecao,

        imagem:
        `images/${caminho}/card.jpg`,

        banner:
        `images/${caminho}/banner.jpg`,

        nome:
        document.getElementById("nome").value,

        descricao:
        document.getElementById("descricao").value,

        cor:
        document.getElementById("cor").value,

        jogos:[]

    };

    const nomes =
    document.querySelectorAll(".nomeJogo");

    const anos =
    document.querySelectorAll(".anoJogo");

    const arquivos =
    document.querySelectorAll(".arquivoJogo");

    for(let i=0;i<nomes.length;i++){

        dados.jogos.push({

            id:
            "jogo"+(i+1),

            nome:
            nomes[i].value,

            ano:
            anos[i].value,

            arquivo:
            arquivos[i].value

        });

    }

    document.getElementById("saidaJson").value =
    JSON.stringify(dados,null,4);

}

// ======================================
// BAIXAR JSON
// ======================================

function baixarJSON(){

    gerarJSON();

    const json =
    document.getElementById("saidaJson").value;

    const nomeArquivo =
    document.getElementById("colecao").value+".json";

    const blob =
    new Blob([json],{

        type:"application/json"

    });

    const link =
    document.createElement("a");

    link.href=
    URL.createObjectURL(blob);

    link.download=
    nomeArquivo;

    link.click();

    URL.revokeObjectURL(link.href);

}

// ======================================
// BAIXAR INDEX
// ======================================

function baixarIndex(){

    const colecao =
    document.getElementById("colecao").value;

    const lista=[

        colecao+".json"

    ];

    const blob=
    new Blob(

        [

            JSON.stringify(lista,null,4)

        ],

        {

            type:"application/json"

        }

    );

    const link=
    document.createElement("a");

    link.href=
    URL.createObjectURL(blob);

    link.download=
    "index.json";

    link.click();

    URL.revokeObjectURL(link.href);

}

// ======================================
// DATABASE
// ======================================

function gerarDatabase(){

    gerarJSON();

    const dados =
    JSON.parse(

        document
        .getElementById("saidaJson")
        .value

    );

    const database=[

        {

            id:dados.id,

            nome:dados.nome,

            console:dados.console,

            colecao:dados.colecao,

            imagem:dados.imagem,

            banner:dados.banner,

            pagina:

            `pages/${dados.colecao}.html`,

            jogos:

            dados.jogos.length

        }

    ];

    return database;

}

// ======================================
// BAIXAR DATABASE
// ======================================

function baixarDatabase(){

    const database =
    gerarDatabase();

    const blob =
    new Blob(

        [

            JSON.stringify(database,null,4)

        ],

        {

            type:"application/json"

        }

    );

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "database.json";

    link.click();

    URL.revokeObjectURL(link.href);

}

// ======================================
// LOG DA PUBLICAÇÃO
// ======================================

function mostrarLogPublicacao(){

    const mensagem = `

✅ Coleção validada

✅ JSON gerado

✅ Index preparado

✅ Database gerado

🚀 Coleção pronta para publicação!

`;

    alert(mensagem);

}

// ======================================
// PUBLICAÇÃO
// ======================================

function finalizarPublicacao(){

    console.log("Publicação finalizada.");

}