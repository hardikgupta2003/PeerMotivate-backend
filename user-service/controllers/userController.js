const { getUser, createUser } = require("../models/userModel");

// Register a new user
const registerUser = async (req, res) => {
  const { firebase_id, name, email } = req.body;

  if (!firebase_id || !name || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await createUser(firebase_id.toString(), name, email);
    res.status(201).json(user);
  } catch (e) {
    console.error("Register Error:", e.message);
    res.status(500).json({ error: "User registration failed" });
  }
};

// Fetch user by Firebase ID
const fetchUser = async (req, res) => {
  const { firebase_id } = req.params;

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
