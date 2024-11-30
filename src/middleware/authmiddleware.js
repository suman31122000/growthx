import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

//middleware for authentication
const auth = (req, res, next) => {

  const token =req.cookies?.token || req.header("Authorization")?.replace("Bearer ","");  //accessing token from cookie
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' }); //checking token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifying token
    req.user = decoded;  //setting user in req.user with decoded data
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token is not valid' });
  }
};
export default auth;


