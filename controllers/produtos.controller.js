const produtos = require("../data/products");

// Código

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

// Funções Controllers

function listarProdutos(req, res) {

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
}

async function buscaProduto(req, res) {
    const id = Number(req.params.id);
    const produto = await buscarProdutoId(id);
    res.status(200).json(produto);
}

function criarProduto(req, res, next) {
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
}

function deletarProduto(req, res, next) {
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
}

function atualizarProduto (req, res, next) {
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
}

module.exports = {listarProdutos, buscaProduto, criarProduto, deletarProduto, atualizarProduto};