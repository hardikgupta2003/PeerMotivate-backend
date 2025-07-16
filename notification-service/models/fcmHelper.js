const axios = require("axios");

const sendNotification = async ({ fcmToken, title, message, data = {} }) => {
  try {
    const payload = {
      to: fcmToken,
      notification: {
        title,
        body: message,
      },
      data, // optional key-value payload (e.g., habit_id, type)
    };

    const response = await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `key=${process.env.FIREBASE_SERVER_KEY}`,
        },
      }
    );

    return {
      success: true,
      messageId: response.data.message_id,
    };
  } catch (error) {
    console.error(
      "❌ Error sending FCM:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || "Unknown error",
    };
  }
};

module.exports = {
  sendNotification,
};
