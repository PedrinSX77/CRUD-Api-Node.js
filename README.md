# CRUD API — Node.js, Express, Prisma e PostgreSQL

API REST desenvolvida como projeto de estudo de backend com Node.js.

O projeto começou como um CRUD simples em memória e evoluiu para uma aplicação com arquitetura em camadas, persistência em PostgreSQL, relacionamentos entre entidades, Prisma ORM, migrations e tratamento centralizado de erros.

## 🛠️ Tecnologias

- Node.js
- Express 5
- JavaScript
- ES Modules
- PostgreSQL
- Prisma ORM
- Prisma PostgreSQL Adapter
- dotenv
- Nodemon
- Git

---

## 🏗️ Arquitetura

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

O projeto separa responsabilidades entre:

- **Routes** → definem endpoints e métodos HTTP;
- **Controllers** → lidam com `req` e `res`;
- **Services** → concentram regras, validações e acesso aos dados;
- **Middlewares** → tratam comportamentos compartilhados;
- **Prisma** → realiza a comunicação com o PostgreSQL.

---

## 📁 Estrutura

```text
.
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   ├── categoria.controller.js
│   │   └── produtos.controller.js
│   │
│   ├── libs/
│   │   └── prisma.js
│   │
│   ├── middlewares/
│   │   ├── errorHandler.middleware.js
│   │   └── routesLogs.middleware.js
│   │
│   ├── routes/
│   │   ├── categoria.route.js
│   │   └── produtos.route.js
│   │
│   ├── services/
│   │   ├── categoria.service.js
│   │   └── produtos.service.js
│   │
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── prisma7.config.js
```

---

## 🗄️ Banco de dados

Atualmente existem duas entidades relacionadas:

```text
Category 1 ───────── N Product
```

Cada categoria pode possuir vários produtos e cada produto pertence obrigatoriamente a uma categoria.

```prisma
model Category {
  id       Int       @id @default(autoincrement())
  nome     String
  products Product[]
}

model Product {
  id         Int      @id @default(autoincrement())
  nome       String
  preco      Decimal
  categoryId Int
  category   Category @relation(fields: [categoryId], references: [id])
}
```

A Foreign Key:

```text
Product.categoryId
        ↓
Category.id
```

é controlada pelo PostgreSQL e representada no Prisma através do relation field `category`.

---

## ✨ Funcionalidades

### Produtos

- Criar produto
- Listar produtos
- Buscar produto por ID
- Atualizar produto
- Excluir produto
- Filtrar por nome
- Filtrar por preço máximo
- Associar produto a uma categoria
- Validar existência da categoria
- Retornar categoria relacionada na listagem
- Validar campos obrigatórios e preço
- Tratar produtos inexistentes

### Categorias

- Criar categoria
- Listar categorias
- Consultar categorias com seus produtos relacionados

### Aplicação

- Arquitetura Route → Controller → Service
- Middlewares separados
- Tratamento centralizado de erros
- Logger de requisições
- Async / Await
- ES Modules
- Variáveis de ambiente
- Persistência com PostgreSQL
- Migrations com Prisma

---

# 🔗 Endpoints

## Produtos

### Listar

```http
GET /produtos
```

Filtros opcionais:

```http
GET /produtos?nome=VPS
```

```http
GET /produtos?precoMax=100
```

```http
GET /produtos?nome=VPS&precoMax=100
```

A listagem inclui a categoria relacionada ao produto.

---

### Buscar por ID

```http
GET /produtos/:id
```

Exemplo:

```http
GET /produtos/1
```

---

### Criar

```http
POST /produtos
```

Body:

```json
{
  "nome": "VPS 4GB",
  "preco": 49.90,
  "categoryId": 1
}
```

`nome`, `preco` e `categoryId` são obrigatórios.

A API verifica se a categoria informada existe antes de criar o produto.

---

### Atualizar

```http
PATCH /produtos/:id
```

Body:

```json
{
  "nome": "VPS 8GB",
  "preco": 79.90
}
```

A atualização é parcial, portanto não é necessário enviar todos os campos.

---

### Excluir

```http
DELETE /produtos/:id
```

---

## Categorias

### Listar

```http
GET /categoria
```

A listagem pode retornar os produtos relacionados através da relação definida no Prisma.

---

### Criar

```http
POST /categoria
```

Body:

```json
{
  "nome": "VPS"
}
```

---

# ⚙️ Configuração

Clone o projeto:

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

Crie seu `.env` utilizando `.env.example` como referência:

```env
PORT=8080
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

> O `.env` com credenciais reais não deve ser enviado ao GitHub.

---

## Prisma

Valide o schema:

```bash
npx prisma validate
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Gere o Prisma Client:

```bash
npx prisma generate
```

---

# ▶️ Executando

### Desenvolvimento

Executa com Nodemon:

```bash
npm run dev
```

### Execução normal

```bash
npm start
```

A aplicação utiliza:

```text
PORT definida no .env
```

ou, caso ela não exista:

```text
3000
```

---

## ⚠️ Tratamento de erros

A aplicação possui middleware centralizado para tratamento de erros.

Exemplos:

```text
400 Bad Request
→ dados inválidos

404 Not Found
→ produto ou categoria não encontrado

500 Internal Server Error
→ erro interno inesperado
```

Erros específicos do Prisma também são tratados na camada de Service quando necessário.

---

## 📈 Evolução do projeto

```text
Node.js puro
      ↓
Express
      ↓
CRUD em memória
      ↓
Middlewares
      ↓
Async / Await
      ↓
Tratamento de erros
      ↓
Express Router
      ↓
Controllers
      ↓
Services
      ↓
ES Modules
      ↓
Prisma ORM
      ↓
PostgreSQL
      ↓
Migrations
      ↓
CRUD persistente
      ↓
Relacionamentos 1:N
      ↓
Category + Product
```

---

## 🎯 Objetivo

Este projeto acompanha minha evolução prática em desenvolvimento backend.

Além de implementar funcionalidades, o objetivo é estudar e aplicar gradualmente conceitos como arquitetura, banco de dados relacional, validação, autenticação, testes, segurança e deploy.

---

## 👨‍💻 Autor

Desenvolvido por **Pedro Henrique** com muito ☕.

[GitHub — @PedrinSX77](https://github.com/PedrinSX77)