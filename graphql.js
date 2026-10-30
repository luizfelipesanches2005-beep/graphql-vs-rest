
const { buildSchema } = require("graphql");

const { clientes, produtos, pedidos } = require("./data");

// Define os tipos de dados e consultas disponíveis
const schema = buildSchema(`
    type Cliente {
        id: Int
        nome: String
        email: String
    }

    type Produto {
        id: Int
        nome: String
        preco: Float
        descricao: String
        estoque: Int
        categoria: String
    }

    type Pedido {
        id: Int
        clienteId: Int
        produtoId: Int
        quantidade: Int
        data: String
        valorTotal: Float
        cliente: Cliente
        produto: Produto
    }

    type RelatorioFinanceiro {
        quantidadePedidos: Int
        faturamentoTotal: Float
        pedidos: [Pedido]
    }

    type Query {
        produtos: [Produto]
        pedidos: [Pedido]
        relatorioFinanceiro: RelatorioFinanceiro
    }
`);

// Relaciona os pedidos aos clientes e produtos
function buscarPedidosComDetalhes() {
    return pedidos.map(pedido => ({
        ...pedido,
        cliente: clientes.find(
            c => c.id === pedido.clienteId
        ),
        produto: produtos.find(
            p => p.id === pedido.produtoId
        )
    }));
}

// Funções responsáveis por fornecer os dados
const root = {
    produtos: () => produtos,

    pedidos: () => buscarPedidosComDetalhes(),

    relatorioFinanceiro: () => {
        const faturamentoTotal = pedidos.reduce(
            (total, pedido) => total + pedido.valorTotal,
            0
        );

        return {
            quantidadePedidos: pedidos.length,
            faturamentoTotal: faturamentoTotal,
            pedidos: buscarPedidosComDetalhes()
        };
    }
};

module.exports = { schema, root };
