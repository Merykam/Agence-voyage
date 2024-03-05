const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 100,
        required: true
    }
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
