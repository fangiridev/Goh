const { EmbedBuilder, Client, ApplicationCommandOptionType, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const dayjs = require("dayjs");

module.exports = {
    name: "channelinfo",
    description: "Displays channel information.",
	  description_localizations: {
        'pt-BR': '❔Informação » Exibe as informações do canal.',
		    'en-US': `❔Information » Displays channel information.`,
	  },
    options: [ 
        {
          name: "channel",
          description: "The channel to display the information of.",
          type: ApplicationCommandOptionType.Channel,
          required: true,
          name_localizations: {
            'pt-BR': 'canal',
            'en-US': 'channel',
          },
          description_localizations: {
            'pt-BR': 'O canal para exibir as informações.',
            'en-US': 'The channel to display the information of.'
          }
        },
    ],
    category: {
      pt: 'Informação',
      en: 'Information'
    },
    pt: {
      name: "channelinfo",
      category: "❔ Informação"
    },
    run: async ({ client, interaction, language, args }, t) => {
      const channelTypes = {
        0: t('commands:channelinfo.0'),
        2: t('commands:channelinfo.2'),
        4: t('commands:channelinfo.4'),
        5: t('commands:channelinfo.5'),
        10: t('commands:channelinfo.10'),
        11: t('commands:channelinfo.11'),
        12: t('commands:channelinfo.12'),
        13: t('commands:channelinfo.13'),
        15: t('commands:channelinfo.15'),
      }
        if (!interaction.inCachedGuild()) return
        const { guild, member, options } = interaction
    
        await guild.members.fetch()
    
        const channel = options.getChannel('channel') ?? interaction.channel
        if (!channel) return
    
        const { id, type, createdAt, members } = channel
        let memberCount;
        let botCount;
    
        if (members instanceof Collection) {
          memberCount = members.size
          botCount = members.filter((member) => member.user.bot).size
        } else {
          memberCount = members.cache.size
          botCount = members.cache.filter((member) => member.user?.bot).size
        }
    
        const embed = new EmbedBuilder()
          .setTitle(`${t('commands:channelinfo.title')}`)
          .setThumbnail(guild.iconURL())
          .setColor(guild.members.me?.displayHexColor ?? Color.Default)
          .setFields([
            { name: 'Channel', value: `${channel}`, inline: true },
            {
              name: 'ID',
              value: `\`${id}\``,
              inline: true,
            },
            {
              name: t('commands:channelinfo.type'),
              value: `\`${channelTypes[type]}\``,
              inline: true,
            },
            {
              name: t('commands:channelinfo.members'),
              value: `\`${memberCount}\``,
              inline: true,
            },
            {
              name: 'Bots',
              value: `\`${botCount}\``,
              inline: true,
            },
            {
              name: t('commands:channelinfo.created'),
              value: `\`${dayjs(createdAt).format('MMM DD YYYY')}\``,
              inline: true,
            },
          ])
          .setFooter({
            text: member.displayName,
            iconURL: member.displayAvatarURL(),
          })
          .setTimestamp()
    
        await interaction.reply({ embeds: [embed] })
    }
}