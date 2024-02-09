const jwt = require('jsonwebtoken');
const util = require('util');

// convert jwt.sign into Promise - manually
function sign(payload, secretOrPrivateKey, options = {}) {
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
            if (err) return reject(err);

            resolve(token);
        })
    });

    return promise;
}

// convert jwt.verify into Promise - via util lib
const verify = util.promisify(jwt.verify);

module.exports = { sign, verify }