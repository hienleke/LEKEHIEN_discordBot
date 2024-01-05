const express = require("express");
const bodyParser = require("body-parser");
const commentRoutes = require("../routers/commentRoutes");

function createServer() {
     const app = express();

     app.use(bodyParser.json());

     // Set up routes
     app.use("/api", commentRoutes);

     return app;
}

module.exports = createServer;
