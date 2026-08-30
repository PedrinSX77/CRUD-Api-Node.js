import prisma from "../libs/prisma.js";

async function createCategory(nome) {
    const data = {};
    if (!nome) {
        const erro = new Error("O campo 'nome' é obrigatório.")
        erro.statusCode = 400;
        throw erro;
    }
    if (nome) data.nome = nome;
    const categoria = await prisma.category.create({
        data: data
    });
    return categoria;
}

async function listCategory(nome, id) {
    const filtros = {};
    if (nome) filtros.nome = nome;
    if (id) filtros.id = Number(id);

    const searchedCategories = await prisma.category.findMany({
        where: filtros,
        include: {
            products: true
        }
    });
    return searchedCategories;
};

export { createCategory, listCategory };