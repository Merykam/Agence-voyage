const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    depart_date: {
        type: Date,
        required: true
    },
    trip_duration: {
        type: String,
        required: true
    },
    number_of_seats: {
        type: Number,
        required: true
    },
    available_seats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'saturated'],
        required: true
    },
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
