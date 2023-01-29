const express = require("express");
const router = express.Router();
const FormController = require("../controllers/form.controller.js");

router.get("/getFormList", FormController._getFormList);

module.exports = router;
