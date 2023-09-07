const express = require("express");

// forgot to add this line and got the error ReferenceError: app is not defined
const app = express();
const PORT = 3000;

/**
 * @method GET
 * @description checking to see if it works
 */
app.get("/", (req, res) => {
  res.send("And we are live!");
  console.log("And we are live!");
});

/**
 * Server
 */
app.listen(PORT, (req, res) => {
  console.log(`Server is running on localhost:${PORT}`);
});
