const router = require('express').Router();
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await authService.register(userData);

        res.redirect('/auth/login');
    } catch (error) {
        const message = getErrorMessage(error);

        res.render('auth/register', { ...userData, error: message });
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);

        res.redirect('/');
    } catch (error) {
        const message = getErrorMessage(error);

        res.render('auth/login', { email, error: message });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;