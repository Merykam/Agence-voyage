const mongoose = require('mongoose');
const City = require('../models/City');
const Hotel = require('../models/Hotels');

const citiesData = [
    { name: 'Marrakech' },
    { name: 'Casablanca' },
    { name: 'Fez' },
    { name: 'Chefchaouen' },
    { name: 'Essaouira' },
    { name: 'Istanbul' },
    { name: 'Paris' },
    { name: 'London' },
    { name: 'New York' },
    { name: 'Tokyo' },
    { name: 'Barcelona' },
  
];



const hotelsData = [
  
    { name: 'La Mamounia Marrakech' },
    { name: 'Royal Mansour Marrakech' },
    { name: 'Hyatt Regency Casablanca' },
    { name: 'Four Seasons Hotel Casablanca' },
    { name: 'Riad Fes - Relais & Châteaux' },
    { name: 'Palais Faraj Suites & Spa' },
    { name: 'Lina Ryad & Spa, Chefchaouen' },
    { name: 'Dar Echchaouen, Chefchaouen' },
    { name: 'Le Jardin des Douars, Essaouira' },
    { name: 'Heure Bleue Palais, Essaouira' },
    { name: 'The Plaza Hotel, New York' },
    { name: 'The Peninsula New York, New York' },
    { name: 'The Ritz Paris, Paris' },
    { name: 'Hotel Plaza Athenee Paris, Paris' },
    { name: 'The Ritz London, London' },
    { name: 'The Savoy, London' },
    { name: 'Four Seasons Hotel Istanbul at Sultanahmet, Istanbul' },
    { name: 'Ciragan Palace Kempinski Istanbul, Istanbul' },
    { name: 'Mandarin Oriental Tokyo, Tokyo' },
    { name: 'The Peninsula Tokyo, Tokyo' },
    { name: 'Hotel Arts Barcelona, Barcelona' },
    { name: 'W Barcelona, Barcelona' }
  
];



async function seedCities() {
    try {
        await City.deleteMany(); 
        await City.insertMany(citiesData); 
        console.log('Cities seeded successfully');
    } catch (err) {
        console.error('Error seeding cities:', err);
    }
}


async function seedHotels() {
    try {
        await Hotel.deleteMany(); 
        await Hotel.insertMany(hotelsData); 
        console.log('Hotels seeded successfully');
    } catch (err) {
        console.error('Error seeding hotels:', err);
    }
}


// mongoose.connect('mongodb+srv://kamaychmeryem1:1234567890@cluster0.ixsvmdn.mongodb.net/', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
mongoose.connect('mongodb://127.0.0.1:27017/booking-trip', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

seedCities();
seedHotels();
