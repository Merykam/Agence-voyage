const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const tokenString = req.headers.cookie;
  console.log("111"+tokenString)
  const tokenarr = tokenString.split("=")
  console.log("tokenarr"+tokenarr);
  const token = tokenarr[1]
  console.log("ggggggggggggggg"+token)

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // req.user = user;
    next(); 
  });
}


module.exports=authenticateJWT;