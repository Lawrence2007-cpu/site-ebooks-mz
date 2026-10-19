exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método Não Permitido' };
  }

  try {
    const eventoPagamento = JSON.parse(event.body);

    if (eventoPagamento.status === 'SUCCESS' || eventoPagamento.status === 'PAID') {
      const emailCliente = eventoPagamento.customer.email;
      const referenciaVenda = eventoPagamento.reference_id;
      
      console.log(`Pagamento confirmado para: ${emailCliente} (Ref: ${referenciaVenda})`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };

  } catch (error) {
    return { statusCode: 400, body: "Webhook Error" };
  }
};