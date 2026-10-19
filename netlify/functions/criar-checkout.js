exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido' };
  }

  try {
    const { ebookId, nome, email } = JSON.parse(event.body);

    const precos = {
      guia_pele: 350,
      leis_poder: 500
    };

    const valor = precos[ebookId];

    if (!valor) {
      return { statusCode: 400, body: JSON.stringify({ error: "E-book inválido" }) };
    }

    const response = await fetch("https://api.gateway-escolhido.co.mz/v1/checkout/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GATEWAY_SECRET_KEY}`
      },
      body: JSON.stringify({
        amount: valor,
        currency: "MZN",
        description: `Compra do e-book (${ebookId})`,
        customer: { name: nome, email: email },
        reference_id: `${ebookId}_${Date.now()}`,
        redirect_url: `https://oteusite.com/sucesso.html?item=${ebookId}&status=success`,
        cancel_url: "https://oteusite.com/"
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ checkoutUrl: data.checkout_url || data.payment_url })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno no checkout" })
    };
  }
};