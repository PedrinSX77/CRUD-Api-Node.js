// API VARIABLES
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

// PRODUCTS
const produtos = [
    { id: 1, nome: "Hospedagem Minecraft", preco: 29.90 },
    { id: 2, nome: "VPS 4GB", preco: 59.90 }
];

//ROTAS GET

app.get("/", (req, res) => {
    res.status(200);
    res.send("Aprendendo Node.js com Express");
});

app.get("/produtos", (req, res) => {
    const { nome, precoMax } = req.query;

    if ( nome || precoMax ) {
        const produtosProcurados = produtos.filter(p => {
            const passouNome = nome ? p.nome === nome : true;
            const passouPreco = precoMax ? p.preco <= Number(precoMax) : true

            return passouNome && passouPreco;
        });
        return res.status(200).json(produtosProcurados);
    }
    return res.status(200).json(produtos)
})

app.get("/produtos/:id", (req, res) => {
    const id = Number(req.params.id)
    const i = produtos.findIndex(p => p.id === id);

    if (i === -1) {
        res.status(404);
        res.send(`Erro: Produto não encontrado, id inválido`);
    } else {
        res.status(200);
        res.json(produtos[i]);
    }

});

//ROTAS POST

app.post("/produtos", (req, res) => {
    console.log(req.body);
    produtos.push(req.body);
    console.log(produtos)

    res.status(201);
    res.json(req.body);
})

//ROTAS PATCH

app.patch('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const i = produtos.findIndex(p => p.id === id);

    if (i === -1) {
        res.status(404);
        res.send(`Erro: Produto não encontrado, id inválido`);
    } else {
        const alteracao = req.body;

        const produtoAlterado = {
            ...produtos[i],
            ...alteracao
        }

        produtos.splice(i, 1, produtoAlterado);
        res.status(200);
        res.json(produtoAlterado);
    }
})

//ROTAS DELETE

app.delete("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);
    const i = produtos.findIndex(p => p.id === id);

    if (i === -1) {
        res.status(404);
        res.send(`Erro: Produto não encontrado, id inválido`);
    } else {
        const produtoDeleted = produtos[i]
        produtos.splice(i, 1);
        res.status(200);
        res.json(produtoDeleted);
    }
})

app.listen(port, () => {
    console.log(`Rodando API em : http://localhost:${port}`)
})