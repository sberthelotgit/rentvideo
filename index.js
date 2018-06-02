'use strict';
const express = require('express');
const Joi = require('joi');


let listMovies = [{
    id: 1,
    name: 'Best Horror Movie',
    genre: 'Horror',
}];

const app = express();
app.use(express.json());

const apiUrl = '/api/movies/';


// Get all movie
app.get(apiUrl, (req, res) => {
    res.send(listMovies);
});

// Get movie by ID
app.get(apiUrl + ':id', (req, res) => {
    const predicate = c => {
       return c.id === parseInt(req.params.id);
    };
    const movie = listMovies.find(predicate);
    if (!movie) {
        return res.status(404).send(`Movie with id ${req.params.id} not found`);
    }
    res.send(movie);
});

// Post a movie (name require and should be longer that 2)
app.post(apiUrl, (req, res) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        return res.status(400).send(result.error.message);
    }

    const newMovie = {
        id: listMovies.length + 1,
        name: req.body.name,
        genre: req.body.genre,
    };

    listMovies.push(newMovie);
    res.send(newMovie);
});


// Starting listening
app.listen(4000, () => {
    console.log('Listening on port 4000');
});

// Schema for post and put validation
const schema = {
    name: Joi.string().min(3).required(),
};