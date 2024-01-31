const router = require('express').Router();

const homeController = require('./controllers/homeController');
const movieController = require('./controllers/movieController');

router.use(movieController);
// homeController always at the bottom due to 404 page check 
router.use(homeController);

module.exports = router;