const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Movie title is mandatory!'],
        minLength: [5, 'Movie title should be atleast 5 chars long! ...FROM Movie model'],
        match: [/^[a-zA-z0-9 ]+$/, 'Movie title should contain english letters and digits only! ...FROM Movie model']
    },
    genre: {
        type: String,
        required: [true, 'Movie genre is mandatory!'],
        lowercase: true,
        minLength: [5, 'Movie genre should be atleast 5 chars long! ...FROM Movie model'],
        match: [/^[a-zA-z0-9- ]+$/, 'Movie genre should contain english letters and digits only! ...FROM Movie model']
    },
    director: {
        type: String,
        required: [true, 'Movie director is mandatory!'],
        minLength: [5, 'Movie director should be atleast 5 chars long! ...FROM Movie model'],
        match: [/^[a-zA-z0-9-\' ]+$/, 'Movie director should contain english letters and digits only! ...FROM Movie model']
    },
    year: {
        type: Number,
        required: [true, 'Movie year is mandatory!'],
        min: [1900, 'Movie should be at least from the 90s!'],
        max: [new Date().getFullYear() + 10, `Movie can't be pass ${new Date().getFullYear() + 10}!`]
    },
    imageUrl: {
        type: String,
        required: [true, 'Movie poster is mandatory!'],
        match: [/^https?:\/\//, 'Movie poster URL must start with http:// or https://']
    },
    rating: {
        type: Number,
        required: [true, 'Movie rating is mandatory!'],
        min: [1, 'Movie rating must be at least 1 star!'],
        max: [5, 'Movie rating shouldn\'t exceed 5 stars!'],
    },
    description: {
        type: String,
        required: [true, 'Movie description is mandatory!'],
        maxLength: [1000, 'Movie description shouldn\'t exceed 1000 chars!']
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast'
    }],
    owner: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;