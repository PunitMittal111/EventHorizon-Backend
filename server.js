const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const connectDB = require("./config/db.js");

const authRoute = require("./routes/authRoutes.js");
const userRoute = require("./routes/userRoute.js");
const eventRoutes = require("./routes/eventRoutes.js");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use("/events/uploads", express.static(uploadsDir));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
