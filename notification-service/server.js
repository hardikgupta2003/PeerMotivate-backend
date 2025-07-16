const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("🔔 Notification-Service is running...");
});

// Notification Routes
app.use("/notify", notificationRoutes);

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`✅ Notification-Service running on PORT: ${PORT}`);
});
