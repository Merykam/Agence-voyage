const Package = require('../models/Package');
const City = require('../models/City');
const Hotel = require('../models/Hotels');
const validator = require('validator');

const multer = require('multer');
const jwt = require('jsonwebtoken')


 
const insertPackage = async (req, res) => {
    console.log(req.body)
    try {
        const { destination, hotel, depart_date, trip_duration, number_of_seats, price, description, status } = req.body;

      
        const tokenString = req.headers.cookie;
        console.log("this is tocken");
        console.log("this is it"+tokenString);
   
        const tokenarr = tokenString.split("=")
        console.log(tokenarr);
        const token1= tokenarr[1]
        console.log(token1)
        const decodeToken = jwt.verify(token1, process.env.JWT_SECRET);
        console.log(decodeToken);


        const userId= decodeToken.userId._id;
      
  
       
        if (!validator.isLength(destination, { min: 1, max: 255 })) {
            return res.status(400).json({ error: 'Destination is required.' });
        }

       
        if (!validator.isLength(hotel, { min: 1, max: 255 })) {
            return res.status(400).json({ error: 'Hotel is required.' });
        }

       
        if (!validator.isISO8601(depart_date)) {
            return res.status(400).json({ error: 'Invalid departure date.' });
        }


   
        if (!validator.isNumeric(String(number_of_seats))) {
            return res.status(400).json({ error: 'Number of seats must be a number.' });
        }

     
        if (!validator.isNumeric(String(price))) {
            return res.status(400).json({ error: 'Price must be a number.' });
        }

        if (parseFloat(price) < 1) {
            return res.status(400).json({ error: 'Price must be greater than or equal to 1.' });
        }

        if (!validator.isLength(description, { min: 1, max: 900 })) {
            return res.status(400).json({ error: 'Description is required.' });
        }

        if (!['available', 'saturated'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status.' });
        }

    
        const findDestination = await City.findOne({ name: destination });
        if (!findDestination) {
            return res.status(404).json({ error: 'Destination not found.' });
        }

       
        const findHotel = await Hotel.findOne({ name: hotel });
        if (!findHotel) {
            return res.status(404).json({ error: 'Hotel not found.' });
        }

     
    

        
       
        const image = req.file ? req.file.filename : undefined;

     
        const date = new Date();

        console.log(date);


    
        const departDate = new Date(depart_date);
        const currentDate = new Date();
    
        if (departDate < currentDate) {
            return res.status(400).json({ error: 'Departure date cannot be in the past.' });
        }
       
        const package1 = new Package({
            destination: findDestination._id,
            hotel: findHotel._id,
            depart_date,
            trip_duration,
            number_of_seats,
            available_seats: number_of_seats,
            price,
            description,
            status,
            image ,
            user_id: userId

        });

        
        await package1.save();

        return res.json({ success: true, message: 'Package inserted successfully' });
    
    } catch (error) {
      
        res.status(500).json({ success: false, error: error.message });
    }
};


const updatePackage = async (req, res) => {
    const { id } = req.params;
    const { destination, hotel, depart_date, trip_duration, number_of_seats, price, description, status } = req.body;
    const image = req.file ? req.file.filename : undefined;
    console.log("image :"+image);
    const tokenString = req.headers.cookie;
    console.log("this is tocken");
    console.log("this is it"+tokenString);

    const tokenarr = tokenString.split("=")
    console.log(tokenarr);
    const token1= tokenarr[1]
    console.log(token1)
    const decodeToken = jwt.verify(token1, process.env.JWT_SECRET);
    console.log(decodeToken);


    const departDate = new Date(depart_date);
    const currentDate = new Date();

    if (departDate < currentDate) {
        return res.status(400).json({ error: 'Departure date cannot be in the past.' });
    }

    const userId= decodeToken.userId._id;
    try {

        if (!validator.isLength(destination, { min: 1, max: 255 })) {
            return res.status(400).json({ error: 'Destination is required.' });
        }

       
        if (!validator.isLength(hotel, { min: 1, max: 255 })) {
            return res.status(400).json({ error: 'Hotel is required.' });
        }

       
        if (!validator.isISO8601(depart_date)) {
            return res.status(400).json({ error: 'Invalid departure date.' });
        }


   
        if (!validator.isNumeric(String(number_of_seats))) {
            return res.status(400).json({ error: 'Number of seats must be a number.' });
        }

     
        if (!validator.isNumeric(String(price))) {
            return res.status(400).json({ error: 'Price must be a number.' });
        }


        if (!validator.isLength(description, { min: 1, max: 900 })) {
            return res.status(400).json({ error: 'Description is required.' });
        }

        if (!['available', 'saturated'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status.' });
        }

    
        const findDestination = await City.findOne({ name: destination });
        if (!findDestination) {
            return res.status(404).json({ error: 'Destination not found.' });
        }

       
        const findHotel = await Hotel.findOne({ name: hotel });
        if (!findHotel) {
            return res.status(404).json({ error: 'Hotel not found.' });
        }

        
        const oldPackage = await Package.find({_id:id})
        const findSeats = oldPackage[0].number_of_seats;
        const findAvailableSeats = oldPackage[0].available_seats;
        console.log("findSeats :"+findSeats);

        

            const newSeats= number_of_seats - findSeats
            const newAvailableSeats = newSeats+findAvailableSeats


            const package2 = await Package.findByIdAndUpdate(id,{
                destination: findDestination._id,
                hotel: findHotel._id,
                depart_date,
                trip_duration,
                number_of_seats,
                available_seats: newAvailableSeats,
                price,
                description,
                status,
                image ,
                user_id: userId
            },{ new: true });


            return res.json({ success: true, message: 'Package updated successfully', package2 });

        
        

        
      

        if (!package2) {
            return res.status(404).json({ success: false, error: 'Package not found' });
        }

       
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find().populate({
            path: "destination",
            module: "City",
            select: "name"
        }).populate({
            path: "hotel",
            module: "Hotels",
            select: "name"
        })
        return res.json({ success: true, packages });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const deletePackage = async (req, res) => {
    const { id } = req.params;
    try {
        const package3 = await Package.findByIdAndDelete(id);
        if (!package3) {
            return res.status(404).json({ success: false, error: 'Package not found' });
        }
        return res.json({ success: true, message: 'Package deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


const packageById = async (req, res) => {
    const { id } = req.params;
    try {
        const package4 = await Package.findById(id).populate('destination hotel user_id');
        if (!package4) {
            return res.status(404).json({ success: false, error: 'Package not found' });
        }
        return res.json({ success: true, package4 });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};



    




module.exports={
  
    insertPackage,
    updatePackage,
    getAllPackages,
    deletePackage,
    packageById
  
   
};