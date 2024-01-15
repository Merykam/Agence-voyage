const express = require('express');
const app = express();

const mongoose = require('mongoose');

const port = 4000;
const db = "mongodb://127.0.0.1:27017/booking-trip"

mongoose.connect(db)
.then(()=>console.log(`database connected : ${db}`))
.catch(()=>console.log(`not connected : ${db}`))


app.listen(port,()=>{
    console.log(`app is listning to ${port}`);
})