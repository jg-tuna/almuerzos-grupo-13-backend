const jwt = require("jsonwebtoken");
const { secret } = require("../utils/auth");

/* Middleware que revisa el token entregada por el front-end para
   ver si este es válido. Fundión adaptada de la capsula del curso.*/
module.exports = (req, res, next) => {
  // Revisa si el header de req existe o no ...
  if (!req.headers.authorization) {
    // ... si no hay authorization retorna error 401
    return res.status(401).send({ error: "Sin Autorización" });
  }

  // si existe obtiene el token del header ...
  const token = req.headers.authorization.split(" ")[1];
  // verifica si este es valido o no ...
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      // ... si no es válido retorna error 401 señalando que es invalido
      return res.status(401).send({ error: "token invalido" });
    } else {
      // si es válido añade el usuario al req y sigue con next().
      req.user = decoded.user;
      next();
    }
  });
};
