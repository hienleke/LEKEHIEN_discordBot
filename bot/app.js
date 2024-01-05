const { Client, GatewayIntentBits, Partials } = require("discord.js");
const axios = require("axios");
const path = require("path");
const client = new Client({
     intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
     partials: [Partials.Channel],
});

const config = require("config");

const host = config.get("host.url") || "http://localhost"; //config.get("host.url") ||
const port = config.get("app.port");
const DISCORD_TOKEN = config.get("discord.token");

client.on("messageCreate", async (message) => {
     let isFeedback = message.content.trim().split(" ")[0];
     if (isFeedback == "/feedback") {
          const feedback = message.content.slice("/feedback".length).trim();
          const commentData = {
               comment: feedback,
               userId: message.author.id,
               username: message.author.username,
               channelId: message.channel.id,
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
          let { data } = await axios.post(`${host}:${port}/api/comment`, commentData);
          console.log(" data out : ", data);
     } catch (error) {
          console.error("Error submitting comment to backend:", error.message);
          // Handle the error appropriately (e.g., log, send a message to the user)
     }
}

client.login(DISCORD_TOKEN);
