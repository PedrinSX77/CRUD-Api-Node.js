// Importação da lista de Produtos
import produtos from "../data/products.js";

// Funções de Processamento
function listProducts(nome, precoMax) {
    if (nome || precoMax) {
        const produtosProcurados = produtos.filter(p => {
            const passouNome = nome ? p.nome === nome : true;
            const passouPreco = precoMax
                ? p.preco <= Number(precoMax)
                : true;

            return passouNome && passouPreco;
        });
        return (produtosProcurados);
    }

    return produtos;
}

function searchProductId(id) {
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
};

function createProduct(nome, preco) {
    if (!nome || preco === undefined) {
        const erro = new Error("Os campos 'nome' e 'preco' são obrigatórios.")
        erro.statusCode = 400;
        throw erro;
    }

    const proximoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
    const produtoNovo = {
        id: proximoId,
        nome: nome,
        preco: preco
    }
    produtos.push(produtoNovo);
    return produtoNovo;
}

function deleteProduct(id) {
    const i = produtos.findIndex(p => p.id === id);

    if (i === -1) {
        const erro = new Error("Erro: Produto não encontrado, id inválido")
        erro.statusCode = 404;
        throw erro;
    } else {
        const produtoDeleted = produtos[i];

        produtos.splice(i, 1);

        return produtoDeleted;
    }
}

function updateProduct(id, novosDados) {
    const i = produtos.findIndex(p => p.id === id);

    if (i === -1) {
        const erro = new Error("Erro: Produto não encontrado, id inválido")
        erro.statusCode = 404;
        throw erro;
    } else {
        const alteracao = novosDados;

        const produtoAlterado = {
            ...produtos[i],
            ...alteracao
        };

        produtos.splice(i, 1, produtoAlterado);

        return produtoAlterado;
    }
}

export { searchProductId, listProducts, createProduct, deleteProduct, updateProduct };