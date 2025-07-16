const express = require("express");
const router = express.Router();
const { sendToUser } = require("../controllers/notificationController");

// POST /notify/send
router.post("/send", sendToUser);

module.exports = router;
