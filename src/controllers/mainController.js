const movieModel = require('../models/movie');

const controller = {
    index: (req, res) => {
        const movies = movieModel.findAll();
        res.render('index', { movies });
    }
}

module.exports = controller;