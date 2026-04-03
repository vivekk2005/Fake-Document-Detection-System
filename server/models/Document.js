const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    filename: String,
    originalName: String,
    status: String,
    confidence: Number,
    hash: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);