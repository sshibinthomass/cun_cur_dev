const express = require('express');
const router = express.Router();
const unauthorizedControllers = require('../controllers/unauthorized');

router.get('/',unauthorizedControllers.getHome);
router.get('/login',unauthorizedControllers.getLogin);
router.get('/signup',unauthorizedControllers.getSignUp);
router.post('/signup',unauthorizedControllers.postSignUp)

module.exports = router;