const pool = require("../db");

// Create user in DB
const createUser = async (firebase_id, name, email) => {
  const result = await pool.query(
    "INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *",
    [firebase_id, name, email]
  );
  return result.rows[0];
};

// Get user by firebase_id
const getUser = async (firebase_id) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [firebase_id]
  );
  return result.rows[0];
};

module.exports = { createUser, getUser };
