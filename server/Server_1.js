const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose"); // Import Mongoose

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Connect to the local MongoDB Compass
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase"; // Replace "mydatabase" with your database name

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

// Routes
app.use("/api/items", require("./routes/items"));
app.use("/api/payment", cors(), require("./routes/payment"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
