const users = require('../data/usersDataBase.json');

/**
 * Middleware que verifica si el usuario está logueado y guarda la información en res.locals.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {Function} next - La función de siguiente middleware.
 */
const UserLoggedMiddleware = (req, res, next) => {
    res.locals.isLogged = false; 
    // Verificar si el usuario tiene una cookie con su email
    if(req.cookies.userEmail){
        // Buscar al usuario que corresponde a ese email
        let userEmail = req.cookies.userEmail;
        let user = users.find(user => user.email === userEmail);
        // Si el usuario existe, lo guardamos en session
        if(user){
            req.session.user = user;
        }
    }
    // Verificar si el usuario está logueado
    if(req.session.user){
        // Si está logueado, lo guardamos en res.locals para que esté disponible en todas las vistas
        res.locals.isLogged = true; 
        res.locals.user = req.session.user;
    }
    next();
}

module.exports = UserLoggedMiddleware;