const express = require("express");
const upload = require("../middlewares/upload");
const createConsole = require("../controllers/console_controller/createConsoles");
const getConsoles = require("../controllers/console_controller/getConsoles");
const updateConsole = require("../controllers/console_controller/updateConsole");
const deleteConsole = require("../controllers/console_controller/deleteConsole");
const jwt_admin_verify = require("../middlewares/jwt_admin_verify");

const router = express.Router();


router.post("/createConsole", upload.fields([{ name: "img", maxCount: 1 }, { name: "video", maxCount: 1 },]), jwt_admin_verify ,createConsole);
router.get("/getConsoles", getConsoles);
router.put("/updateConsole/:consoleID",upload.fields([{ name: "img", maxCount: 1 }, { name: "video", maxCount: 1 },]), jwt_admin_verify,updateConsole);
router.delete("/deleteConsole/:consoleID", jwt_admin_verify, deleteConsole);


module.exports = router;