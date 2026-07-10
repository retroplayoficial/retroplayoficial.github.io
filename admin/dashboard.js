// ===============================
// RETROPLAY DASHBOARD 1.0
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    carregarMenu();

    carregarDashboard();

});

function carregarMenu(){

    document.getElementById("menu").innerHTML = `

    <aside class="sidebar">

        <h2>🎮 RetroPlay</h2>

        <a href="dashboard.html">🏠 Dashboard</a>

        <a href="biblioteca.html">📚 Biblioteca</a>

        <a href="index.html">➕ Nova Franquia</a>

        <a href="editar.html">✏ Editor</a>

    </aside>

    `;

}

async function carregarDashboard(){

    const consoles = [

        "snes",
        "megadrive",
        "n64",
        "gba"

    ];

    let totalFranquias = 0;
    let totalJogos = 0;

    let ultimaFranquia = "-";
    let ultimoID = "-";

    for(const consoleNome of consoles){

        try{

            const resposta =
            await fetch(`../data/${consoleNome}/index.json`);

            const lista =
            await resposta.json();

            totalFranquias += lista.length;

            for(const arquivo of lista){

                const json =
                await fetch(`../data/${consoleNome}/${arquivo}`);

                const dados =
                await json.json();

                totalJogos += dados.jogos.length;

                ultimaFranquia = dados.nome;
                ultimoID = dados.id;

            }

        }

        catch(e){

            console.log(e);

        }

    }

    document.getElementById("totalFranquias").innerHTML = totalFranquias;

    document.getElementById("totalJogos").innerHTML = totalJogos;

    document.getElementById("ultimaFranquia").innerHTML = ultimaFranquia;

    document.getElementById("proximoID").innerHTML = ultimoID;

}