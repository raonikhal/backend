const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwt_admin_verify = (req, res, next) => {
   try{
      const token = req.cookies.admintoken;

      if(!token){
        return res.status(400).json({message : "Access Denied No Token Provided"});
      }

      const decoded = JWT.verify(token, process.env.JWT_ADMIN_TOKEN);
      req.admin = decoded;

      next();
   }catch(err){
      res.status(400).json({ message: "Invalid token." });
   }
};

module.exports = jwt_admin_verify;