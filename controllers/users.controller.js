
const db = require("../models");
const { Op } = require("sequelize")
const { User, Restaurant, Reservation, Food } = db;
const {
  errorHandler,
  notFoundError,
} = require("../middlewares/errors/errorHandler.js");

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, expiresIn, rounds } = require("../utils/auth");

// Función que genera un token del usuario señalado. Basado en la capsula entregada
function generateToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          admin: user.admin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      `${secret}`,
      { expiresIn: "5h" },
      (err, token) => {
        err ? reject(err) : resolve(token);
      }
    );
  });
}

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Función encargada de crear un usuario. Basado en elementos de la capsula
   aportada para el curso */
const createUser = async (req, res) => {
  // Obtiene los valores del req.body
  const { firstName, lastName, email, password } = req.body;
  // Encripta la contraseña con bcrypt
  const encryptedPassword = bcrypt.hashSync(password, Number.parseInt(rounds));
  // variable que asigna si el usuario es admin o no
  const isAdminDomain = email.split("@")[1] === "admin.com";
  try {
    const user = await User.create({
      email,
      password: encryptedPassword,
      firstName,
      lastName,
      admin: isAdminDomain,
    });
    token = await generateToken(user);

    return res.status(201).send({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token,
      tokenType: "Bearer",
    });
  } catch (ValidationError) {
    res.status(500).send("error de validación");

    return;
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findByPk(id);
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Función que permite iniciar sesión.
const loginUser = async (req, res) => {
  // Obtiene el mail y contraseña del body del req
  const { email, password } = req.body;
  // Busca si existe alguno en el usuario y lo asigna
  const user = await User.findOne({ where: { email } });
  // si el usuario no existe retorna error 401
  if (!user) {
    return res.status(401).send({ error: "Usuario no encontrado" });
  }
  // Compara la constraseña entregada por el req.body con la que
  // se encuentra en la BD
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).send({ error: "Contraseña incorrecta" });
  }
  // genera el token del usuario por medio de la función generateToken
  const token = await generateToken(user);
  const { id, firstName, lastName } = user;
  body = {
    id,
    firstName,
    lastName,
    email,
    token: token,
    tokenType: "Bearer",
  };

  // retorna estado 200 con id, nombre, email y el token del usuario
  return res.status(200).send(body);
};

const getFavorites = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findOne({
            where: {
                id
            }
        })
        const favorites= await user.getPlaces();
        if (!user){
            return res.status(404).json({message: 'User does not exist'})
        }
        const { firstName, lastName, email } = user;
        body = {
            favorites
        }
        return res.status(200).send(body)
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

const getReservations = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findAll({
      where: {
        UserId: id,
        createdAt: {
          [Op.gt]: new Date().setHours(0,0,0,0),
          [Op.lt]: new Date()
        }
      },
      include: [Food, Restaurant]
    })
    if(!reservation)
      return res.status(404).json({message: 'User doesnt exist'})
    
    res.json(reservation)
  } catch(error){
    return res.status(500).json({message: error.message})
  }
}


module.exports = {

  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
  getFavorites,
  getReservations
};

