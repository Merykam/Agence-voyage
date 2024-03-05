const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    number_of_seats_reserved: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    reservation_date: {
        type: Date,
        required: true
    }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
