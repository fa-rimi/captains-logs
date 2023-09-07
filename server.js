const express = require("express"); // Import express
const methodOverride = require("method-override");
//! forgot to add this line and got the error ReferenceError: app is not defined
const app = express(); // Create an Express application
const PORT = 3000; // Define the port to run the server on
const connectDB = require("./utils/connectDB");
const Log = require("./models/logs"); // Import schema

// ** Load environment variables from a .env file **
require("dotenv").config();

// ** Middleware -> To parse JSON and form data **
app.use(express.json()); // Parse JSON data in requests
app.use(express.urlencoded({ extended: true })); // Parse form data in requests
app.use(methodOverride("_method"));

// ** The JSX view engine setup **
const jsxEngine = require("jsx-view-engine");
app.set("view engine", "jsx"); // Set the view engine to JSX
app.engine("jsx", jsxEngine()); // Configure JSX view engine

// ** Connect to MongoDB **
connectDB();

// ** Routes **

/**
 * New
 * @method GET
 * @description Render form to create new log entry
 */
app.get("/logs/new", (req, res) => {
  res.render("New"); // Render the "New" form
  console.log("Form Loading");
});

/**
 * Show
 * @method GET
 * @description Show entry by unique ID
 */
app.get("/logs/:id", async (req, res) => {
  try {
    // Fetch the Log by ID from the database
    const log = await Log.findById(req.params.id);
    if (!log) {
      // Handle the case where the log with the provided ID is not found
      return res.status(404).send("Log not found");
    }
    res.render("Show", { log }); // Render the "Show" view with log data
    console.log("Render Show View");
  } catch (e) {
    console.error("Error fetching log:", e);
    res.status(500).send("Error fetching log");
  }
});

/**
 * Index
 * @method GET
 * @description Renders list of Log entries as url
 */
app.get("/logs", async (req, res) => {
  try {
    // Fetch all logs from the database
    const logs = await Log.find();
    res.render("Index", { logs }); // Render the "Index" view with logs
    console.log("Rendering Index View");
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).send("Error fetching logs");
  }
});

/**
 * Create
 * @method POST
 * @description Creates new Log entry
 */
app.post("/logs", async (req, res) => {
  try {
    // Use the Log.create method to create a new log
    const newLog = await Log.create({
      title: req.body.title,
      entry: req.body.entry,
      isShipBroken: req.body.shipIsBroken === "true",
    });

    // Redirect to the show page for the created log
    res.redirect(`/logs/${newLog._id}`);
    console.log("Redirecting to Show recent log");
  } catch (e) {
    console.error("Error creating log:", e);
    res.status(500).send("Error creating log");
  }
});

/**
 * Delete
 * @method DELETE
 * @description Delete Log entry
 */
app.delete("/logs/:id", async (req, res) => {
  try {
    // Find the log by ID and delete it
    const deleteLog = await Log.findByIdAndDelete(req.params.id);

    if (!deleteLog) {
      return res.status(404).send("Log not found");
    }

    // Redirect to the index page after deleting the log
    res.redirect("/logs");
  } catch (e) {
    console.error("Error deleting log:", e);
    res.status(500).send("Error deleting log");
  }
});

// Add this route below your other routes in server.js

/**
 * Edit
 * @name Edit
 * @method get
 * @description Render the edit form for a log entry
 */
app.get("/logs/:id/edit", async (req, res) => {
  try {
    // Fetch the log by ID from the database
    const logToEdit = await Log.findById(req.params.id);

    if (!logToEdit) {
      // Handle the case where the log with the provided ID is not found
      return res.status(404).send("Log not found");
    }

    // Render the Edit view and pass the log data as props
    res.render("Edit", { logToEdit });
    console.log("Rendering Edit view");
  } catch (e) {
    console.error("Error fetching log for edit:", e);
    res.status(500).send("Error fetching log for edit");
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
