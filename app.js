const express = require('express');
const app = express();
const userRoute = require('./routes/authRoutes');
const packageRoute = require('./routes/packageRoutes');
const hotelRoute = require('./routes/hotelRoutes');
const cityRoute = require('./routes/cityRoute');
const mongoose = require('mongoose');

require('dotenv').config()
const cors = require('cors');
const path = require('path');


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded());
const port = process.env.PORT;
const db = process.env.DATABASE



app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

mongoose.connect(db)
.then(()=>console.log(`database connected : ${db}`))
.catch(()=>console.log(`not connected : ${db}`))


app.listen(port,()=>{
    console.log(`app is listning to ${port}`);
})

 
app.use('/api/auth',userRoute);
app.use('/api/package',packageRoute);
app.use('/api/hotel',hotelRoute);
app.use('/api/city',cityRoute);
