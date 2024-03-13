const Hotel = require('../models/Hotels')

const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find()
        return res.json({ success: true, hotels });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports={
     getAllHotels, 
};