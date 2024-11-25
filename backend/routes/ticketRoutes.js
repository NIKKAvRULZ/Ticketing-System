const express = require('express');
const { getTickets, addTicket, buyTicket, searchTickets } = require('../controllers/ticketController');

const router = express.Router();

router.route('/').get(getTickets).post(addTicket);
router.route('/:ticketId').patch(buyTicket);
router.route('/search').get(searchTickets); // Search tickets by purchaser's name

module.exports = router;
