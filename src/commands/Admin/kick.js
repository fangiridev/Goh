const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const Guild = require("../../Schema/guild");
const Utils = require("../../utils/utils.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'kick',
    description: 'Kick members!',
    name_localizations: {
      'pt-BR': 'expulsar',
      'en-US': 'kick',
      },
    description_localizations: {
      'pt-BR': '👮‍♂️Admin » Expulse membros!',
      'en-US': `👮‍♂️Admin » Kick members!`,
    },
    category: {
      pt: 'Moderação',
      en: 'Moderation'
    },
    botPerms: ['2'],
    userPerms: ['2'],
    owner: false,
    options: [ 
      {
        name: "user",
        description: "User you want to kick!",
        type: ApplicationCommandOptionType.User,
        required: true,
        name_localizations: {
          'pt-BR': 'usuário',
          'en-US': 'user',
          },
        description_localizations: {
          'pt-BR': 'Usuário que deseja expulsar!',
          'en-US': `User you want to kick!`,
        },
      },
  ],
  pt: {
    name: "expulsar",
    category: "👮‍♂️ Administração"
},
   run: async ({ client, interaction, language, args }, t) => {
    Guild.findOne({ guildId: interaction.guildId }, async (err, server) => {
        let member = interaction.options.getMember("user");
  
        let reason;
        if (!args[1]) reason = "Não informado";
        else reason = args.slice(1).join(" ");

        if (member.id == interaction.user.id) {
          return interaction.reply({ content:`${t('commands:kick.error2')}` });
        } else if (!member.kickable) {
          return interaction.reply(
            `${t('commands:kick.error1')}`
          );
          } else {
          const KICK = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name} - ${t('commands:kick.title')}`,
              iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setThumbnail(
              member.user.displayAvatarURL({ dynamic: true, size: 2048 })
            )
            .addFields(
              {
                name: "Member",
                value: member.user.tag,
              },
              {
                name: "ID",
                value: member.user.id,
              },
              {
                name: "Author",
                value: interaction.user.tag,
              }
            );
  
          if (server.logs.status === false) {
            interaction.reply({ embeds: [KICK] });
          } else {
            let channel = interaction.guild.channels.cache.get(server.logs.channel);
            channel.send({ embeds: [KICK] });
            interaction.reply({ embeds: [KICK] });
          }
          member.kick();
        }
      });
  }
}