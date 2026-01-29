const logout = (req, res) => {
   try{
      res.clearCookie("usertoken", { httpOnly: true, secure: false, sameSite: "lax"});

      res.status(200).json({message : "Logout Successfull"});
   }catch(err){
      res.status(500).json({message : "error in server", err});
   }
};

module.exports = logout;