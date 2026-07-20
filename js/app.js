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

mostrarHome();

function mostrarHome(){
    conteudo.innerHTML = `
    <div class="hero">
        <h2>RetroPlay Oficial</h2>
        <p>Sua coleção retrô em um único lugar.</p>
        <button>Explorar Biblioteca</button>
    </div>
    <section>
        <h3 class="titulo">Escolha um Console</h3>
        <div class="cards">
            ${consoles.map(c=>`
            <div class="card" data-console="${c.pagina}">
                <div>
                    <div style="font-size:64px">${c.emoji}</div>
                    <h2>${c.nome}</h2>
                </div>
            </div>
            `).join("")}
        </div>
    </section>
    `;

    document.querySelectorAll(".card").forEach(card=>{
        card.onclick=()=>abrirConsole(card.dataset.console);
    });
}

async function abrirConsole(consoleSelecionado){
    const resposta = await fetch(`data/${consoleSelecionado}.json`);
    const dados = await resposta.json();

    conteudo.innerHTML = `
    <section>
        <h1 class="titulo">
            ${dados.console}
        </h1>
        <p>
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
                onclick="jogar('${j.rom}')">
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

    document.getElementById("tituloJogo").innerHTML = `
    ${dados.nome}
    <br>
    <small>${dados.console}</small>
    `;

    const lista = document.getElementById("listaJogos");

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
            onclick="jogar('${j.rom}')">
            ▶ Jogar
            </button>
        </div>
    </div>
    `).join("");
}

// Função para redirecionar para a página do emulador passando a ROM
function jogar(rom){
    window.location.href = `emulator/index.html?rom=snes/mario/${rom}`;
}