const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.get("/infor", UserController.getInfor);
router.post("/saverecord", UserController.saveRecord);
module.exports = router;
