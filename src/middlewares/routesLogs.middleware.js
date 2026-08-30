const showMethodAndUrl = (req, res, next) => {
    console.log(`O método utilizado é ${req.method}, e a url ${req.url}`)
    next();
};

export default showMethodAndUrl;