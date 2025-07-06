const { getUser, createUser } = require("../models/userModel");

// Register a new user
const registerUser = async (req, res) => {
  const { name, email } = req.body;
  const firebase_id = req.user.uid;
  // console.log("firebase id in controller ", firebase_id);

  if (!firebase_id || !name || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await getUser(firebase_id);
    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        data: existingUser,
      });
    }


    const user = await createUser(firebase_id.toString(), name, email);
    res.status(201).json(user);
  } catch (e) {
    console.error("Register Error:", e.message);
    res.status(500).json({ error: "User registration failed" });
  }
};

// Fetch user by Firebase ID
const fetchUser = async (req, res) => {
  const { firebase_id } = req.user.uid;
  // console.log("firebase id in controller ",firebase_id)

  try {
    const user = await getUser(firebase_id.toString());
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (e) {
    console.error("Fetch Error:", e.message);
    res.status(500).json({ error: "Error fetching user" });
  }
};

module.exports = { registerUser, fetchUser };
