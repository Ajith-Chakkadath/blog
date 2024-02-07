const express = require('express');
const { signup , signin ,google} = require('../Controller/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google',google)

module.exports = router;