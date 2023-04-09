const { Activity } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const Guild = require("../../Schema/guild");

module.exports = {
  name: "guildMemberAdd",
  run: async (client, member) => {
    try {
      let guild = member.guild;
  
      const server = await Guild.findOne({
          guildId: guild.id,
      });
  
      if(!server) await Guild.create({
          guildId: guild.id,
          guildName: guild.name
      })
  
      if (server.welcome.status) {
        client.channels.cache.get(server.welcome.channel).send(
          server.welcome.msg
            .replace(/{member}/g, `<@${member.id}>`)
            .replace(/{name}/g, `${member.user.username}`)
            .replace(/{total}/g, guild.memberCount)
            .replace(/{guildName}/g, guild.name)
        );
      }
  
      if (server.autorole.status) {
        member.roles.add(server.autorole.roles, "Sistema de AutoRole GohBot");
      }
  
      if (server.serverstats.status) {
        const st = server.serverstats;
        const ch = st.channels;
  
        if (ch.total != "null") {
          let channel = guild.channels.cache.get(ch.total);
  
          channel.setName(`Total: ${guild.memberCount.toLocaleString()}`);
        }
  
        if (ch.bot != "null") {
          let channel = guild.channels.cache.get(ch.bot);
  
          channel.setName(
            `Bots: ${guild.members.cache
              .filter((x) => x.user.bot)
              .size.toLocaleString()}`
          );
        }
  
        if (ch.users != "null") {
          let channel = guild.channels.cache.get(ch.users);
  
          channel.setName(
            `Usuários: ${guild.members.cache
              .filter((x) => !x.user.bot)
              .size.toLocaleString()}`
          );
        }
      }
  
      if (server.contador.status) {
        client.channels.cache
          .get(server.contador.channel)
          .setTopic(
            server.contador.msg.replace(
              /{contador}/g,
              traduzir(guild.memberCount)
            )
          );
      }
    } catch (err) {
      if (err) console.log(`(ERRO) - guildMemberAdd - ${err}`);
    }
  },
};