const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(cors());
app.use(express.json());

const habitRoutes = require("./routes/habitRoutes");
app.use("/api/habits", habitRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Habit Service running on port ${PORT}`));
