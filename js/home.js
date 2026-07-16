async function carregarHome() {

    const resposta = await fetch("data/consoles.json");

    const dados = await resposta.json();

    const consoles = dados.consoles || [];

    let html = "";

    consoles.forEach(consoleItem => {

        html += `
            <div class="card">

                <div class="imagem">
                    <img src="images/consoles/${consoleItem.id}.png"
     alt="${consoleItem.nome}"
     onerror="this.src='images/consoles/default.png'">
                </div>

                <h2>${consoleItem.nome}</h2>

                <a class="botao"
                   href="console.html?console=${consoleItem.id}">
                    Abrir
                </a>

            </div>
        `;

    });

    document.getElementById("colecoes").innerHTML = html;

}

carregarHome();