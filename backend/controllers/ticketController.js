const Ticket = require("../models/Ticket");

// @route POST /api/tickets
// @access User
exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      user: req.user._id,
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/tickets
// @access User (own tickets)
exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/tickets/all
// @access Admin only
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/tickets/:id
// @access Admin only
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = status;
    await ticket.save();

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
