const cors = async (req, res, next) => {

    req.originalUrl = /*req.protocol + '://' + req.get('host') + */
        (req.originalUrl[req.originalUrl.length - 1] === "/" ? req.originalUrl.substring(1) : req.originalUrl.substring(1) + "/");
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    const allowedOrigins = ['http://localhost:8100', 'http://localhost:8000', 'http://localhost', 'http://localhost:4200', 'http://localhost:8101'];
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,HEAD,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "language,Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Cache-Control,X-Auth-Token,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization");
    res.header("Access-Control-Expose-Headers", "X-Auth-Token");
    next();
}
module.exports = cors;
