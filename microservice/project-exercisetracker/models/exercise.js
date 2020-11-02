const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user: String,
    description: String,
    duration: Number,
    date: Date
});

module.exports = mongoose.model("Exercise", schema);