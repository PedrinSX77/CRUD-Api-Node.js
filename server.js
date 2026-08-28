// API VARIABLES
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const produtosRouter = require("./routes/produtos.route")
const produtos = require("./data/products");


function buscarProdutoId(id) {
    const promessa = new Promise((resolve, reject) => {
        setTimeout(() => {
            const produto = produtos.find(p => p.id === id);
            if (produto === undefined) {
                const erro = new Error("Produto não encontrado");
                erro.statusCode = 404;
                return reject(erro);
            } else {
                resolve(produto);
            }
        }, 500);
    })

    return promessa;
}

// Middlewares
app.use(express.json());
const showMethodAndUrl = (req, res, next) => {
    console.log(`O método utilizado é ${req.method}, e a url ${req.url}`)
    next();
};
const errorMiddleware = (err, req, res, next) => {
    if (err.statusCode !== undefined) {
        res.status(err.statusCode)
        res.json(err.message);
    } else {
        res.status(500).json({ erro: err.message });
    }
};

app.use(showMethodAndUrl);

// ROTAS GET

// Rota principal da API.
app.get("/", (req, res) => {
    res.status(200).send("Aprendendo Node.js com Express");
});

// Lista todos os produtos.
// Também permite aplicar filtros opcionais pela query string.
// Se um filtro não for informado, ele não interfere no resultado.
app.use("/produtos", produtosRouter);

// Retorna um produto específico pelo ID informado na rota.
app.get("/produtos/:id", async (req, res) => {
    const id = Number(req.params.id);
    const produto = await buscarProdutoId(id);
    res.status(200).json(produto);
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
app.post("/produtos", (req, res, next) => {
    console.log(req.body);
    const { nome, preco } = req.body

    if (!nome || preco === undefined) {
        const erro = new Error("Os campos 'nome' e 'preco' são obrigatórios.")
        erro.statusCode = 400;
        return next(erro);
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
app.patch("/produtos/:id", (req, res, next) => {
    const id = Number(req.params.id);
    const i = produtos.findIndex(p => p.id === id);

    if (i === -1) {
        const erro = new Error("Erro: Produto não encontrado, id inválido")
        erro.statusCode = 404;
        return next(erro);
    } else {
        const alteracao = req.body;

        const produtoAlterado = {
            ...produtos[i],
            ...alteracao
        };

        produtos.splice(i, 1, produtoAlterado);

        res.status(200).json(produtoAlterado);
    }
});


// ROTAS DELETE

// Remove um produto específico pelo ID informado na rota.
app.delete("/produtos/:id", (req, res, next) => {
    const id = Number(req.params.id);
    const i = produtos.findIndex(p => p.id === id);

    if (i === -1) {
        const erro = new Error("Erro: Produto não encontrado, id inválido")
        erro.statusCode = 404;
        return next(erro);
    } else {
        const produtoDeleted = produtos[i];

        produtos.splice(i, 1);

        res.status(200).json(produtoDeleted);
    }
});

app.use(errorMiddleware)


// SERVER
// Inicia a API na porta configurada.
app.listen(port, () => {
    console.log(`Rodando API em: http://localhost:${port}`);
});