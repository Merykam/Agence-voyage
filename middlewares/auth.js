const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const tokenString = req.headers.cookie;
  console.log(tokenString)
  const tokenarr = tokenString.split("=")
  const token = tokenarr[1]
  console.log(token)

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