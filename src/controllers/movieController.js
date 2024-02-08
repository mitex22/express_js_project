const router = require('express').Router();
const movieService = require('../services/movieService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const newMovie = req.body;

    try {
        await movieService.create(newMovie);

        res.redirect('/');
    } catch (error) {
        console.log(error.message);
        res.redirect('/create');
    }
});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getMovieById(movieId).lean();

    movie.ratingStars = new Array(Number(movie.rating)).fill(true);

    res.render('details', { movie });
});

router.get('/movies/:movieId/attach', (req, res) => {
    res.render('movie/attach');
});

module.exports = router;