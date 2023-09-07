const mongoose = require("mongoose"); // Import mongoose

const logSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    entry: { type: String, required: true },
    isShipBroken: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);
module.exports = Log;
