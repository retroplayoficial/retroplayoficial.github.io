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



    // Preenche informações

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

        // Passo 2 — Melhorar a mensagem (Implementado)
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


        // Passo 1 - Troque "55SEUNUMERO" pelo seu número real seguindo as regras
        // Exemplo: "5511999999999" (sem +, sem espaço, sem parênteses)
        const numero =
        "55SEUNUMERO";


        window.open(
        `https://wa.me/${numero}?text=${mensagem}`,
        "_blank"
        );


    };


})

.catch(error => {


    console.error(error);


});