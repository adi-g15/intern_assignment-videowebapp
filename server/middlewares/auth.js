function checkAuthenticated(req, res, next) {
    const username = req.username;

    // TODO
    // verify if the username matches whatever data is bound with req
    // for eg. token or session secrets

    next();
}

module.exports = {
    checkAuthenticated
}
