const experss = require('express');
const path = require('path');

function configExpress(app) {
    app.use(experss.static(path.resolve('src/public')));

    return app;
}

module.exports = configExpress;