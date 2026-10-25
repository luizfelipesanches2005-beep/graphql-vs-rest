const express = require("express");
const router = express.Router(); 
//rota
const { clientes, produtos, pedidos } = require("./data");
//cenario 1 Listagem de produtos 
router.get("/produtos", (req,res) => {
    res.json(produtos);
});
//cenario 2
router.get("/pedidos", (req, res) => {
    const detalhes  = pedidos.map(pedido => {
        return{
            ...pedido,
            cliente: clientes.find(c => c.id === pedido.clienteId),
            produto: produtos.find(p => p.id === pedido.produtoId)
        };
    }); 
   res.json(detalhes);
});
//cenario 3
router.get("/relatorio-financeiro", (req, res) => {
  const relatorio = pedidos.map(pedido => ({
    ...pedido,
    cliente: clientes.find(c => c.id === pedido.clienteId),
    produto: produtos.find(p => p.id === pedido.produtoId)
  }));

  res.json(relatorio);
});

module.exports = router;