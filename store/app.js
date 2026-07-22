const botoes = document.querySelectorAll(".card button");

const mensagens = [

"Olá! Tenho interesse no Cartucho NFC Mario Collection.",

"Olá! Tenho interesse no Cartucho NFC The Legend of Zelda.",

"Olá! Tenho interesse no Cartucho NFC Donkey Kong Collection.",

"Olá! Tenho interesse no Cartucho NFC Sonic Collection.",

"Olá! Tenho interesse no Cartucho NFC Street of Rage Collection.",

"Olá! Tenho interesse no Cartucho NFC Pokémon Collection."

];

// COLOQUE AQUI O SEU NÚMERO

const numero = "5511989513560";

botoes.forEach((botao,index)=>{

botao.addEventListener("click",()=>{

const texto = encodeURIComponent(mensagens[index]);

window.open(`https://wa.me/${numero}?text=${texto}`,"_blank");

});

});