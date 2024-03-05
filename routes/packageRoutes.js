const express = require('express');

const router = express.Router();

const packageController = require('../controllers/packageController');


router.post('/insertPacakage',packageController.insertPackage);
router.post('/updatePackage/:id',packageController.updatePackage);
router.get('/getAllPackages',packageController.getAllPackages);
router.delete('/deletePackage/:id',packageController.deletePackage);




module.exports=router;