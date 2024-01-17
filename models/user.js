const mongoose = require('mongoose');

const userShcema = new mongoose.Schema({
    name:{
        type : String,
        trim:true,
        maxlength:50,
        required:true
    },
    email:{
        type : String,
        trim:true,
        maxlength:70,
        required:true,
      
    },
    password:{
        type: String,
        required:true
    },

    isVerified:{
        type : Boolean,
        default: false
    }
    
})

const User = mongoose.model("User",userShcema)


module.exports= User