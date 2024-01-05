const { Client, GatewayIntentBits, Partials } = require("discord.js");
const axios = require("axios");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const client = new Client({
     intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
     partials: [Partials.Channel],
});

const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST || "localhost";
const DISCORD_TOKEN = process.env.DISCORD_TOKEN || " ";

client.on("messageCreate", async (message) => {
     let isFeedback = message.content.trim().split(" ")[0];
     if (isFeedback == "/feedback") {
          const feedback = message.content.slice("/feedback".length).trim();
          const commentData = {
               comment: feedback,
               userId: message.author.id,
               username: message.author.username,
               channelId: message.channel.id,
               status: "new",
               statusEventTime: new Date(),
          };

          // Call the backend API to submit the comment
          await submitCommentToBackend(commentData);

          // Respond to the user
          message.reply("Thanks for reaching out! We’ll be passing this along to the team directly! Good luck playing the game!");
     }
});

async function submitCommentToBackend(commentData) {
     try {
          // Make a POST request to the backend API
          await axios.post("http://localhost:3000/api/comment", commentData);
     } catch (error) {
          console.error("Error submitting comment to backend:", error.message);
          // Handle the error appropriately (e.g., log, send a message to the user)
     }
}

client.login(DISCORD_TOKEN);
