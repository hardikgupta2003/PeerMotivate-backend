const db = require("../db/index");

const insertFcmToken = async (fcm_token, userId) => {
    console.error("hellooo"+userId)
  const result = await db.query(
    `INSERT INTO user_fcm_tokens (user_id, fcm_token)
     VALUES ($1, $2)
     ON CONFLICT (fcm_token) DO NOTHING 
     RETURNING *`,
    [userId, fcm_token]
  );

  return result.rows[0];
};

const getFcmTokenByUserId = async (userId) => {
  const result = await db.query(
    `SELECT fcm_token FROM user_fcm_tokens WHERE user_id = $1`,
    [userId]
  );

  return result.rows[0];
};

module.exports = {
  getFcmTokenByUserId,
  insertFcmToken,
};
