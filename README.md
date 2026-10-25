
# GraphQL vs REST: Comparação de APIs

## Objetivo
Comparar REST e GraphQL em um sistema simulado de
e-commerce, investigando o problema de overfetching.

## Tecnologias
- Node.js
- Express
- GraphQL
- JavaScript

## Funcionamento
O projeto implementa duas APIs que consultam
a mesma base de dados simulada.

### REST
- GET /api/produtos
- GET /api/pedidos
- GET /api/relatorio-financeiro

### GraphQL
- POST /graphql

## Como executar

1. Instalar as dependências:
   npm install

2. Iniciar o servidor:
   node server.js

3. Em outro terminal, executar:
   node benchmark.js

## Resultados iniciais

Teste de listagem de produtos com 100 requisições
por abordagem, após 10 requisições de aquecimento.

| Métrica | REST | GraphQL |
|---|---|---|
| Payload | 438 bytes | 147 bytes |
| Latência média | 14,008 ms | 14,327 ms |

Redução do payload: 66,44%.

Os testes foram realizados localmente.
Os resultados não representam necessariamente
o desempenho em ambientes de produção.
