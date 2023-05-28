const express = require("express");
const router = express.Router();
const formController = require("../controllers/form.controller.js");

router.post("/createNewDynamicForm", formController.createNewDynamicForm);
router.get("/getDynamicFormList", formController.getDynamicFormList);
router.post("/postDynamicFormData", formController.postDynamicFormData);
router.get("/getDynamicFormByID/:ticketID", formController.getDynamicFormByID);
router.get(
  "/getDynamicFormInputsByID/:ticketID",
  formController.getDynamicFormInputsByID
);
router.post("/updateDynamicForm", formController.updateDynamicForm);
router.post("/deleteDynamicFormById", formController.deleteDynamicFormById);
module.exports = router;
