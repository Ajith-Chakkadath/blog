const express = require('express');

const { test,updateUser } = require('../Controller/userController.js');
const { verifyToken } = require('../Utils/verifyUser.js');

const router = express.Router();

router.get('/test', test);
router.put('/update:userId' ,verifyToken, updateUser);

module.exports = router;
