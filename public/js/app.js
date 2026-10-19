const ebooks = [
  {
    id: "ebook_001",
    titulo: "Guia Prático de Redes e Sistemas",
    descricao: "Aprenda os fundamentos de infraestrutura, IP e conectividade para estudantes de engenharia e IT.",
    preco: 1500,
    imagem: "assets/covers/redes.jpg"
  },
  {
    id: "ebook_002",
    titulo: "Manual do Desenvolvedor Web 2026",
    descricao: "Do zero ao deploy no Netlify e Vercel com boas práticas de HTML, CSS e JavaScript moderno.",
    preco: 2000,
    imagem: "assets/covers/web.jpg"
  }
];

function carregarEbooks() {
  const container = document.getElementById("grid-ebooks");
  if (!container) return;
  container.innerHTML = "";

  ebooks.forEach(item => {
    const card = document.createElement("div");
    card.className = "card-ebook";
    card.innerHTML = `
      <img src="${item.imagem}" alt="${item.titulo}" onerror="this.src='https://via.placeholder.com/300x260?text=E-book'">
      <div class="card-body">
        <h3 class="card-title">${item.titulo}</h3>
        <p class="card-desc">${item.descricao}</p>
        <div class="card-footer">
          <div class="price">${item.preco} MZN</div>
          <button class="btn-comprar" onclick="abrirCheckout('${item.id}')">Comprar</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", carregarEbooks);