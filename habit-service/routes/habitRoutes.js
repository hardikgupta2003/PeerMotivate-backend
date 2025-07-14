const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middlewares/firebaseAuth");
const {
  addHabit,
  getHabits,
  updateHabitById,
  deleteHabitById,
  getHabitById,
} = require("../controllers/habitController");

// Protect all routes
// router.use(verifyFirebaseToken);

router.post("/",verifyFirebaseToken, addHabit);
router.get("/",verifyFirebaseToken, getHabits);
router.get("/:id",verifyFirebaseToken, getHabitById);
router.patch("/:id",verifyFirebaseToken, updateHabitById);
router.delete("/:id",verifyFirebaseToken, deleteHabitById);

module.exports = router;
