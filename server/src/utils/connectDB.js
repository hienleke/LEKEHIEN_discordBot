const mongoose = require("mongoose");

async function connect(username, password) {
     const DB_URL = `mongodb+srv://${username}:${password}@feedback.dk6mifz.mongodb.net/?retryWrites=true&w=majority` || "mongodb://localhost:27017/feedbackdb";
     await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connect;
