const express = require("express");
const { graphql } = require("graphql");
const restRoutes = require("./rest");
const { schema, root } = require("./graphql");
const app = express();
//permite interpretar os requisitos com o json
app.use(express.json()); 
//Rota inicial para o funcionamento
app.get("/", (req,res)  => {
    res.json({ //envia a resposta em json
        mensagem: "Servidor REST e GraphQL funcionando!"
    });
});
//registra as rostas REST
app.use("/api", restRoutes);
// API GraphQL
app.post("/graphql", async (req, res) => {
    const { query, variables } = req.body || {};

    if (typeof query !== "string") {
        return res.status(400).json({
            erro: "Uma consulta GraphQL é obrigatória."
        });
    }

    const resultado = await graphql({
        schema: schema,
        source: query,
        rootValue: root,
        variableValues: variables
    });

    res.json(resultado);
});

//inicializa o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
})