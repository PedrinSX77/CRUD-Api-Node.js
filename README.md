# CRUD API com Node.js, Express, Prisma e PostgreSQL

API REST desenvolvida como projeto de estudo de backend com Node.js.

O projeto começou como um CRUD simples em memória e evoluiu para uma aplicação com arquitetura em camadas, persistência em PostgreSQL, Prisma ORM, tratamento centralizado de erros e operações assíncronas.

## Tecnologias

- Node.js
- Express 5
- JavaScript
- ES Modules
- PostgreSQL
- Prisma ORM
- Prisma PostgreSQL Adapter
- dotenv
- Git

## Arquitetura

O projeto utiliza separação de responsabilidades em camadas:

```text
Request HTTP
    ↓
Route
    ↓
Controller
    ↓
Service
    ↓
Prisma
    ↓
PostgreSQL
```

### Routes

Responsáveis por identificar o método HTTP e o endpoint solicitado e encaminhar a requisição para o controller correspondente.

### Controllers

Responsáveis pela camada HTTP da aplicação.

Recebem dados através de:

- `req.params`
- `req.query`
- `req.body`

Chamam os services e retornam a resposta HTTP ao cliente.

### Services

Responsáveis pelas regras de negócio e operações relacionadas aos produtos.

É nesta camada que ficam:

- validações;
- consultas;
- criação;
- atualização;
- remoção;
- tratamento de registros inexistentes.

### Prisma

O Prisma faz a comunicação entre a aplicação Node.js e o PostgreSQL.

O model atual é:

```prisma
model Product {
  id    Int     @id @default(autoincrement())
  nome  String
  preco Decimal
}
```

O `id` é gerado automaticamente pelo banco.

---

## Estrutura do projeto

```text
.
├── controllers/
│   └── produtos.controller.js
│
├── libs/
│   └── prisma.js
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── routes/
│   └── produtos.route.js
│
├── services/
│   └── produtos.service.js
│
├── .env.example
├── .gitignore
├── package.json
├── prisma7.config.ts
└── server.js
```

---

# Funcionalidades

A API atualmente possui CRUD completo de produtos com persistência em PostgreSQL.

- Listar produtos
- Buscar produto por ID
- Criar produto
- Atualizar produto
- Excluir produto
- Filtrar produtos por nome
- Filtrar produtos por preço máximo
- Validação de campos obrigatórios
- Validação de preço
- Tratamento de produto inexistente
- Tratamento centralizado de erros
- Persistência de dados com PostgreSQL

---

# Endpoints

Base:

```text
/produtos
```

## Listar produtos

```http
GET /produtos
```

Retorna todos os produtos cadastrados.

### Filtro por nome

```http
GET /produtos?nome=VPS
```

### Filtro por preço máximo

```http
GET /produtos?precoMax=50
```

### Combinando filtros

```http
GET /produtos?nome=VPS&precoMax=50
```

---

## Buscar produto por ID

```http
GET /produtos/:id
```

Exemplo:

```http
GET /produtos/1
```

Caso o produto não exista, a API retorna:

```text
404 Not Found
```

---

## Criar produto

```http
POST /produtos
```

Body:

```json
{
  "nome": "VPS 4GB",
  "preco": 49.90
}
```

Os campos `nome` e `preco` são obrigatórios.

O preço deve ser maior ou igual a zero.

O ID não precisa ser enviado, pois é gerado automaticamente pelo PostgreSQL.

---

## Atualizar produto

```http
PATCH /produtos/:id
```

Exemplo:

```http
PATCH /produtos/1
```

Body:

```json
{
  "nome": "VPS 8GB",
  "preco": 79.90
}
```

É possível enviar somente os campos que devem ser alterados.

Exemplo:

```json
{
  "preco": 59.90
}
```

---

## Excluir produto

```http
DELETE /produtos/:id
```

Exemplo:

```http
DELETE /produtos/1
```

Caso o produto não exista, a API retorna `404`.

---

# Banco de dados

O projeto utiliza PostgreSQL.

O Prisma é utilizado como ORM para realizar as operações no banco.

Exemplos de métodos utilizados:

```js
prisma.product.findMany()
prisma.product.findUnique()
prisma.product.create()
prisma.product.update()
prisma.product.delete()
```

As alterações na estrutura do banco são controladas através de migrations.

Fluxo:

```text
schema.prisma
    ↓
Prisma Migrate
    ↓
migration.sql
    ↓
PostgreSQL
```

---

# Configuração

Clone o repositório:

```bash
git clone https://github.com/PedrinSX77/CRUD-Api-Node.js.git
```

Entre na pasta:

```bash
cd CRUD-Api-Node.js
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` utilizando `.env.example` como referência:

```env
PORT=8080
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

> Nunca envie o arquivo `.env` com credenciais reais para o GitHub.

---

# Prisma

Após configurar o PostgreSQL, execute as migrations:

```bash
npx prisma migrate dev
```

Gere o Prisma Client:

```bash
npx prisma generate
```

---

# Executando a API

```bash
npm start
```

Por padrão, a aplicação utiliza a porta definida em:

```env
PORT=8080
```

Caso `PORT` não esteja definida, o servidor utiliza a porta `3000`.

Exemplo:

```text
http://localhost:8080
```

---

# Tratamento de erros

A aplicação possui middleware centralizado para tratamento de erros.

Exemplos:

```text
400 Bad Request
→ dados inválidos

404 Not Found
→ produto não encontrado

500 Internal Server Error
→ erro interno inesperado
```

Erros do Prisma relacionados a registros inexistentes também são tratados pela camada de service.

---

# Objetivo do projeto

Este projeto foi criado com finalidade de estudo e prática de desenvolvimento backend.

Durante seu desenvolvimento foram aplicados conceitos como:

- Node.js puro e fluxo HTTP;
- Express;
- APIs REST;
- middlewares;
- CRUD;
- async/await;
- tratamento de erros;
- ES Modules;
- arquitetura Route / Controller / Service;
- PostgreSQL;
- Prisma ORM;
- migrations;
- persistência de dados;
- Git e versionamento.

O projeto continuará evoluindo conforme novos conceitos de backend forem estudados.

---

## Autor

Desenvolvido por **Pedro Henrique**.

GitHub: [@PedrinSX77](https://github.com/PedrinSX77)