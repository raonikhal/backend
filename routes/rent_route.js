const express = require("express");
const {Rentitem, itemTolet, deleteRentedItem, getMyListedItems, getMyTakenOnRent, getAllListedItems } = require("../controllers/rent_controller/rent_controller");
const jwt_user_verify = require("../middlewares/jwt_users_verify");
const upload = require("../middlewares/upload");


const router = express.Router();


router.post("/rent",jwt_user_verify, upload.fields([{ name: "img", maxCount: 1 }, { name: "video", maxCount: 1 },]), Rentitem);
router.post("/to_let/:itemId",jwt_user_verify ,itemTolet);
router.get("/my_listed", jwt_user_verify ,getMyListedItems);
router.get("/my_rented", jwt_user_verify, getMyTakenOnRent);
router.get("/allListed_items", getAllListedItems);


router.delete("/deleteRentedItem/:ItemId", jwt_user_verify , deleteRentedItem);


module.exports = router;