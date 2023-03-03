const express = require("express");
const router = express.Router();
const ticketController = require("..//controllers/ticket.controller.js")

router.get("/getTicketInfo", ticketController.getTicketInfo);

module.exports = router;