fetch("data/produtos.json")

.then(res => res.json())

.then(produtos => {


const grid = document.querySelector(".grid");


grid.innerHTML = "";


produtos.forEach(produto => {


grid.innerHTML += `


<div class="card">


<img src="${produto.banner}">


<h3>${produto.nome}</h3>


<p>${produto.console}</p>


<a 
href="produto.html?id=${produto.id}" 
class="btn-produto">

Ver Produto

</a>


</div>


`;


});


});