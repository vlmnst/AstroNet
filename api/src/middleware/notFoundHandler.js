const notFoundRouter = require('express').Router();

notFoundRouter.get('*', (req, res) => {
    res.status(404).send({ error: '404 not found (wrong back-route)' });
});

module.exports = notFoundRouter;