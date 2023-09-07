const express = require("express");
// forgot to add this line and got the error ReferenceError: app is not defined
const app = express();
const PORT = 3000;
const connectDB = require("./utils/connectDB");
const Log = require("./models/logs");

// Load environment variables from a .env file
require("dotenv").config();

// Middleware -> To parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The JSX view engine
const jsxEngine = require("jsx-view-engine");
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

// Connect to MongoDB
connectDB();

/**
 * Index route (GET)
 */
app.get("/logs", async (req, res) => {
  try {
    // Fetch all logs from the database
    const logs = await Log.find();

    // Render the Index view and pass logs as props
    res.render("Index", { logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).send("Error fetching logs");
  }
});

/**
 * Show Route
 */
app.get("/logs/:id", async (req, res) => {
  try {
    // Fetch the log by ID from the database
    const log = await Log.findById(req.params.id);

    if (!log) {
      // Handle the case where the log with the provided ID is not found
      return res.status(404).send("Log not found");
    }

    // Render the Show view and pass the log data as props
    res.render("Show", { log });
  } catch (e) {
    console.error("Error fetching log:", e);
    res.status(500).send("Error fetching log");
  }
});

/**
 * New Route
 * @name New
 * @method get
 * @description render new form
 */
app.get("/logs/new", (req, res) => {
  res.render("New");
});

/**
 * Create Route
 * @name Create
 * @method post
 * @description
 */
// Handle POST requests to the "/logs" route
app.post("/logs", async (req, res) => {
  try {
    // Create a new log using the Log model and data from the request body
    const newLog = new Log({
      title: req.body.title, // Extract the title from the request body
      entry: req.body.entry, // Extract the entry from the request body
      isShipBroken: req.body.shipIsBroken === "true", // Extract the shipIsBroken and convert it to a boolean
    });

    // Save the newly created log to the database
    await newLog.save();

    // Log the new log object to the console for debugging purposes
    console.log(newLog);

    // Redirect to the show page for the created log
    res.redirect("/logs/show");
  } catch (e) {
    // If an error occurs during the try block, handle it here
    console.error("Error creating log:", e); // Log the error message to the console
    res.status(500).send("Error creating log"); // Send a 500 Internal Server Error response with an error message
  }
});

// Server Port
app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
