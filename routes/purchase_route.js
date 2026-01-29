const express = require("express");
const { buyGame, buyConsole, buyRemote, getMyPurchases } = require("../controllers/user_controller/purchase_controller");
const jwt_user_verify = require("../middlewares/jwt_users_verify");


const router = express.Router();

router.post("/buy/game/:id", jwt_user_verify, buyGame);
router.post("/buy/console/:id", jwt_user_verify , buyConsole);
router.post("/buy/remote/:id", jwt_user_verify, buyRemote);
router.get("/buy/myPurchases", jwt_user_verify, getMyPurchases);



module.exports = router;