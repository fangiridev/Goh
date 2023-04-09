const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: 'serverinfo',
  description: `View current server information!`,
  name_localizations: {
    'pt-BR': 'serverinfo',
    'en-US': 'serverinfo',
  },
  description_localizations: {
    'pt-BR': '🎈 Utilidade  » Veja as informações do servidor atual!',
    'en-US': `🎈 Utility  » View current server information!`,
  },
  botPerms: [''],
  userPerms: [''],
  owner: false,
  category: {
    pt: 'Utilidade',
    en: 'Informação'
  },
  pt: {
    name: "serverinfo",
    category: "❔ Informação"
},
  run: async ({ client, interaction, language, args }, t) => {
    const guild = interaction.guild;
    const owner = await guild.fetchOwner();
    const channels = await guild.channels.fetch();
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: guild.name,
            iconURL: guild.iconURL() || 'https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg'
          })
          .setThumbnail(guild.iconURL() || 'https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg')
          .addFields(
            { name: `ID`, value: `${guild.id}`, inline: true },
            { name: `${t('commands:serverinfo.field1')}`, value: `<t:${Math.round(guild.createdTimestamp / 1000)}:f>`, inline: true },
            { name: `${t('commands:serverinfo.field2')}`, value: `${owner} (${owner.id})`, inline: true },
            { name: `${t('commands:serverinfo.field3')}`, value: `${guild.memberCount}`, inline: true },
            { name: `${t('commands:serverinfo.field4')}`, value: `${channels.size}`, inline: true },
          )
      ]
    });
   }
}