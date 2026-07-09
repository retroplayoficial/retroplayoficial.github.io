async function carregarHome() {

    const resposta = await fetch("data/consoles.json");
    const consoles = await resposta.json();

    let html = "";

    consoles.forEach(consoleItem => {

        html += `
            <div class="card">

                <div class="imagem">
                    <img src="${consoleItem.imagem}" alt="${consoleItem.nome}">
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