const { sendNotification } = require("../models/fcmHelper");
const axios = require("axios");

const sendToUser = async (req, res) => {
  const { recipient_user_id, title, message, habit_id } = req.body;

  try {
    const response = await axios.get(
      `http://localhost:3000/users/fcm-token/${recipient_user_id}`
    );
    const fcmToken = response.data.fcm_token;

    if (!fcmToken) {
      return res.status(404).json({ error: "No FCM token found for user" });
    }

    await sendNotification(fcmToken, title, message, { habit_id });
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (err) {
    console.error("Error in Notification-Service:", err.message);
    res.status(500).json({ error: "Failed to send notification" });
  }
};

module.exports = { sendToUser };
