const express = require("express");
const router = express.Router();
const ticketController = require("..//controllers/ticket.controller.js")

router.get("/getTicketInfo", ticketController.getTicketInfo);
router.get("/getDataByTicketID/:id", ticketController.getDataByTicketID);

module.exports = router;