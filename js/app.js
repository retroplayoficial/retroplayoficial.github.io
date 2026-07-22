const conteudo = document.getElementById("conteudo");

const consoles = [
    {
        nome: "Super Nintendo",
        emoji: "🎮",
        pagina: "snes"
    },
    {
        nome: "Mega Drive",
        emoji: "🕹️",
        pagina: "megadrive"
    }
];

// Configuração inicial dos botões do Menu
document.addEventListener("DOMContentLoaded", () => {
    const btnHome = document.getElementById("btnHome");
    const btnConsoles = document.getElementById("btnConsoles");
    const btnColecoes = document.getElementById("btnColecoes");

    if (btnHome) btnHome.onclick = () => mostrarHome();
    if (btnConsoles) btnConsoles.onclick = () => mostrarHome(); // Exibe lista de consoles
    if (btnColecoes) btnColecoes.onclick = () => abrirPagina("pages/colecoes.html");
});

mostrarHome();

function mostrarHome(){

    conteudo.innerHTML = `

    <section class="home-premium">


        <div class="hero">


            <h2>
                🎮 RetroPlay Oficial
            </h2>


            <p>
                Reviva os maiores clássicos dos videogames através dos Chaveiros Cartuchos NFC RetroPlay.
            </p>


            <button onclick="abrirPagina('pages/colecoes.html')">

                Explorar Biblioteca

            </button>


        </div>



        <section class="consoles-home">


            <h2>
                Consoles Disponíveis
            </h2>


            <div class="cards-home">


                <div class="console-card" data-console="snes">

                    <img 
                    src="images/consoles/snes.jpg"
                    class="imagem-console">

                    <h3>
                        Super Nintendo
                    </h3>

                    <p>
                        Clássicos da era 16 bits.
                    </p>

                </div>



                <div class="console-card" data-console="megadrive">

                    <img 
                    src="images/consoles/megadrive.jpg"
                    class="imagem-console">

                    <h3>
                        Mega Drive
                    </h3>

                    <p>
                        Os grandes sucessos da SEGA.
                    </p>

                </div>



                <div class="console-card" data-console="gba">

                    <img 
                    src="images/consoles/gba.jpg"
                    class="imagem-console">

                    <h3>
                        Game Boy Advance
                    </h3>

                    <p>
                        A nostalgia portátil da Nintendo.
                    </p>

                </div>


            </div>


        </section>



        <section class="como-funciona">


            <h2>
                Como Funciona
            </h2>


            <div class="passos">


                <div class="passo">

                    <span>①</span>

                    <p>
                    Escolha seu ChaveiroCartucho NFC.
                    </p>

                </div>



                <div class="passo">

                    <span>②</span>

                    <p>
                    Encoste o celular no Chaveiro Cartucho.
                    </p>

                </div>



                <div class="passo">

                    <span>③</span>

                    <p>
                    Sua coleção abre automaticamente.
                    </p>

                </div>



                <div class="passo">

                    <span>④</span>

                    <p>
                    Escolha o jogo e aproveite.
                    </p>

                </div>


            </div>


        </section>


    </section>

    `;

    document.querySelectorAll(".console-card").forEach(card=>{

        card.onclick = ()=>{

            abrirConsole(card.dataset.console);

        };

    });

}

// Função genérica para carregar páginas HTML dinamicamente
async function abrirPagina(caminho) {
    const resposta = await fetch(caminho);
    conteudo.innerHTML = await resposta.text();

    // Se for a página de coleções, carrega a lista dinâmica de coleções
    if (caminho === "pages/colecoes.html") {
        carregarColecoes();
    }
}

async function carregarColecoes(){
    const resposta = await fetch("data/colecoes/index.json");
    const colecoes = await resposta.json();

    const lista = document.getElementById("listaColecoes");

    if (lista) {
        lista.innerHTML = "";

        for(const item of colecoes){
            const dados = await fetch(`data/colecoes/${item.arquivo}`);
            const colecao = await dados.json();

            lista.innerHTML += `
            <div class="card-colecao" onclick="abrirJogos('${colecao.id}')">
                <img src="${colecao.banner}">
                <h2>${colecao.nome}</h2>
                <p>${colecao.console}</p>
            </div>
            `;
        }
    }
}

async function abrirConsole(consoleSelecionado){
    const resposta = await fetch(`data/${consoleSelecionado}.json`);
    const dados = await resposta.json();

    conteudo.innerHTML = `
    <section class="container">
        <h1 class="titulo">
            ${dados.console}
        </h1>
        <p style="margin-bottom: 20px; color: #aaa;">
            Escolha uma coleção.
        </p>
        <div class="cards">
        ${dados.colecoes.map(c=>`
        <div class="card" data-console="${consoleSelecionado}" data-colecao="${c.id}">
            <div class="card-banner">
                <img src="${c.banner}" style="width:100%;height:100%;object-fit:cover;">
            </div>
            <div class="card-info">
                <h2>${c.nome}</h2>
                <button class="btn-jogar">
                    ▶ Jogar
                </button>
            </div>
        </div>
        `).join("")}
        </div>
    </section>
    `;

    // Atribuição do clique para abrir os jogos da coleção
    document.querySelectorAll(".card").forEach(card=>{
        card.onclick=()=>{
            abrirJogos(card.dataset.colecao);
        };
    });
}

// Função para abrir os jogos da coleção escolhida (layout tradicional)
async function abrirColecao(consoleNome, colecao){
    const resposta = await fetch(`data/colecoes/${colecao}.json`);
    const dados = await resposta.json();
    const pagina = await fetch("pages/colecao.html");

    conteudo.innerHTML = await pagina.text();

    document.getElementById("tituloColecao").innerText = dados.nome;
    document.getElementById("descricaoColecao").innerText = dados.descricao;

    const lista = document.getElementById("listaJogos");
    lista.innerHTML = dados.jogos.map(j=>`
    <div class="card">
        <div class="card-banner">
            <img src="${j.capa}" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="card-info">
            <h2>${j.nome}</h2>
            <button 
                class="btn-jogar"
                onclick="abrirJogo('${colecao}', '${j.id}')">
                ▶ Jogar
            </button>
        </div>
    </div>
    `).join("");
}

// Função para abrir os jogos da coleção usando a página dedicada (pages/jogos.html)
async function abrirJogos(colecao){
    const resposta = await fetch(`data/colecoes/${colecao}.json`);
    const dados = await resposta.json();
    const pagina = await fetch("pages/jogos.html");

    conteudo.innerHTML = await pagina.text();

    // Injeção do Banner e da Descrição da Coleção
    const bannerElem = document.getElementById("bannerColecao");
    if (bannerElem) {
        bannerElem.innerHTML = `
        <img src="${dados.banner}"
        style="width:100%;height:100%;object-fit:cover;border-radius:15px;">
        `;
    }

    const descElem = document.getElementById("descricaoColecao");
    if (descElem) {
        descElem.innerText = dados.descricao;
    }

    const tituloElem = document.getElementById("tituloJogo");
    if (tituloElem) {
        tituloElem.innerHTML = `
        ${dados.nome}
        <br>
        <small>${dados.console}</small>
        `;
    }

    const lista = document.getElementById("listaJogos");

    if (lista) {
        lista.innerHTML = dados.jogos.map(j=>`
        <div class="card">
            <div class="card-banner">
                <img src="${j.capa}"
                style="
                width:100%;
                height:100%;
                object-fit:cover;
                ">
            </div>

            <div class="card-info">
                <h2>
                ${j.nome}
                </h2>

                <button 
                class="btn-jogar"
                onclick="abrirJogo('${colecao}', '${j.id}')">
                ▶ Jogar
                </button>
            </div>
        </div>
        `).join("");
    }
}

// Função para abrir a página detalhada do jogo selecionado
async function abrirJogo(colecao, id){
    const resposta = await fetch(`data/colecoes/${colecao}.json`);
    const dados = await resposta.json();

    const jogo = dados.jogos.find(j => j.id === id);

    const pagina = await fetch("pages/jogo.html");

    conteudo.innerHTML = await pagina.text();

    // Preenche informações do jogo
    const nomeElem = document.getElementById("nomeJogo");
    if (nomeElem) nomeElem.innerText = jogo.nome;

    const consoleElem = document.getElementById("consoleJogo");
    if (consoleElem) consoleElem.innerText = dados.console;

    const descElem = document.getElementById("descricaoJogo");
    if (descElem) {
        descElem.innerText = dados.descricao || "Jogue este clássico diretamente pelo RetroPlay Oficial.";
    }

    const capaElem = document.getElementById("capaJogo");
    if (capaElem) capaElem.src = jogo.capa;

    const bannerElem = document.getElementById("bannerJogo");
    if (bannerElem && dados.banner) {
        bannerElem.src = dados.banner;
    }

    const btnVoltar = document.getElementById("btnVoltar");
    if (btnVoltar) {
        btnVoltar.onclick = () => abrirJogos(colecao);
    }

    const btnJogar = document.getElementById("btnJogar");
    if (btnJogar) {
        btnJogar.onclick = () => {
            jogar(
                dados.consoleId,
                colecao,
                jogo.rom
            );
        };
    }
}

// Função para redirecionar para a página do emulador passando a ROM
function jogar(console, colecao, rom){

    window.location.href =
    `emulator/index.html?rom=${console}/${colecao}/${rom}`;

}