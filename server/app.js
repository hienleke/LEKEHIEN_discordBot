const createServer = require("./src/utils/server");
const connect = require("./src/utils/connectDB");
const log = require("./src/utils/logger");
const config = require("./src/utils/config");
connect(config.db.username, config.db.password);
const port = config.app.port || 3000;
// Set up routes
const app = createServer();

app.listen(port, () => {
     console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
