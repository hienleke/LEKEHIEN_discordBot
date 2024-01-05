const express = require("express");
const bodyParser = require("body-parser");
const commentRoutes = require("../routers/commentRoutes");
const authRoutes = require("../routers/authRoutes");

function createServer() {
     const app = express();

     app.use(bodyParser.json());
     app.use("/api", commentRoutes);
     app.use("/api", authRoutes);

     return app;
}

module.exports = createServer;
