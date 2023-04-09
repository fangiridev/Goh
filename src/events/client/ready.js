const { Activity } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const startActivitiesChange = require('../../utils/presences');
const GohList = require('gohlist.js');
const dbl = new GohList();
const moment = require("moment");

module.exports = {
   name: "ready",
   run: async(client) => {
      const voiceChannel1 = client.channels.cache.get("1086026467965669387");
      const voiceChannel2 = client.channels.cache.get("1086026626682343566");
      const voiceChannel3 = client.channels.cache.get("1086026823583936664");
      const voiceChannel4 = client.channels.cache.get("1086026871596130346");
        setInterval(() => {
        const b = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const a = client.guilds.cache.size;
        const ping = client.ws.ping;
  
        const d = moment.duration(client.uptime);
        const days = d.days() == 1 ? `${d.days()}d` : `${d.days()}d`;
        const hours = d.hours() == 1 ? `${d.hours()}h` : `${d.hours()}h`;
        const minutes =
          d.minutes() == 1 ? `${d.minutes()}m` : `${d.minutes()}m`;
        const seconds =
          d.seconds() == 1 ? `${d.seconds()}s` : `${d.seconds()}s`;
  
        voiceChannel1.setName(`👥 ${b} usuários!`);
      }, 300000);
      setInterval(() => {
        const b = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const a = client.guilds.cache.size;
        const ping = client.ws.ping;
  
        const d = moment.duration(client.uptime);
        const days = d.days() == 1 ? `${d.days()}d` : `${d.days()}d`;
        const hours = d.hours() == 1 ? `${d.hours()}h` : `${d.hours()}h`;
        const minutes =
          d.minutes() == 1 ? `${d.minutes()}m` : `${d.minutes()}m`;
        const seconds =
          d.seconds() == 1 ? `${d.seconds()}s` : `${d.seconds()}s`;
  
        voiceChannel2.setName(`🎆 ${a} servidores!`);
      }, 300000);
  
      setInterval(() => {
        const b = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const a = client.guilds.cache.size;
        const ping = client.ws.ping;
  
        const d = moment.duration(client.uptime);
        const days = d.days() == 1 ? `${d.days()}d` : `${d.days()}d`;
        const hours = d.hours() == 1 ? `${d.hours()}h` : `${d.hours()}h`;
        const minutes =
          d.minutes() == 1 ? `${d.minutes()}m` : `${d.minutes()}m`;
        const seconds =
          d.seconds() == 1 ? `${d.seconds()}s` : `${d.seconds()}s`;
  

        voiceChannel3.setName(`📡 ${ping}ms`);
      }, 300000);
  
      setInterval(() => {
        const b = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const a = client.guilds.cache.size;
        const ping = client.ws.ping;
  
        const d = moment.duration(client.uptime);
        const days = d.days() == 1 ? `${d.days()}d` : `${d.days()}d`;
        const hours = d.hours() == 1 ? `${d.hours()}h` : `${d.hours()}h`;
        const minutes =
          d.minutes() == 1 ? `${d.minutes()}m` : `${d.minutes()}m`;
        const seconds =
          d.seconds() == 1 ? `${d.seconds()}s` : `${d.seconds()}s`;
  
        voiceChannel4.setName(`⏰ ${days} ${hours} ${minutes} ${seconds}`);
      }, 300000);
    client.vulkava.start(client.user.id);
    console.log(`${client.user.username} online!`, "ready");

        setInterval(async () => {
                        let a = await client.shard.broadcastEval((a) => a.guilds.cache.size);
            let b = await client.shard.broadcastEval((b) => b.users.cache.size);
            const presences = [
            { name: `Need help? Use /help to get help | Shard [${client.shard.ids[0] + 1}/${client.shard.count}]`, type: 3, shardId: client.shard.ids[0] },
            { name: `${a.reduce((prev, val) => prev + val)} Servers | Shard [${client.shard.ids[0] + 1}/${client.shard.count}]`, type: 3, shardId: client.shard.ids[0] },
            { name: `${b.reduce((prev, val) => prev + val)} Users | Shard [${client.shard.ids[0] + 1}/${client.shard.count}]`, type: 3, shardId: client.shard.ids[0] }
        ]
            const randomStatus = presences[Math.floor(Math.random() * presences.length)];
            client.user.setActivity(randomStatus);
        }, 15000);
   },
};