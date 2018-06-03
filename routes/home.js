const express = require('express');

const routeur = new express.Router();

// Get home
routeur.get('/', (req, res) => {
    res.send(`Welcome to movie rental website<br/>`);
});

module.exports = routeur;