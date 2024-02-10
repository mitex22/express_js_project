const Movie = require('../models/Movie');

exports.create = (movieData) => Movie.create(movieData);

exports.getAll = () => Movie.find();

exports.getMovieById = (movieId) => Movie.findById(movieId).populate('casts');

exports.deleteMovieById = (movieId) => Movie.findByIdAndDelete(movieId);

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

exports.search = (title, genre, year) => {
    let query = {};

    if (title) {
        query.title = new RegExp(title, 'i');
    }

    if (genre) {
        query.genre = genre.toLowerCase();
    }

    if (year) {
        query.year = year;
    }

    return Movie.find(query);
}