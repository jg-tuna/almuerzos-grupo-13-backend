const { Router } = require('express');
const express = require('express');
const router = express.Router();

// express siempre recibe (req, res) req contiene toda la info del request y res es lo q se envia como respuesta
//como en routes/index cuando se usa el use se llama con /hello estas rutas por default ya vienen con esa ruta
router.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

module.exports = router;