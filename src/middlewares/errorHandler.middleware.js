const errorMiddleware = (err, req, res, next) => {
    if (err.statusCode !== undefined) {
        res.status(err.statusCode)
        res.json(err.message);
    } else {
        res.status(500).json({ erro: err.message });
    }
};

export default errorMiddleware;