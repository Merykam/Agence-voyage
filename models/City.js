const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 100,
        required: true
    }
});

const City = mongoose.model("City", citySchema);

module.exports = City;
