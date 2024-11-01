const { Activity } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const Guild = require("../../Schema/guild");

module.exports = {
  name: "guildMemberRemove",
  run: async (client, member) => {
    let guild = member.guild;

    Guild.findOne({ guildId: guild.id }, async (err, server) => {
      if (server.byebye.status) {
        client.channels.cache.get(server.byebye.channel).send(
          server.byebye.msg
            .replace(/{name}/g, `${member.user.username}`)
            .replace(/{total}/g, guild.memberCount)
            .replace(/{guildName}/g, guild.name)
        );
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
    });
  },
};