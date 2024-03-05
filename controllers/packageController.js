const Package = require('../models/Package');
const City = require('../models/City');
const Hotel = require('../models/Hotels');
const validator = require('validator');



 
const insertPackage = async (req, res) => {
    try {
        const { destination, hotel, depart_date, trip_duration, number_of_seats, price, description, status } = req.body;

      
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

     
        const package = new Package({
            destination: findDestination._id,
            hotel: findHotel._id,
            depart_date,
            trip_duration,
            number_of_seats,
            available_seats: number_of_seats,
            price,
            description,
            status
        });

        await package.save();

        return res.json({ success: true, message: 'Package inserted successfully' });
    } catch (error) {
      
        res.status(500).json({ success: false, error: error.message });
    }
};


const updatePackage = async (req, res) => {
    const { id } = req.params;
    const { destination, hotel, depart_date, trip_duration, number_of_seats, price, description, status } = req.body;
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

     
        const package = await Package.findByIdAndUpdate(id,{
            destination: findDestination._id,
            hotel: findHotel._id,
            depart_date,
            trip_duration,
            number_of_seats,
            available_seats: number_of_seats,
            price,
            description,
            status
        },{ new: true });
      

        if (!package) {
            return res.status(404).json({ success: false, error: 'Package not found' });
        }

        return res.json({ success: true, message: 'Package updated successfully', package });
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
        const package = await Package.findByIdAndDelete(id);
        if (!package) {
            return res.status(404).json({ success: false, error: 'Package not found' });
        }
        return res.json({ success: true, message: 'Package deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};




    




module.exports={
  
    insertPackage,
    updatePackage,
    getAllPackages,
    deletePackage
  
   
};