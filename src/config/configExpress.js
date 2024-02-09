const experss = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

function configExpress(app) {
    app.use(experss.static(path.resolve('src/public')));
    app.use(experss.urlencoded({ extended: false }))
    app.use(cookieParser())

    return app;
}

module.exports = configExpress;