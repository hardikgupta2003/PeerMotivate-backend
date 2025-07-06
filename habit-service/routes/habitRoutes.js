const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middlewares/firebaseAuth");
const {
  addHabit,
  getHabits,
  updateHabitById,
  deleteHabitById,
} = require("../controllers/habitController");

// Protect all routes
router.use(verifyFirebaseToken);

router.post("/", addHabit);
router.get("/", getHabits);
router.patch("/:id", updateHabitById);
router.delete("/:id", deleteHabitById);

module.exports = router;
