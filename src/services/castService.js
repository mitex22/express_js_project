const Cast = require('../models/Cast');
const Movie = require('../models/Movie');

exports.create = (castData) => Cast.create(castData);

exports.getAll = () => Cast.find();
