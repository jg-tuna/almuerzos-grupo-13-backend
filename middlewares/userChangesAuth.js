/* Middleware posterior al de auth. Sirve para ver si el usuario es que el entregado
   en los parametros, de ser el mismo usuario o administrador sigue o sino retorna
   error 401  */
module.exports = (req, res, next) => {
  if (req.user.admin || req.params.id === req.user.id) {
    next();
  } else {
    return res
      .status(401)
      .send({ error: "Sin autorización para eliminar este usuario" });
  }
};
