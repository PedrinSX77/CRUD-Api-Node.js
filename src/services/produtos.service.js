// Importação do ORM
import prisma from "../libs/prisma.js";

// Funções de Processamento
async function listProducts(nome, precoMax) {
    const filtros = {};
    if (nome) filtros.nome = nome;
    if (precoMax) filtros.preco = { lte: Number(precoMax) };

    const produtosProcurados = await prisma.product.findMany({
        where: filtros,
        include: {
            category: true
        }
    });
    return produtosProcurados;
};

async function searchProductId(id) {
    const produto = await prisma.product.findUnique({
        where: { id }
    });
    if (produto === null) {
        const erro = new Error("404: Produto não encontrado")
        erro.statusCode = 404;
        throw erro;
    }

    return produto;
}

async function createProduct(nome, preco, categoryId) {
    const data = {};
    if (!nome || categoryId === undefined || preco === undefined) {
        const erro = new Error("Os campos 'nome', 'categoryId' e 'preco' são obrigatórios.")
        erro.statusCode = 400;
        throw erro;
    } else if (Number(preco) < 0) {
        const erro = new Error("O Campo preco deve ser maior ou igual a 0")
        erro.statusCode = 400;
        throw erro;
    }
    if (nome) data.nome = nome;
    if (preco !== undefined) data.preco = preco;
    const categoriaNumber = Number(categoryId)
    const categoriaExiste = await prisma.category.findUnique({
        where: {
            id: categoriaNumber
        }
    })
    if (categoriaExiste !== null) {
        data.categoryId = categoriaNumber
    } else {
        const erro = new Error("Categoria não encontrada")
        erro.statusCode = 404;
        throw erro;
    }

    const produto = await prisma.product.create({
        data: data
    });
    return produto;
}

async function deleteProduct(id) {
    try {
        const produto = await prisma.product.delete({
            where: { id }
        })
        return produto;
    } catch (e) {
        if (e.code === "P2025") {
            const erro = new Error("Produto não encontrado")
            erro.statusCode = 404;
            throw erro;
        }
        throw e;
    }

};

async function updateProduct(id, novosDados) {
    try {
        const data = {};
        if (novosDados.nome) data.nome = novosDados.nome;
        if (novosDados.preco !== undefined) {
            if (Number(novosDados.preco) < 0) {
                const erro = new Error("O campo preco deve ser maior ou igual a 0");
                erro.statusCode = 400;
                throw erro;
            }

            data.preco = Number(novosDados.preco);
        }
        const produto = await prisma.product.update({
            where: { id },
            data
        });
        return produto;
    } catch (e) {
        if (e.code === "P2025") {
            const erro = new Error("Produto não encontrado")
            erro.statusCode = 404;
            throw erro;
        }
        throw e;
    }
}
export { searchProductId, listProducts, createProduct, deleteProduct, updateProduct };