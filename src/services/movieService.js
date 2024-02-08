const Movie = require('../models/Movie');

exports.create = (movieData) => Movie.create(movieData);

exports.getAll = () => Movie.find();

exports.getMovieById = (movieId) => Movie.findById(movieId).populate('casts');

exports.attach = async (movieId, castId) => {
    // METHOD I
    const movie = await this.getMovieById(movieId);
    // TODO: validate castId if exists
    // TODO: validate castId is not already added
    movie.casts.push(castId);
    return movie.save();

    // METHOD II
    // return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
};

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