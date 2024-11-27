const db = require('../database/models');

const controller = {
    index: async (req, res) => {
        const movies = await db.Movie.findAll({
            include: ['categories', 'images', 'actors', 'directors', 'languages', 'subtitles']
        });
        res.render('index', { movies });
    }
}

module.exports = controller;