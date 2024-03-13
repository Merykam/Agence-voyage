const city = require('../models/City')

const getAllCities = async (req, res) => {
    try {
        const cities = await city.find()
        return res.json({ success: true, cities });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports={
    getAllCities, 
};