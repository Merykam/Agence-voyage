const Booking = require('../models/Reservation');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const package = require('../models/Package')



 

const booking = async (req,res)=>{
       
        const { number_of_seats, packageId } = req.body;
        console.log("this issssssss" + packageId);

        const findPackage = await package.find({_id:packageId});
        console.log(findPackage[0].price);
      
         const findPrice = findPackage[0].price;
         const totalPrice=findPrice*number_of_seats;
         console.log(totalPrice);
            console.log("this is price" + findPrice);
        


        const tokenString = req.headers.cookie;
    
        const tokenarr = tokenString.split("=")
        const token = tokenarr[1]
        console.log(token)
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId= decodeToken.userId._id;

     
        if (!validator.isNumeric(String(number_of_seats))) {
            return res.status(400).json({ error: 'Number of seats must be a number.' });
        }
      

        try{

    
            const booking = new Booking({
                number_of_seats_reserved: number_of_seats,
                user_id: userId,
                package_id: packageId,
                total_price:totalPrice
               
            
            });
    
            await booking.save();
            

            res.json({ success: true, message: 'Reservation done' });

        }catch (error) {
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



   
module.exports={
    booking,
    showBookings
  
   
};