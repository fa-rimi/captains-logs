// connectDB.js
const mongoose = require("mongoose");

module.exports = function connectDB() {
  // Connecting to MongoDB
  mongoose.connect(process.env.MONGO_URI);

  // Check for connection
  const db = mongoose.connection;

  // On is like an event listener
  db.once("open", () => {
    console.log("Connected to MongoDB"); // On the event when its open
  });

  db.on("error", (error) => {
    console.error("MongoDB connection error:", error); // On the event of an error
  });

  db.on("close", () => {
    console.log("MongoDB disconnected"); // On the event when its closed
  });
};
