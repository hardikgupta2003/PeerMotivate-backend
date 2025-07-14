const pool = require("../config/db");

const createHabit = async (firebase_id, title, description, frequency) => {
  const result = await pool.query(
    `INSERT INTO user_habits (user_id,title,description, frequency)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [firebase_id, title, description, frequency]
  );
  return result.rows[0];
};

const getHabitsByUser = async (firebase_id) => {
  const result = await pool.query(
    `SELECT * FROM user_habits WHERE user_id = $1`,
    [firebase_id]
  );
  return result.rows;
};

const updateHabit = async (id, updates) => {
  const {
    title,
    description,
    frequency,
    is_completed,
    current_streak,
    max_streak,
    updated_at
  } = updates;

  const result = await pool.query(
    `UPDATE user_habits SET 
      title = $1,
      description = $2,
      frequency = $3,
      is_completed = $4,
      current_streak = $5,
      max_streak = $6,
      updated_at = CURRENT_TIMESTAMP
     WHERE id = $7 RETURNING *`,
    [title, description, frequency, is_completed, current_streak, max_streak, id]
  );

  return result.rows[0];
};


const deleteHabit = async (id) => {
  const result = await pool.query(
    `DELETE FROM user_habits WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

const getHabit = async (id) => {
  const result = await pool.query("SELECT * FROM user_habits WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};


module.exports = {
  createHabit,
  getHabitsByUser,
  updateHabit,
  deleteHabit,
  getHabit
};
