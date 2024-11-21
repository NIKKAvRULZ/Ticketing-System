const Log = require('../models/Log');

// Get all logs
exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new log
exports.createLog = async (req, res) => {
    try {
        const { message, action } = req.body;  // Destructure both message and action from the body

        // Ensure both message and action are provided
        if (!message || !action) {
            return res.status(400).json({ error: "Both 'message' and 'action' are required" });
        }

        const newLog = new Log({
            message: message,  // Log message
            action: action,    // Log action
        });

        await newLog.save();  // Save the log to the database
        res.status(201).json(newLog);  // Respond with the newly created log
    } catch (error) {
        res.status(500).json({ error: error.message });  // Handle errors
    }
};
// Delete all logs
exports.deleteAllLogs = async (req, res) => {
    try {
        await Log.deleteMany();
        res.status(200).json({ message: 'All logs deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
