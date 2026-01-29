const express = require("express");
const createGames = require("../controllers/games_controller/createGames");
const upload = require("../middlewares/upload");
const getGames = require("../controllers/games_controller/getGames");
const updateGame = require("../controllers/games_controller/updateGame");
const deleteGame = require("../controllers/games_controller/deleteGame");
const jwt_admin_verify = require("../middlewares/jwt_admin_verify");


const router = express.Router();


router.post("/createGames", upload.fields([{ name: "img", maxCount: 1 }, { name: "video", maxCount: 1 },]), jwt_admin_verify, createGames);
router.get("/getGames", getGames); 
router.put("/updateGame/:gameID", upload.fields([{ name: "img", maxCount: 1 }, { name: "video", maxCount: 1 },]), jwt_admin_verify,updateGame);
router.delete("/deleteGame/:gameID", jwt_admin_verify , deleteGame);

module.exports = router;