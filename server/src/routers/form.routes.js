const express = require("express");
const router = express.Router();
const formController = require("../controllers/form.controller.js")

router.get("/getFormList", formController.getFormList);
router.get("/getFormDataField/:id", formController.getFormDataField);
router.post("/postFormData", formController.postFormData);

module.exports = router;
