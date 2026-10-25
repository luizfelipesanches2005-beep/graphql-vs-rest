
const clientes = [
  { id: 1, nome: "João Silva", email: "joao@email.com" },
  { id: 2, nome: "Maria Souza", email: "maria@email.com" },
  { id: 3, nome: "Pedro Santos", email: "pedro@email.com" }
];

const produtos = [
  {
    id: 1,
    nome: "Notebook",
    preco: 3500,
    descricao: "Notebook para estudos",
    estoque: 25,
    categoria: "Eletrônicos"
  },
  {
    id: 2,
    nome: "Mouse",
    preco: 80,
    descricao: "Mouse sem fio",
    estoque: 100,
    categoria: "Acessórios"
  },
  {
    id: 3,
    nome: "Teclado",
    preco: 150,
    descricao: "Teclado mecânico",
    estoque: 50,
    categoria: "Acessórios"
  },
  {
    id: 4,
    nome: "Monitor",
    preco: 1200,
    descricao: "Monitor Full HD",
    estoque: 30,
    categoria: "Eletrônicos"
  }
];

const pedidos = [
  {
    id: 1,
    clienteId: 1,
    produtoId: 1,
    quantidade: 1,
    data: "2026-10-20",
    valorTotal: 3500
  },
  {
    id: 2,
    clienteId: 2,
    produtoId: 2,
    quantidade: 2,
    data: "2026-10-21",
    valorTotal: 160
  },
  {
    id: 3,
    clienteId: 3,
    produtoId: 4,
    quantidade: 1,
    data: "2026-10-22",
    valorTotal: 1200
  }
];

module.exports = { clientes, produtos, pedidos };
