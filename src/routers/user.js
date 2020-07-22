const express = require('express');
const router = express.Router();
const userService = require('../services/user-service');
const passport = require('passport');
const userController = require('../controllers/user');

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    res.send(await userService.prototype.getAllUsers());
});

router.post('/registration', userController.prototype.registration);
router.post('/login', userController.prototype.login);
router.get('/activate/:code', userController.prototype.ActivateAccount);

module.exports = router;
