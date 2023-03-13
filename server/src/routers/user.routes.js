const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/checkAccountInfo", UserController.checkAccountInfo);

module.exports = router;
