const experss = require('express');
const path = require('path');

function configExpress(app) {
    app.use(experss.static(path.resolve('src/public')));
    app.use(experss.urlencoded({ extended: false }))

    return app;
}

module.exports = configExpress;