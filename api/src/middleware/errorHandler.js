module.exports = errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;

    console.error(err);
    
    res.status(status).send({ error: message });

    // if (error.name === 'CastError') { // causado por un ID de objeto no válido para Mongo (findById y que no traiga nada)
    //   return response.status(400).send({ error: 'malformatted id' })
    // };
};