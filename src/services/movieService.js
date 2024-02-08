const Movie = require('../models/Movie');

exports.create = (movieData) => Movie.create(movieData);

exports.getAll = () => Movie.find();

exports.getMovieById = (movieId) => Movie.findById(movieId);

exports.search = async (title, genre, year) => {
    let reducedMovies = await Movie.find().lean();

    if (title) {
        reducedMovies = reducedMovies.filter((movie) => (movie.title.toLowerCase().includes(title.toLowerCase())));
    }

    if (genre) {
        reducedMovies = reducedMovies.filter((movie) => (movie.genre.toLowerCase() === genre.toLowerCase()));
    }

    if (year) {
        reducedMovies = reducedMovies.filter((movie) => (movie.year === year));
    }

    return reducedMovies;
}