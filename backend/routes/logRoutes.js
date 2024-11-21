const express = require('express');
const { 
    getAllLogs, 
    createLog, 
    deleteAllLogs 
} = require('../controllers/logController');

const router = express.Router();

// GET all logs
router.get('/', getAllLogs);

// POST a new log
router.post('/', createLog);

// DELETE all logs
router.delete('/', deleteAllLogs);

module.exports = router;
