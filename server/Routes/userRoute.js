const express = require('express');

const { test,updateUser, deleteUser, signout  } = require('../Controller/userController.js');
const { verifyToken } = require('../Utils/verifyUser.js');

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId' ,verifyToken, updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser)
router.post('/signout',signout)

module.exports = router;
