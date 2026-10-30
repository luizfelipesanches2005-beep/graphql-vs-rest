
const URL = "http://localhost:3000";

const cenarios = [
    {
        nome: "Listagem de produtos",
        rotaREST: "/api/produtos",
        queryGraphQL: "{ produtos { nome preco } }"
    },
    {
        nome: "Relatorio financeiro",
        rotaREST: "/api/relatorio-financeiro",
        queryGraphQL: `{
            relatorioFinanceiro {
                quantidadePedidos
                faturamentoTotal
            }
        }`
    },
    {
        nome: "Detalhes dos pedidos",
        rotaREST: "/api/pedidos",
        queryGraphQL: `{
            pedidos {
                id
                quantidade
                valorTotal
                cliente {
                    nome
                }
                produto {
                    nome
                }
            }
        }`
    }
];

async function testarREST(rota) {
    const inicio = performance.now();

    const resposta = await fetch(URL + rota);
    const texto = await resposta.text();

    const tempo = performance.now() - inicio;

    if (!resposta.ok) {
        throw new Error("Erro REST: " + resposta.status);
    }

    return {
        tamanho: Buffer.byteLength(texto, "utf8"),
        tempo
    };
}

async function testarGraphQL(query) {
    const inicio = performance.now();

    const resposta = await fetch(URL + "/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });

    const texto = await resposta.text();
    const tempo = performance.now() - inicio;

    if (!resposta.ok) {
        throw new Error("Erro GraphQL: " + resposta.status);
    }

    const dados = JSON.parse(texto);

    if (dados.errors) {
        throw new Error(JSON.stringify(dados.errors));
    }

    return {
        tamanho: Buffer.byteLength(texto, "utf8"),
        tempo
    };
}

async function executarCenario(cenario) {
    const repeticoes = 100;

    let tempoREST = 0;
    let tempoGraphQL = 0;

    let tamanhoREST = 0;
    let tamanhoGraphQL = 0;

    console.log("\nCenario: " + cenario.nome);

    // Aquecimento das APIs
    for (let i = 0; i < 10; i++) {
        await testarREST(cenario.rotaREST);
        await testarGraphQL(cenario.queryGraphQL);
    }

    // Execucao do benchmark
    for (let i = 0; i < repeticoes; i++) {
        const primeiroREST = i % 2 === 0;

        const primeiro = primeiroREST
            ? await testarREST(cenario.rotaREST)
            : await testarGraphQL(cenario.queryGraphQL);

        const segundo = primeiroREST
            ? await testarGraphQL(cenario.queryGraphQL)
            : await testarREST(cenario.rotaREST);

        const rest = primeiroREST ? primeiro : segundo;
        const graphql = primeiroREST ? segundo : primeiro;

        tempoREST += rest.tempo;
        tempoGraphQL += graphql.tempo;

        tamanhoREST = rest.tamanho;
        tamanhoGraphQL = graphql.tamanho;
    }

    const mediaREST = tempoREST / repeticoes;
    const mediaGraphQL = tempoGraphQL / repeticoes;

    const reducao = (
        (1 - tamanhoGraphQL / tamanhoREST) * 100
    );

    console.table({
        REST: {
            "Payload (bytes)": tamanhoREST,
            "Latencia media (ms)": mediaREST.toFixed(3)
        },
        GraphQL: {
            "Payload (bytes)": tamanhoGraphQL,
            "Latencia media (ms)": mediaGraphQL.toFixed(3)
        }
    });

    console.log(
        "Reducao do payload: " + reducao.toFixed(2) + "%"
    );
}

async function executar() {
    console.log("BENCHMARK REST X GRAPHQL");

    for (const cenario of cenarios) {
        await executarCenario(cenario);
    }
}

executar().catch(console.error);
