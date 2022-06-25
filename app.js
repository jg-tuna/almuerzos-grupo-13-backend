// Se llaman a las librerias necesarias
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Se crea la app q sera el server
const app = express();


const routes =  require('./routes/index')
const {errorHandler, notFoundError} = require('./middlewares/errors/errorHandler.js')

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(routes);//Aca se cargan nuestras rutas creadas en la aplicacion

app.use(errorHandler);
app.use(notFoundError);

module.exports = app;