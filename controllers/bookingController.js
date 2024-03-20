const Booking = require('../models/Reservation');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const package1 = require('../models/Package')




 
const booking = async (req, res) => {
    const { number_of_seats, packageId } = req.body;

   
    if (!validator.isNumeric(String(number_of_seats))) {
        return res.status(400).json({ error: 'Number of seats must be a number.' });
    }

    try {
        
        const findPackage = await package1.findById(packageId);
        
        
        if (!findPackage || !findPackage.available_seats) {
            return res.status(404).json({ error: 'Package not found or available seats information missing.' });
        }

        const findAvailableSeats = findPackage.available_seats;

        
        const seatsToBook = parseInt(number_of_seats);
        const availableSeats = parseInt(findAvailableSeats);

        console.log(seatsToBook);
        console.log(availableSeats);
        if (seatsToBook > availableSeats) {
            return res.json({ success: false, message: `You can't select more than ${availableSeats} seats.` });
        }else if( seatsToBook<0){
            return res.json({ success: false, message: `Select higher number` });
        }

        const calculSeats = findAvailableSeats - number_of_seats;
        console.log("calculSeats : " + calculSeats);

        if(calculSeats ==  0){
            await package1.findByIdAndUpdate(packageId,{
                available_seats:calculSeats,
                status:"saturated"
                
            })

            const findPrice = findPackage.price;
            const totalPrice = findPrice * seatsToBook;
    
            
            const tokenString = req.headers.cookie;
            const tokenarr = tokenString.split("=");
            const token = tokenarr[1];
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodeToken.userId._id;
    
          
            const booking = new Booking({
                number_of_seats_reserved: seatsToBook,
                user_id: userId,
                package_id: packageId,
                total_price: totalPrice
            });
    
            await booking.save();
    
           return  res.json({ success: true, message: booking });
        }

        await package1.findByIdAndUpdate(packageId,{
            available_seats:calculSeats,
            
        })
        
        const findPrice = findPackage.price;
        const totalPrice = findPrice * seatsToBook;

        
        const tokenString = req.headers.cookie;
        const tokenarr = tokenString.split("=");
        const token = tokenarr[1];
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodeToken.userId._id;

      
        const booking = new Booking({
            number_of_seats_reserved: seatsToBook,
            user_id: userId,
            package_id: packageId,
            total_price: totalPrice
        });

        await booking.save();

        res.json({ success: true, message: booking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


const showBookings = async (req, res)=>{
    try{

        const findBookings = await Booking.find()
        .populate({
            path: 'package_id',
            populate: {
                path: 'destination hotel',
                select: 'name',
            },
        })
        .populate('user_id');
        res.json({ success: true, bookings: findBookings });

    }catch{

    }
}

const showBookById = async (req, res)=>{
    const { id } = req.params;
    try{

        const findBooking = await Booking.find({_id:id})
        .populate({
            path: 'package_id',
            populate: {
                path: 'destination hotel',
                select: 'name',
            },
        })
        .populate('user_id');
        res.json({ success: true, booking: findBooking });

    }catch{

    }
}



   
module.exports={
    booking,
    showBookings,
    showBookById
  
   
};