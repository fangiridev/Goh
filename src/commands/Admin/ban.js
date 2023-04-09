const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const Guild = require("../../Schema/guild");
const Utils = require("../../utils/utils.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'ban',
    description: 'Ban members!',
    name_localizations: {
      'pt-BR': 'banir',
      'en-US': 'ban',
      },
    description_localizations: {
      'pt-BR': '👮‍♂️Admin » Bane membros!',
      'en-US': `👮‍♂️Admin » Ban members!`,
    },
    category: {
      pt: 'Moderação',
      en: 'Moderation'
    },
    botPerms: ['4'],
    userPerms: ['4'],
    owner: false,
    options: [ 
        {
          name: "user",
          description: "User you want to ban!",
          type: ApplicationCommandOptionType.User,
          required: true,
          name_localizations: {
            'pt-BR': 'usuário',
            'en-US': 'user',
            },
          description_localizations: {
            'pt-BR': 'Usuário que deseja banir!',
            'en-US': `User you want to ban!`,
          },
        },
    ],
    pt: {
      name: "banir",
      category: "👮‍♂️ Administração"
  },
   run: async ({ client, interaction, language, args }, t) => {
    Guild.findOne({ guildId: interaction.guildId }, async (err, server) => {
        let member = interaction.options.getMember("user");
  
        let reason;
        if (!args[1]) reason = "Não informado";
        else reason = args.slice(1).join(" ");
        if (member.id == interaction.user.id) {
          return interaction.reply({ content: `${t('commands:ban.error2')}` });
        } else if (!member.bannable) {
          return interaction.reply({ content: `${t('commands:ban.error1')}` });
        } else {
          const BAN = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name} - ${t('commands:ban.title')}`, iconURL: interaction.guild.iconURL({ dynamic: true })})
            .setThumbnail(
              member.displayAvatarURL({ dynamic: true, size: 2048 })
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
                name: "Who banned",
                value: interaction.user.tag,
              }
            );
  
          if (server.logs.status === false) {
            interaction.reply({ embeds: [BAN] });
          } else {
            let channel = interaction.guild.channels.cache.get(server.logs.channel);
            channel.send({ embeds: [BAN] });
            interaction.reply({ embeds: [BAN] });
          }
  
          interaction.guild.members.ban(member);
        }
      });
  }
}