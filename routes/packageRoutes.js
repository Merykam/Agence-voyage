const express = require('express');

const router = express.Router();
const authenticateJWT = require('../middlewares/auth')
const IsAdmin = require('../middlewares/isAdmin')

const packageController = require('../controllers/packageController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    }
  });
const upload = multer({ storage: storage }).single('image');

router.post('/insertPackage', [authenticateJWT, IsAdmin, upload], packageController.insertPackage);
router.post('/updatePackage/:id',[authenticateJWT, IsAdmin], packageController.updatePackage);
router.get('/getAllPackages', packageController.getAllPackages);
router.delete('/deletePackage/:id',[authenticateJWT, IsAdmin], packageController.deletePackage);




module.exports=router;