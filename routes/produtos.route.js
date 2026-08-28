const express = require("express");
const router = express.Router();
const produtos = require("../data/products");

router.get("/", (req, res) => {
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
})

module.exports = router;