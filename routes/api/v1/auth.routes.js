require("dotenv").config();
const express = require("express");
const { User } = require("../../../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, expiresIn, rounds } = require("../../../utils/auth");

const router = express.Router();

function generateToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, `${secret}`, { expiresIn: "5h" }, (err, token) => {
      err ? reject(err) : resolve(token);
    });
  });
}

// Para poder crear el usuario
router.post('/signup', async (req, res) =>{
  const { firstName, lastName, email, password } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, Number.parseInt(rounds));
  try {
    const user = await User.create({
      email,
      password: encryptedPassword,
      firstName,
      lastName,
    });
    token = await generateToken(user);

    return res.status(201).send({
      user: user,
      token: token
    })
  }
  catch(ValidationError){
    res.status(500).send('error de validación');

    return;
  }
})

router.post('/login', async (req, res) =>{
  const { email, password } = req.body;
  const user = await User.findOne({where: { email }});
  if(!user){
    return res.status(401).send({ error: 'Usuario no encontrado' });
  }
  console.log(password);
  console.log(user.password)
  if(!bcrypt.compareSync(password, user.password)){
    return res.status(401).send({ error: 'Contraseña incorrecta'});
  }
  const token = await generateToken(user);
  const { id, firstName, lastName } = user; 
  body = {
    id, firstName, lastName, email, token: token, tokenType: 'Bearer'
  }

  return res.status(200).send(body);
})

module.exports = router;
