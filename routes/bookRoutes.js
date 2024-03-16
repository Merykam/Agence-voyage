const express = require('express');

const router = express.Router();

const bookController = require('../controllers/bookingController');



router.post('/bookingTrip',bookController.booking);
router.get('/getAllBookings',bookController.showBookings);





module.exports=router;