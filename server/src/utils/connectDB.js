const mongoose = require("mongoose");
const config = require("config");

async function connect() {
     const DB_URL = config.get("db.url") || "mongodb://localhost:27017/feedbackdb";
     await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connect;

// Connect to MongoDB
