const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');



router.get('/getAllUsers',userController.getAllusers);
router.get('/updateStatus/:id',userController.updateUserStatus);



module.exports=router;