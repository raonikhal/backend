const express = require("express");
const createRemote = require("../controllers/remote_controller/createRemote");
const updateRemote = require("../controllers/remote_controller/updateRemote");
const getRemotes = require("../controllers/remote_controller/getRemote");
const deleteRemote = require("../controllers/remote_controller/deleteRemote");
const upload = require("../middlewares/upload");
const jwt_admin_verify = require("../middlewares/jwt_admin_verify");


const router = express.Router();


router.post("/createRemote", upload.fields([{ name: "img", maxCount: 1 }, { name: "video", maxCount: 1 },]), jwt_admin_verify,createRemote);
router.put("/updateRemote/:remoteID", upload.fields([{ name: "img", maxCount: 1 }, { name: "video", maxCount: 1 },]), jwt_admin_verify,updateRemote);
router.get("/getRemotes", getRemotes);
router.delete("/deleteRemote/:remoteID", jwt_admin_verify, deleteRemote);



module.exports = router;