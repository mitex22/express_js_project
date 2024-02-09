const experss = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { auth } = require('../middlewares/authMiddleware');

function configExpress(app) {
    app.use(experss.static(path.resolve('src/public')));
    app.use(experss.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(auth);

    return app;
}

module.exports = configExpress;