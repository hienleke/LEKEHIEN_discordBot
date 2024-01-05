const fs = require("fs");
const path = require("path");
const configPath = path.resolve(__dirname, "../../../../config/default.json");

// Read the content of the JSON file synchronously
let config;
try {
     config = fs.readFileSync(configPath, "utf8");
     config = JSON.parse(config);
} catch (err) {
     console.error("Error reading or parsing JSON file:", err);
}

module.exports = config;
