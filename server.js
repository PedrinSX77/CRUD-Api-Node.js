// API VARIABLES
import "dotenv/config";
import express from "express";
import produtosRouter from "./routes/produtos.route.js";
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
const showMethodAndUrl = (req, res, next) => {
    console.log(`O método utilizado é ${req.method}, e a url ${req.url}`)
    next();
};
const errorMiddleware = (err, req, res, next) => {
    if (err.statusCode !== undefined) {
        res.status(err.statusCode)
        res.json(err.message);
    } else {
        res.status(500).json({ erro: err.message });
    }
};

app.use(showMethodAndUrl);
app.get("/", (req, res) => {
    res.status(200).send("Aprendendo Node.js com Express");
});
// Rotas Produtos (GET, POST, PATCH, DELETE)
app.use("/produtos", produtosRouter);
app.get("/headers", (req, res) => {
    console.log(req.headers);
    const userAgent = req.headers["user-agent"];
    const authorization = req.headers.authorization;
    const headersReq = {
        userAgent: userAgent,
        authorization: authorization
    }
    res.json(headersReq)
});
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Rodando API em: http://localhost:${port}`);
});