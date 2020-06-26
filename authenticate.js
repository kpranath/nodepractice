function auth(req, res, next) {
    console.log("Authenticating...");
    next();
}

module.export = auth;