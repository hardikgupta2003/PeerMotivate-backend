const admin = require('../config/firebase');
const db = require('../db');

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No Firebase token provided" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseUid = decodedToken.uid;
    req.user = decodedToken


    next();
  } catch (error) {
    console.error("Invalid Firebase token", error.message);
    res.status(401).json({ error: "Invalid Firebase token" });
  }
};

module.exports = verifyFirebaseToken;