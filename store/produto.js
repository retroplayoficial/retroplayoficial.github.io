const params = new URLSearchParams(window.location.search);

const idProduto = params.get("id");


if(!idProduto){

    alert("Produto não encontrado");

    throw new Error("ID do produto ausente");

}



fetch("data/produtos.json")

.then(res => res.json())

.then(produtos => {


    const produto = produtos.find(
        item => item.id === idProduto
    );


    if(!produto){

        alert("Produto não existe");

        throw new Error("Produto inválido");

    }



    // Preenche informações na página

    document.getElementById("produtoNome").innerHTML =
    produto.nome;


    document.getElementById("produtoConsole").innerHTML =
    produto.console;


    document.getElementById("produtoDescricao").innerHTML =
    produto.descricao;



    document.querySelector(".preco").innerHTML =
    produto.preco;



    document.getElementById("produtoBanner").src =
    produto.banner;



    // Botão WhatsApp

    const botao =
    document.getElementById("comprar");


    botao.onclick = function(){


        const mensagem = encodeURIComponent(

            `Olá RetroPlay! 👋
            
Tenho interesse no Cartucho NFC:

🎮 ${produto.nome}

Console:
${produto.console}

Valor:
${produto.preco}

Gostaria de realizar a compra.`

        );


        // Substitua pelo seu número real (ex: "5511999999999")
        const numero =
        "5511meunumeroaqui";


        window.open(
            `https://wa.me/${numero}?text=${mensagem}`,
            "_blank"
        );


    };


})

.catch(error => {


    console.error(error);


});