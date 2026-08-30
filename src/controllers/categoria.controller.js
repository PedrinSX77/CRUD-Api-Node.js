import { createCategory, listCategory } from "../services/categoria.service.js";

async function criarCategoria(req, res) {
    const { nome } = req.body;
    const categoriaNova = await createCategory(nome);
    res.status(201).json(categoriaNova);
}

async function listarCategoria(req, res) {
    const { nome, id } = req.query;
    const categoria = await listCategory(nome, id);
    res.status(200).json(categoria);
}

export { criarCategoria, listarCategoria }