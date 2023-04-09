const { EmbedBuilder } = require("discord.js");
const Guild = require("../../Schema/guild");

module.exports = {
  name: "guildCreate",
  run: async (client, guild) => {
    const server = await Guild.findOne({
      guildId: guild.id,
  });

  if(!server) await Guild.create({
      guildId: guild.id,
      guildName: guild.name,
  })
    const channel = await client.channels.fetch(client.config.logs);
    const embed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username}#${client.user.discriminator} | ${client.user.id}`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`joined this ${guild.name}！`)
        .addFields(
            { name: 'GuildID', value: `\`${guild.id}\``, inline: true },
            { name: 'GuildOwner', value: `<@${guild.ownerId}> (\`${guild.ownerId}\`)`, inline: true },
            { name: "Guild Member Count", value: `${guild.memberCount}`, inline: true },
        )
        .setColor("800080")
    await channel.send({ embeds: [embed] })
  },
};
