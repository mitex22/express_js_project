const router = require('express').Router();
const movieService = require('../services/movieService');
const castService = require('../services/castService');

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

    // в castService има закоментиран метод getCastsByIds, защото ползваме .populate('casts') при getMovieById
    // const casts = await castService.getCastsByIds(movie.casts).lean();

    movie.ratingStars = new Array(Number(movie.rating)).fill(true);

    res.render('details', { movie });
});

router.get('/movies/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId).lean();
    const casts = await castService.getAll().lean();

    // TODO: remove already added casts
    res.render('movie/attach', { ...movie, casts });
});

router.post('/movies/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attach(movieId, castId);
    
    res.redirect(`/movies/${movieId}/attach`);
});

module.exports = router;