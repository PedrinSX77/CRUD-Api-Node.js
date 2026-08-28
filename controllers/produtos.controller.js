const produtos = require("../data/products");
const { searchProductId, listProducts, createProduct, deleteProduct, updateProduct } = require("../services/produtos.service")
// Funções Controllers

function listarProdutos(req, res) {
    const { nome, precoMax } = req.query;
    const produtosListados = listProducts(nome, precoMax);
    return res.status(200).json(produtosListados);
}

async function buscaProduto(req, res) {
    const id = Number(req.params.id);
    const produto = await searchProductId(id)
    res.status(200).json(produto);
}

function criarProduto(req, res, next) {
    console.log(req.body);
    const { nome, preco } = req.body
    const produtoNovo = createProduct(nome, preco);
    return res.status(201).json(produtoNovo);
}

function deletarProduto(req, res, next) {
    const id = Number(req.params.id);
    const produtoDeleted = deleteProduct(id);
    res.status(200).json(produtoDeleted);
}

function atualizarProduto(req, res, next) {
    const id = Number(req.params.id);
    const produtoAlterado = updateProduct(id, req.body);
    res.status(200).json(produtoAlterado);
}

module.exports = { listarProdutos, buscaProduto, criarProduto, deletarProduto, atualizarProduto };