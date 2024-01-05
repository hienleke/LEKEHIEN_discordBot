const config = require("config");
const createServer = require("./src/utils/server");
const port = config.get("app.port") || 3000;
const connect = require("./src/utils/connectDB");
const log = require("./src/utils/logger");
connect();
// Set up routes
const app = createServer();

app.listen(port, () => {
     console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
