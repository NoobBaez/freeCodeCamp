const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
    description: String,
    duration: Number,
    date: String
});

const schema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    log: [exerciseSchema]
});

module.exports = mongoose.model("User", schema);