function abrirCheckout(ebookId) {
  const ebook = ebooks.find(e => e.id === ebookId);
  if (!ebook) return;

  document.getElementById("ebook-id").value = ebook.id;
  document.getElementById("modal-ebook-titulo").innerText = ebook.titulo;
  document.getElementById("modal-ebook-preco").innerText = `${ebook.preco} MZN`;
  document.getElementById("modal-checkout").style.display = "flex";
}

const closeModalBtn = document.getElementById("close-modal");
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    document.getElementById("modal-checkout").style.display = "none";
  });
}

const formCheckout = document.getElementById("form-checkout");
if (formCheckout) {
  formCheckout.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("btn-submeter");
    btn.innerText = "A redirecionar para pagamento...";
    btn.disabled = true;

    const payload = {
      ebookId: document.getElementById("ebook-id").value,
      nome: document.getElementById("cliente-nome").value,
      email: document.getElementById("cliente-email").value
    };

    try {
      const res = await fetch("/api/criar-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Erro ao gerar sessão de pagamento.");
        btn.innerText = "Pagar e Baixar Agora";
        btn.disabled = false;
      }
    } catch (err) {
      console.error(err);
      alert("Falha na comunicação com o servidor.");
      btn.innerText = "Pagar e Baixar Agora";
      btn.disabled = false;
    }
  });
}