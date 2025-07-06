const { json } = require("express");
const admin = require("../config/firebase");

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "No firebase token Provided",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    //   console.log("req : ",req)
    req.user = decodedToken;
    //   console.log("fire base id in middleware : ",decodedToken.uid); // This is firebase_id
    next();
  } catch (e) {
    console.error("Invalid Firebase token", error.message);
    res.status(401).json({ error: "Invalid Firebase token" });
  }
};

module.exports = verifyFirebaseToken;
