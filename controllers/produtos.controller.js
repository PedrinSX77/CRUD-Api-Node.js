// Importação funções services
import { searchProductId, listProducts, createProduct, deleteProduct, updateProduct } from "../services/produtos.service.js";

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

function criarProduto(req, res) {
    console.log(req.body);
    const { nome, preco } = req.body
    const produtoNovo = createProduct(nome, preco);
    return res.status(201).json(produtoNovo);
}

function deletarProduto(req, res) {
    const id = Number(req.params.id);
    const produtoDeletado = deleteProduct(id);
    res.status(200).json(produtoDeletado);
}

function atualizarProduto(req, res) {
    const id = Number(req.params.id);
    const produtoAlterado = updateProduct(id, req.body);
    res.status(200).json(produtoAlterado);
}

export { listarProdutos, buscaProduto, criarProduto, deletarProduto, atualizarProduto };