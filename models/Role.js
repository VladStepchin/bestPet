const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  value: {
    type: String,
    required: true,
    unique: true,
    default: "USER",
  },
});

module.exports = mongoose.model("Role", roleSchema);
