/* Middleware que permite saber si el usuario es
   administrador. Este es posterior al middleware auth.
   De no serlo retorna error 401 */ 
module.exports = (req, res, next) => {
  if(!req.user.admin){
    return res.status(401).send({error: "Usuario no es administrador"})
  }
  next();
};