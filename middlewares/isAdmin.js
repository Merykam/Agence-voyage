const User = require('../models/user');
const jwt = require('jsonwebtoken');

async function IsAdmin(req, res, next) {

    const tokenString = req.headers.cookie;
    console.log(tokenString)
    const tokenarr = tokenString.split("=")
    const token = tokenarr[1]
    console.log(token)
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
   

    console.log(userId.role);

    if(userId.role =="0"){
        res.json({'message' : 'Your are not admin'});
    }


    next(); 

}


module.exports=IsAdmin;