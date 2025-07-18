const {
  createHabit,
  getHabitsByUser,
  updateHabit,
  deleteHabit,
  getHabit,
} = require("../models/habitModel");

const addHabit = async (req, res) => {
  const firebase_id = req.user.uid;
  console.log(firebase_id)
  const { title, description, frequency } = req.body;

  try {
    const habit = await createHabit(firebase_id, title, description, frequency);
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: "Failed to create habit" });
  }
};

const getHabits = async (req, res) => {
  const firebase_id = req.user.uid;

  try {
    const habits = await getHabitsByUser(firebase_id);
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch habits" });
  }
};


const getHabitById = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await getHabit(id);
    res.status(200).json({"message":"fetched Habit by Id"});
  } catch (err) {
    res.status(500).json({ error: "Failed to get habit" });
  }
};

const deleteHabitById = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteHabit(id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete habit" });
  }
};

const updateHabitById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const updates = req.body;
    console.log("updates, "+updates)
  
    try {
      // Fetch the habit before update
      console.log("habit")
      const habit = await getHabit(id);
      if (!habit) return res.status(404).json({ error: "Habit not found" });
  
      let newStreak = habit.streak;
  
      // // Check if we're marking it complete today
      // if (updates.is_completed === true) {
      //   const lastCompleted = habit.habit_completed_at
      //     ? new Date(habit.habit_completed_at).toDateString()
      //     : null;
      //   const today = new Date().toDateString();
  
      //   // Increment streak only if not already done today
      //   if (lastCompleted !== today) {
      //     newStreak = habit.streak + 1;
      //     updates.habit_completed_at = new Date(); // optional: in model or controller
      //   }
      // }
  
      // // Set the new streak if is_completed is true
      // if (updates.is_completed !== undefined) {
      //   updates.streak = newStreak;
      // }
  
      const updated = await updateHabit(id, updates);
      res.status(200).json(updated);
    } catch (err) {
      console.error("❌ Error updating habit:", err.message);
      res.status(500).json({ error: "Failed to update habit" });
    }
  };
  

module.exports = {
  addHabit,
  getHabits,
  updateHabitById,
  deleteHabitById,
  getHabitById
};
