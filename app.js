const express = require('express');
const app = express();
const userRoute = require('./routes/authRoutes');
const packageRoute = require('./routes/packageRoutes');
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors');

app.use(express.json());


const port = 4000;
const db = "mongodb+srv://kamaychmeryem1:1234567890@cluster0.ixsvmdn.mongodb.net/"

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
