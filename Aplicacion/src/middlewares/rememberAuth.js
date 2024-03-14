const users = require('../data/usersDataBase.json');

const verifyRememberAuth = (req, res, next) => {
    res.locals.isLogged = false; 
    let userEmail = req.cookies.userEmail;
    let user = users.find(user => user.email === userEmail);
    if(user){
        req.session.user = user;
    }
    if(req.session.user){
        res.locals.isLogged = true; 
        res.locals.user = req.session.user;
    }
    next();
}

module.exports = verifyRememberAuth;