const { Activity } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");

module.exports = {
   name: "raw",
   run: async(client, packet) => {
    client.vulkava.handleVoiceUpdate(packet)
   },
};