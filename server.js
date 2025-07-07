const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB= require("./config/db.js")

const authRoute = require("./routes/authRoutes.js");
const userRoute = require("./routes/userRoute.js");
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
