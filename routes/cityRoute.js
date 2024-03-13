const express = require('express');

const router = express.Router();

const cityController = require('../controllers/cityController');



router.get('/getAllCities',cityController.getAllCities);





module.exports=router;