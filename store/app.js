fetch("data/produtos.json")

.then(res => res.json())

.then(produtos => {


const grid = document.querySelector(".grid");


grid.innerHTML = "";


produtos.forEach(produto => {


grid.innerHTML += `


<div class="card">


${produto.destaque ? 
'<div class="selo">⭐ MAIS VENDIDO</div>' 
: ''}


<img src="${produto.banner}">


<div class="card-info">


<h3>${produto.nome}</h3>


<p>${produto.console}</p>


<div class="precos">


${produto.preco_antigo ?
`
<span class="antigo">
${produto.preco_antigo}
</span>
`
:
''}


<span class="preco">
${produto.preco || "R$ 39,90"}
</span>


</div>



<div class="status ${produto.status}">

${produto.status === "disponivel" 
? "🟢 Disponível" 
: "🔴 Esgotado"}

</div>



<a 
href="produto.html?id=${produto.id}" 
class="btn-produto">

Ver Produto

</a>


</div>


</div>


`;


});


});