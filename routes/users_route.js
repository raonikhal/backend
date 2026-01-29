const express = require("express");
const login = require("../controllers/user_controller/login");
const signup = require("../controllers/user_controller/signup");
const logout = require("../controllers/user_controller/logout");

const router = express.Router();


router.post("/login",login);
router.post("/signup", signup);

router.get("/logout", logout);

module.exports = router;