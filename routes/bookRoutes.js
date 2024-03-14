const express = require('express');

const router = express.Router();

const bookController = require('../controllers/bookingController');



router.post('/bookingTrip',bookController.booking);





module.exports=router;