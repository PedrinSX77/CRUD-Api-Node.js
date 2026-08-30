// Importação funções services
import { searchProductId, listProducts, createProduct, deleteProduct, updateProduct } from "../services/produtos.service.js";

// Funções Controllers

async function listarProdutos(req, res) {
    const { nome, precoMax } = req.query;
    const produtosListados = await listProducts(nome, precoMax);
    return res.status(200).json(produtosListados);
}

async function buscaProduto(req, res) {
    const id = Number(req.params.id);
    const produto = await searchProductId(id)
    res.status(200).json(produto);
}

async function criarProduto(req, res) {
    console.log(req.body);
    const { nome, preco, categoryId } = req.body
    const produtoNovo = await createProduct(nome, preco, categoryId);
    return res.status(201).json(produtoNovo);
}

async function deletarProduto(req, res) {
    const id = Number(req.params.id);
    const produtoDeletado = await deleteProduct(id);
    res.status(200).json(produtoDeletado);
}

async function atualizarProduto(req, res) {
    const id = Number(req.params.id);
    const produtoAlterado = await updateProduct(id, req.body);
    res.status(200).json(produtoAlterado);
}

export { listarProdutos, buscaProduto, criarProduto, deletarProduto, atualizarProduto };