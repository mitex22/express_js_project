const router = require('express').Router();
const movieService = require('../services/movieService');
const castService = require('../services/castService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    newMovie.owner = req.user._id;

    try {
        await movieService.create(newMovie);

        res.redirect('/');
    } catch (error) {
        const message = getErrorMessage(error);

        res.status(400).render('create', { error: message, ...newMovie });
    }
});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getMovieById(movieId).lean();

    const isOwner = movie.owner && movie.owner == req.user?._id;

    // TODO: To be implemented with handlebars helper
    movie.ratingStars = new Array(Number(movie.rating)).fill(true);

    res.render('movie/details', { movie, isOwner });
});

router.get('/movies/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId).lean();
    const casts = await castService.getAll().lean();

    // TODO: remove already added casts
    res.render('movie/attach', { ...movie, casts });
});

router.post('/movies/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attach(movieId, castId);
    
    res.redirect(`/movies/${movieId}/attach`);
});

router.get('/movies/:movieId/edit', isAuth, async (req, res) => {

    const movieId = req.params.movieId;

    const movie = await movieService.getMovieById(movieId).lean();

    res.render('movie/edit', { movie });
})

router.post('/movies/:movieId/edit', isAuth, async (req, res) => {

    const newMovieData = req.body;
    const movieId = req.params.movieId;

    await movieService.editMovieById(movieId, newMovieData);

    res.redirect(`/movies/${movieId}`);
})

router.get('/movies/:movieId/delete', isAuth, async (req, res) => {

    const movieId = req.params.movieId;

    const movie = await movieService.deleteMovieById(movieId).lean();

    res.redirect('/');
})

module.exports = router;