import express from "express";
const router = express.Router();
import { listarProdutos, buscaProduto, criarProduto, deletarProduto, atualizarProduto } from "../controllers/produtos.controller.js"

router.get("/", listarProdutos);
router.get("/:id", buscaProduto);
router.post("/", criarProduto);
router.patch("/:id", atualizarProduto)
router.delete("/:id", deletarProduto)


export default router;