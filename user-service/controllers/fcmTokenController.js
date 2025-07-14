const FcmTokenModel = require('../models/fcmTokenModel')

const saveFcmToken = async (req, res) => {
const userId = req.user.uid;
const fcmToken = req.body.fcmToken;

  console.log(req.user.uid);
  console.log(fcmToken);
  

  if (!fcmToken || !userId) {
    return res.status(400).json({ error: "Missing FCM token or user" });
  }

  try {
    const savedToken = await FcmTokenModel.insertFcmToken(fcmToken, userId);
    return res
      .status(201)
      .json({ message: "FCM token saved", data: savedToken });
  } catch (error) {
    console.error("Error saving FCM token:", error);
    res.status(500).json({ error: "Failed to save FCM token" });
  }
};

module.exports = {
  saveFcmToken,
};
    