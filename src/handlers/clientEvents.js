const { readdirSync } = require("fs");
const { Client } = require("discord.js");
const { Vulkava } = require('vulkava');
/**
 * @param {Client} client
 */
module.exports = (client) => {

  client.vulkava = new Vulkava({
    nodes: [
      {
        id: 'Node 1',
        hostname: 'pnode1.danbot.host',
        port: 2217,
        password: 'gohbot',
        secure: false,
      }
    ],
    sendWS: (guildId, payload) => {
      client.guilds.cache.get(guildId)?.shard.send(payload);
    }
  })
  readdirSync("./src/events/client/").forEach((file) => {
    const event = require(`../events/client/${file}`);
    client.on(event.name, (...args) => event.run(client, ...args));
    setInterval(()=> {
      delete require.cache[require.resolve('../events/client/ready.js')];
    }, 300000)
  });

  readdirSync("./src/events/music/").forEach((file) => {
    const event = require(`../events/music/${file}`);
    client.vulkava.on(event.name, (...args) => event.run(client, ...args));
  });
};