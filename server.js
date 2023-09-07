const express = require("express");

// forgot to add this line and got the error ReferenceError: app is not defined
const app = express();
const PORT = 3000;

// Middleware -> To parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// the JSX view engine
const jsxEngine = require("jsx-view-engine");
// app config
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

/**
 * @method get
 * @description checking to see if it works
 */
app.get("/", (req, res) => {
  res.send("And we are live!");
  console.log("And we are live!");
});

/**
 * @name New
 * @method get
 * @description render new form
 */
app.get("/logs/new", (req, res) => {
    res.render("New")
});

/**
 * Server
 */
app.listen(PORT, (req, res) => {
  console.log(`Server is running on localhost:${PORT}`);
});
