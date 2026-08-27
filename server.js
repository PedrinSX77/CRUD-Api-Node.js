// API VARIABLES
const express = require("express");
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
const showMethodAndUrl = (req, res, next) =>{
    console.log(`O método utilizado é ${req.method}, e a url ${req.url}`)
    next();
};

app.use(showMethodAndUrl);

// PRODUCTS
const produtos = [
    { id: 1, nome: "Hospedagem Minecraft", preco: 29.90 },
    { id: 2, nome: "VPS 4GB", preco: 59.90 }
];

// ROTAS GET

// Rota principal da API.
app.get("/", (req, res) => {
    res.status(200);
    res.send("Aprendendo Node.js com Express");
});

// Lista todos os produtos.
// Também permite aplicar filtros opcionais pela query string.
// Se um filtro não for informado, ele não interfere no resultado.
app.get("/produtos", (req, res) => {
    const { nome, precoMax } = req.query;

    if (nome || precoMax) {
        const produtosProcurados = produtos.filter(p => {
            const passouNome = nome ? p.nome === nome : true;
            const passouPreco = precoMax
                ? p.preco <= Number(precoMax)
                : true;

            return passouNome && passouPreco;
        });

        return res.status(200).json(produtosProcurados);
    }

    return res.status(200).json(produtos);
});

// Retorna um produto específico pelo ID informado na rota.
app.get("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);
    const i = produtos.findIndex(p => p.id === id);

    if (i === -1) {
        res.status(404);
        res.send("Erro: Produto não encontrado, id inválido");
    } else {
        res.status(200);
        res.json(produtos[i]);
    }
});

app.get("/headers", (req, res) => {
    console.log(req.headers);
    const userAgent = req.headers["user-agent"];
    const authorization = req.headers.authorization;
    const headersReq = {
        userAgent: userAgent,
        authorization: authorization
    }
    res.json(headersReq)
});

// ROTAS POST

// Cria um novo produto utilizando os dados recebidos no body da request.
app.post("/produtos", (req, res) => {
    console.log(req.body);
    const {nome , preco} = req.body

    if (!nome || preco === undefined) {
        return res.status(400).json({ 
            error: "Bad Request", 
            message: "Os campos 'nome' e 'preco' são obrigatórios." 
        });
    }

    const proximoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
    const produtoNovo = {
        id: proximoId,
        nome: nome,
        preco: preco
    }
    produtos.push(produtoNovo);

    return res.status(201).json(produtoNovo);
});


// ROTAS PATCH

// Atualiza parcialmente um produto identificado pelo ID da rota.
// Os campos enviados no body sobrescrevem os campos correspondentes
// do produto existente.
app.patch("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);
    const i = produtos.findIndex(p => p.id === id);

    if (i === -1) {
        res.status(404);
        res.send("Erro: Produto não encontrado, id inválido");
    } else {
        const alteracao = req.body;

        const produtoAlterado = {
            ...produtos[i],
            ...alteracao
        };

        produtos.splice(i, 1, produtoAlterado);

        res.status(200);
        res.json(produtoAlterado);
    }
});


// ROTAS DELETE

// Remove um produto específico pelo ID informado na rota.
app.delete("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);
    const i = produtos.findIndex(p => p.id === id);

    if (i === -1) {
        res.status(404);
        res.send("Erro: Produto não encontrado, id inválido");
    } else {
        const produtoDeleted = produtos[i];

        produtos.splice(i, 1);

        res.status(200);
        res.json(produtoDeleted);
    }
});

const errorMiddleware = (err, req, res, next) =>{
    console.log(err.message);
};



// SERVER
// Inicia a API na porta configurada.
app.listen(port, () => {
    console.log(`Rodando API em: http://localhost:${port}`);
});