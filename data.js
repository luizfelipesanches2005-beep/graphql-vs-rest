
const clientes = [];
const produtos = [];
const pedidos = [];

// Criando 50 clientes
for (let i = 1; i <= 500; i++) {
    clientes.push({
        id: i,
        nome: `Cliente ${i}`,
        email: `cliente${i}@email.com`
    });
}

// Criando 100 produtos
for (let i = 1; i <= 1000; i++) {
    produtos.push({
        id: i,
        nome: `Produto ${i}`,
        preco: i * 10,
        descricao: `Descrição do produto ${i}`,
        estoque: 50,
        categoria: "Eletrônicos"
    });
}

// Criando 200 pedidos
for (let i = 1; i <= 2000; i++) {

    const clienteId = ((i - 1) % 50) + 1;
    const produtoId = ((i - 1) % 100) + 1;

    const produto = produtos.find(
        p => p.id === produtoId
    );

    const quantidade = (i % 3) + 1;

    pedidos.push({
        id: i,
        clienteId: clienteId,
        produtoId: produtoId,
        quantidade: quantidade,
        data: "2026-10-20",
        valorTotal: produto.preco * quantidade
    });
}

module.exports = { clientes, produtos, pedidos };
