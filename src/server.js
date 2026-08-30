// API VARIABLES
import "dotenv/config";
import express from "express";
import produtosRouter from "./routes/produtos.route.js";
import categoriaRouter from "./routes/categoria.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js"
import showMethodAndUrl from "./middlewares/routesLogs.middleware.js";
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(showMethodAndUrl);
// Rota default
app.get("/", (req, res) => {
    res.status(200).send("Aprendendo Node.js com Express");
});
// Rotas Produtos (GET, POST, PATCH, DELETE)
app.use("/produtos", produtosRouter);

// Rotas Categoria (GET, POST);
app.use("/categoria", categoriaRouter);

// Error Handler Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Rodando API em: http://localhost:${port}`);
});