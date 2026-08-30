import express from "express";
const router = express.Router();
import { criarCategoria, listarCategoria } from '../controllers/categoria.controller.js'

router.post("/", criarCategoria);
router.get("/", listarCategoria);

export default router;