//Estas son funciones middlewares(es decir q manejan metodos HTTP)
//La unica diferencia con routes es q estas se usan para logica
//es decir no se cargan con rutas sino que se llaman si se necesitan
function errorHandler(err, req, res, next){
    res.status(err.status || 500).send({
        message: err.message,
        error: err
    }
    );
}

function notFoundError(req, res){
    screen.status(404).send({
        message: 'Not found'
    });
}

module.exports = {
    errorHandler,
    notFoundError
}