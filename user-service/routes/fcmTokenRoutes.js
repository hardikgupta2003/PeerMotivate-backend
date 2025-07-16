const express = require("express");
const router = express.Router();
const fcmTokenController = require("../controllers/fcmTokenController");
const verifyFirebaseToken = require('../middlewares/firebaseAuth')

router.post(
  "/fcm-token",
  fcmTokenController.saveFcmToken
);

router.get("/fcm-token/:id");

module.exports = router;
