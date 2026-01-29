const express = require("express");
const adminLogin = require("../controllers/admin_controller/adminLogin");
const adminSignup = require("../controllers/admin_controller/adminSignup");
const adminLogout = require("../controllers/admin_controller/adminLogout");

const router = express.Router();


router.post("/adminLogin", adminLogin); 
router.post("/adminSignup", adminSignup);
router.get("/adminLogout", adminLogout);


module.exports = router;