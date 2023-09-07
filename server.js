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
app.get("/logs/show", (req, res) => {
  res.render("Show");
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
app.post("/logs", async (req, res) => {
  try {
    // Create a new log using the Log model
    const newLog = new Log({
      title: req.body.title,
      entry: req.body.entry,
      isShipBroken: req.body.shipIsBroken === "true",
    });

    // Save the log to the database
    await newLog.save();
    console.log(newLog);

    // Redirect to the show page for the created log
    res.redirect("/logs/show");
  } catch (e) {
    console.error("Error creating log:", e);
    res.status(500).send("Error creating log");
  }
});

// Server Port
app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
