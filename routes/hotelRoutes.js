const express = require('express');

const router = express.Router();

const HotelController = require('../controllers/hotelController');



router.get('/getAllHotels',HotelController.getAllHotels);





module.exports=router;