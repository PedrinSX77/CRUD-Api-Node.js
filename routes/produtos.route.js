const express = require("express");
const router = express.Router();
const { listarProdutos, buscaProduto, criarProduto, deletarProduto, atualizarProduto } = require("../controllers/produtos.controller")

router.get("/", listarProdutos);
router.get("/:id", buscaProduto);
router.post("/", criarProduto);
router.patch("/:id", atualizarProduto)
router.delete("/:id", deletarProduto)


module.exports = router;