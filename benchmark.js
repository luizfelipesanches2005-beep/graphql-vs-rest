
const URL = "http://localhost:3000";

async function testarREST() {
    const inicio = performance.now();

    const resposta = await fetch(`${URL}/api/produtos`);
    const texto = await resposta.text();

    const fim = performance.now();

    if (!resposta.ok) {
        throw new Error(`Erro REST: ${resposta.status}`);
    }

    return {
        tamanho: Buffer.byteLength(texto, "utf8"),
        tempo: fim - inicio
    };
}

async function testarGraphQL() {
    const inicio = performance.now();

    const resposta = await fetch(`${URL}/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: "{ produtos { nome preco } }"
        })
    });

    const texto = await resposta.text();
    const fim = performance.now();

    if (!resposta.ok) {
        throw new Error(`Erro GraphQL: ${resposta.status}`);
    }

    const dados = JSON.parse(texto);

    if (dados.errors) {
        throw new Error(JSON.stringify(dados.errors));
    }

    return {
        tamanho: Buffer.byteLength(texto, "utf8"),
        tempo: fim - inicio
    };
}

async function executar() {
    const repeticoes = 100;

    let tempoREST = 0;
    let tempoGraphQL = 0;
    let tamanhoREST = 0;
    let tamanhoGraphQL = 0;

    console.log("Iniciando comparação REST x GraphQL");

    // Aquecimento das duas APIs
    for (let i = 0; i < 10; i++) {
        await testarREST();
        await testarGraphQL();
    }

    for (let i = 0; i < repeticoes; i++) {
        // Alterna a ordem para reduzir viés
        const primeiroREST = i % 2 === 0;

        const primeiro = primeiroREST
            ? await testarREST()
            : await testarGraphQL();

        const segundo = primeiroREST
            ? await testarGraphQL()
            : await testarREST();

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

    console.log("\nRESULTADOS:");
    console.table({
        REST: {
            "Payload (bytes)": tamanhoREST,
            "Latência média (ms)": mediaREST.toFixed(3)
        },
        GraphQL: {
            "Payload (bytes)": tamanhoGraphQL,
            "Latência média (ms)": mediaGraphQL.toFixed(3)
        }
    });

    console.log(
        `Redução do payload: ${reducao.toFixed(2)}%`
    );
}

executar().catch(console.error);
