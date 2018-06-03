'use strict';
const express = require('express');
const Joi = require('joi');

const router = new express.Router();

const listMovies = [{
    id: 1,
    name: 'Best Horror Movie',
    genre: 'Horror',
}];

// Get all movie
router.get('/', (req, res) => {
    res.send(listMovies);
});

// Get movie by ID
router.get('/:id', (req, res) => {
    const movie = listMovies.find(c => {
        return c.id === parseInt(req.params.id);
    });
    if (!movie) return res.status(404).send(`Movie with id ${req.params.id} not found`);
    res.send(movie);
});

// Post a movie (name require and should be longer that 2)
router.post('/', (req, res) => {
    const {error} = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.message);


    const newMovie = {
        id: listMovies.length + 1,
        name: req.body.name,
        genre: req.body.genre,
    };

    listMovies.push(newMovie);
    res.send(newMovie);
});

// Update movie by ID
router.put('/:id', (req, res) => {
    const movie = listMovies.find(c => {
        return c.id === parseInt(req.params.id);
    });
    if (!movie) return res.status(404).send(`Movie with id ${req.params.id} not found`);

    const {error} = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.message);

    movie.name = req.body.name;
    movie.genre = req.body.genre;
    res.send(movie);
});

// Remove a movie from the store
router.delete('/:id', (req, res) => {
    const movie = listMovies.find(c => {
        return c.id === parseInt(req.params.id);
    });
    if (!movie) return res.status(404).send(`Movie with id ${req.params.id} not found`);

    const index = listMovies.indexOf(movie);
    listMovies.splice(index, 1);
    res.status(200).send();
});

// Schema for post and put validation
const schema = {
    name: Joi.string().min(3).required(),
    genre: Joi.string(),
};

module.exports = router;