const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { Vulkava } = require('vulkava');
const fs = require("fs");
const User = require('./Schema/user');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildEmojisAndStickers,
    ],
    disableMentions: "everyone",
});

client.config = require('./config');
client.slashCommands = new Collection();

client.on("disconnect", () => console.log("Bot is disconnecting..."));
client.on("reconnecting", () => console.log("Bot reconnecting..."));
client.on("warn", (error) => console.log(error));
client.on("error", (error) => console.log(error));

["clientEvents", "slashCommands", "mongoose", "antiCrash"].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
});

const { AutoPoster } = require('topgg-autoposter')

const ap = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwNTIwNDk0NzE1MDIwMjQ3MDQiLCJib3QiOnRydWUsImlhdCI6MTY3NDUwMTEzNH0.mPAB6RqM_LrU4HeHaVqaRX1qadMj1Pz_Mw4BTy59qKU', client)

ap.on('posted', () => {
  console.log(`Hi!`)
})

client.login(client.config.token || process.env.TOKEN);

module.exports = client;