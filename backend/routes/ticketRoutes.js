const express = require("express");
const router = express.Router();
const {
  createTicket,
  getUserTickets,
  getAllTickets,
  updateTicketStatus,
} = require("../controllers/ticketController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, createTicket);
router.get("/", protect, getUserTickets);
router.get("/all", protect, adminOnly, getAllTickets);
router.put("/:id", protect, adminOnly, updateTicketStatus);

module.exports = router;
