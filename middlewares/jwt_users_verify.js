const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwt_user_verify = (req, res, next) => {
  try{
    const usertoken = req.cookies.usertoken; 

    if(!usertoken){
        return res.status(400).json({message : "Access Denied No userToken Provided"});
    }

    const decoded = JWT.verify(usertoken ,process.env.JWT_USER_TOKEN);
    
    req.user = decoded;

    next();

  }catch(err){
     res.status(500).json({message : "Invalid Token"});
  }
};

module.exports = jwt_user_verify;