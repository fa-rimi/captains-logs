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

// Routes
/**
 * Test Route
 * @method get
 * @description checking to see if it works
 */
app.get("/", (req, res) => {
  res.send("And we are live!");
  console.log("And we are live!");
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
 * Index route (GET)
 */
app.get("/logs", (req, res) => {
  res.render("Index");
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

    // Redirect to the show page for the created log (replace with your actual route)
    res.redirect(`/logs/${newLog._id}`);
  } catch (e) {
    console.error("Error creating log:", e);
    res.status(500).send("Error creating log");
  }
});

/**
 * Server
 */
app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
