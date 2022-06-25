require('dotenv').config;
module.exports = {
  secret: process.env.AUTH_SECRET,
  rounds: process.env.AUTH_ROUNDS
}