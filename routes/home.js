const express = require('express');

const routeur = new express.Router();

// Get home
routeur.get('/', (req, res) => {
    res.send(`Welcome to movie rental website<br/> 
        Use following path to access the api : ${apiUrl}`);
});

module.exports = routeur;