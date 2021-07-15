const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // check if user has token
    const token = req.header('auth-token');
    if(!token) return res.status(401).redirect('/user/login');

    try {
        // verify token
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = verified;
        next();
    }
    catch(err) {
        console.error(err);
    }
}