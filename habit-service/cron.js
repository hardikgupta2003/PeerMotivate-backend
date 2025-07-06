const cron = require("node-cron");
const pool = require("./db");

// Runs every day at midnight (server time)
cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Resetting all habits' is_completed to false...");

  try {
    await pool.query(`
      UPDATE habits
      SET is_completed = false
    `);
    console.log("✅ Reset done");
  } catch (err) {
    console.error("❌ Reset failed:", err.message);
  }
});
