const { Client, GatewayIntentBits, Partials } = require("discord.js");
const axios = require("axios");
const config = require("./src//util/config");
const TK = config.discord.token || "notFound";
const port = config.app.port || 3000;
const host = "http://localhost"; //config.get("host.url") ||
const logger = require("./src/util/logger");
const isFeedbackValid = require("./src/util/isfeedBackValid");

const username = config.api.username;
const password = config.api.password;

const client = new Client({
     intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
     partials: [Partials.Channel],
});

client.on("messageCreate", async (message) => {
     if (isFeedbackValid(message.content)) {
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
          //Get Token
          let dataToken = await axios.post(`${host}:${port}/api/login`, {
               username: username,
               password: password,
          });
          let token = dataToken.data.token;
          if (!token) throw error("Can't not login to get token from discord bot");
          const config = {
               headers: { authorization: `${token}` },
          };
          //Submit daeta to back end
          let { data } = await axios.post(`${host}:${port}/api/comment`, commentData, config);
          logger.info(`Send data feedback: ${JSON.stringify(commentData)} from user ${commentData.userId} in channel ${commentData.channelId}`);
     } catch (error) {
          logger.error("Error submitting comment to backend:", error.message);
          //Log file to user security
          logger.error(`Send data feedback: ${JSON.stringify(commentData)} from user ${commentData.userId} in channel ${commentData.channelId}`);
     }
}

client.login(TK).then(console.log(" bot running "));
