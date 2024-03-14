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
        default: Date.now, 
        required: true
    }
});

reservationSchema.pre('save', function(next) {
    if (!this.reservation_date) {
        this.reservation_date = new Date();
    }
    next();
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
