const Cast = require('../models/Cast');

exports.create = (castData) => {
    return Cast.create(castData);
}